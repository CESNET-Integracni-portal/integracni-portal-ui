// app.module.js
(function () {
    app = angular.module('app.module',
            ['utils.module',
                'externists.module',
                'groups.module',
                'labels.module',
                'orgunits.module',
                'password.module',
                'settings.module',
                'ui.router',
                'services.module',
                'Mac']);

    app.run(function (oauthService) {
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
                        templateUrl: "./partials/archive/folder.html",
                        controller: 'indexCtrl'
                })
                // iterates over folders
                .state("folderIterate", {
                url: "/folder/{folderId:[1-9][0-9]*}",
                        templateUrl: "./partials/archive/folder.html",
                        controller: 'folderIterateCtrl'
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
                        templateUrl: "./partials/archive/archive.html",
                        controller: 'archiveCtrl'
                })

                // iterates over archive
                .state("archiveIterate", {
                url: "/archive/{folderId:[1-9][0-9]*}",
                        templateUrl: "./partials/archive/archive_detail.html",
                        controller: 'archiveIterateCtrl'
                })

                .state("shared", {
                url: "/shared",
                        templateUrl: "./partials/shared/shared.html",
                        controller: 'sharedCtrl'
                });
            });

})();
