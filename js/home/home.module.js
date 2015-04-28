(function () {
    var hmmod = angular.module('home.module', ['services.module', 'utils.module', 'checklist-model']);

    // route controller
    hmmod.controller('indexCtrl', function ($rootScope, $scope, $log, $filter, $stateParams, userService, groupService, spaceService, urlService, homeService) {
        var edit = false;
        var that = this;
        var space = 'cesnet';
        var folderId = $stateParams.folderId;

        // load data with labels
        // Ready for API v0.2
//        $rootScope.reloadData = function ( ) {
//            spaceService.getAll(space, $rootScope.activeLabels).success(function (data) {
//                $scope.home = data;
//            });
//        };

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

        $scope.setSharedWith = function () {
            $scope.shareWith = angular.copy($scope.folder.shareWith);
            //following code will not be neccessary in API v0.2
            $scope.shareWith = new Array();
        };

        $scope.showSharedWith = function (folder) {
            $scope.folder = angular.copy(folder);
            $scope.sharers = userService.getAll();
            $scope.sharers = $scope.sharers.concat(groupService.getAll());
        };

        $scope.deleteSharer = function (sharer) {
            //  spaceService.unshareFolder(space, $scope.folder.id, sharer).success(function (data) {
            $scope.shareWith.splice($scope.shareWith.indexOf(sharer), 1);
            // });
        };

        $scope.addSharer = function (sharer) {
            for (i = 0; i < $scope.sharers.length; i++) {
                if ($scope.sharers[i].name === sharer.name) {
                    var shr = $scope.sharers[i];
                    break;
                }
            }
            var shrrdy = {};
            if (typeof shr.username === 'undefined') {
                shrrdy.groupId = shr.id;
            } else {
                shrrdy.userId = shr.id;
            }
            shrrdy.name = sharer.name;
            shrrdy.permissions = sharer.permissions;

            var notDuplicate = true;
            for (i = 0; i < $scope.shareWith.length; i++) {
                if ($scope.shareWith[i].name === shrrdy.name) {
                    notDuplicate = false;
                    break;
                }
            }
            if (notDuplicate) {
                //spaceService.shareFolder(space, $scope.folder.id, shrrdy).success(function (data) {
                $scope.shareWith.push(angular.copy(shrrdy));
                //});
            }
        };

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
            // save labels for folder also - needed in API v0.2
            // in async call spaceService.setFolderLabel(spaceId, folderId, labelId)
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

        $scope.editFile = function (file) {
            spaceService.getFile(space, file.id).success(function (data) {
                $scope.file = data;
                $scope.oldfile = file;
            });
        };

        $scope.saveFile = function (file) {
            if ($scope.oldfile.name !== file.name) {
                spaceService.renameFile(space, file.id, file.name);
            }
            if ($scope.oldfile.status !== file.status) {
                if (file.status === "offline") {
                    spaceService.setFileOnline(space, file.id);
                } else {
                    spaceService.setFileOffline(space, file.id);
                }
            }
            if (JSON.stringify($scope.oldfile.labels) !== JSON.stringify(file.labels)) {
                // TODO
            }
        };

        var file;
        function handleFileSelect(evt) {
            file = evt.target.files[0];
        }

        $scope.setUpload = function () {
            document.getElementById('file').addEventListener('change', handleFileSelect, false);
        };

        $scope.upload = function () {
            var reader = new FileReader();
            reader.onload = function (file) {
                return function (e) {
                    spaceService.uploadFileContent(space, file, e.target.result);
                };
            }(file);
            reader.readAsBinaryString(file);
        };

        $scope.clear = function () {
            that.reset();
        };

        this.reset = function () {
            $scope.folder = {};
            $scope.folder.name = null;
            that.edit = false;
            $scope.shareWith = null;
            $scope.sharer = {};
        };
        this.reset();
    });
})();