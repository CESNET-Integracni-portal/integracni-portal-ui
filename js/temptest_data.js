
(function () {
// url of the server, where ouath is
// 147.32.80.219
    var baseUrlForOauth = "http://147.32.80.219:8080/integracni-portal/";
// url of the server, where api is
    var baseUrl = "http://147.32.80.219:8080/integracni-portal/rest/v0.1/";

// token for authorization this application on the server
    var authorization_token = 'Basic ODU5NWM4Mjg0YTUyNDc1ZTUxNGQ2NjdlNDMxM2U4NmE6MjI2ZDI0NjE3ZTY1NTRkNzFhNjg2MTRjMzQ0MzZkNjc=';

    app.factory('cookieService', function ($http) {
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

    app.factory('httpService', function (cookieService, $http, oauthService, urlService) {
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

    app.factory('oauthService', function (cookieService, $http, $location, $window, urlService) {
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

    app.factory('urlService', function ($location, $window) {
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

//-------------------------------------------------------------
//---------------- UTILS --------------------------------------
//-------------------------------------------------------------
//dup
    app.factory('utils', function () {
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

//-------------------------------------------------------------
// ---------------- DATA --------------------------------------
//-------------------------------------------------------------

    var users = [
        //super user
        {id: 1,
            username: "SuperUser",
            email: "super@fel.cvut.cz",
            unitId: 0,
            permissions: {
                units: true,
                externists: false,
                password: false
            },
            size: 0
        },
        // manager of units
        {id: 2,
            username: "Kateřina Hašlarová",
            email: "haslakat@fel.cvut.cz",
            unitId: 1,
            permissions: {
                units: true,
                externists: true,
                password: true
            },
            size: 4
        },
        // externist
        {id: 3,
            username: "Externist",
            email: "externista@fel.cvut.cz",
            unitId: 1,
            onuser: "haslakat@fel.cvut.cz",
            permissions: {
                units: false,
                externists: false,
                password: true
            },
            user: {
                id: 1,
                email: "jan.novak@fel.cvut.cz"
            },
            size: 6,
            orgunit: "ATG"
        },
        // student
        {id: 4,
            username: "Student",
            email: "jan.novak@fel.cvut.cz",
            unitId: 2,
            permissions: {
                units: false,
                externists: false,
                password: false
            },
            size: 8
        }];

    // ----- labels -----
    var labels = [{
            id: 1,
            name: "Důležité",
            color: "red",
            userId: 2
        },
        {
            id: 2,
            name: "TODO",
            color: "blue",
            userId: 2
        }];

    // ----- groups -----
    var groups = [{
            id: 1,
            name: "Moje skupina",
            users: ["novakj@fel.cvut.cz"],
            userId: 2
        }, {
            id: 2,
            name: "Moje skupina druhá",
            users: ["novakpet@fel.cvut.cz", "karnovot@fel.cvut.cz"],
            userId: 2
        }];

    // ----- units -----
    var units = [{
            id: 1,
            name: "SEN",
            admin: "novakj@fel.cvut.cz",
            size: 12345
        }, {
            id: 2,
            name: "ATG",
            admin: "karnovot@fel.cvut.cz",
            size: 6543
        }];
})();