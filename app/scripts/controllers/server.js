'use strict';

angular.module('fifoApp')
    .controller('ServerCtrl', function ($scope, $routeParams, $location, utils, wiggle, vmService, status, breadcrumbs) {

        $scope.grafana = Config.grafana;
        var uuid = $routeParams.uuid;
        $scope.characteristics = [];

        var size = 30;
        var usr = [];
        var sys = [];
        for (var i = 0; i <= size; i++) {
            usr.push(0);
            sys.push(0);
        }
        var cpu_chart = new MetricsGraph("cpuusage", {
            unit:"%",
            size: 60,
            type: "percentage",
            min: 0,
            max: 100,
            series: [
                {options: {
                    color: "#FFA455",
                    label: "system"}},
                {options: {
                    color: "#69B3E4",
                    label: "user"}},
                {options: {
                    color: "#B6E7AC",
                    label: "idle"}},
            ]});


        howl.join(uuid + '-metrics');

        $scope.$on('$destroy', function() {
            howl.leave(uuid + '-metrics');
        });

        $scope.$on('mpstat', function(e, msg) {
            var data = msg.message.data;
            var usrv = 0, sysv = 0, idlv = 0, cnt = 0;
            msg.message.data.forEach(function(o) {
                usrv = usrv + o.user;
                sysv = sysv + o.kernel;
                idlv = idlv + o.idle;
                cnt = cnt + 1
            });
            cpu_chart.add([sysv/cnt, usrv/cnt, idlv/cnt])
        });

        $scope.add = function() {
            status.prompt('Enter the key of the new characteristic:', function(key) {
                $scope.characteristics.push({
                    name: key,
                    value: ''
                })
                $scope.$apply()
            })
        }

        $scope.confirm_delete = function(server) {
            $scope.modal = {
                title: 'Confirm Hypervisor Deletion',
                btnClass: 'btn-danger',
                confirm: 'Delete',
                body: '<p><font color="red">Warning!</font> you are about to delete the server <b id="delete-uuid">' + server.uuid + " (" + server.alias + ")</b> Are you 100% sure you really want to do this?</p><p>Clicking on Delete here will mean this server is gone and all the VM's on it are marked as migratable as long as they have a full backup! It is possible for the server to re-register at a later stage.</p>",
                ok: function() {
                    wiggle.hypervisors.delete({id: server.uuid}, function() {
                        $location.path('/servers')
                    })
                }
            }
        }


        $scope.del = function(key, idx) {
            wiggle.hypervisors.delete({id: uuid, controller: 'characteristics', controller_id: key}, function() {
                $scope.characteristics.splice(idx, 1);
            })
        }

        $scope.save = function() {
            $scope.characteristics.forEach(function(i) {
                var data = {}
                data[i.name] = i.value

                wiggle.hypervisors.put(
                    {id: uuid, controller: 'characteristics'},
                    data
                )
            })
        }

        $scope.$watch('characteristics', function(newArr, oldArr) {

            if (oldArr.length<1) return

            arrayDiff(newArr, oldArr).forEach(function(changed) {
                var hash = {}
                hash[changed.name] = utils.deserialize(changed.value)
                wiggle.hypervisors.put({id: uuid, controller: 'characteristics'}, hash)
            })

        }, true)

        //Return the difference between 2 arrays
        var arrayDiff = function(newArr, oldArr) {
            var idx = 0;
            return newArr.filter(function(i){

                var newVal = newArr[idx],
                oldVal = oldArr[idx]

                idx++
                if (!oldVal) return true

                return newVal.value != oldVal.value
            })
        }

        $scope.saveAlias = function(alias) {
            wiggle.hypervisors.put({id: $scope.hyper.uuid, controller: 'config'}, {alias: alias},
                                   function success() {
                                       status.info('Server name changed.')
                                       $scope.hyper.alias = alias
                                   },
                                   function error() {
                                       status.error('Could not change server name')
                                   }
                                  )
        }


        $scope.notes = []
        $scope.note = function(action, idx) {

            switch(action) {

            case 'create':
                status.prompt('Enter your note:', function(txt) {

                    $scope.notes.splice(0, 0, {text: txt, created_at: new Date()})
                    $scope.hyper.mdata_set({notes: $scope.notes}, function() {
                        status.success('Note created')
                    }, function err() {
                        status.error('Could not save note')
                        $scope.notes.splice(1)
                    })

                })
                break;

            case 'delete':
                $scope.notes.splice(idx, 1)
                $scope.hyper.mdata_set({notes: $scope.notes}, function() {
                    status.success('Note deleted')
                })

                break;
            }
        }

        $scope.service_action = function(action, service) {
            wiggle.hypervisors.put(
                {id: $scope.hyper.uuid, controller: 'services'},
                {'action': action, 'service': service},
                function res(r) {
                    status.info(action + ' action sent to service ' + service.split('/').pop())
                },
                function err(r) {
                    status.error('Could not send action ' + action + ' to service ' + service.split('/').pop())
                });
        }


        var init = function() {
            wiggle.hypervisors.get({id: uuid}, function(res) {
                $scope.hyper = res;
                breadcrumbs.setLast(res.alias)
                $scope.new_alias = res.alias;
                if (res.characteristics) {
                    Object.keys(res.characteristics).forEach(function(k) {
                        $scope.characteristics.push({name: k, value: res.characteristics[k]})
                    })
                }

                var _notes = $scope.hyper.mdata('notes') && $scope.hyper.mdata('notes').sort(function(a,b) { return a.created_at >= b.created_at; })
                $scope.notes = _notes? _notes.reverse() : []

                //Services
                $scope.show_disabled_services = $scope.hyper.mdata('show_disabled_services') || false;
                $scope.$watch('show_disabled_services', function(val) {
                    $scope.hyper.mdata_set({show_disabled_services: $scope.show_disabled_services})
                });
            });
        }

        // $scope.$on('user_login', init)
        // if (user.logged()) init()
        init();
    });
