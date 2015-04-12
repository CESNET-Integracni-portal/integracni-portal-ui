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
    srvmod.factory('oauthService', function ($rootScope, cookieService, urlService, modal, $http, $location, $window) {
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
                urlService.redirectToHome();
                this.login();
            },
            refresh: function () {
                var that = this;
                urlService.redirectToHome();
                if (localStorage.getItem("loggedIn") !== "true") {
                    $rootScope.currentUser = null;
                } else {
                    $rootScope.loggedIn = true;
                    $rootScope.currentUser = JSON.parse(localStorage.getItem("user"));
                }

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

                        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                            var requireLogin = toState.data.requireLogin;
                            if (requireLogin && $rootScope.currentUser === null) {
                                event.preventDefault();
                                that.login();
                            }
                        });
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
            redirectToHome: function () {
                $location.path("");
            },
            redirect: function () {
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
                        baseUrl + 'archive/folder/' + folderId + "/files",
                        $.param({fileName: file, name: name}), "multipart/form-data");
//                return httpService.createRequest(
//                        "POST",
//                        baseUrl + 'home/folder/' + folderId + "/files",
//                        $.param({fileName: file, name: name}), "multipart/form-data");
            },
            getFavorites: function () {
                // ??? TODO
                return [];
            },
            favoriteFolder: function () {
                // TODO   
            },
            unfavoriteFolder: function () {
                // TODO
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
                //return httpService.createRequest("GET", baseUrl + 'group/' + groupId, {}, "application/json");
                return utils.findById(groups, groupId);
            },
//            getAll: function (){
//                return httpService.createRequest("GET", baseUrl + 'group', {}, "application/json");
//            },
            getForUser: function (userId) {
                return utils.getAllWhere(groups, "userId", userId);
            },
            create: function (group) {
                // create on server side
                //return httpService.createRequest("POST", baseUrl + 'group', {group: group}, "application/json");
                return group;
            },
            deleteGroup: function (groupId) {
                // delete on server side
                //return httpService.createRequest("DELETE", baseUrl + 'group/' + groupId, {}, "application/json");
            },
            updateGroup: function (groupId, group) {
                // update on server side
                //return httpService.createRequest("PUT", baseUrl + 'group/' + groupId, {group: group}, "application/json");
                return group;
            }
        };
    });


    ///////// READY FOR API v.2 ///////////////
    // roles service
    srvmod.factory('roleService', function (httpService) {
        /**
         int id - unique
         string name
         string description
         array permissions
         */
        return {
            getAll: function () {
                // Ready for API v.2
                return httpService.createRequest("GET", baseUrl + 'role', {}, "application/json");
            },
            getById: function (roleId) {
                // Ready for API v.2
                return httpService.createRequest("GET", baseUrl + 'role/' + roleId, {}, "application/json");
            },
            createRole: function (role) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'role', {role: role}, "application/json");
            },
            updateRole: function (roleId, role) {
                // Ready for API v.2
                return httpService.createRequest("PUT", baseUrl + 'role/' + roleId, {role: role}, "application/json");
            },
            deleteRole: function (roleId) {
                // Ready for API v.2
                return httpService.createRequest("DELETE", baseUrl + 'role' + roleId, {}, "application/json");
            }
        };
    });
    // users service
    srvmod.factory('userService', function (utils, labelService, groupService, httpService) {
        /**
         Users parameters:
         int id - unique
         string username
         string email
         array permissions
         array roles
         int unitId - id of unit group in which belongs
         int quota
         string onuser - optional
         */
        return {
            getAll: function () {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'user', {}, "application/json");
                return users;
            },
            createUser: function (user) {
                // Ready for API v.2
                //return httpService.createRequest("POST", baseUrl + 'user', {user: user}, "application/json");
                return user;
            },
            getById: function (userId) {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'user/' + userId, {}, "application/json");

                var user = utils.findById(users, userId);
                user.labels = labelService.getForUser(userId);
                user.groups = groupService.getForUser(userId);
                return user;
            },
            changePassword: function (userId, password) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'user/' + userId, {'password': password}, "application/json");
            },
            assignUnit: function (userId, unitId) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'user/' + userId, {'unitId': unitId}, "application/json");
            },
            assignRoles: function (userId, roles) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'user/' + userId, {roles: roles}, "application/json");
            },
            grantPermissions: function (userId, permissions) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'user/' + userId, {permission: permissions}, "application/json");
            },
            getCurrent: function () {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'user/current', {}, "application/json");
                return utils.findById(users, 2);
            },
            deleteUser: function (userId) {
                // Ready for API v.2
                //return httpService.createRequest("DELETE", baseUrl + 'user/' + userId, {}, "application/json");
            },
            updateUser: function (userId, user) {
                // Ready for API v.2
                //return httpService.createRequest("PUT", baseUrl + 'user/' + userId, {user: user}, "application/json");
                return user;
            },
            // Helper methods
            getExternistsForUnit: function (unitId) {
                var result = utils.getAllWhere(users, "unitId", unitId);
                result = utils.getAllWhereNotNull(result, "user");
                return result;
            },
            getWhere: function (column, value, array) {
                if (array === null)
                    array = users;
                return utils.getAllWhere(array, column, value);
            }
        };
    });
    // labels service
    srvmod.factory('labelService', function (utils, httpService) {
        /**
         Labels parameters:
         int id - unique
         string name
         string color
         */
        return {
            getAll: function () {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'label', {}, "application/json");
                return labels;
            },
            createLabel: function (label) {
                // Ready for API v.2
                //return httpService.createRequest("POST", baseUrl + 'label', {label: label}, "application/json");
                return label;
            },
            updateLabel: function (labelId, label) {
                // Ready for API v.2
                //return httpService.createRequest("PUT", baseUrl + 'label/' + labelId, {label: label}, "application/json");
                return label;
            },
            deleteLabel: function (labelId) {
                // Ready for API v.2
                //return httpService.createRequest("DELETE", baseUrl + 'label/' + labelId, {}, "application/json");
            },
            //  Help methods for testing without completed backend
            getById: function (labelId) {
                return utils.findById(labels, labelId);
            },
            getForUser: function (userId) {
                return utils.getAllWhere(labels, "userId", userId);
            }
        };
    });
    // unit service
    srvmod.factory('unitService', function (utils, httpService) {
        /**
         Units parameters:
         int id - unique
         string name
         int quota
         admins
         */
        return {
            getAll: function () {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'unit/', {}, "application/json");
                return units;
            },
            createUnit: function (unit) {
                // Ready for API v.2
                //return httpService.createRequest("POST", baseUrl + 'unit/', {unit: unit}, "application/json");
                return unit;
            },
            deleteUnit: function (unitId) {
                // Ready for API v.2
                //return httpService.createRequest("DELETE", baseUrl + 'unit/' + unitId, {}, "application/json");
            },
            updateUnit: function (unitId, unit) {
                // Ready for API v.2
                //return httpService.createRequest("PUT", baseUrl + 'unit/' + unitId, {unit: unit}, "application/json");
                return unit;
            },
            //  Help method for testing without completed backend
            getById: function (unitId) {
                return utils.findById(units, unitId);
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
            quota: 0
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
            quota: 4
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
            quota: 6,
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
            quota: 8
        }];
    // ----- labels -----
    var labels = [{
            id: 1,
            name: "Důležité",
            color: "red"
        },
        {
            id: 2,
            name: "TODO",
            color: "blue"
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
            admins: "novakj@fel.cvut.cz",
            quota: 12345
        }, {
            id: 2,
            name: "ATG",
            admins: "karnovot@fel.cvut.cz",
            quota: 6543
        }];
})();

