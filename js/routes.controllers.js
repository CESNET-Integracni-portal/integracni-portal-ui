(function () {

    // routes controllers
    app.controller('indexCtrl', function ($scope, archiveService) {
        archiveService.getAll().success(function (data) {
            $scope.archive = {folders: data};
            $scope.archive.breadcrumbs = [];
        });

        $scope.createFolder = function (folder) {
            archiveService.createFolderInRoot(folder.name).success(function (data) {
                $scope.archive.folders.push(data);
            });
            folder.name = "";
        };

        $scope.deleteFolder = function (folderId) {
            archiveService.deleteFolder(folderId).success(function (data) {
                archiveService.getAll().success(function (data) {
                    $scope.archive = {folders: data};
                    $scope.archive.breadcrumbs = [];
                });
            });
        };

        $scope.rename = function () {

        };

        $scope.empty = function () {
            return (typeof $scope.archive === 'undefined' || (typeof $scope.archive.folders === 'undefined' || $scope.archive.folders.length === 0) && (typeof $scope.archive.files === 'undefined' || $scope.archive.files.length === 0));
        };
    });

    app.controller('archiveCtrl', function ($scope, archiveService) {
        archiveService.getAll().success(function (data) {
            $scope.archive = {folders: data};
            $scope.archive.breadcrumbs = [];
        });

        $scope.createFolder = function (folder) {

            archiveService.createFolderInRoot(folder.name).success(function (data) {
                $scope.archive.folders.push(data);
            });
            folder.name = "";
        };

        $scope.deleteFolder = function (folderId) {

            archiveService.deleteFolder(folderId).success(function (data) {
                archiveService.getAll().success(function (data) {
                    $scope.archive = {folders: data};
                    $scope.archive.breadcrumbs = [];
                });
            });
        };

        $scope.rename = function () {
            // TODO
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

        $scope.createFolder = function (folder) {

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

        $scope.setName = function () {

            file.name = file.file;
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

    app.controller('folderIterateCtrl', function () {
        $('.sidebar').sidebar('attach events', 'span');
    });

    app.controller('sharedCtrl', function () {
        $('.sidebar').sidebar('attach events', 'span');
    });
})();
