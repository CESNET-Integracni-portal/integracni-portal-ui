(function () {
    var hmmod = angular.module('home.module', ['services.module', 'utils.module', 'ui.uploader']);

    // route controller
    hmmod.controller('indexCtrl', function ($scope, $log, $stateParams, urlService, homeService, uiUploader) {
        var edit = false;
        var that = this;
        var folderId = $stateParams.folderId;
        if (typeof folderId === 'undefined') {
            homeService.getAll().success(function (data) {
                $scope.home = {folders: data};
                $scope.home.breadcrumbs = [];
            });
        } else {
            homeService.getById(folderId).success(function (data) {
                $scope.home = data;
            });
        }

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

        $scope.saveFolder = function (newFolder) {
            $scope.favoriteFolder(newFolder);
            $scope.favoriteFolder(newFolder);
            if (that.edit) {
                homeService.renameFolder(newFolder.id, newFolder.name).success(function (data) {
                    if (typeof folderId === 'undefined') {
                        homeService.getAll().success(function (data) {
                            $scope.home = {folders: data};
                            $scope.home.breadcrumbs = [];
                        });
                    } else {
                        homeService.getById(folderId).success(function (data) {
                            $scope.home = data;
                        });
                    }
                });
                that.edit = false;
                that.reset();
            } else {
                if (typeof folderId === 'undefined') {
                    homeService.createFolderInRoot(newFolder.name).success(function (data) {
                        $scope.home.folders.push(data);
                    });
                } else {
                    homeService.createFolder(folderId, newFolder.name).success(function (data) {
                        $scope.home.folders.push(data);
                    });
                }
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

            if (typeof folderId === 'undefined') {
                homeService.getById(delFolderId).success(function (data) {
                    var folder = data;
                    $scope.favoriteFolder(folder);
                    homeService.deleteFolder(delFolderId).success(function (data) {
                        homeService.getAll().success(function (data) {
                            $scope.home = {folders: data};
                            $scope.home.breadcrumbs = [];
                        });
                    });
                });
            } else {
                var folderToDelete = (typeof delFolderId === 'undefined' ? folderId : delFolderId);
                homeService.getById(folderToDelete).success(function (data) {
                    var folder = data;
                    $scope.favoriteFolder(folder);

                    homeService.deleteFolder(folderToDelete).success(function (data) {

                        if (typeof delFolderId === 'undefined') {

                            if ($scope.home.breadcrumbs.length > 0) {
                                var last = $scope.home.breadcrumbs[$scope.home.breadcrumbs.length - 1];
                                homeService.getById(last.id).success(function (data) {
                                    $scope.home = data;
                                });
                            } else {
                                homeService.getAll().success(function (data) {
                                    $scope.home = {folders: data};
                                    $scope.home.breadcrumbs = [];
                                });
                            }
                        } else {
                            homeService.getById(folderId).success(function (data) {
                                $scope.home = data;
                            });
                        }
                    });
                });
            }
        };

        $scope.deleteFile = function (file) {
            homeService.deleteFile(file.fileId).success(function (data) {
                homeService.getAll().success(function (data) {
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

//        $scope.setUpload = function () {
//            var element = document.getElementById('file1');
//            element.addEventListener('change', function (e) {
//                var files = e.target.files;
//                uiUploader.addFiles(files);
//                $scope.files = uiUploader.getFiles();
//                $scope.$apply();
//            });
//        };

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
})();