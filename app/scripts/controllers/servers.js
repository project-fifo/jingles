'use strict';

angular.module('fifoApp')
  .controller('ServersCtrl', function ($scope, wiggle, status) {

    $scope.hypervisors = wiggle.hypervisors.queryFull()

    //Lets search for server problems.
    $scope.problems = {}
    $scope.$watch('cloudStatus', function(val) {
        if (!val || !val.messages)
            return

        $scope.problems = {}
        val.messages.map(function(msg) {
            $scope.problems[msg.element] = msg.message
        })
    }, true)

    $scope.$on('memorychange', function(e, msg) {
        $scope.hypervisors.hash[msg.channel]['free-memory']        = msg.message.data.free
        $scope.hypervisors.hash[msg.channel]['provisioned-memory'] = msg.message.data.provisioned
        $scope.$apply()
    })

  });
