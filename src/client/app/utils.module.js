////-------------------------------------------------------------
//---------------- UTILS --------------------------------------
//-------------------------------------------------------------
// This module is only for testing

(function () {

    var utlmod = angular.module('utils.module', []);

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
