(function () {
    var shrmod = angular.module('shared.module', ['services.module', 'utils.module']);

    // CONTROLLERS
    shrmod.controller('sharedCtrl', function ($scope, $rootScope, spaceService) {
        $('.sidebar').sidebar('attach events', 'span');
        var space = 'cesnet';
        var that = this;
        var edit = false;

        spaceService.getShared(space).success(function (data) {
            $scope.shared = data;
            $scope.shared.breadcrumbs = [];
        });

        $scope.saveFolder = function (newFolder) {
            if (that.edit) {
                spaceService.renameFolder(space, newFolder.id, newFolder.name).success(function (data) {
                    spaceService.getAll().success(function (data) {
                        $scope.shared = {folders: data};
                        $scope.shared.breadcrumbs = [];
                    });
                });
                that.edit = false;
                that.reset();
            } else {
                spaceService.createFolderInRoot(space, newFolder.name).success(function (data) {
                    $scope.shared.folders.push(data);
                });
                that.reset();
            }
        };

        $scope.editFolder = function (folderId) {
            $scope.folder = spaceService.getFolder(space, folderId).success(function (data) {
                $scope.folder = data;
            });
            that.edit = true;
        };

        $scope.downloadFolder = function (folderId) {

            spaceService.downloadFolder(space, folderId).success(function (data) {
                saveAs(data, folderId + ".zip");
            });
        };

        $scope.downloadFile = function (fileId) {
            spaceService.downloadFile(space, fileId).success(function (data) {
                saveAs(data, fileId + ".zip");
            });
        };

        $scope.deleteFolder = function (folderId) {
            spaceService.deleteFolder(space, folderId).success(function (data) {
                spaceService.getAll().success(function (data) {
                    $scope.shared = data;
                    $scope.shared.breadcrumbs = [];
                });
            });
        };

        $scope.deleteFile = function (fileId) {
            spaceService.deleteFile(space, fileId).success(function (data) {
                spaceService.getAll().success(function (data) {
                    $scope.shared = data;
                    $scope.shared.breadcrumbs = [];
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
                    uisref: "sharedIterate({folderId:" + folder.id + "})"
                };
                $scope.user.fasts.push(fast);
            }
        };

        $scope.empty = function () {
            return (typeof $scope.shared === 'undefined' || (typeof $scope.shared.folders === 'undefined' || $scope.shared.folders.length === 0) && (typeof $scope.shared.files === 'undefined' || $scope.shared.files.length === 0));
        };

        this.reset = function () {
            $scope.folder = {};
            that.edit = false;
        };
        this.reset();
    });

    shrmod.controller('sharedIterateCtrl', function ($scope, $rootScope, $stateParams, urlService, spaceService) {
        $('.sidebar').sidebar('attach events', 'span');
        var folderId = $stateParams.folderId;
        var space = 'cesnet';
        var that = this;
        var edit = false;

        spaceService.getFolder(space, folderId).success(function (data) {
            $scope.shared = data;
        });

        $scope.saveFolder = function (newFolder) {
            if (that.edit) {
                spaceService.renameFolder(space, newFolder.id, newFolder.name).success(function (data) {
                    spaceService.getAll().success(function (data) {
                        $scope.shared = {folders: data};
                        $scope.shared.breadcrumbs = [];
                    });
                });
                that.edit = false;
                that.reset();
            } else {
                spaceService.createFolderInRoot(space, newFolder.name).success(function (data) {
                    $scope.shared.folders.push(data);
                });
                that.reset();
            }
        };

        $scope.editFolder = function (folderId) {
            $scope.folder = spaceService.getFolder(space, folderId).success(function (data) {
                $scope.folder = data;
            });
            that.edit = true;
        };

        $scope.deleteFolder = function (delFolderId) {

            var folderToDelete = (typeof delFolderId === 'undefined' ? folderId : delFolderId);
            spaceService.deleteFolder(space, folderToDelete).success(function (data) {

                if (typeof delFolderId === 'undefined') {
                    if ($scope.shared.breadcrumbs.length > 0) {
                        var last = $scope.shared.breadcrumbs[$scope.shared.breadcrumbs.length - 1];
                        urlService.redirect("shared/" + last.id);
                    } else {
                        urlService.redirect("shared");
                    }
                } else {
                    spaceService.getFolder(space, folderId).success(function (data) {
                        $scope.folder = data;
                    });
                }
            });
        };

        $scope.deleteFile = function (fileId) {
            spaceService.deleteFile(space, fileId).success(function (data) {
                spaceService.getAll().success(function (data) {
                    $scope.shared = data;
                    $scope.shared.breadcrumbs = [];
                });
            });
        };

        $scope.downloadFolder = function (folderId) {

            spaceService.downloadFolder(space, folderId).success(function (data) {
                saveAs(data, folderId + ".zip");
            });
        };

        $scope.downloadFile = function (space, fileId) {
            spaceService.downloadFile(fileId).success(function (data) {
                saveAs(data, fileId + ".zip");
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
                    uisref: "sharedIterate({folderId:" + folder.id + "})"
                };
                $scope.user.fasts.push(fast);
            }
        };

        $scope.empty = function () {
            return (typeof $scope.shared === 'undefined' || (typeof $scope.shared.folders === 'undefined' || $scope.shared.folders.length === 0) && (typeof $scope.shared.files === 'undefined' || $scope.shared.files.length === 0));
        };

        this.reset = function () {
            $scope.folder = {};
            that.edit = false;
        };
        this.reset();
    });

    // DIRECTIVES
    shrmod.directive('shared', function () {
        return {
            restrict: "E",
            templateUrl: "./partials/shared/shared.html",
            controller: "sharedCtrl"
        };
    });
    shrmod.directive('sharedIterate', function () {
        return {
            restrict: "E",
            templateUrl: "./partials/shared/shared_detail.html",
            controller: "sharedIterateCtrl"
        };
    });
})();