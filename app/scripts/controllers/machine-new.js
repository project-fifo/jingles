'use strict';

angular.module('fifoApp').controller('MachineNewCtrl', function ($scope, wiggle, $location, status, auth, $q) {
  $scope.working = 'data-missing';
  function check_creation() {
    $scope.working = 'pending';
    var Package = $scope.selectedPackage;
    var Dataset = $scope.selectedDataset;
    var Networks = $scope.selectedNetworks;
    console.log("package:", Package);
    console.log("datset:", Dataset);
    console.log("network:", Networks);
    if(! Package || ! Dataset || Networks.lenght == 0) {
      console.log("early failure");
      $scope.working = 'data-missing';
      return;
    }
    if ($scope.selectedNetworks.length != $scope.selectedDataset.networks.length) {
      status.error('Your network selection is invalid. ' +
                   'You have either too many or too few networks selected.');
      console.log("failure");
      $scope.working = 'data-missing';
      return;
    };
    var rules = $scope.rules.slice(0);
    if ($scope.server)
      rules.push({weight: 'must', attribute: 'uuid', condition: '=:=', value: $scope.server.uuid})

    var vm = {
      package: $scope.selectedPackage.uuid,
      dataset: $scope.selectedDataset.uuid,
      config: {
        networks: {},
        metadata: {},
        alias: $scope.alias,
        hostname: $scope.hostname.replace(/ /g, '-'),
        ssh_keys: $scope.ssh_keys,
        requirements: $scope.rules,
        autoboot: $scope.autoboot
      }
    }


    if ($scope.selectedCluster) {
      vm.config.grouping = $scope.selectedCluster.uuid;
    }

    for (var i=0; i<$scope.selectedNetworks.length; i++) {
      vm.config.networks['net' + i] = $scope.selectedNetworks[i].uuid
    }

    console.log(vm);
    wiggle.vms.put(
      {id: "dry_run"}, vm, function success() {
        $scope.working = 'good';
        console.log("success");
      }, function error(){
        $scope.working = 'bad';
        console.log("failure");
      });

  }

  wiggle.groupings.query(function(res) {
    $scope.clusters = res.filter(function (e) {
      // VM's can only join cluster groupings.
      return e.type == "cluster";
    });
    console.log($scope.clusters);
  });

  $scope.add_cluster = function() {
    var name;
    if (name = window.prompt("Cluster name")) {
      console.log(name);
      new wiggle.groupings({name: name, type: "cluster"}).
        $save().then(function ok(res) {
          $scope.clusters.push(res);
          $scope.selectedCluster = res;
          check_creation();
        }, function err(res) {
          console.log("err:", res);
        })
    }

  }

  $scope.create_machine = function() {
    if ($scope.selectedNetworks.length != $scope.selectedDataset.networks.length) {
      status.error('Your network selection is invalid. ' +
                   'You have either too many or too few networks selected.');
      return;
    };

    //Add selected server to the rules array
    if ($scope.server)
      $scope.rules.push({weight: 'must', attribute: 'uuid', condition: '=:=', value: $scope.server.uuid})

    var vm = {
      package: $scope.selectedPackage.uuid,
      dataset: $scope.selectedDataset.uuid,
      config: {
        networks: {},
        metadata: {},
        alias: $scope.alias,
        hostname: $scope.hostname,
        ssh_keys: $scope.ssh_keys,
        requirements: $scope.rules,
        autoboot: $scope.autoboot
      }
    }

    if ($scope.selectedCluster) {
      vm.config.grouping = $scope.selectedCluster.uuid;
    }

    //Passwords
    $scope.passwords.forEach(function(user) {
      if (user.pass)
        vm.config[ user.name + '_pw'] = user.pass
    })

    for (var i=0; i<$scope.selectedNetworks.length; i++) {
      vm.config.networks['net' + i] = $scope.selectedNetworks[i].uuid
    }

    if ($scope.resolver1)
      vm.config.resolvers = [$scope.resolver1];
    if ($scope.resolver2)
      vm.config.resolvers.push($scope.resolver2)

    if ($scope.userScript)
      vm.config.metadata['user-script'] = $scope.userScript

    $scope.metadata.forEach(function(h) {
      vm.config.metadata[h.key] = h.value;
    })

    //Check if use wants more than 1 vm:
    var match = $scope.alias.match(/\{(\d+)-(\d+)\}/)
    if (match) {
      var from = Math.min(match[1], match[2]),
          to = Math.max(match[1], match[2])

      var calls = []
      for (var i=from; i<=to; i++) {
        var vmResource = new wiggle.vms(angular.copy(vm))
        vmResource.config.alias = vm.config.alias.replace(match[0], i)
        vmResource.config.hostname = vmResource.config.alias
        calls.push(vmResource.$save())
      }

      $q.all(calls).then(
        function ok(res) {
          res.forEach(function(item) {
            howl.join(item.uuid)
          })
          $location.path('/machines')
        },
        function error(res) {
          console.error('Create VMs error:', res)
          status.error('There was an error creating your VMs. See their logs or js console for details.')
        })
    }
    else
      //Just 1 VM
      new wiggle.vms(vm).$save().then(
        function ok(res){
          howl.join(res.uuid)
          $location.path('/machines')
        },
        function err(){
          console.error('Create VM error:', res)
          status.error('There was an error creating your VM. See its logs or js console for details.')
        }
      )
  }

  $scope.click_package = function(pkg) {
    $scope.selectedPackage = pkg
    check_creation();
  }

  $scope.click_cluster = function(cluster) {
    if ($scope.selectedCluster && cluster.uuid == $scope.selectedCluster.uuid) {
      $scope.selectedCluster = null;
    } else {
      $scope.selectedCluster = cluster;
    }
    check_creation();
  }

  $scope.click_dataset = function(dataset) {

    /* Put a default machine alias name */
    if (!$scope.alias || ($scope.selectedDataset && $scope.alias == $scope.selectedDataset.name))
      $scope.alias = dataset.name

    $scope.selectedDataset = dataset

    $scope.passwords = dataset.users || [{name: 'root'}, {name: 'admin'}]
    check_creation();

  }

  $scope.click_network = function(network) {
    var idx = $scope.selectedNetworks.indexOf(network)

    /* Toggle off */
    if (idx>-1)
      return $scope.selectedNetworks.splice(idx, 1)

    /* Limit nr of selected networks based on the database nr of networks */
    if ($scope.selectedNetworks.length >= $scope.selectedDataset.networks.length)
      $scope.selectedNetworks.splice(idx, 1)

    $scope.selectedNetworks.push(network)
    check_creation();
  }

  $scope.metadata = []
  $scope.meta_action = function(action, idx) {
    switch (action) {
    case 'delete':
      $scope.metadata.splice(idx, 1)
      break;

    case 'create':
      status.prompt('Enter metadata key:', function(txt) {
        $scope.metadata.push({key: txt})
        $scope.$apply()
      })
      break;
    }
  }

  $scope.init = function() {

    $scope.datasets = []
    $scope.packages = []
    $scope.networks = []
    $scope.rules = [{}]
    $scope.autoboot = true
    $scope.user = auth.currentUser()

    /* Get the latest version of a dataset */
    $scope.latestDatasets = {}

    wiggle.datasets.query(function(datasets) {

      if (datasets.length<1) {
        status.error('Import a dataset first');
        return $location.path('/datasets')
      }

      datasets.forEach(function(dataset) {
        if (dataset.imported != 1) return;

        if (!$scope.latestDatasets[dataset.name] || $scope.latestDatasets[dataset.name] < dataset.version)
          $scope.latestDatasets[dataset.name] = dataset.version

        $scope.datasets.push(dataset)
      })
    })

    wiggle.packages.query(function(packages) {

      if (packages.length<1) {
        status.error('Please create a package');
        return $location.path('/configuration/packages/new')
      }

      $scope.packages = packages;
      $scope.selectedPackage = packages[0];
    })

    wiggle.networks.query(function(networks) {

      if (networks.length<1) {
        status.error('Please create a network');
        return $location.path('/configuration/networks/new')
      }

      networks.forEach(function(network) {
        //If no iprange is asosiated with the network, ignore it.
        if (!network.ipranges || network.ipranges.length < 1) return;
        $scope.networks.push(network)
      })

      if ($scope.networks.length < 1) {
        status.error('Please setup a network with an iprange')
        return $location.path('/configuration/networks')
      }
      $scope.selectedNetworks = [$scope.networks[0]]

    })

    $scope.servers = wiggle.hypervisors.query()

    $scope.$watch('alias', function(newVal, oldVal) {
      if (typeof newVal !== 'undefined' && (!$scope.hostname || $scope.hostname == oldVal.replace(/ /g, '-')))
        $scope.hostname = newVal.replace(/ /g, '-')
    })

  }

  $scope.init()

});
