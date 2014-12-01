


(function() {

  app.factory('userService', function(utils, labelService, groupService) {
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
        getById: function(userId){
          var user = utils.findById(users, userId);
          user.labels = labelService.getForUser(userId);
          user.groups = groupService.getForUser(userId);
          return user;
        },

        getExternistsForUnit: function(unitId){
          var result = utils.getAllWhere(users, "unitId", unitId);
          result = utils.getAllWhereNotNull(result, "user");
          return result;
        },

        getWhere: function(column, value, array){
          if (array === null) array = users;
          return utils.getAllWhere(array, column, value);
        },
        getAll: function(){
          return users;
        },
        create: function(user){
          // create on server side
          return user;
        },
        deleteUser: function(userId){
          // delete on server side
        }, 
        updateUser: function(user){
          // update on server side
          return user;
        } 

      };
  });

  app.factory('labelService', function(utils) {
      /**
      Users parameters:
        int id - unique
        string name
        string color
        int userId 
      */
      return {
        getById: function(labelId){
          return utils.findById(labels, labelId);
        },
        getForUser: function(userId){
          return utils.getAllWhere(labels, "userId", userId);
        },
        create: function(label){
          // create on server side
          return label;
        },
        deleteLabel: function(labelId){
          // delete on server side
        }, 
        updateLabel: function(label){
          // update on server side
          return label;
        } 
      };

  });

  app.factory('unitService', function(utils) {
      /**
      Users parameters:
        int id - unique
        string name
        array users
        int userId 
      */
      return {
        getById: function(unitId){
          return utils.findById(units, unitId);
        },
        getAll: function(){
          return units;
        },
        create: function(unit){
          // create on server side
          return unit;
        },
        deleteUnit: function(unitId){
          // delete on server side
        }, 
        updateUnit: function(unit){
          // update on server side
          return unit;
        } 
      };
  });

  app.factory('groupService', function(utils) {
      /**
      Users parameters:
        int id - unique
        string name
        array users
        int userId 
      */
      return {
        
        getById: function(groupId){
          return utils.findById(groups, groupId);
        },
        getForUser: function(userId){
          return utils.getAllWhere(groups, "userId", userId);
        },
        create: function(group){
          // create on server side
          return group;
        },
        deleteGroup: function(groupId){
          // delete on server side
        }, 
        updateGroup: function(group){
          // update on server side
          return group;
        } 
      };
  });

//-------------------------------------------------------------
//---------------- FOLDERS  -----------------------------------
//-------------------------------------------------------------

// url of the server, where ouath is
var baseUrlForOauth =  "http://147.32.80.219:8080/integracni-portal/";
// url of the server, where api is
var baseUrl =  "http://147.32.80.219:8080/integracni-portal/rest/v0.1/";

// token for authorization this application on the server
var authorization_token = 'Basic ODU5NWM4Mjg0YTUyNDc1ZTUxNGQ2NjdlNDMxM2U4NmE6MjI2ZDI0NjE3ZTY1NTRkNzFhNjg2MTRjMzQ0MzZkNjc=';

  app.factory('cookieService', function($http) {
      return {
        _defaultExp : 86400, //in seconds (86400 = 1 day)
        _accessToken : null,
        _tokenType : null,
        _refreshToken : null,
        _accessTokenId: "accessToken",
        _refreshToken: "refreshToken",
        _tokenType: "tokenType",
        /**
         * Set cookie
         * @param name
         * @param val value
         * @param exp |null expiration in seconds, it's used _defaultExp when null
         */
        setCookie : function(name, val, exp){

            var d = new Date();
            if (exp === undefined){
                exp = this._defaultExp;
            }
            d.setTime(d.getTime() + (exp*1000));
            var expires = "expires="+d.toGMTString();
            var toSet = name + "=" + val + ";" + expires + ";path=/";
            document.cookie = toSet;
        },

        /**
         * Delete cookie
         * @param string name of cookie
         */
        deleteCookie : function(name){
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
        },

        /**
         * Get the value of cookie
         * @param string name of cookie
         */
        getCookie : function(cname){
          var name = cname + "=";
          var cookies = document.cookie.split(';');
          for(var i=0; i<cookies.length; i++) {
              var c = cookies[i].trim();
              if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
          }
          return null;
        }
      };
  });

  app.factory('httpService', function(cookieService, $http, oauthService, urlService) {
      return {
        _accessTokenId: "accessToken",
        _refreshToken: "refreshToken",
        _tokenType: "tokenType",
        _first: true,

        createRequest: function( method, url, data, contentType){
          var that = this;
          var accessToken = cookieService.getCookie(this._accessTokenId);
          var tokenType = cookieService.getCookie(this._tokenType);
          if (accessToken !== null && tokenType !== null){

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
            oauthService.refresh().success(function(){
              that.createRequest(method, url, data);
            }).error(function(){
              urlService.redirectToLoginPage();
            });
          } else {
            urlService.redirectToLoginPage();
          } 
        }
      };
  });

  app.factory('oauthService', function(cookieService, $http, $location, $window, urlService) {
      return {
        _accessTokenId: "accessToken",
        _refreshToken: "refreshToken",
        _tokenType: "tokenType",

        loginWithPass: function( username, password){
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
          }).success(function(response){
            cookieService.setCookie(that._accessTokenId, response.access_token, response.expires_in);
            cookieService.setCookie(that._tokenType, response.token_type, response.expires_in);
            cookieService.setCookie(that._refreshToken, response.refresh_token);
            urlService.redirectToApp();
          })/*.error(function(data, status, headers, config){
            errorCallback(data, status, headers, config);
          })*/;
        },
        
        logout: function(){
          cookieService.deleteCookie(this._accessTokenId);
          cookieService.deleteCookie(this._tokenType);
          cookieService.deleteCookie(this._refreshToken);
          urlService.redirectToLoginPage();
        },

        refresh: function(){
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
            }).success(function(response){
              cookieService.setCookie(that._accessTokenId, response.access_token, response.expires_in);
              cookieService.setCookie(that._tokenType, response.token_type, response.expires_in);
              cookieService.setCookie(that._refreshToken, response.refresh_token);
            }).error(function(){
              cookieService.deleteCookie(that._accessTokenId);
              cookieService.deleteCookie(that._tokenType);
              cookieService.deleteCookie(that._refreshToken);
              urlService.redirectToLoginPage();
            });
          }
        }
      };
  });

  app.factory('urlService', function($location, $window) {
      return {
        basePath: function(){
          var path = $location.path();
          var absUrl = $location.absUrl();
          return absUrl.substring(0, (absUrl.length-path.length));
        },

        redirectToLoginPage: function(){
          var basepath = this.basePath();
          $window.location.href = basepath + "/login";
        },

        redirect: function(url){
          $location.path(url);
        },

        redirectToApp: function(){
          //var path = $location.path();
          var absUrl = $location.absUrl();
          var basepath = absUrl.substring(0, (absUrl.length-5));
          $window.location.href = basepath;
        }
      };
  });


