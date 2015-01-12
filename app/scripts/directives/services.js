'use strict';

angular.module('fifoApp')
  .directive('services', function () {
    return {
      templateUrl: '/views/partials/services.html',
      restrict: 'E',
      controller: function servicesController($scope) {
        var prio_map = {
            maintainance: 4,
            degraded: 3,
            online: 2,
            legacy_run: 1
        }
        $scope.mk_service = function(service, state) {
            return {
                service: service,
                state: state,
                priority: prio_map[state] || 0
            }
        }
        $scope.mk_services = function(srvs) {
            for (var k in srvs) {
                $scope.services[k] = $scope.mk_service(k, srvs[k]);
            }
        };
      },

      scope: {
        ngModel: '=',
        showDisabled: '=', //could be watched and saved in a metadata.
        action: '&',
        channel: '='
      },

      link: function postLink(scope, element, attrs) {

        scope.show_actions = attrs.action

        //Wait until we get the services data.
        scope.$watch('ngModel', function(model, old) {
            if (!model || model == old) return;

            scope.services = {}
            scope.mk_services(model);

            //What channel to listen to.
            var channel = scope.channel
            channel && scope.$on('services', function(e, msg) {
                if (msg.channel != channel) return;

                scope.mk_services(msg.message.data);
                scope.$apply();
            });


        })

      }
    };
  });
