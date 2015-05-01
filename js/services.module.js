(function () {

    var srvmod = angular.module('services.module', ['utils.module', 'Mac']);

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
                    that.createRequest(method, url, data);
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
            redirectToShared: function () {
                $location.path("shared");
            },
            redirect: function () {
                $location.path(this.basePath());
            }
        };
    });
    // communication with server API
    // home space service - Only for testing API v0.1
    srvmod.factory('homeService', function (httpService) {
        /**
         Folder parameters:
         int id - unique
         string name
         array breadcrumbs
         array folders
         array files
         int createdOn
         int changedOn
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
            downloadFolder: function (folderId) {
                // download request
            },
            deleteFolder: function (folderId) {
                // create on server side
                return httpService.createRequest("DELETE", baseUrl + 'archive/folder/' + folderId, {}, "application/json");
                // return httpService.createRequest("DELETE", baseUrl + 'home/folder/' + folderId, {}, "application/json");
            },
            addFileToRoot: function (file) {
                // create on server side
                return httpService.createRequest(
                        "POST",
                        baseUrl + 'archive', {file: file}, "multipart/form-data");
//                return httpService.createRequest(
//                        "POST",
//                        baseUrl + 'home/folder/' + folderId + "/files",
//                        $.param({fileName: file, name: name}), "multipart/form-data");
            },
            addFile: function (folderId, file) {
                // create on server side
                return httpService.createRequest(
                        "POST",
                        baseUrl + 'archive/folder/' + folderId, {file: file}, "multipart/form-data");
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
    ///////// READY FOR API v.2 ///////////////
    // spaces service
    srvmod.factory('spaceService', function (httpService, utils) {
        /**
         Spaces parameters:
         
         */
        return {
            // SPACES
            /**
             * Retrieve all Spaces
             * 
             * @returns {promise}
             */
            getSpaces: function () {
                // Ready for API v0.2
                return httpService.createRequest("GET", baseUrl + 'space', {}, "application/json");
            },
            /**
             * Retrieve all shared files and folders in a Space
             * 
             * List all the files and folders that are shared to the current 
             * user in a Space. Optionally use labels query parameter to list 
             * all the files and folders with the given label assigned.
             * 
             * @param {id} spaceId - unique ID of the space
             * @param {array} labels - array of labels names as string
             * @returns {promise}
             */
            getShared: function (spaceId, labels) {
                // Ready for API v0.2
//                if (typeof labels === 'undefined') {
//                    return httpService.createRequest("GET", baseUrl + 'space/' + spaceId + '/shared', {}, "application/json");
//                } else {
//                    var lbls = labels[0];
//                    for (i = 1; i < labels.length; i++) {
//                        lbls.concat(",", labels[i]);
//                    }
//                    return httpService.createRequest("GET", baseUrl + 'space/' + spaceId + '/shared?labels=' + lbls, {}, "application/json");
//                }
                return shared;
            },
            /**
             * Retrive all files and folders in a Space Root
             * 
             * List all files and folders in root folder of a Space. Optionally 
             * use labels query parameter to list all the files and folders 
             * with the given label assigned.
             * 
             * @param {int} spaceId - space identifier
             * @param {array} labels - labels to filter by
             * @returns {promise}
             */
            getAll: function (spaceId, labels) {
                // Ready for API v0.2
                if (labels.length === 0) {
                    return httpService.createRequest("GET", baseUrl + 'space/' + spaceId, {}, "application/json");
                } else {
                    var lbls = "" + labels[0];
                    for (i = 1; i < labels.length; i++) {
                        lbls = lbls + "," + labels[i];
                    }
                    return httpService.createRequest("GET", baseUrl + 'space/' + spaceId + '?labels=' + lbls, {}, "application/json");
                }
            },
            // FOLDERS
            /**
             * Create a Folder in a Space Root
             * 
             * @param {int} spaceId - space identifier
             * @param {array} folder - folder params
             * @returns {promise}
             */
            createFolderInRoot: function (spaceId, folder) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder', {folder: folder}, "application/json");
            },
            /**
             * Retrieve a Folder metadata
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @returns {promise}
             */
            getFolder: function (spaceId, folderId) {
                // Ready for API v0.2
                return httpService.createRequest("GET", baseUrl + 'space/' + spaceId + '/folder/' + folderId, {}, "application/json");
            },
            /**
             * Create a child Folder
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - parent folder identifier
             * @param {array} folder - folder parameters
             * @returns {promise}
             */
            createFolder: function (spaceId, folderId, folder) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/folder', {folder: folder}, "application/json");
            },
            /**
             * Change the name of a Folder
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder indentifier
             * @param {string} folderName - new name of folder
             * @returns {promise}
             */
            renameFolder: function (spaceId, folderId, folderName) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/nameChange', {name: folderName}, "application/json");
            },
            /**
             * Move a Folder to a different Folder
             * 
             * To move a Folder to a Space Root, the field parent in JSON body
             *  must be empty string.
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @param {int} parentId - parent folder identifier
             * @returns {promise}
             */
            moveFolder: function (spaceId, folderId, parentId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/parentChange', {parentId: parentId}, "application/json");
            },
            /**
             * Put Folder to bin
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - fodler identifier
             * @returns {promise}
             */
            deleteFolder: function (spaceId, folderId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/trash', {}, "application/json");
            },
            /**
             * Removes current user from sharedWith on given folder
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @returns {promise}
             */
            removeFolderSharing: function (spaceId, folderId) {
                // Ready for API v0.2- not defined by API v0.2 yet
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/removeSharing', {}, "application/json");
            },
            /**
             * Removes current user from sharedWith on given file
             * 
             * @param {int} spaceId - space identifier
             * @param {int} fileId - file identifier
             * @returns {promise}
             */
            removeFileSharing: function (spaceId, fileId) {
                // Ready for API v0.2- not defined by API v0.2 yet
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/removeSharing', {}, "application/json");
            },
            /**
             * Make Folder online
             * 
             * Change the state of the folder (and all child files and folders)
             *  in CESNET storage to online.
             * 
             * @param {int} spaceId
             * @param {int} folderId
             * @returns {promise}
             */
            setFolderOnline: function (spaceId, folderId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/online', {}, "application/json");
            },
            /**
             * Make Folder offline
             * 
             * Change the state of the folder (and all child files and folders)
             *  in CESNET storage to offline.
             * 
             * @param {int} spaceId - space identifier
             * @param {type} folderId - folder identifier
             * @returns {promise}
             */
            setFolderOffline: function (spaceId, folderId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/offline', {}, "application/json");
            },
            /**
             * Add label to a Folder
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @param {int} labelId - label identifier
             * @returns {promise}
             */
            setFolderLabel: function (spaceId, folderId, labelId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/addLabel', {id: labelId}, "application/json");
            },
            /**
             * Remove label from a Folder
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @param {int} labelId - label identifier
             * @returns {promise}
             */
            removeFolderLabel: function (spaceId, folderId, labelId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/removeLabel', {id: labelId}, "application/json");
            },
            /**
             * Pin a Folder to Favorite list.
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @returns {promise}
             */
            favoriteFolder: function (spaceId, folderId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/favorite', {}, "application/json");
            },
            /**
             * Unpin a Folder from Favorite list.
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @returns {promise}
             */
            unfavoriteFolder: function (spaceId, folderId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/unfavorite', {}, "application/json");
            },
            /**
             * Share a Folder with Users
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @param {array} sharer - array with sharer info
             * @returns {promise}
             */
            shareFolder: function (spaceId, folderId, sharer) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/share', {sharer: sharer}, "application/json");
            },
            /**
             * Unshare a Folder
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @param {int} unsharer - unsharer
             * @returns {promise}
             */
            unshareFolder: function (spaceId, folderId, unsharer) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/unshare', {unsharer: unsharer}, "application/json");
            },
            /**
             * Download folder as .zip file
             * 
             * @param {int} spaceId - space identifier
             * @param {int} folderId - folder identifier
             * @returns {promise}
             */
            downloadFolder: function (spaceId, folderId) {
                // Ready for API v0.2
                return httpService.createRequest("GET", baseUrl + 'space/' + spaceId + '/folder/' + folderId + '/download', {}, "application/json");
            },
            // FILES
            /**
             * Retrieve a File metadata
             * 
             * @param {int} spaceId - space identifier
             * @param {int} fileId - file identifier
             * @returns {promise}
             */
            getFile: function (spaceId, fileId) {
                // Ready for API v0.2
                return httpService.createRequest("GET", baseUrl + 'space/' + spaceId + '/file/' + fileId, {}, "application/json");
            },
            /**
             * Change the name of a File
             * 
             * @param {int} spaceId - space identifier
             * @param {int} fileId - file identifier
             * @param {string} fileName - new name of a file
             * @returns {promise}
             */
            renameFile: function (spaceId, fileId, fileName) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/nameChange', {name: fileName}, "application/json");
            },
            /**
             * Move a File to a different Folder
             * 
             * To move a file to a Space Root, the field parent in JSON body 
             * must be empty string.
             * 
             * @param {int} spaceId
             * @param {int} fileId
             * @param {int} folderId
             * @returns {promise}
             */
            moveFile: function (spaceId, fileId, folderId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/parentChange', {parentId: folderId}, "application/json");
            },
            /**
             * Put File to bin
             * 
             * @param {int} spaceId - space identifier
             * @param {int} fileId - file identifier
             * @returns {promise}
             */
            deleteFile: function (spaceId, fileId) {
                // Ready for API v0.2   
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/trash', {}, "application/json");
            },
            /**
             * Make File online
             * 
             * Change the state of the file in CESNET storage to online.
             * 
             * @param {int} spaceId - space identifier
             * @param {int} fileId - file identifier
             * @returns {promise}
             */
            setFileOnline: function (spaceId, fileId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/online', {}, "application/json");
            },
            /**
             * Make File offline
             * 
             * Change the state of the file in CESNET storage to offline.
             * 
             * @param {int} spaceId - space identifier
             * @param {int} fileId - file identifier
             * @returns {promise}
             */
            setFileOffline: function (spaceId, fileId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/offline', {}, "application/json");
            },
            /**
             * Add label to a File
             * 
             * @param {int} spaceId - space identifier
             * @param {int} fileId - file identifier
             * @param {int} labelId - label identifier
             * @returns {promise}
             */
            setFileLabel: function (spaceId, fileId, labelId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/addLabel', {id: labelId}, "application/json");
            },
            /**
             * Remove label from a File
             * 
             * @param {int} spaceId - space identifier
             * @param {int} fileId - file identifier
             * @param {int} labelId - label identifier
             * @returns {promise}
             */
            removeFileLabel: function (spaceId, fileId, labelId) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/removeLabel', {id: labelId}, "application/json");
            },
            /**
             * Share a File with Users
             * 
             * @param {int} spaceId
             * @param {int} fileId
             * @param {array} users - array of user's IDs
             * @returns {promise}
             */
            shareFile: function (spaceId, fileId, users) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/share', {shareWith: users}, "application/json");
            },
            /**
             * Retrieve the file contents
             * 
             * @param {int} spaceId - space identifier
             * @param {int} fileId - file identifier
             * @returns {promise}
             */
            getFileContent: function (spaceId, fileId) {
                // Ready for API v0.2
                return httpService.createRequest("GET", baseUrl + 'space/' + spaceId + '/file/' + fileId + '/content', {}, "application/json");
            },
            /**
             * Upload file contents
             * 
             * @param {int} spaceId - space identifier
             * @param {object} file - file object
             * @param {string} content
             * @returns {promise}
             */
            uploadFileContent: function (spaceId, file, content) {
                // Ready for API v0.2
                // TODO fileId????
                //return httpService.createRequest("PUT", baseUrl + 'space/'+ spaceId + '/file/' + fileId + '/content', {file: file}, "multipart/form-data");  
            }
        };
    });
    // groups service
    srvmod.factory('groupService', function (utils, httpService) {
        /**
         Groups parameters:
         int id - unique
         string name
         array members
         */
        return {
            getAll: function () {
                // Ready for API v0.2
                //return httpService.createRequest("GET", baseUrl + 'group', {}, "application/json");
                return groups;
            },
            createGroup: function (group) {
                // Ready for API v0.2
                //return httpService.createRequest("POST", baseUrl + 'group', {group: group}, "application/json");
                return group;
            },
            deleteGroup: function (groupId) {
                // Ready for API v0.2
                //return httpService.createRequest("DELETE", baseUrl + 'group/' + groupId, {}, "application/json");
            },
            updateGroup: function (groupId, group) {
                // Ready for API v0.2
                //return httpService.createRequest("PUT", baseUrl + 'group/' + groupId, {group: group}, "application/json");
                return group;
            }
        };
    });
    // roles service
    srvmod.factory('roleService', function (httpService) {
        /**
         User roles parameters:
         int id - unique
         string name
         string description
         array permissions
         */
        return {
            /**
             * Retrieve all User Roles
             * 
             * @returns {promise}
             */
            getAll: function () {
                // Ready for API v.2
                return httpService.createRequest("GET", baseUrl + 'role', {}, "application/json");
            },
            /**
             * Create a User Role
             * 
             * @param {array} role - role parameters
             * @returns {promise}
             */
            createRole: function (role) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'role', {role: role}, "application/json");
            },
            /**
             * Retrieve a User Role
             * 
             * @param {int} roleId - role identifier
             * @returns {promise}
             */
            getRole: function (roleId) {
                // Ready for API v.2
                return httpService.createRequest("GET", baseUrl + 'role/' + roleId, {}, "application/json");
            },
            /**
             * Update a User Role
             * 
             * @param {int} roleId - role identifier
             * @param {array} role - role parameters
             * @returns {promise}
             */
            updateRole: function (roleId, role) {
                // Ready for API v.2
                return httpService.createRequest("PUT", baseUrl + 'role/' + roleId, {role: role}, "application/json");
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
            /**
             * Retrieve all Users
             * 
             * @returns {promise}
             */
            getAll: function () {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'user', {}, "application/json");
                return users;
            },
            /**
             * Create a User
             * 
             * @param {array} user - user parameters
             * @returns {promise}
             */
            createUser: function (user) {
                // Ready for API v.2
                //return httpService.createRequest("POST", baseUrl + 'user', {user: user}, "application/json");
                return user;
            },
            /**
             * Retrieve a User
             * 
             * @param {int} userId - user identifier
             * @returns {promise}
             */
            getUser: function (userId) {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'user/' + userId, {}, "application/json");
                var user = utils.findById(users, userId);
                return user;
            },
            /**
             * Change User's password
             * 
             * @param {int} userId - user identifier
             * @param {string} oldpassword - old user's password
             * @param {string} password - new user's password
             * @returns {unresolved}
             */
            changePassword: function (userId, oldpassword, password) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'user/' + userId + '/passwordChange', {oldpassword: oldpassword, password: password}, "application/json");
            },
            /**
             * Assign an Organization Unit to a User
             * 
             * @param {int} userId - user identifier
             * @param {int} unitId - unit identifier
             * @returns {promise}
             */
            assignUnit: function (userId, unitId) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'user/' + userId + '/unitAssignment', {unitId: unitId}, "application/json");
            },
            /**
             * Assign User Roles to a User
             * 
             * @param {int} userId - user identifier
             * @param {array} roles - array of roles names
             * @returns {promise}
             */
            assignRoles: function (userId, roles) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'user/' + userId + '/rolesAssignment', {roles: roles}, "application/json");
            },
            /**
             * Grant permission to a User
             * 
             * @param {int} userId - user identifier
             * @param {array} permissions - array of permissions names
             * @returns {promise}
             */
            grantPermissions: function (userId, permissions) {
                // Ready for API v.2
                return httpService.createRequest("POST", baseUrl + 'user/' + userId + '/permissionsGrant', {permissions: permissions}, "application/json");
            },
            /**
             * Retrieve current logged-in User
             * 
             * @returns {promise}
             */
            getCurrent: function () {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'user/current', {}, "application/json");
                return utils.findById(users, 2);
            },
            // Other methods that should be defined by API v0.2
            deleteUser: function (userId) {
            },
            updateUser: function (userId, user) {
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
            /**
             * Retrive all Labels
             * 
             * @returns {promise}
             */
            getAll: function () {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'label', {}, "application/json");
                return labels;
            },
            /**
             * Create a new Label
             * 
             * @param {array} label - label parameters
             * @returns {promise}
             */
            createLabel: function (label) {
                // Ready for API v.2
                //return httpService.createRequest("POST", baseUrl + 'label', {label: label}, "application/json");
                return label;
            },
            /**
             * Update Label
             * 
             * @param {int} labelId - label identifier
             * @param {array} label - label parameters
             * @returns {promise}
             */
            updateLabel: function (labelId, label) {
                // Ready for API v.2
                //return httpService.createRequest("PUT", baseUrl + 'label/' + labelId, {label: label}, "application/json");
                return label;
            },
            /**
             * Delete Label
             * 
             * @param {int} labelId - label identifier
             * @returns {promise}
             */
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
            /**
             * Retrieve all Organizational Units
             * 
             * @returns {promise}
             */
            getAll: function () {
                // Ready for API v.2
                //return httpService.createRequest("GET", baseUrl + 'unit/', {}, "application/json");
                return units;
            },
            /**
             * Retrieve an Organizational Unit
             * 
             * @param {int} unitId - unit identifier
             * @returns {promise}
             */
            getUnit: function (unitId) {
                // Ready for API v0.2
                return httpService.createRequest("GET", baseUrl + 'unit/' + unitId, {}, "application/json");
            },
            /**
             * Change name of an Organizational Unit
             * 
             * @param {int} unitId - unit identifier
             * @param {string} unitName - new name of org unit
             * @returns {promise}
             */
            renameUnit: function (unitId, unitName) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'unit/' + unitId + '/nameChange', {name: unitName}, "application/json");
            },
            /**
             * Change quota of an Organizational Unit
             * 
             * @param {int} unitId - unit identifier
             * @param {type} quota - size of quota
             * @returns {promise}
             */
            changeQuota: function (unitId, quota) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'unit/' + unitId + '/quotaChange', {quota: quota}, "application/json");
            },
            /**
             * Assign administrators to an Organizational Unit
             * 
             * @param {int} unitId - unit identifier
             * @param {array} admins - array of admin users IDs
             * @returns {promise}
             */
            assignAdmins: function (unitId, admins) {
                // Ready for API v0.2
                return httpService.createRequest("POST", baseUrl + 'unit/' + unitId + '/adminsAssignment', {admins: admins}, "application/json");
            },
            // Methods that should be defined by API v0.2
            /**
             * Create organisational unit
             * 
             * @param {int} unit - array of unit parameters
             * @returns {promise}
             */
            createUnit: function (unit) {
                // Ready for API v0.2
                //return httpService.createRequest("POST", baseUrl + 'unit', {unit: unit}, "application/json");
                return unit;
            },
            /**
             * Delete organisational unit
             * 
             * @param {int} unitId - unit identifier
             * @returns {promise}
             */
            deleteUnit: function (unitId) {
                // Ready for API v.2
                //return httpService.createRequest("DELETE", baseUrl + 'unit/' + unitId, {}, "application/json");
            },
            // Help method for testing without completed backend
            getById: function (unitId) {
                return utils.findById(units, unitId);
            }
        };
    });
