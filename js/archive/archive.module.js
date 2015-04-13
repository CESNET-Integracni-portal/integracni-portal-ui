(function () {
    var archmod = angular.module('archive.module', ['utils.module', 'services.module']);
    
    // route controller
    archmod.controller('archiveCtrl', function ($scope, archiveService) {
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
    // route controller
    archmod.controller('archiveIterateCtrl', function ($scope, archiveService, $stateParams, urlService) {
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
})();
