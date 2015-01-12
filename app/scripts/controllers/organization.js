'use strict';
function init_scope($scope, org) {
    $scope.org = org;
    $scope.grant_triggers = {};
    $scope.join_triggers = {};
    var source = org.triggers || {};
    for (var k in source) {
        if (!source.hasOwnProperty(k)) return;
        var t = source[k];
        var a = t.action;
        t.uuid = k;
        if (a == "role_grant" || a == "user_grant") {
            $scope.grant_triggers[k]= t;
        } else if (a == "join_org" || a == "join_role") {
            $scope.join_triggers[k]= t;
        }
    };
    return $scope;
};

angular.module('fifoApp')
  .controller('OrganizationCtrl', function ($scope, $routeParams, $location, wiggle, vmService, status, breadcrumbs, $cacheFactory) {

    $scope.role = "";
    $scope.permission = "";
    $scope.grant_triggers = {};
    $scope.join_triggers = {};
    var uuid = $routeParams.uuid;

    $scope.roles = {}
    wiggle.roles.query(function(grps) {
        grps.forEach(function(grp) {
            $scope.roles[grp.uuid] = grp;
        });
    });

    $scope.orgs = {}
    wiggle.orgs.query(function(orgs) {
        orgs.forEach(function(org) {
            $scope.orgs[org.uuid] = org;
        });
    });

    wiggle.orgs.get({id: uuid}, function(res) {
        breadcrumbs.setLast(res.name)
        init_scope($scope, res)
    });

    $scope.add_grant_trigger = function() {
        var base;
        var event = $scope.created_object;
        if (event == "vm_create") {
            base = "vms";
        } else if (event == "dataset_create") {
            base = "datasets"
        } else {
            console.error("No target selected");
            return;
        }
        wiggle.orgs.create({
            id: uuid,
            controller: "triggers",
            controller_id: event
        }, {
            action: "role_grant",
            base: base,
            permission: [$scope.permission],
            target: $scope.grant_role
        }, function success(res) {
            init_scope($scope, res)
        });
    };

    $scope.delete_grant_trigger = function(trigger) {
        var permission = trigger.permission.splice(0);
        var role = trigger.target;
        var base = permission.shift();
        permission.shift();
        wiggle.orgs.delete({
            id: $scope.org.uuid,
            controller: "triggers",
            controller_id: trigger.uuid
        }, {
        }, function success(res) {
            wiggle.orgs.get({id: uuid}, function(res) {
                init_scope($scope, res)
            });
        });
    };


    $scope.add_role_join_trigger = function() {
        wiggle.orgs.create({
            id: uuid,
            controller: "triggers",
            controller_id: "user_create"
        }, {
            action: "join_role",
            target: $scope.join_role
        }, function success(res) {
            init_scope($scope, res);
        });

    };

    $scope.add_org_join_trigger = function() {
        wiggle.orgs.create({
            id: uuid,
            controller: "triggers",
            controller_id: "user_create"
        }, {
            action: "join_org",
            target: $scope.join_org
        }, function success(res) {
            init_scope($scope, res);
        });
    };

    $scope.delete_join_trigger = function(trigger) {
        wiggle.orgs.delete({
            id: $scope.org.uuid,
            controller: "triggers",
            controller_id: trigger.uuid
        }, {
        }, function success(res) {

            //Lets clean the cache before asking for the org...
            var c = $cacheFactory.get('org')
            c.removeAll()

            wiggle.orgs.get({id: uuid}, function(res) {
                init_scope($scope, res)
            });
        });
    };


    $scope.delete = function() {
        var name = $scope.org.name;
        var uuid = $scope.org.uuid;
        $scope.modal = {
            btnClass: 'btn-danger',
            confirm: 'Delete',
            title: 'Confirm VM Deletion',
            body: '<p><font color="red">Warning!</font> you are about to delete the Org <b id="delete-uuid">' + name + " (" + uuid + ") </b> Are you 100% sure you really want to do this?</p><p>Clicking on Delete here will mean this Org is gone forever!</p>",
            ok: function() {
            	wiggle.orgs.delete({id: uuid},
                               function success(data, h) {
                                   status.success(name + ' deleted');
                                   $location.path('/configuration/organizations')
                               },
                               function error(data) {
                                   console.error('Delete Org error:', data);
                                   status.error('There was an error deleting your org. See the javascript console.');
                               });
            }
        }
    };

  });
