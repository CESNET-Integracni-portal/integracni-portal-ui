(function () {
    var shrmod = angular.module('shared.module', ['services.module', 'utils.module']);

    // CONTROLLERS
    shrmod.controller('sharedCtrl', function ($scope, $rootScope, $stateParams, userService, spaceService) {
        var space = 'cesnet';
        var that = this;
        var edit = false;
        var folderId = $stateParams.folderId;

        // load data with labels
        // Ready for API v0.2
        $rootScope.reloadShared = function ( ) {
            spaceService.getShared(space, $rootScope.activeLabels).success(function (data) {
                $scope.shared = data;
            });
        };

        if (typeof folderId === 'undefined') {
            //Ready for API v0.2
            //spaceService.getShared(space).success(function (data) {
            $scope.shared = spaceService.getShared(space);
            //});
        } else {
            spaceService.getFolder(space, folderId).success(function (data) {
                $scope.shared = data;
            });
        }

        $scope.downloadFolder = function (folderId) {
            spaceService.downloadFolder(space, folderId).success(function (data) {
                saveAs(data, folderId + ".zip");
            });
        };

        $scope.downloadFile = function (fileId) {
            spaceService.getFileContent(space, fileId).success(function (data) {
                saveAs(data, fileId + ".zip");
            });
        };

        $scope.saveFolder = function (newFolder) {
            // save labels for folder also - needed in API v0.2
            // in async call spaceService.setFolderLabel(spaceId, folderId, labelId)
            $scope.favoriteFolder(newFolder);
            $scope.favoriteFolder(newFolder);
            if (that.edit) {
                spaceService.renameFolder(space, newFolder.id, newFolder.name).success(function (data) {
                    if (typeof folderId === 'undefined') {
                        spaceService.getShared(space).success(function (data) {
                            $scope.shared = {folders: data};
                            $scope.shared.breadcrumbs = [];
                        });
                    } else {
                        spaceService.getFolder(space, folderId).success(function (data) {
                            $scope.shared = data;
                        });
                    }
                });
                that.edit = false;
            } else {
                if (typeof folderId === 'undefined') {
                    spaceService.createFolderInRoot(space, newFolder.name).success(function (data) {
                        $scope.shared.folders.push(data);
                    });
                } else {
                    spaceService.createFolder(space, newFolder.name).success(function (data) {
                        $scope.shared.folders.push(data);
                    });
                }
            }
            that.reset();
        };
        
        $scope.editFolder = function (folderId) {
            $scope.folder = spaceService.getFolder(space, folderId).success(function (data) {
                $scope.folder = data;
            });
            that.edit = true;
        };

        $scope.deleteFolder = function (delFolderId) {
            if (typeof folderId === 'undefined') {
                spaceService.getFolder(delFolderId).success(function (data) {
                    var folder = data;
                    $scope.unfavoriteFolder(folder);
                    spaceService.deleteFolder(delFolderId).success(function (data) {
                        spaceService.getShared(space).success(function (data) {
                            $scope.shared = {folders: data};
                            $scope.shared.breadcrumbs = [];
                        });
                    });
                });
            } else {
                var folderToDelete = (typeof delFolderId === 'undefined' ? folderId : delFolderId);
                spaceService.getFolder(space, folderToDelete).success(function (data) {
                    var folder = data;
                    $scope.unfavoriteFolder(folder);

                    spaceService.deleteFolder(space, folderToDelete).success(function (data) {

                        if (typeof delFolderId === 'undefined') {

                            if ($scope.home.breadcrumbs.length > 0) {
                                var last = $scope.home.breadcrumbs[$scope.home.breadcrumbs.length - 1];
                                spaceService.getFolder(space, last.id).success(function (data) {
                                    $scope.home = data;
                                });
                            } else {
                                spaceService.getShared(space).success(function (data) {
                                    $scope.home = {folders: data};
                                    $scope.home.breadcrumbs = [];
                                });
                            }
                        } else {
                            spaceService.getFolder(space, folderId).success(function (data) {
                                $scope.home = data;
                            });
                        }
                    });
                });
            }
        };

        $scope.deleteFile = function (fileId) {
            spaceService.deleteFile(space, fileId).success(function (data) {
                spaceService.getShared(space).success(function (data) {
                    $scope.shared = data;
                    $scope.shared.breadcrumbs = [];
                });
            });
        };

        $scope.unfavoriteFolder = function (folder, index) {

            if (typeof index === 'undefined') {
                var index = -1;
                for (i = 0; i < $scope.user.fasts.length; i++) {
                    if ($scope.user.fasts[i].id === folder.id) {
                        index = i;
                        break;
                    }
                }
            }
            if (index !== -1) {
                $scope.user.fasts.splice(index, 1);
            }
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
                $scope.unfavoriteFolder(folder, index);
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
            controller: "sharedCtrl"
        };
    });
})();