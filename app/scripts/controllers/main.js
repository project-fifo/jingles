'use strict';

angular.module('fifoApp')
  .controller('MainCtrl', function ($scope, wiggle, auth) {
    $scope.has_s3 = true;
    $scope.msgTrClass = function(type) {
      return type == 'critical' ? 'danger': type;
    }

    $scope.adjustMessage = Config.adjustMessage

    auth.userPromise().then(function() {
      $scope.user = auth.currentUser()
      $scope.keys = Object.keys($scope.user.keys).length
      if ($scope.user.org)
        $scope.activeOrg = wiggle.orgs.get({id: $scope.user.org})
    })

    /* Update data on memory change */
    $scope.$on('memorychange', $scope.show);

  });
