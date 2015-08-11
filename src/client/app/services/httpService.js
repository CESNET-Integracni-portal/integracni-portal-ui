(function () {

	"use strict";

	angular.module('services.module')
		.factory('httpService', HttpService);

	/* @ngInject */
	function HttpService(cookieService, $http, config) {
		return {
			_accessTokenId: "accessToken",
			_refreshToken: "refreshToken",
			_tokenType: "tokenType",
			_first: true,
			createRequest: function (method, url, data, contentType) {
				var that = this;
				var accessToken = cookieService.getCookie(this._accessTokenId);
				var tokenType = cookieService.getCookie(this._tokenType);
				if (accessToken !== null && tokenType !== null) {

					this._first = true;
					return $http({
						method: method,
						url: config.baseUrl + '/' + url,
						data: data || {},
						headers: {
							Authorization: tokenType + " " + accessToken,
							"Content-Type": contentType || 'application/json'
						}
					});
				} else if (this._first) {
					this._first = false;
					that.createRequest(method, url, data);
				} else {
					throw "unauthenticated";
				}
			},
			downloadFile: function (url) {
				var accessToken = cookieService.getCookie(this._accessTokenId);
				var tokenType = cookieService.getCookie(this._tokenType);
				if (accessToken !== null && tokenType !== null) {

					this._first = true;
					return $http({
						method: 'GET',
						url: config.baseUrl + '/' + url,
						headers: {
							Authorization: tokenType + " " + accessToken
						},
						responseType: 'blob'
					});
				}
			}
		};
	}

})();

