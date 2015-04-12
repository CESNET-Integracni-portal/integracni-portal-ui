(function () {

    // routes controllers
    app.controller('indexCtrl', function ($scope, $log, homeService, uiUploader) {
        var edit = false;
        var that = this;
//        $scope.files = [];

        homeService.getAll().success(function (data) {
            $scope.home = {folders: data};
            $scope.home.breadcrumbs = [];
        });

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

    app.controller('homeIterateCtrl', function ($scope, homeService, $stateParams, urlService) {
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

    app.controller('archiveCtrl', function ($scope, archiveService) {
        var that = this;
        var edit = false;

        archiveService.getAll().success(function (data) {
            $scope.archive = {folders: data};
            $scope.archive.breadcrumbs = [];
        });

        $scope.saveFolder = function (newFolder) {
            if (that.edit) {
                archiveService.renameFolder(newFolder.id, newFolder.name).success(function (data) {
                    archiveService.getAll().success(function (data) {
                        $scope.archive = {folders: data};
                        $scope.archive.breadcrumbs = [];
                    });
                });
                that.edit = false;
                that.reset();
            } else {
                archiveService.createFolderInRoot(newFolder.name).success(function (data) {
                    $scope.archive.folders.push(data);
                });
                that.reset();
            }
        };

        $scope.deleteFolder = function (folderId) {

            archiveService.deleteFolder(folderId).success(function (data) {
                archiveService.getAll().success(function (data) {
                    $scope.archive = {folders: data};
                    $scope.archive.breadcrumbs = [];
                });
            });
        };

        $scope.editFolder = function (folderId) {
            $scope.folder = archiveService.getById(folderId).success(function (data) {
                $scope.folder = data;
            });
            that.edit = true;
        };

        $scope.empty = function () {

            return (typeof $scope.archive === 'undefined' || (typeof $scope.archive.folders === 'undefined' || $scope.archive.folders.length === 0) && (typeof $scope.archive.files === 'undefined' || $scope.archive.files.length === 0));
        };

        this.reset = function () {
            $scope.folder = {};
            that.edit = false;
        };
        this.reset();
    });

    app.controller('archiveIterateCtrl', function ($scope, archiveService, $stateParams, urlService) {
        var folderId = $stateParams.folderId;
        var that = this;
        var edit = false;

        archiveService.getById(folderId).success(function (data) {
            $scope.archive = data;
        });

        $scope.saveFolder = function (newFolder) {
            if (that.edit) {
                archiveService.renameFolder(newFolder.id, newFolder.name).success(function (data) {
                    archiveService.getAll().success(function (data) {
                        $scope.archive = {folders: data};
                        $scope.archive.breadcrumbs = [];
                    });
                });
                that.edit = false;
                that.reset();
            } else {
                archiveService.createFolder(folderId, newFolder.name).success(function (data) {
                    $scope.archive.folders.push(data);
                });
                that.reset();
            }
        };

        $scope.deleteFolder = function (delFolderId) {

            var folderToDelete = (typeof delFolderId === 'undefined' ? folderId : delFolderId);
            archiveService.deleteFolder(folderToDelete).success(function (data) {

                if (typeof delFolderId === 'undefined') {
                    if ($scope.archive.breadcrumbs.length > 0) {
                        var last = $scope.archive.breadcrumbs[$scope.archive.breadcrumbs.length - 1];
                        urlService.redirect("archive/" + last.id);
                    } else {
                        urlService.redirect("archive");
                    }
                } else {
                    archiveService.getById(folderId).success(function (data) {

                        $scope.archive = data;
                    });
                }
            });
        };

        $scope.uploadFile = function (file) {

            archiveService.addFile(folderId, file.filename, file.name).success(function (data) {
                $scope.archive.files.push(data);
            });
            file = {};
        };

        $scope.empty = function () {

            return (typeof $scope.archive === 'undefined' || (typeof $scope.archive.folders === 'undefined' || $scope.archive.folders.length === 0) && (typeof $scope.archive.files === 'undefined' || $scope.archive.files.length === 0));
        };

        this.reset = function () {
            $scope.folder = {};
            that.edit = false;
        };
        this.reset();
    });

    app.controller('sharedCtrl', function () {
        $('.sidebar').sidebar('attach events', 'span');
    });
})();
