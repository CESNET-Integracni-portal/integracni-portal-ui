(function () {

	"use strict";

	angular.module('services.module')
		.factory('oauthService', OauthService);

	var authorizationToken = 'Basic ODU5NWM4Mjg0YTUyNDc1ZTUxNGQ2NjdlNDMxM2U4NmE6MjI2ZDI0NjE3ZTY1NTRkNzFhNjg2MTRjMzQ0MzZkNjc=';

	OauthService.$inject = ['cookieService', 'urlService', '$state', '$http', 'config', 'userService'];
	function OauthService(cookieService, urlService, $state, $http, config, userService) {
		var _accessTokenId = "accessToken",
			_refreshToken = "refreshToken",
			_tokenType = "tokenType";

		var service = {
			loginWithPass: loginWithPass,
			login: login,
			logout: logout,
			refresh: refresh,
			refreshPromise: null
		};

		return service;

		function loginWithPass(username, password) {
			return $http({
				method: 'POST',
				url: config.oauthUrl + '/oauth/token',
				params: {
					username: username,
					password: password,
					grant_type: 'password'
				},
				headers: {
					Authorization: authorizationToken,
					"Content-Type": 'application/x-www-form-urlencoded'
				}
			}).then(function (response) {
				cookieService.setCookie(_accessTokenId, response.data.access_token, response.data.expires_in);
				cookieService.setCookie(_tokenType, response.data.token_type, response.data.expires_in);
				cookieService.setCookie(_refreshToken, response.data.refresh_token);

				return userService.getCurrent().then(function (user) {
					userService.setLoggedUserId(user.data.id);
					return user;
				});
			}, function (response) {
				logout();
				return response;
			});
		}

		function login() {
			$state.go('login');
		}

		function logout() {
			cookieService.deleteCookie(_accessTokenId);
			cookieService.deleteCookie(_tokenType);
			cookieService.deleteCookie(_refreshToken);
			localStorage.clear();
			urlService.redirectToHome();
			login();
		}

		function refresh() {
			var refreshToken = cookieService.getCookie(_refreshToken);
			if (refreshToken === null) {
				logout();
			}

			service.refreshPromise = $http({
				method: 'POST',
				url: config.oauthUrl + '/oauth/token',
				params: {
					grant_type: 'refresh_token',
					refresh_token: refreshToken
				},
				headers: {
					Authorization: authorizationToken,
					"Content-Type": 'application/x-www-form-urlencoded'
				}
			}).success(function (response) {
				service.refreshPromise = null;
				cookieService.setCookie(_accessTokenId, response.access_token, response.expires_in);
				cookieService.setCookie(_tokenType, response.token_type, response.expires_in);
				cookieService.setCookie(_refreshToken, response.refresh_token);

			}).error(function () {
				service.refreshPromise = null;
				logout();
			});
		}

		function isRefreshing() {
			return isRefreshing;
		}
	}

})();

