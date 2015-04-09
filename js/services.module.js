(function () {

    var srvmod = angular.module('services.module', ['utils.module', 'ui.router', 'Mac']);
    // url of the server, where api is
    var baseUrl = "http://147.32.80.219:8080/integracni-portal/rest/v0.1/";
    // url of the server, where ouath is
    var baseUrlForOauth = "http://147.32.80.219:8080/integracni-portal/";
    // token for authorization this application on the server
    var authorization_token = 'Basic ODU5NWM4Mjg0YTUyNDc1ZTUxNGQ2NjdlNDMxM2U4NmE6MjI2ZDI0NjE3ZTY1NTRkNzFhNjg2MTRjMzQ0MzZkNjc=';

    // cookie service
    srvmod.factory('cookieService', function ($http) {
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
    });

    // http service
    srvmod.factory('httpService', function (cookieService, $http, oauthService) {
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
                        oauthService.logout();
                    });
                } else {
                    oauthService.logout();
                }
            }
        };
    });

    // oauth service
    srvmod.factory('oauthService', function ($rootScope, cookieService, modal, $http, $location, $window) {
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
                })/*.error(function(data, status, headers, config){
                 errorCallback(data, status, headers, config);
                 })*/;
            },
            login: function () {
                modal.show('login');
            },
            logout: function () {
                cookieService.deleteCookie(this._accessTokenId);
                cookieService.deleteCookie(this._tokenType);
                cookieService.deleteCookie(this._refreshToken);
                $rootScope.currentUser = null;
                $rootScope.loggedIn = false;
                localStorage.clear();
                this.login();
            },
            refresh: function () {
                var that = this;

                if (localStorage.getItem("loggedIn") !== "true") {
                    $rootScope.currentUser = null;
                } else {
                    $rootScope.loggedIn = true;
                    $rootScope.currentUser = JSON.parse(localStorage.getItem("user"));
                }

                $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                    var requireLogin = toState.data.requireLogin;
                    if (requireLogin && $rootScope.currentUser === null) {
                        event.preventDefault();
                        that.login();
                    }
                });

                var refreshToken = cookieService.getCookie(this._refreshToken);
                if (refreshToken === null) {
                    this.logout();
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
                        this.logout();
                    });
                }
            }
        };
    });

    // url service
    srvmod.factory('urlService', function ($location, $window) {
        return {
            basePath: function () {
                var path = $location.path();
                var absUrl = $location.absUrl();
                return absUrl.substring(0, (absUrl.length - path.length));
            },
            redirect: function () {
                alert(this.basePath());
                $location.path(this.basePath());
            }
        };
    });

    // communication with server API
    // archive service
    srvmod.factory('archiveService', function (httpService) {
        /**
         Users parameters:
         int id - unique
         string name
         array users
         int userId 
         */
        return {
            // root
            getAll: function () {
                return httpService.createRequest("GET", baseUrl + 'archive', {}, "application/json");
            },
            createFolderInRoot: function (name) {
                // create on server side
                return httpService.createRequest("POST", baseUrl + 'archive', {name: name}, "application/json");
            },
            // subfolder of root
            getById: function (archiveId) {
                return httpService.createRequest("GET", baseUrl + 'archive/folder/' + archiveId, {}, "application/json");
            },
            createFolder: function (folderId, name) {
                // create on server side
                return httpService.createRequest("POST", baseUrl + 'archive/folder/' + folderId, {name: name}, "application/json");
            },
            renameFolder: function (folderId, name) {
                // create on server side
                return httpService.createRequest("PUT", baseUrl + 'archive/folder/' + folderId, {name: name}, "application/json");
            },
            deleteFolder: function (folderId) {
                // create on server side
                return httpService.createRequest("DELETE", baseUrl + 'archive/folder/' + folderId, {}, "application/json");
            },
            addFile: function (folderId, file, name) {
                // create on server side
                return httpService.createRequest(
                        "POST",
                        baseUrl + 'archive/folder/' + folderId + "/files",
                        $.param({fileName: file, name: name}), "multipart/form-data");
            }
        };
    });

    // home space service
    srvmod.factory('homeService', function (httpService) {
        /**
         Users parameters:
         int id - unique
         string name
         array users
         int userId 
         */
        return {
            // root
            getAll: function () {
                return httpService.createRequest("GET", baseUrl + 'archive', {}, "application/json");
                //return httpService.createRequest("GET", baseUrl + 'home', {}, "application/json");
            },
            createFolderInRoot: function (name) {
                // create on server side
                return httpService.createRequest("POST", baseUrl + 'archive', {name: name}, "application/json");
                //return httpService.createRequest("POST", baseUrl + 'home', {name: name}, "application/json");
            },
            // subfolder of root
            getById: function (archiveId) {
                return httpService.createRequest("GET", baseUrl + 'archive/folder/' + archiveId, {}, "application/json");
                //return httpService.createRequest("GET", baseUrl + 'home/folder/' + archiveId, {}, "application/json");
            },
            createFolder: function (folderId, name) {
                // create on server side
                return httpService.createRequest("POST", baseUrl + 'archive/folder/' + folderId, {name: name}, "application/json");
                //return httpService.createRequest("POST", baseUrl + 'home/folder/' + folderId, {name: name}, "application/json");
            },
            renameFolder: function (folderId, name) {
                // create on server side
                return httpService.createRequest("PUT", baseUrl + 'archive/folder/' + folderId, {name: name}, "application/json");
                //return httpService.createRequest("PUT", baseUrl + 'home/folder/' + folderId, {name: name}, "application/json");
            },
            deleteFolder: function (folderId) {
                // create on server side
                return httpService.createRequest("DELETE", baseUrl + 'archive/folder/' + folderId, {}, "application/json");
                // return httpService.createRequest("DELETE", baseUrl + 'home/folder/' + folderId, {}, "application/json");
            },
            addFile: function (folderId, file, name) {
                // create on server side
                return httpService.createRequest(
                        "POST",
                        baseUrl + 'home/folder/' + folderId + "/files",
                        $.param({fileName: file, name: name}), "multipart/form-data");
            }
        };
    });

    // groups service
    srvmod.factory('groupService', function (utils, httpService) {
        /**
         Users parameters:
         int id - unique
         string name
         array users
         int userId 
         */
        return {
            getById: function (groupId) {
                return utils.findById(groups, groupId);
            },
            getForUser: function (userId) {
                return utils.getAllWhere(groups, "userId", userId);
            },
            create: function (group) {
                // create on server side
                return group;
            },
            deleteGroup: function (groupId) {
                // delete on server side
            },
            updateGroup: function (group) {
                // update on server side
                return group;
            }
        };
    });

    // users service
    srvmod.factory('userService', function (utils, labelService, groupService, httpService) {
        /**
         Users parameters:
         int id - unique
         string username
         array permissions
         int unitId - id of unit group in which belongs
         int size
         string email
         array user - optional, user, who recomended externist
         */
        return {
            /*
             join users labels
             */
            getCurrent: function () {
                // mocup data
                return user = utils.findById(users, 2);
                //return httpService.createRequest("GET", baseUrl + 'user/current', {}, "application/json");
            },
            getById: function (userId) {
                // přihlášený uživatel se bude do budoucna tahat přes api!!!
                var user = utils.findById(users, userId);
                user.labels = labelService.getForUser(userId);
                user.groups = groupService.getForUser(userId);
                return user;
            },
            getExternistsForUnit: function (unitId) {
                var result = utils.getAllWhere(users, "unitId", unitId);
                result = utils.getAllWhereNotNull(result, "user");
                return result;
            },
            getWhere: function (column, value, array) {
                if (array === null)
                    array = users;
                return utils.getAllWhere(array, column, value);
            },
            getAll: function () {
                return users;
            },
            create: function (user) {
                // create on server side
                return user;
            },
            deleteUser: function (userId) {
                // delete on server side
            },
            updateUser: function (user) {
                // update on server side
                return user;
            }
        };
    });

    // labels service
    srvmod.factory('labelService', function (utils, httpService) {
        /**
         Users parameters:
         int id - unique
         string name
         string color
         int userId 
         */
        return {
            getById: function (labelId) {
                return utils.findById(labels, labelId);
            },
            getForUser: function (userId) {
                return utils.getAllWhere(labels, "userId", userId);
            },
            create: function (label) {
                // create on server side
                return label;
            },
            deleteLabel: function (labelId) {
                // delete on server side
            },
            updateLabel: function (label) {
                // update on server side
                return label;
            }
        };
    });

    // unit service
    srvmod.factory('unitService', function (utils, httpService) {
        /**
         Users parameters:
         int id - unique
         string name
         array users
         int userId 
         */
        return {
            getById: function (unitId) {
                return utils.findById(units, unitId);
            },
            getAll: function () {
                return units;
            },
            create: function (unit) {
                // create on server side
                return unit;
            },
            deleteUnit: function (unitId) {
                // delete on server side
            },
            updateUnit: function (unit) {
                // update on server side
                return unit;
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

