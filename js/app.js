(function () {

    app = angular.module('app', ['ui.router']);

    app.run(function (oauthService) {
        oauthService.refresh();
    });

// ROUTING
    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);

        var attachSidebar = function () {
            $('.sidebar').sidebar('attach events', 'span');
        };

        $stateProvider
                // index route, my space
                .state("index", {
                    url: "/",
                    templateUrl: "./partials/folder.html",
                    controller: function ($scope, archiveService) {
                        archiveService.getAll().success(function (data) {
                            $scope.archive = {folders: data};
                            $scope.archive.breadcrumbs = [];
                        });
                        var modal = null;

                        var getModal = function () {
                            if (modal === null) {
                                modal = $('#add.modal');
                            }
                            return modal;
                        };

                        $scope.add = function () {
                            getModal().modal('show');
                            /*archiveService.createFolderInRoot("NewFolder").success(function(data){
                             $scope.archive.folders.push(data);
                             });*/
                        };

                        $scope.createFolder = function (folder) {
                            archiveService.createFolderInRoot(folder.name).success(function (data) {
                                $scope.archive.folders.push(data);
                            });
                            folder.name = "";
                            getModal().modal('hide');
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
                    }
                })
                // iterates over folders
                .state("folderIterate", {
                    url: "/folder/{folderId:[1-9][0-9]*}",
                    templateUrl: "./partials/folder.html",
                    controller: attachSidebar
                })

                .state("admin", {
                    url: "/admin",
                    template: "<admin-tabs></admin-tabs>"
                })

                /*.state("folder.detail", {
                 url: "/{folderId: [0-9]+}",
                 templateUrl: "./partials/folder.html"
                 })*/

                .state("settings", {
                    url: "/settings",
                    template: "<settings-tabs></settings-tabs>"
                })

                // archive
                .state("archived", {
                    url: "/archived",
                    templateUrl: "./partials/archived.html",
                    controller: function ($scope, archiveService) {
                        archiveService.getAll().success(function (data) {
                            $scope.archive = {folders: data};
                            $scope.archive.breadcrumbs = [];
                        });
                        var modal = null;

                        var getModal = function () {
                            if (modal === null) {
                                modal = $('#add.modal');
                            }
                            return modal;
                        };

                        $scope.add = function () {
                            getModal().modal('show');
                            /*archiveService.createFolderInRoot("NewFolder").success(function(data){
                             $scope.archive.folders.push(data);
                             });*/
                        };

                        $scope.createFolder = function (folder) {
                            archiveService.createFolderInRoot(folder.name).success(function (data) {
                                $scope.archive.folders.push(data);
                            });
                            folder.name = "";
                            getModal().modal('hide');
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
                    }
                })

                // iterates over archive
                .state("archiveIterate", {
                    url: "/archived/{folderId:[1-9][0-9]*}",
                    templateUrl: "./partials/archived_detail.html",
                    controller: function ($scope, archiveService, $stateParams, urlService) {
                        var folderId = $stateParams.folderId;
                        archiveService.getById(folderId).success(function (data) {
                            $scope.archive = data;
                        });

                        var modal = null;

                        var getModal = function () {
                            if (modal === null) {
                                modal = $('#add.modal');
                            }
                            return modal;
                        };

                        $scope.add = function () {
                            getModal().modal('show');
                        };

                        $scope.createFolder = function (folder) {
                            archiveService.createFolder(folderId, folder.name).success(function (data) {
                                $scope.archive.folders.push(data);
                            });
                            folder.name = "";
                            getModal().modal('hide');
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
                                        urlService.redirect("archived/" + last.id);
                                    } else {
                                        urlService.redirect("archived");
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
                            getModal().modal('hide');
                        };

                        $scope.empty = function () {
                            return (typeof $scope.archive === 'undefined' || (typeof $scope.archive.folders === 'undefined' || $scope.archive.folders.length === 0) && (typeof $scope.archive.files === 'undefined' || $scope.archive.files.length === 0));
                        };


                    }
                })

                .state("shared", {
                    url: "/shared",
                    templateUrl: "./partials/shared.html",
                    controller: attachSidebar
                });

    });

    app.controller('MainController', function ($scope, userService, urlService, oauthService) {
        $scope.user = userService.getById(2);
        $scope.basePath = urlService.basePath();
        $scope.table = true;

        $scope.showAsTable = function () {
            $scope.table = true;
        };

        $scope.showAsItems = function () {
            $scope.table = false;
        };

        $scope.logout = function () {
            oauthService.logout();
        };

        $scope.deaultSidebar = function () {
            $scope.mySidebar = {tempateUrl: "./partials/archived_show.html", data: {}};
            ;
            $('.sidebar').sidebar('hide');
            $scope.sidebarShow = false;
        };
        $scope.defineSidebar = function (templateUrl, data) {
            $scope.mySidebar = {tempateUrl: templateUrl, data: data};
            $('.sidebar').sidebar('show');
            $scope.sidebarShow = true;
        };
        $scope.deaultSidebar();
    });

    app.directive("customSidebar", function () {
        var mySidebar;

        if (typeof mySidebar === 'undefined' || mySidebar === null) {
            return;
        }
        return {
            restrict: 'EA',
            templateUrl: function (tElement, tAttrs) {
                return tAttrs.templateUrl;
            }
        };
    });

    app.controller('NavigationController', function ($scope) {
        this.fastFolders = fastFolders;
    });


    app.controller('ViewController', function () {
        // TODO
    });

    app.directive("setChangePass", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/set-change-pass.html"
        };
    });

    app.directive("setOrgunits", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/set-org-units.html",
            controller: function ($scope, unitService, userService) {
                this.units = unitService.getAll();
                this.users = userService.getAll();
                var that = this;

                $scope.saveUnit = function (unit) {
                    // create
                    if ($scope.index === null) {
                        var createdUnit = unitService.create(unit);
                        that.units.push(angular.copy(createdUnit));
                        that.reset();
                        //update
                    } else {
                        var updatedUnit = unitService.updateUnit(unit);
                        that.units[$scope.index] = angular.copy(updatedUnit);
                        that.reset();
                    }
                };

                $scope.deleteUnit = function (index) {
                    that.units.splice(index, 1);
                    userService.deleteUser(index);
                };

                $scope.editUnit = function (index, unit) {
                    $scope.unit = angular.copy(unit);
                    $scope.index = index;
                };

                this.reset = function () {
                    $scope.unit = {};
                    $scope.index = null;
                };
                this.reset();
            },
            controllerAs: "unitsCtrl"
        };
    });

    app.directive("setGroups", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/set-groups.html",
            controller: function ($scope, groupService, userService) {
                var userId = $scope.user.id;
                var that = this;

                $scope.saveGroup = function (group) {
                    // create
                    if ($scope.index === null) {
                        group.userId = userId;
                        var createdGroup = groupService.create(group);
                        $scope.user.groups.push(angular.copy(createdGroup));
                        that.reset();
                        //update
                    } else {
                        var updatedGroup = groupService.updateGroup(group);
                        $scope.user.groups[$scope.index] = angular.copy(updatedGroup);
                        that.reset();
                    }
                };

                $scope.addUser = function (index) {
                    if ($scope.group.user !== null) {
                        that.users[index].disabled = true;
                        that.users[index].originalIndex = index;
                        $scope.group.users.push(that.users[index]);
                        $scope.group.user = null;
                    }
                };

                $scope.isDisabled = function (user) {
                    return (typeof user.disabled !== 'undefined' && user.disabled);
                };

                $scope.removeUser = function (index) {
                    that.users[$scope.group.users[index].originalIndex].disabled = true;
                    $scope.group.users.splice(index, 1);
                };

                $scope.deleteGroup = function (index) {
                    $scope.user.groups.splice(index, 1);
                    groupService.deleteGroup(index);
                };

                $scope.editGroup = function (index, group) {
                    $scope.group = angular.copy(group);
                    $scope.index = index;
                };

                this.reset = function () {
                    $scope.group = {};
                    $scope.group.users = [];
                    $scope.group.user = null;
                    that.users = userService.getAll();
                    $scope.index = null;
                };
                this.reset();
            },
            controllerAs: "groupsCtrl"
        };
    });

    app.directive("setLabels", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/set-labels.html",
            controller: function ($scope, labelService) {
                var userId = $scope.user.id;
                $scope.label = {};
                $scope.index = null;

                var modal = null;

                var getModal = function () {
                    if (modal === null) {
                        modal = $('#add.modal');
                    }
                    return modal;
                };

                $scope.saveLabel = function (label) {
                    // create
                    if ($scope.index === null) {
                        label.userId = userId;
                        var createdLabel = labelService.create(label);
                        $scope.user.labels.push(angular.copy(createdLabel));
                        label.name = "";
                        label.color = null;
                        //update
                    } else {
                        var updatedLabel = labelService.updateLabel(label);
                        $scope.user.labels[$scope.index] = angular.copy(updatedLabel);
                        label.name = "";
                        label.color = null;
                        $scope.index = null;
                    }
                    getModal().modal('hide');
                    getModal().modal('')
                };

                $scope.deleteLabel = function (index) {
                    $scope.user.labels.splice(index, 1);
                    labelService.deleteLabel(index);
                };

                $scope.editLabel = function (index, label) {
                    $scope.label = angular.copy(label);
                    $scope.index = index;
                    getModal().modal('show');
                };

                $scope.addLabel = function () {
                    getModal().modal('show');
                };

                $scope.empty = function () {
                    return (typeof $scope.label === 'undefined' || $scope.label.length === 0);
                };

            },
            controllerAs: "labelsCtrl"
        };
    });

    app.directive("setRegistartion", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/set-registartion.html",
            controller: function ($scope, userService) {
                var unitId = $scope.user.unitId;
                $scope.externists = userService.getExternistsForUnit(unitId);
                this.users = userService.getAll();
                var that = this;

                $scope.saveExternists = function (externist) {
                    // create
                    if ($scope.index === null) {
                        externist.unitId = unitId;
                        var createdUser = userService.create(externist);
                        $scope.externists.push(angular.copy(createdUser));
                        that.reset();
                        //update
                    } else {
                        var updatedUser = userService.updateUser(externist);
                        $scope.externists[$scope.index] = angular.copy(updatedUser);
                        that.reset();
                    }
                };

                $scope.deleteUser = function (index) {
                    $scope.externists.splice(index, 1);
                    userService.deleteUser(index);
                };

                $scope.editUser = function (index, externist) {
                    $scope.externist = angular.copy(externist);
                    $scope.index = index;
                };

                this.reset = function () {
                    $scope.externist = {};
                    $scope.index = null;
                };
                this.reset();

            },
            controllerAs: "externalsCtrl"
        };
    });

    app.directive("adminTabs", function () {
        return {
            restrict: "E",
            templateUrl: "./partials/admin-tabs.html",
            controller: function () {
                this.tab = 3;

                this.isSet = function (checkTab) {
                    return this.tab === checkTab;
                };

                this.setTab = function (activeTab) {
                    this.tab = activeTab;
                };
            },
            controllerAs: "tab"
        };
    });

    app.directive("settingsTabs", function () {
        return {
            restrict: "E",
            templateUrl: "./partials/settings-tabs.html",
            controller: function () {
                this.tab = 1;

                this.isSet = function (checkTab) {
                    return this.tab === checkTab;
                };

                this.setTab = function (activeTab) {
                    this.tab = activeTab;
                };
            },
            controllerAs: "tab"
        };
    });

// ----- fast Folders (in left navigation) -----
    var fastFolders = [{
            id: 1,
            name: "work",
            url: "/1" // id původní složky
        }];

    var folders = [
        {
            id: 1,
        }];
})();