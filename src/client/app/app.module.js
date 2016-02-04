// app.module.js
(function () {

	"use strict";

	var app = angular.module('app.module', [
		'utils.module',
		'space.module',
		'shared.module',
		'login.module',
		'externists.module',
		'orgunits.module',
		'settings.module',
		'ui.router',
		'services.module',
		'app.widgets',
		'utils.exception',
		'utils.fileSaver'
	]);

	var config = {
		environment: '/* @echo ENVIRONMENT */',
		rootContext: '/* @echo ROOT_CONTEXT */',
		baseUrl: '/* @echo BASE_URL */',
		oauthUrl: '/* @echo OAUTH_URL */'
	};

	app.constant('config', config);
	app.run(run);

	app.config(configuration);



	run.$inject = ['oauthService', '$rootScope', '$state', 'userService'];
	function run(oauthService, $rootScope, $state, userService) {

		oauthService.refresh();

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			if (oauthService.refreshPromise) {
				event.preventDefault();
				oauthService.refreshPromise.then(function () {
					if (toState.name === 'login') {
						$state.go('index');
					} else {
						$state.go(toState.name, toParams);
					}
				});
				return;
			}

			var requireLogin = toState.data ? (toState.data.requireLogin) : true;
			if (requireLogin && !userService.getLoggedUserId()) {
				event.preventDefault();
				oauthService.login();
			}
		});

		document.addEventListener('drop', function (evt) {
			evt.preventDefault();
		}, false);

	}

	configuration.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider'];
	function configuration($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

		$httpProvider.interceptors.push(function($q, $injector) {
			return {
				'responseError': function(response) {
					if (response.status === 401) {
						$injector.get('$state').go('login');
						return response;
					}
					return $q.reject(response);
				}
			};
		});

		// route all invalid urls to index
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
		$stateProvider
			.state("login", {
				url: "/login",
				views: {
					main: {
						templateUrl: "app/login/login.html",
						controller: 'loginCtrl'
					}
				},
				data: {
					requireLogin: false
				}
			})
			// index route, my space
			.state("index", {
				url: "/",
				views: {
					main: {
						template: '',
						controller: ['$state', function($state) {
							$state.go('space.root', {space: 'cesnet'});
						}]
					}
				}
			})
			.state("space", {
				url: "/space/{space}",
				abstract: true,
				views: {
					'left-menu': {
						templateUrl: "app/space/space.menu.html",
						controller: 'spaceMenuController',
						controllerAs: 'vm'
					}
				},
				resolve: {
					labels: ['labelService', function (labelService) {
						return labelService.getAll().then(function (response) {
							return response.data ? response.data : null;
						});
					}],
					favorites: ['spaceService', '$stateParams', function (spaceService, $stateParams) {
						return spaceService.getFavorites($stateParams.space).then(function (response) {
							return response.data ? response.data : null;
						});
					}]
				}
			})
			.state("space.root", {
				url: "?label",
				params: {
					label: null
				},
				views: {
					'main@': {
						templateUrl: "app/space/space.main.html",
						controller: 'spaceController',
						controllerAs: 'vm'
					}
				},
				resolve: {
					folder: ['spaceService', '$stateParams', function (spaceService, $stateParams) {
						return spaceService.getAll($stateParams.space, [$stateParams.label]).then(function (response) {
							return response.data ? response.data : null;
						});
					}]
				}
			})
			.state("space.folder", {
				url: "/folder/{folderId}",
				views: {
					'main@': {
						templateUrl: "app/space/space.main.html",
						controller: 'spaceController',
						controllerAs: 'vm'
					}
				},
				resolve: {
					folder: ['spaceService', '$stateParams', function(spaceService, $stateParams) {
						return spaceService.getFolder($stateParams.space, $stateParams.folderId)
							.then(function (response) {
								return response.data ? response.data : null;
							});
					}]
				}
			})
			.state("settings", {
				url: "/settings",
				views: {
					'left-menu@': {
						templateUrl: "app/settings/settings.menu.html"
					},
					'main@': {
						template: ""
					}
				}
			})
			.state("settings.groups", {
				url: "/groups",
				views: {
					'main@': {
						templateUrl: 'app/settings/groups/settings.groups.html',
						controller: 'groupsController',
						controllerAs: 'vm'
					}
				}
			})

			.state("settings.labels", {
				url: "/labels",
				views: {
					'main@': {
						templateUrl: 'app/settings/labels/settings.labels.html',
						controller: 'labelsController',
						controllerAs: 'vm'
					}
				}
			})

			.state("settings.password", {
				url: "/password",
				views: {
					'main@': {
						templateUrl: 'app/settings/password/settings.password.html',
						controller: 'pswCtrl',
						controllerAs: 'vm'
					}
				}
			});
	}
})();
