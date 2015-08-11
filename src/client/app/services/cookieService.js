(function () {

	"use strict";

	angular.module('services.module')
		.factory('cookieService', CookieService);

	/* @ngInject */
	function CookieService() {
		return {
			_defaultExp: 86400, //in seconds (86400 = 1 day)
			_accessToken: null,
			_accessTokenId: "accessToken",
			_refreshToken: "refreshToken",
			_tokenType: "tokenType",
			/**
			 * Set cookie
			 * @param name
			 * @param val value
			 * @param exp |null expiration in seconds, it's used _defaultExp when null
			 */
			setCookie: function (name, val, exp) {

				var d = new Date();
				if (exp === undefined) {
					exp = this._defaultExp;
				}
				d.setTime(d.getTime() + (exp * 1000));
				var expires = "expires=" + d.toGMTString();
				var toSet = name + "=" + val + ";" + expires + ";path=/";
				document.cookie = toSet;
			},
			/**
			 * Delete cookie
			 * @param string name of cookie
			 */
			deleteCookie: function (name) {
				document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
			},
			/**
			 * Get the value of cookie
			 * @param string name of cookie
			 */
			getCookie: function (cname) {
				var name = cname + "=";
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var c = cookies[i].trim();
					if (c.indexOf(name) !== -1)
						return c.substring(name.length, c.length);
				}
				return null;
			}
		};
	}

})();

