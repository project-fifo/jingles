'use strict';

var wait = {
  forUserLogin: ['auth', function(auth) {
    return auth.userPromise()
  }]
}

function help_url(page, section) {
    return "https://docs.project-fifo.net/jingles/" + page +".html#" + section;
}

angular.module('fifoApp',
  ['ngRoute', 'ngAnimate', 'ngResource','services.breadcrumbs',
  'gettext', 'infinite-scroll', 'ngTable', 'angularMoment', 'ngSanitize', 'ngCookies', 'angularFileUpload'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        helpUrl: help_url('general', 'dashboard'),
        resolve: wait
      })
      .when('/machines', {
        templateUrl: 'views/machines.html',
        controller: 'MachinesCtrl',
        helpUrl: help_url('machines', 'list'),
        name: 'Machines',
        resolve: wait
      })
      .when('/groupings', {
        templateUrl: 'views/groupings.html',
        controller: 'GroupingsCtrl',
        helpUrl: help_url('groupings', 'list'),
        name: 'Stacks & Clusters',
        resolve: wait
      })
      .when('/datasets', {
        templateUrl: 'views/datasets.html',
        controller: 'DatasetsCtrl',
        helpUrl: help_url('datasets', 'installed'),
        name: 'Datasets'
      })
      .when('/servers', {
        templateUrl: 'views/servers.html',
        controller: 'ServersCtrl',
        helpUrl: help_url('hypervisors', 'list'),
        name: 'Servers'
      })
      .when('/servers/topology', {
        templateUrl: 'views/topology.html',
        controller: 'TopologyCtrl',
        helpUrl: help_url('hypervisors', 'topology')
      })
      .when('/configuration/networks/new', {
        templateUrl: 'views/network-new.html',
        controller: 'NetworkNewCtrl',
        helpUrl: help_url('network', 'new')
      })
      .when('/machines/new', {
        templateUrl: 'views/machine-new.html',
        controller: 'MachineNewCtrl',
        helpUrl: help_url('machines', 'new')
      })
      .when('/machines/:uuid', {
        templateUrl: 'views/machine.html',
        controller: 'MachineCtrl',
        helpUrl: help_url('machines', 'details')
      })
      .when('/datasets/:uuid', {
        templateUrl: 'views/dataset.html',
        helpUrl: help_url('datasets', 'details'),
        controller: 'DatasetCtrl',
      })
      .when('/servers/:uuid', {
        templateUrl: 'views/server.html',
        helpUrl: help_url('hypervisors', 'details'),
        controller: 'ServerCtrl'
      })
      .when('/configuration/packages/new', {
        templateUrl: 'views/package-new.html',
        helpUrl: help_url('packages', 'new'),
        controller: 'PackageNewCtrl'
      })
      .when('/configuration/packages/:uuid', {
        templateUrl: 'views/package.html',
        helpUrl: help_url('packages', 'details'),
        controller: 'PackageCtrl'
      })
      .when('/configuration/networks/:uuid', {
        templateUrl: 'views/network.html',
        helpUrl: help_url('network', 'details'),
        controller: 'NetworkCtrl'
      })
      .when('/configuration/users/new', {
        templateUrl: 'views/user-new.html',
        helpUrl:  help_url('usermanagement', 'user-new'),
        controller: 'UserNewCtrl'
      })
      .when('/configuration/users/:uuid', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        helpUrl:  help_url('usermanagement', 'user-details')
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        helpUrl:  help_url('general', 'about'),
        controller: 'AboutCtrl'
      })
      .when('/configuration/roles/new', {
        templateUrl: 'views/role-new.html',
        helpUrl:  help_url('usermanagement', 'role-new'),
        controller: 'RoleNewCtrl'
      })
      .when('/configuration/roles/:uuid', {
        templateUrl: 'views/role.html',
        helpUrl:  help_url('usermanagement', 'role-details'),
        controller: 'RoleCtrl'
      })
      .when('/configuration/organizations/new', {
        templateUrl: 'views/organization-new.html',
        helpUrl:  help_url('orgs', 'create'),
        controller: 'OrganizationNewCtrl'
      })
      .when('/configuration/organizations/:uuid', {
        templateUrl: 'views/organization.html',
        helpUrl:  help_url('orgs', 'details'),
        controller: 'OrganizationCtrl'
      })
      .when('/configuration/dtraces/new', {
        templateUrl: 'views/dtrace-new.html',
        helpUrl:  help_url('dtraces', 'new'),
        controller: 'DtraceNewCtrl'
      })
      .when('/configuration/dtraces/:uuid', {
        templateUrl: 'views/dtrace.html',
        helpUrl:  help_url('dtraces', 'details'),
        controller: 'DtraceCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        helpUrl:  help_url('general', 'login'),
        controller: 'LoginCtrl',
      })
      .when('/configuration/ip-ranges/new', {
        templateUrl: 'views/ip-range-new.html',
        helpUrl: help_url('ipranges', 'new'),
        controller: 'IpRangeNewCtrl'
      })
      .when('/visualizations/graph', {
        templateUrl: 'views/vis-graph.html',
        helpUrl:  help_url('general', 'cloudview'),
        controller: 'VisGraphCtrl'
      })

      //Links of the breadscumbs
      .when('/configuration/users', {
        redirectTo: '/configuration/users_roles'
      })
      .when('/configuration/roles', {
        redirectTo: '/configuration/users_roles'
      })
      .when('/configuration/networks', {
              redirectTo: '/configuration/networking'
            })
      .when('/configuration/ip-ranges', {
              redirectTo: '/configuration/networking'
            })
      .when('/groupings/clusters', {
          redirectTo: '/groupings'
      })
      .when('/groupings/stacks', {
          redirectTo: '/stacs'
      })


      .when('/configuration/:target?', {
        templateUrl: 'views/configurations.html',
        controller: 'ConfigurationCtrl',
        helpUrl: help_url('configuration', 'list')
      })


      .otherwise({
        redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');
  })

