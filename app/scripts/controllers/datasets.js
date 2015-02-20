'use strict';

angular.module('fifoApp')
  .controller('DatasetsCtrl', function ($scope, wiggle, datasetsat, status, $upload, auth, $rootScope) {

    $scope.datasetsat = {};
    $scope.datasets = {};
    $scope.endpoint = Config.datasets;

    var _uuid = function() {
      function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
      }
      return _p8() + _p8(true) + _p8(true) + _p8();
    }

    $scope.import = function(uuid) {
      var url = $scope.url
      if (uuid)
        url = datasetsat.endpoint + '/datasets/' + uuid;

      wiggle.datasets.import({}, {url: url},
                             function success(r) {
                               howl.join(uuid);
                               $scope.datasets[uuid] = r;
                               status.info('Importing ' + r.name + ' ' + r.version)
                               if ($scope.datasetsat[uuid])
                                 $scope.datasetsat[uuid].imported = true;
                             },
                             function error(e) {
                               status.error('Could not import dataset')
                               console.error(e)
                             });
    };

    $scope.delete = function(dataset) {

      $scope.modal = {
        btnClass: 'btn-danger',
        confirm: 'Delete',
        title: 'Confirm Dataset Deletion',
        body: '<p><font color="red">Warning!</font> you are about to delete dataset <b>' +
          dataset.name + " v" + dataset.version + " (" + dataset.uuid + ")</b> Are you 100% sure you really want to do this?</p>",
        ok: function() {
          wiggle.datasets.delete({id: dataset.uuid},
                                 function success() {
                                   delete $scope.datasets[dataset.uuid]
                                   status.success('Dataset deleted.')

                                   /* Search the remote dataset element, and set it as not imported. */
                                   var remoteDs = $scope.datasetsat[dataset.uuid]
                                   if (remoteDs)
                                     remoteDs.imported = false;
                                 },
                                 function error(e) {
                                   status.error('Could not delete Dataset')
                                 }
                                )
        }
      }
    }

    $scope.$on('progress', function(e, msg) {
      $scope.$apply(function() {
        var imp = msg.message.data.imported
        $scope.datasets[msg.channel].imported = imp

        //Howl currently does not send the status, so set it here.
        if (imp === 1)
          $scope.datasets[msg.channel].status = 'imported'
        else
          $scope.datasets[msg.channel].status = 'importing'

      });
    })

    var processDataset = function(dataset) {

      var id = dataset.uuid;
      howl.join(id)

      //Datasets imported with previouse fifo (i.e. prev than 20131212T153143Z) does not has the status field, artificially add one.
      if (!dataset.status) {
        if (dataset.imported === 1)
          dataset.status = 'imported'
        else
          dataset.status = 'pending'
      }
      $scope.datasets[id] = dataset
    }

    var loadRemoteDatasets = function() {

      if (!Config.datasets)
        return status.error('Make sure your config has an URL for the remote datasets')

      if ($rootScope.cloudStatus.metrics.storage != 's3')
        return $scope.no_s3 = true

      /* Get the available datasets */
      $scope.loadingRemoteDatasets = true
      datasetsat.datasets.query(function ok(data) {
        data.forEach(function(e) {
          var localOne = $scope.datasets[e.uuid];
          e.imported = localOne && localOne.imported && localOne.imported > 0 || false
          $scope.datasetsat[e.uuid] = e
        })
        $scope.loadingRemoteDatasets = false
      }, function nk(res) {
        status.error('Could not load remote datasets ' + res.status)
        console.error(res)
        $scope.loadingRemoteDatasets = false
      });

    }


    wiggle.datasets.query(function(datasets) {

      datasets.forEach(processDataset)

      //Load the remote available datasets after the local ones are loaded, and after the user has logged in, so we can see if store == s3.
      auth.userPromise().then(function() {
        loadRemoteDatasets()
      })

    })



    // $scope.uploader = $fileUploader.create({
    //     url: 'unknown_url',
    //     // headers: {
    //         // 'Content-Type': 'application/x-www-form-urlencoded'
    //     // },
    //     filters: [
    //         function(item) {
    //             return item.type == 'application/json' || item.type == 'application/x-gzip'
    //         }
    //     ]
    // })

    // var uploader = $scope.uploader,
    // var uuid = _uuid()

    // uuid = 'cec0e6ff-a1ca-33e5-8d2f-9b3bb4ebf871'

    // $scope.onFileSelect = function(files) {
    //   var file = files[0]

    //   //Read the file.
    //   var fr = new FileReader();

    //   fr.onprogress = function(ev) {
    //     console.log(100 * ev.loaded / ev.total)
    //   }
    //   fr.onload = function() {
    //     // $scope.manifest = fr.result
    //     // $scope.$apply()

    //     console.log('ONLOAD!!')
    //     //Upload
    //     // var url = Config.endpoint + 'datasets/' + uuid
    //     var url = Config.endpoint + 'datasets/' + uuid + '/datassetss.tar.gz'
    //     // url = 'http://localhost:7777' + url
    //     var prom = $upload.http({
    //       url: url,
    //       headers: {
    //         'Content-Type': file.type
    //       },
    //       data: fr.result
    //     })

    //     prom.then(function(res) {
    //       console.log('---> RES', res)
    //     }, null, function(evt) {
    //       console.log('--> EVT:', evt.loaded, evt.total, parseInt(100.0 * evt.loaded / evt.total))
    //     })

    //   }
    //   // fr.readAsText(file)
    //   fr.readAsArrayBuffer(file)
    //   // fr.readAsBinaryString(file)
    //   // readAsDataURL
    //   console.log('subiendo esto...', file)

    // }

    // uploader.bind('afteraddingfile', function (event, item) {
    //     console.log('After adding file', item.file.type, item)

    //     var mime = item.file.type
    //     if (mime == 'application/json')
    //         item.url = Config.endpoint + 'datasets/' + uuid + '/dataset.tar.gz'
    //     if (mime == 'application/x-gzip')
    //         item.url = Config.endpoint + 'datasets/' + uuid


    //     if (mime != 'application/json') return;

    //     var fr = new FileReader();
    //     fr.onload = function() {
    //         $scope.manifest = fr.result
    //         $scope.$apply()
    //     }
    //     fr.readAsText(item.file)

    // })

    // uploader.bind('completeall', function (event, items) {

    //     var failed = items.filter(function(i) {
    //         return !i.isSuccess;
    //     })
    //     if (failed.length) {
    //         status.info('Could not upload the dataset. Please try again.')
    //     }

    //     $scope.uploader.clearQueue();
    // });

    // uploader.bind('error', function (event, xhr, item, response) {
    //     status.error('Could not upload ' + item.file.name + ': ' + (response || xhr.statusText))
    // });


  });
