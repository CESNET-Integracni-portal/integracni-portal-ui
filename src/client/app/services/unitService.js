(function () {

	"use strict";

	angular.module('services.module')
		.factory('unitService', UnitService);

	/* @ngInject */
	function UnitService(utils, httpService) {
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
				//return httpService.createRequest("GET", 'unit/', {});
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
				return httpService.createRequest("GET", 'unit/' + unitId, {});
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
				return httpService.createRequest("POST", 'unit/' + unitId + '/nameChange', {name: unitName});
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
				return httpService.createRequest("POST", 'unit/' + unitId + '/quotaChange', {quota: quota});
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
				return httpService.createRequest("POST", 'unit/' + unitId + '/adminsAssignment', {admins: admins});
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
				//return httpService.createRequest("POST", 'unit', {unit: unit});
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
				//return httpService.createRequest("DELETE", 'unit/' + unitId, {});
			},
			// Help method for testing without completed backend
			getById: function (unitId) {
				return utils.findById(units, unitId);
			}
		};
	}

	var units = [
		{
			id: 1,
			name: "SEN",
			admins: "novakj@fel.cvut.cz",
			quota: 12345
		}, {
			id: 2,
			name: "ATG",
			admins: "karnovot@fel.cvut.cz",
			quota: 6543
		}
	];

})();

