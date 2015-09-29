'use strict';

angular.module('fifoApp')
.factory('auth', function ($rootScope, wiggle, $location, $route, $http, $cookies, howl, $q) {

    var user
    var userLoggedDefer = $q.defer()

    function _canAcess(elementPerm, userPerm) {
      var ret = true;

      for (var i=0; i<elementPerm.length; i++) {
        var usPerm = userPerm[i],
          elPerm = elementPerm[i]

        if (usPerm == '...') return true //admin
        if (usPerm == '_') continue; //everything
        if (usPerm != elPerm) {
          ret = false;
          break;
        }

      }
      return ret;
    }

    var auth = {

      canAccess: function(elementPerm) {

        if (!user) return false
        var perms = user.permissions || []

        //Add the roles permissions
        Object.keys(user._roles).forEach(function(k) {
          var r = user._roles[k] || {};
          perms = perms.concat(r.permissions || [])
        })

        for (var i=0; i<perms.length; i++) {
          if (_canAcess(elementPerm, perms[i]))
            return true
        }
        return false
      },

      currentUser: function() {
        return user
      },

      isLogged: function() {
        return !!user
      },

      userPromise: function() {
        return userLoggedDefer.promise
      },

      login: function (_user, _pass, _otp) {
        var o = {user: _user, password: _pass};
        if (_otp) {
            o.otp = _otp
        }
        wiggle.sessions.login(null, o).$promise.then(

          function success(res) {

            /* Create a user object based on the sessionData, so later we can use loggedUser.mdata_set */
            user = new wiggle.users(res)
            user.keys = user.keys || []
            user.roles = user.roles || []

            // console.log('seteando el cookie...', $cookies, res)

            //We dont want cookies, becouse pointing to a different datacenter requires to change the endpoint, cannot save cookies on different endpoints.
            //But we will use it anyway to read the value and store it on wiggle headers calls. Localstorage would work also...
            $cookies["x-snarl-token"] = res.session

            $rootScope.$broadcast('auth:login_ok', user, res.session)
            $location.path('/')
          },

          function error(res) {
            $rootScope.$broadcast('auth:login_error', res)
          }

        )
      },

      logout: function() {
        user = null;

        var token = $cookies["x-snarl-token"]
        if (token) {
          wiggle.sessions.delete({id: token})
          delete $cookies["x-snarl-token"]

        }

        $rootScope.$broadcast('auth:logout')
        $location.path('/login')
        return;
      }
    };

    /* Watch for url changes and check if is logged */
    function checkIfLogged() {

      if (!auth.isLogged()) {

        //Chances are that session.get takes more time that the first change of route, so set a temporary user object
        user = new wiggle.users({status: 'waiting for login validation'})

        var token = $cookies["x-snarl-token"]
        // console.log('checkIfLogged', token)
        if (!token)
          return $rootScope.$broadcast('auth:login_needed')

        //Check if the current token is valid.
        wiggle.sessions.get({id: token}).$promise.then(
          function ok(res) {
            user = new wiggle.users(res)
            $rootScope.$broadcast('auth:login_ok', user, res.data)
        }, function error(res) {
            $rootScope.$broadcast('auth:login_needed')
        })
      }
    }

    $rootScope.$on('$routeChangeSuccess', function(ev, curr, prev) {
      //On first load, prev will be undefined.

      // console.log(prev && prev.$$route.controller, '->', curr.$$route.controller, ev)
      checkIfLogged()
    })

    /* Separate the login check from the action taken: listen for auth events and do something */
    $rootScope.$on('auth:login_needed', function() {
      if ($location != '/login')
        auth.logout()
    })

    //Connect to howl, when use logs in.
    $rootScope.$on('auth:login_ok', function() {

      userLoggedDefer.resolve(user)
      wiggle.setUp(); //Setup the token in the headers.

      /* Pass the token to autenticate, and a list of vms to monitor */
      if ('WebSocket' in window) {

        wiggle.vms.list(function(vms) {
          $rootScope.vmsCount = vms.length
          howl.join(vms)
        })

        wiggle.hypervisors.list(function(hypers) {
          $rootScope.hypersCount = hypers.length
          howl.join(hypers)
        })

        howl.connect($cookies["x-snarl-token"])
      }

    })

    //When loading /#/ changeRoute does not trigger so trigger it anyway.
    checkIfLogged()
    return auth;
  });