.run(function($rootScope, gettextCatalog, gettext, $window, $templateCache, $interval, wiggle) {


  //Empty ng-table template for pagination
  $templateCache.put('ng-table/pager.html', '')

  function hasLang(lang) {
    return Object.keys(gettextCatalog.strings).indexOf(lang) > -1
  }

  function getKownLanguage() {
    var lang = window.navigator.userLanguage || window.navigator.language;

    if (hasLang(lang)) return lang;

    //Some browsers puts 'es-ES' on that vars, some just 'es'
    if (lang.indexOf('-') < 0)
      return 'en'

    lang = lang.split('-')
    if (hasLang(lang[0])) return lang[0]
    if (hasLang(lang[1])) return lang[1]
    return 'en'
  }

  gettextCatalog.currentLanguage = getKownLanguage();
  // gettextCatalog.debug = true;

  //Let bootstrap markup do its job.
  var preventHrefs = function() {
      //No idea why doesnt .preventDefault work on the functoin that has bootstrap.js.
      //Had to put it in here, to prevent the anchor to follow its href, on tabs and collapse's
      //Worked without this on jingles v1
      function prevent(e) {e.preventDefault()}
      $('[data-toggle=tab]').on('click', prevent);
      $('[data-toggle=collapse]').on('click', prevent);
  }

  $rootScope.$on('$routeChangeSuccess', function(ev, curr, prev) {
    //Adding preventHrefs at the end of the processing queue, so the translate directive has time to replace the element before this.
    //There should be a more elegant way to fix this. Ref: https://github.com/rubenv/angular-gettext/issues/24
    setTimeout(preventHrefs, 0)
  })


  //Watch for warnings in the cloud, globally
  $rootScope.cloudStatus = {}
  function getCloudStatus() {
    wiggle.cloud.get(function ok(data){

      //Add action link
      angular.forEach(data.warnings, function(w) {
          switch (w.category) {
              case 'chunter':
                  w.link = '#/servers/' + w.element
                  break;
          }
      })

      $rootScope.cloudStatus.metrics = data.metrics
      $rootScope.cloudStatus.messages = Config.evaluate_cloud(data.metrics).concat(data.warnings)
      $rootScope.cloudStatus.no_servers = data.metrics['total-memory'] == 0
      $rootScope.cloudStatus.cloud_ok = $rootScope.cloudStatus.messages.filter(function(i) {
          /* Msg from the server has no ok attr, so set it. */
          i.ok = !!i.ok;
          return !i.ok;
      }).length < 1

      //If there is no chunter, the cloud is not ok.
      if ($rootScope.cloudStatus.no_servers)
        $rootScope.cloudStatus.cloud_ok = false

    }, function nk(err) {
      console.error('Cloud status error:', err)
    })
  }

  $rootScope.$on('auth:login_ok', function() {
    $interval(getCloudStatus, (Config.statusPolling || 10) * 1000)
    getCloudStatus()
  })
})


//Turn off ngTable logs, (while waiting for https://github.com/esvit/ng-table/issues/134)
angular.module('fifoApp').config(function($logProvider) {
  $logProvider.debugEnabled(false);
});
