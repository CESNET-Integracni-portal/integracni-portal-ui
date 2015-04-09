(function () {

    // routes controllers
    app.controller('indexCtrl', function ($scope, homeService) {
        homeService.getAll().success(function (data) {
            $scope.home = {folders: data};
            $scope.home.breadcrumbs = [];
        });

        $scope.createFolder = function (folder) {
            homeService.createFolderInRoot(folder.name).success(function (data) {
                $scope.home.folders.push(data);
            });
            folder.name = "";
        };

        $scope.deleteFolder = function (folderId) {
            homeService.deleteFolder(folderId).success(function (data) {
                homeService.getAll().success(function (data) {
                    $scope.home = {folders: data};
                    $scope.home.breadcrumbs = [];
                });
            });
        };

        $scope.empty = function () {
            return (typeof $scope.home === 'undefined' || (typeof $scope.home.folders === 'undefined' || $scope.home.folders.length === 0) && (typeof $scope.home.files === 'undefined' || $scope.home.files.length === 0));
        };
    });

    app.controller('homeIterateCtrl', function ($scope, homeService, $stateParams, urlService) {
        var folderId = $stateParams.folderId;
        homeService.getById(folderId).success(function (data) {
            $scope.home = data;
        });

        $scope.saveFolder = function (folder) {

            homeService.createFolder(folderId, folder.name).success(function (data) {
                $scope.home.folders.push(data);
            });
            folder.name = "";
        };

        $scope.rename = function () {

            homeService.renameFolder(folderId, "NewNamedFolder").success(function (data) {
                homeService.getById(folderId).success(function (data) {
                    $scope.home = data;
                });
            });
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

                        $scope.home = data;
                    });
                }
            });
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
    });

    app.controller('archiveCtrl', function ($scope, archiveService) {
        archiveService.getAll().success(function (data) {
            $scope.archive = {folders: data};
            $scope.archive.breadcrumbs = [];
        });
        var that = this;
        var newfolder = true;
        $scope.folderId = null;

        $scope.saveFolder = function (folder) {

            if ($scope.folderId === null) {
                archiveService.createFolderInRoot(folder.name).success(function (data) {
                    $scope.archive.folders.push(data);
                });
                folder.name = "";
            } else {
                archiveService.renameFolder($scope.folderId, folder.name).success(function (data) {
                    archiveService.getById($scope.folderId).success(function (data) {
                        $scope.archive = data;
                    });
                });
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
            that.newfolder = false;
            $scope.folderId = folderId;
        };

        $scope.empty = function () {

            return (typeof $scope.archive === 'undefined' || (typeof $scope.archive.folders === 'undefined' || $scope.archive.folders.length === 0) && (typeof $scope.archive.files === 'undefined' || $scope.archive.files.length === 0));
        };
    });

    app.controller('archiveIterateCtrl', function ($scope, archiveService, $stateParams, urlService) {
        var folderId = $stateParams.folderId;
        archiveService.getById(folderId).success(function (data) {
            $scope.archive = data;
        });

        $scope.saveFolder = function (folder) {

            archiveService.createFolder(folderId, folder.name).success(function (data) {
                $scope.archive.folders.push(data);
            });
            folder.name = "";
        };

        $scope.rename = function () {

            archiveService.renameFolder(folderId, "NewNamedFolder").success(function (data) {
                archiveService.getById(folderId).success(function (data) {
                    $scope.archive = data;
                });
            });
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
    });

    app.controller('sharedCtrl', function () {
        $('.sidebar').sidebar('attach events', 'span');
    });
})();
