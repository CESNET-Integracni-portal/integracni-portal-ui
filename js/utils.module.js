////-------------------------------------------------------------
//---------------- UTILS --------------------------------------
//-------------------------------------------------------------
// This module is only for testing

(function () {

    var utlmod = angular.module('utils.module', []);
    // url of the server, where ouath is
    var baseUrlForOauth = "http://147.32.80.219:8080/integracni-portal/";
    // token for authorization this application on the server
    var authorization_token = 'Basic ODU5NWM4Mjg0YTUyNDc1ZTUxNGQ2NjdlNDMxM2U4NmE6MjI2ZDI0NjE3ZTY1NTRkNzFhNjg2MTRjMzQ0MzZkNjc=';

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
