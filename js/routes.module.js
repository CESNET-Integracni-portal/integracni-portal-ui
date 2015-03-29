// routes.module.js
(function () {

    angular.module('app.module').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        // route all invalid urls to index
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
                            modal = $('#folder.modal');
                            return modal;
                        };

                        $scope.add = function () {
                            getModal().modal('show');
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
                .state("archive", {
                    url: "/archive",
                    templateUrl: "./partials/archive.html",
                    controller: function ($scope, archiveService) {
                        archiveService.getAll().success(function (data) {
                            $scope.archive = {folders: data};
                            $scope.archive.breadcrumbs = [];
                        });
                        var modal = null;

                        var getModal = function () {
                            modal = $('#folder.modal');
                            return modal;
                        };

                        $scope.add = function () {

                            getModal().modal('show');
                        };

                        $scope.createFolder = function (folder) {

                            archiveService.createFolderInRoot(folder.name).success(function (data) {
                                $scope.archive.folders.push(data);
                            });
                            folder.name = "";
                            getModal().modal('hide dimmer');
                            getModal().destroy();

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
                    }
                })

                // iterates over archive
                .state("archiveIterate", {
                    url: "/archive/{folderId:[1-9][0-9]*}",
                    templateUrl: "./partials/archive_detail.html",
                    controller: function ($scope, archiveService, $stateParams, urlService) {
                        var folderId = $stateParams.folderId;
                        archiveService.getById(folderId).success(function (data) {
                            $scope.archive = data;
                        });

                        var modal = null;

                        var getModal = function () {
                            modal = $('#folder.modal');
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
                            getModal().modal('hide dimmer');
                            getModal().destroy();

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
                            getModal().modal('hide dimmer');
                            getModal().destroy();

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
})();
