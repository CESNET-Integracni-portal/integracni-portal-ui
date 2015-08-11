(function () {

	"use strict";

	angular.module('services.module')
		.factory('labelService', LabelService);

	/* @ngInject */
	function LabelService(utils, httpService, $q) {
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
				return httpService.createRequest("GET", 'label');
			},
			/**
			 * Create a new Label
			 *
			 * @param {array} label - label parameters
			 * @returns {promise}
			 */
			createLabel: function (label) {
				return httpService.createRequest("POST", 'label', label);
			},
			/**
			 * Update Label
			 *
			 * @param {int} labelId - label identifier
			 * @param {object} label - label parameters
			 * @returns {promise}
			 */
			updateLabel: function (labelId, label) {
				return httpService.createRequest("PUT", 'label/' + labelId, label);
			},
			/**
			 * Delete Label
			 *
			 * @param {int} labelId - label identifier
			 * @returns {promise}
			 */
			deleteLabel: function (labelId) {
				return httpService.createRequest("DELETE", 'label/' + labelId);
			}
		};
	}

})();

