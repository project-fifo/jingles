'use strict';

angular.module('fifoApp')
.controller('MachinesCtrl', function ($scope, $http, $filter, wiggle, status, vmService, $q, auth, ngTableParams) {

    //To hide colums based on permission on the view
    $scope.auth = auth;

    $scope.infinitScroll = function() {
      $scope.tableParams.count($scope.tableParams.count() + 20);
    }

    $scope.start = function(vm) {
      vmService.executeAction('start', vm.uuid, vm.config &&  vm.config.alias)
    }

    $scope.connect = function(vm) {
      if (vm.config.type == 'kvm')
        window.open('vnc.html?uuid=' + vm.uuid);
      else
        window.open('console.html?uuid=' + vm.uuid);
    }

    $scope.hasMore = function() {
      return $scope.tableParams.count() < $scope.vms.length
    }

    var filterData = function() {
      var p = $scope.tableParams;

      var data = $scope.searchQuery && $scope.searchQuery.length >= (Config.minCharsSearch || 3)
        ? $filter('filter')($scope.vms, $scope.searchQuery)
        : $scope.vms;

      var orderByField = p.orderBy()
      data = orderByField? $filter('orderBy')(data, orderByField) : data

      //Save the sorting info in the user metadata
      //wiggle doesnt like to save metadata with a hash inside. serialize it of this time.. :P
      if (orderByField) {
        auth.currentUser().mdata_set({vms_orderBy: JSON.stringify(p.sorting())})
      }

      $scope.vmsFiltered = data.slice((p.page() - 1) * p.count(), p.page() * p.count());
    }

    var listenEvents = function() {

      $scope.$on('state', function(e, msg) {
          var vm = $scope.vms.hash[msg.channel];
          if (!vm) return;
          var failed = function(reason) {
              status.error("The creation of the VM " + vm.config.alias +
                           "(" + vm.uuid + ") failed. <br/>" + reason);
          }
          vm.state = msg.message.data;
          vmService.updateCustomFields(vm);
          if (vm.state == 'failed') {
              failed(vm.state_description);
          };

          buildLegend()
          $scope.$apply()
      })

      $scope.$on('update', function(e, msg) {

        requestsPromise.then(function() {
          var vm = $scope.vms.hash[msg.channel],
            data = msg.message.data;

          /* Get the extra data */

          var hyper = data.hypervisor
          if (hyper) {
            vm.hypervisor = hyper
            vm._hypervisor = wiggle.hypervisors.get({id: hyper})
          }

          var owner = data.owner
          if (owner) {
            vm.owner = owner
            vm._owner = wiggle.orgs.get({id: owner})
          }

          var pack = data.package
          if (pack) {
            vm.package = pack
            vm._package = wiggle.packages.get({id: pack})
          }

          if (!data.config) return;

          vm.config = data.config;
          vmService.updateCustomFields(vm);

          var set = data.config.dataset
          if (set) {
            vm.config.dataset = set
            vm.config._dataset = wiggle.datasets.get({id: set})
          }

        })
      })

      $scope.$on('delete', function(e, msg) {

        //Wait for the list to exists, before deleting an element of it.
        requestsPromise.then(function() {

          for (var i=0; i < $scope.vms.length; i++) {
            if ($scope.vms[i].uuid == msg.channel) {
              $scope.vms.splice(i, 1);
              break;
            }
          }
          filterData()
          buildLegend()
        })
      })

      $scope.$watch('searchQuery', function(val) {
        filterData()

        if (typeof val != 'undefined')
          auth.currentUser().mdata_set({vm_searchQuery: val})
      })

    }

    var startRequests = function() {

      var defered = $q.defer();


      $scope.vmsFiltered = []

      $scope.vms = wiggle.vms.queryFull()

      $scope.vms.$promise.then(function(vms) {
        vms.forEach(vmService.updateCustomFields)
        defered.resolve()
        listenEvents()
      })

      return defered.promise
  }

  $scope.tableParams = new ngTableParams({
    page: 1,
    count: 25,
    total: 0, //0=disable
    // sorting: {
    //   'config.alias': 'desc' //Could save this in the user metadata.. :P
    // },
    counts: [] ,//[] = disable ngTable pagination buttons
  }, {
    getData: function($defer, params) {
      if ($scope.vms.length < 1) return; //Ignore data loading then length is 0...
      filterData()
      $defer.resolve($scope.vmsFiltered)
    }
  })

  //Legend, how many vms in state x.
  var buildLegend = function() {
    var hist = {}
    $scope.vms.forEach(function(vm) {
      if (!hist[vm.state]) hist[vm.state] = {count: 0, _state_label: vm._state_label}
      hist[vm.state].count++
    })

    $scope.legend = []
    for (var k in hist)
      $scope.legend.push({state: k, count: hist[k].count, _state_label: hist[k]._state_label})
  }

  var whenAllDataIsLoaded = function(cb) {

      var all = []
      $scope.vms.forEach(function(vm) {
        var proms = [vm._package, vm._owner, vm._grouping, vm._hypervisor]
          .filter(function(vm){ return vm })
          .map(function(vm){ return vm.$promise })

        all = all.concat(proms)
      })

      return $q.all(all)
  }

  var requestsPromise
  $scope.loadVms = function() {
    requestsPromise = startRequests()
    requestsPromise.then(buildLegend)

    //When the vm list is loaded, wait for all tis data to be loaded, and trigger filterData in case user was saerching for i.e. hypervisor name
    requestsPromise.then(whenAllDataIsLoaded)['finally'](filterData)
  }

  $scope.loadVms()
  auth.userPromise().then(function() {

    var priorOrderBy = auth.currentUser().mdata('vms_orderBy'),
        defaultOrder = priorOrderBy? JSON.parse(priorOrderBy): {'config.alias': 'desc'}

    $scope.tableParams.sorting(defaultOrder)
    $scope.searchQuery = auth.currentUser().mdata('vm_searchQuery');
  })
  });
