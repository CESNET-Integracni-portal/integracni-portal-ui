(function () {
    var hmmod = angular.module('home.module', ['services.module', 'utils.module', 'ui.uploader']);

    // route controller
    hmmod.controller('indexCtrl', function ($scope, $log, homeService, uiUploader) {
        var edit = false;
        var that = this;

        homeService.getAll().success(function (data) {
            $scope.home = {folders: data};
            $scope.home.breadcrumbs = [];
        });

        $scope.downloadFolder = function (folderId) {

            homeService.downloadFolder(folderId).success(function (data) {
                saveAs(data, folderId + ".zip");
            });
        };

        $scope.downloadFile = function (fileId) {
            homeService.downloadFile(fileId).success(function (data) {
                saveAs(data, fileId + ".zip");
            });
        };

//        $scope.setUpload = function () {
//            var element = document.getElementById('file1');
//            element.addEventListener('change', function (e) {
//                var files = e.target.files;
//                uiUploader.addFiles(files);
//                $scope.files = uiUploader.getFiles();
//                $scope.$apply();
//            });
//        };

        $scope.saveFolder = function (newFolder) {
            if (that.edit) {
                homeService.renameFolder(newFolder.id, newFolder.name).success(function (data) {
                    homeService.getAll().success(function (data) {
                        $scope.home = {folders: data};
                        $scope.home.breadcrumbs = [];
                    });
                });
                that.edit = false;
                that.reset();
            } else {
                homeService.createFolderInRoot(newFolder.name).success(function (data) {
                    $scope.home.folders.push(data);
                });
                that.reset();
            }
        };

        $scope.editFolder = function (folderId) {
            $scope.folder = homeService.getById(folderId).success(function (data) {
                $scope.folder = data;
            });
            that.edit = true;
        };

        $scope.deleteFolder = function (folderId) {
            homeService.deleteFolder(folderId).success(function (data) {
                homeService.getAll().success(function (data) {
                    $scope.home = {folders: data};
                    $scope.home.breadcrumbs = [];
                });
            });
        };
        
        $scope.deleteFile = function (fileId) {
            homeService.deleteFile(fileId).success(function(data){
                homeService.getAll().success(function (data){
                   $scope.home = {folders: data};
                   $scope.home.breadcrumbs = [];
                });
            });
        };

        $scope.favoriteFolder = function (folder) {
            var index = -1;
            for (i = 0; i < $scope.user.fasts.length; i++) {
                if ($scope.user.fasts[i].id === folder.id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                $scope.user.fasts.splice(index, 1);
            } else {
                var fast = {
                    id: folder.id,
                    name: folder.name,
                    uisref: "homeIterate({folderId:" + folder.id + "})"
                };
                $scope.user.fasts.push(fast);
            }
        };

        $scope.empty = function () {
            return (typeof $scope.home === 'undefined' || (typeof $scope.home.folders === 'undefined' || $scope.home.folders.length === 0) && (typeof $scope.home.files === 'undefined' || $scope.home.files.length === 0));
        };

//        $scope.uploadFile = function (file) {
//            $log.info('uploading...');
////            alert(JSON.stringify($scope.files[0]));
////            homeService.addFileToRoot($scope.files[0]).success(function(data){
////                alert("uploaded");
////            });
//            $log.info("file: " + file);
//            uiUploader.startUpload({
//                url: 'http://147.32.80.219:8080/integracni-portal/rest/v0.1/archive',
//                concurrency: 2,
//                onProgress: function (file) {
//                    $log.info(file.name + '=' + file.humanSize);
//                    $scope.$apply();
//                },
//                onCompleted: function (file, response) {
//                    $log.info(file + 'response' + response);
//                }
//            });
//        };

        this.reset = function () {
            $scope.folder = {};
            that.edit = false;
        };
        this.reset();
    });
    // route controller
    hmmod.controller('homeIterateCtrl', function ($scope, homeService, $stateParams, urlService) {
        var folderId = $stateParams.folderId;
        var that = this;
        var edit = false;

        homeService.getById(folderId).success(function (data) {
            $scope.home = data;
        });

        $scope.saveFolder = function (newFolder) {
            if (that.edit) {
                homeService.renameFolder(newFolder.id, newFolder.name).success(function (data) {
                    homeService.getAll().success(function (data) {
                        $scope.home = {folders: data};
                        $scope.home.breadcrumbs = [];
                    });
                });
                that.edit = false;
                that.reset();
            } else {
                homeService.createFolder(folderId, newFolder.name).success(function (data) {
                    $scope.home.folders.push(data);
                });
                that.reset();
            }
        };

        $scope.editFolder = function (folderId) {
            $scope.folder = homeService.getById(folderId).success(function (data) {
                $scope.folder = data;
            });
            that.edit = true;
        };

        $scope.deleteFolder = function (delFolderId) {

            var folderToDelete = (typeof delFolderId === 'undefined' ? folderId : delFolderId);
            homeService.deleteFolder(folderToDelete).success(function (data) {

                if (typeof delFolderId === 'undefined') {
                    if ($scope.home.breadcrumbs.length > 0) {
                        var last = $scope.home.breadcrumbs[$scope.home.breadcrumbs.length - 1];
                        urlService.redirect("home/" + last.id);
                    } else {
                        urlService.redirect("home");
                    }
                } else {
                    homeService.getById(folderId).success(function (data) {
                        $scope.folder = data;
                    });
                }
            });
        };

        $scope.favoriteFolder = function (folder) {
            var index = -1;
            for (i = 0; i < $scope.user.fasts.length; i++) {
                if ($scope.user.fasts[i].id === folder.id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                $scope.user.fasts.splice(index, 1);
            } else {
                var fast = {
                    id: folder.id,
                    name: folder.name,
                    url: "home\/" + folder.id
                };
                $scope.user.fasts.push(fast);
            }
        };

        $scope.uploadFile = function (file) {

            homeService.addFile(folderId, file.filename, file.name).success(function (data) {
                $scope.home.files.push(data);
            });
            file = {};
        };

        $scope.empty = function () {

            return (typeof $scope.home === 'undefined' || (typeof $scope.home.folders === 'undefined' || $scope.home.folders.length === 0) && (typeof $scope.home.files === 'undefined' || $scope.home.files.length === 0));
        };

        this.reset = function () {
            $scope.folder = {};
            that.edit = false;
        };
        this.reset();
    });
})();