//-------------------------------------------------------------
// ---------------- DATA --------------------------------------
//-------------------------------------------------------------

    var shared = {
        "id": "11",
        "name": "home",
        "breadcrumbs": [],
        "folders": [
            {
                "id": "12",
                "name": "prace",
                "owner": 2,
                "perm": ["d", "e"],
                "labels": [{
                        id: 1,
                        name: "Critical",
                        color: "red"
                    }],
                "status": "online",
                "createdOn": "2014-12-31T13:05+0100",
                "changedOn": "2014-12-31T13:09+0100"
            },
            {
                "id": "15",
                "name": "skola",
                "owner": 5,
                "perm": ["e"],
                "labels": [
                    {
                        id: 2,
                        name: "TODO",
                        color: "blue"
                    }],
                "status": "online",
                "createdOn": "2014-12-31T13:05+0100",
                "changedOn": "2014-12-31T13:09+0100"
            },
            {
                "id": "14",
                "name": "hobby",
                "owner": 3,
                "perm": ["d"],
                "labels": [],
                "status": "online",
                "createdOn": "2014-12-31T13:05+0100",
                "changedOn": "2014-12-31T13:09+0100"
            },
            {
                "id": "15",
                "name": "offline_slozka",
                "owner": 5,
                "perm": [],
                "labels": [{
                        id: 1,
                        name: "Critical",
                        color: "red"
                    },
                    {
                        id: 2,
                        name: "TODO",
                        color: "blue"
                    }],
                "status": "offline",
                "createdOn": "2014-12-31T13:05+0100",
                "changedOn": "2014-12-31T13:09+0100"
            }
        ],
        "files": [
            {
                "uuid": "1ff076ae-7f8d-4d07-bb03-71aef2141f91",
                "filename": "todo.txt",
                "mimetype": "text/plain",
                "perm": ["d"],
                "filesize": 86,
                "owner": 2,
                "createdOn": "2014-12-31T13:09+0100",
                "changedOn": "2014-12-31T13:42+0100"
            }
        ],
        "createdOn": "2014-12-31T13:01+0100",
        "changedOn": "2014-12-31T13:05+0100"
    };

    var users = [
        //super user
        {id: 1,
            username: "SuperUser",
            name: "Pepa Karbanátek",
            email: "super@fel.cvut.cz",
            unitId: 0,
            stats: {
                spaceleft: 0
            },
            permissions: {
                units: true,
                main_admin: false,
                externists: false,
                password: false
            },
            quota: 0
        },
        // manager of units
        {id: 2,
            username: "kathaslaaaa",
            name: "Kateřina Hašlarová",
            email: "haslakat@fel.cvut.cz",
            unitId: 1,
            stats: {
                spaceleft: 3.758
            },
            permissions: {
                units: true,
                main_admin: true,
                externists: true,
                password: true
            },
            quota: 4
        },
        // externist
        {id: 3,
            username: "Externist",
            name: "František Mokrý",
            email: "externista@fel.cvut.cz",
            unitId: 1,
            onuser: "haslakat@fel.cvut.cz",
            stats: {
                spaceleft: 6
            },
            permissions: {
                units: false,
                main_admin: false,
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
            name: "Josef Plíhal",
            email: "jan.novak@fel.cvut.cz",
            unitId: 2,
            stats: {
                spaceleft: 4.8
            },
            permissions: {
                units: false,
                main_admin: false,
                externists: false,
                password: false
            },
            quota: 8
        }];
    // ----- labels -----
    var labels = [{
            id: 1,
            name: "Critical",
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