app.factory('archiveService', function(utils, $http, httpService) {
      /**
      Users parameters:
        int id - unique
        string name
        array users
        int userId 
      */
      return {

        // root
          getAll: function(){
            return $http.get(baseUrl + 'archive');
          },
          
          createFolderInRoot: function(name){
            // create on server side
            return httpService.createRequest("POST", baseUrl + 'archive', {name : name}, "application/json");
          },

        // subfolder of root
          getById: function(archiveId){
            return $http.get(baseUrl + 'archive/folder/' + archiveId);
          },

          createFolder: function(folderId, name){
            // create on server side
            return httpService.createRequest("POST", baseUrl + 'archive/folder/' + folderId, {name : name}, "application/json");
          },

          renameFolder: function(folderId, name){
            // create on server side
            return httpService.createRequest("PUT", baseUrl + 'archive/folder/' + folderId, {name : name}, "application/json");
          },
          
          deleteFolder: function(folderId){
            // create on server side
            return httpService.createRequest("DELETE", baseUrl + 'archive/folder/' + folderId, {}, "application/json");
          },
          
          addFile: function(file, name){
            // create on server side
            return httpService.createRequest(
              "DELETE", 
              baseUrl + 'archive/folder/' + folderId, 
              $.param({fileName: file, name: name}), "multipart/form-data");
          }
      };
  });

//-------------------------------------------------------------
//---------------- UTILS --------------------------------------
//-------------------------------------------------------------

app.factory('utils', function () {
  return {
    // Util for finding an object by its 'id' property among an array
    findById: function findById(array, id) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].id == id) return array[i];
      }
      return null;
    },

    // Util for finding an object by its 'id' property among an array
    getAllWhere: function getAllWhere(array, column, value) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        if (typeof array[i][column] !== 'undefined' && array[i][column] == value) result.push(array[i]);
      }
      return result;
    },

    // Util for finding an object by its 'id' property among an array
    getAllWhereNotNull: function getAllWhereNotNull(array, column) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        if (typeof array[i][column] !== 'undefined') result.push(array[i]);
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
      email: "jan.novak@fel.cvut.cz",
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
      username: "UnitsManager",
      email: "jan.novak@fel.cvut.cz",
      unitId: 1,
      permissions: {
        units: false, 
        externists: true,
        password: false
      },
      size: 4
    },
    // externist
    {id: 3,
      username: "Externist",
      email: "jan.novak@fel.cvut.cz",
      unitId: 1,
      permissions: {
        units: false, 
        externists: false,
        password: true
      },
      user: {
        id: 1,
        email:  "jan.novak@fel.cvut.cz",
      },
      size: 6
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
      unitId: 1,
      size: 8
    }];

  // ----- labels -----
  var labels = [{
    id: 1,
    name: "Štítek 1",
    color: "red",
    userId: 2
  },
  {
    id: 2,
    name: "Štítek 2",
    color: "blue",
    userId: 3
  }];

  // ----- groups -----
  var groups = [{
      id: 1,
      name: "Moje skupina",
      users: ["Jan Novák"],
      userId: 2
  },{
      id: 2,
      name: "Moje skupina druhá",
      users: ["Petr Novák", "Karolína Novotná"],
      userId: 3
  }];

  // ----- units -----
  var units = [{
      id: 1,
      name: "SEN",
      admins: ["Jan Novák"],
      size: 12345 
  },{
      id:2,
      name: "ATG",
      admins: ["Petr Novák", "Karolína Novotná"],
      size: 6543 
  }];

  })();