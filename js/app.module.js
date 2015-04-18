// app.module.js
(function () {
    app = angular.module('app.module',
            ['utils.module',
                'home.module',
                'archive.module',
                'shared.module',
                'login.module',
                'externists.module',
                'groups.module',
                'labels.module',
                'orgunits.module',
                'password.module',
                'settings.module',
                'ui.router',
                'services.module',
                'Mac']);

    app.run(function ($rootScope, oauthService) {

        oauthService.refresh();
    });

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        // route all invalid urls to index
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $stateProvider
                // index route, my space
                .state("index", {
                    url: "/",
                    templateUrl: "./partials/home/home.html",
                    controller: 'indexCtrl',
                    data: {
                        requireLogin: true
                    }
                })
                // iterates over folders
                .state("homeIterate", {
                    url: "/home/{folderId:[1-9][0-9]*}",
                    templateUrl: "./partials/home/home_detail.html",
                    controller: 'homeIterateCtrl',
                    data: {
                        requireLogin: true
                    }
                })

                // admin settings
                .state("admin", {
                    url: "/admin",
                    template: "<admin-tabs></admin-tabs>",
                    data: {
                        requireLogin: true
                    }
                })

                /*.state("folder.detail", {
                 url: "/{folderId: [0-9]+}",
                 templateUrl: "./partials/folder.html"
                 })*/

                // personal settings
                .state("settings", {
                    url: "/settings",
                    template: "<settings-tabs></settings-tabs>",
                    data: {
                        requireLogin: true
                    }
                })

                // archive
                .state("archive", {
                    url: "/archive",
                    templateUrl: "./partials/archive/archive.html",
                    controller: 'archiveCtrl',
                    data: {
                        requireLogin: true
                    }
                })

                // iterates over archive
                .state("archiveIterate", {
                    url: "/archive/{folderId:[1-9][0-9]*}",
                    templateUrl: "./partials/archive/archive_detail.html",
                    controller: 'archiveIterateCtrl',
                    data: {
                        requireLogin: true
                    }
                })

                // shared
                .state('shared', {
                    url: '/shared',
                    template: '<shared></shared>',
                    data: {
                        requireLogin: true
                    }
                })

                .state('sharedIterate', {
                    url: '/shared/{folderId:[1-9][0-9]*}',
                    template: '<shared-iterate></shared-iterate>',
                    data: {
                        requireLogin: true
                    }
                })

                // tutorials
                .state("tutorials", {
                    url: "/tutorials",
                    templateUrl: "./partials/tutorial.html",
                    data: {
                        requireLogin: true
                    }
                })

                // labels
                .state("labels", {
                    url: "/label/{labelId:[1-9][0-9]*}",
                    templateUrl: "./partials/labels/labels.html",
                    controller: 'labelSearchController',
                    data: {
                        requireLogin: true
                    }
                });
    });
})();
