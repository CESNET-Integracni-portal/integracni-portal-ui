////-------------------------------------------------------------
//---------------- UTILS --------------------------------------
//-------------------------------------------------------------

(function () {

    var utlmod = angular.module('utils.module', []);
    // url of the server, where ouath is
    var baseUrlForOauth = "http://147.32.80.219:8080/integracni-portal/";
    // token for authorization this application on the server
    var authorization_token = 'Basic ODU5NWM4Mjg0YTUyNDc1ZTUxNGQ2NjdlNDMxM2U4NmE6MjI2ZDI0NjE3ZTY1NTRkNzFhNjg2MTRjMzQ0MzZkNjc=';

    utlmod.factory('cookieService', function ($http) {
        return {
            _defaultExp: 86400, //in seconds (86400 = 1 day)
            _accessToken: null,
            _tokenType: null,
            _refreshToken: null,
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
                    if (c.indexOf(name) != -1)
                        return c.substring(name.length, c.length);
                }
                return null;
            }
        };
    });

    utlmod.factory('httpService', function (cookieService, $http, oauthService, urlService) {
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
                        url: url,
                        data: data,
                        headers: {
                            Authorization: tokenType + " " + accessToken,
                            "Content-Type": contentType
                        }
                    });
                } else if (this._first) {
                    this._first = false;
                    oauthService.refresh().success(function () {
                        that.createRequest(method, url, data);
                    }).error(function () {
                        urlService.redirectToLoginPage();
                    });
                } else {
                    urlService.redirectToLoginPage();
                }
            }
        };
    });

    utlmod.factory('oauthService', function (cookieService, $http, $location, $window, urlService) {
        return {
            _accessTokenId: "accessToken",
            _refreshToken: "refreshToken",
            _tokenType: "tokenType",
            loginWithPass: function (username, password) {
                var that = this;
                return $http({
                    method: 'POST',
                    url: baseUrlForOauth + 'oauth/token',
                    data: $.param({
                        username: username,
                        password: password,
                        grant_type: 'password'
                    }),
                    headers: {
                        Authorization: authorization_token,
                        "Content-Type": 'application/x-www-form-urlencoded'
                    }
                }).success(function (response) {
                    cookieService.setCookie(that._accessTokenId, response.access_token, response.expires_in);
                    cookieService.setCookie(that._tokenType, response.token_type, response.expires_in);
                    cookieService.setCookie(that._refreshToken, response.refresh_token);
                    urlService.redirectToApp();
                })/*.error(function(data, status, headers, config){
                 errorCallback(data, status, headers, config);
                 })*/;
            },
            logout: function () {
                cookieService.deleteCookie(this._accessTokenId);
                cookieService.deleteCookie(this._tokenType);
                cookieService.deleteCookie(this._refreshToken);
                urlService.redirectToLoginPage();
            },
            refresh: function () {
                var refreshToken = cookieService.getCookie(this._refreshToken);
                if (refreshToken === null) {
                    urlService.redirectToLoginPage();
                } else {
                    var that = this;
                    $http({
                        method: 'POST',
                        url: baseUrlForOauth + 'oauth/token',
                        data: $.param({
                            grant_type: 'refresh_token',
                            refresh_token: refreshToken
                        }),
                        headers: {
                            Authorization: authorization_token,
                            "Content-Type": 'application/x-www-form-urlencoded'
                        }
                    }).success(function (response) {
                        cookieService.setCookie(that._accessTokenId, response.access_token, response.expires_in);
                        cookieService.setCookie(that._tokenType, response.token_type, response.expires_in);
                        cookieService.setCookie(that._refreshToken, response.refresh_token);
                    }).error(function () {
                        cookieService.deleteCookie(that._accessTokenId);
                        cookieService.deleteCookie(that._tokenType);
                        cookieService.deleteCookie(that._refreshToken);
                        urlService.redirectToLoginPage();
                    });
                }
            }
        };
    });

    utlmod.factory('urlService', function ($location, $window) {
        return {
            basePath: function () {
                var path = $location.path();
                var absUrl = $location.absUrl();
                return absUrl.substring(0, (absUrl.length - path.length));
            },
            redirectToLoginPage: function () {
                var basepath = this.basePath();
                $window.location.href = basepath + "/login";
            },
            redirect: function (url) {
                $location.path(url);
            },
            redirectToApp: function () {
                //var path = $location.path();
                var absUrl = $location.absUrl();
                var basepath = absUrl.substring(0, (absUrl.length - 5));
                $window.location.href = basepath;
            }
        };
    });

    utlmod.factory('utils', function () {
        return {
            // Util for finding an object by its 'id' property among an array
            findById: function findById(array, id) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id === id)
                        return array[i];
                }
                return null;
            },
            // Util for finding an object by its 'id' property among an array
            getAllWhere: function getAllWhere(array, column, value) {
                var result = [];
                for (var i = 0; i < array.length; i++) {
                    if (typeof array[i][column] !== 'undefined' && array[i][column] === value)
                        result.push(array[i]);
                }
                return result;
            },
            // Util for finding an object by its 'id' property among an array
            getAllWhereNotNull: function getAllWhereNotNull(array, column) {
                var result = [];
                for (var i = 0; i < array.length; i++) {
                    if (typeof array[i][column] !== 'undefined')
                        result.push(array[i]);
                }
                return result;
            }
        };
    });
})();
