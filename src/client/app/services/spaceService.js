(function () {

	"use strict";

	angular.module('services.module')
		.factory('spaceService', SpaceService);

	/* @ngInject */
	function SpaceService(httpService, $q) {
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
				return httpService.createRequest("GET", 'space', {});
			},
			/**
			 * Retrieve all shared files and folders in a Space
			 *
			 * List all the files and folders that are shared to the current
			 * user in a Space. Optionally use labels query parameter to list
			 * all the files and folders with the given label assigned.
			 *
			 * @param {string} spaceId - space identifier
			 * @param {array} labels - array of labels names as string
			 * @returns {promise}
			 */
			getShared: function (spaceId, labels) {
				// Ready for API v0.2
//                if (typeof labels === 'undefined') {
//                    return httpService.createRequest("GET", 'space/' + spaceId + '/shared', {});
//                } else {
//                    var lbls = labels[0];
//                    for (i = 1; i < labels.length; i++) {
//                        lbls.concat(",", labels[i]);
//                    }
//                    return httpService.createRequest("GET", 'space/' + spaceId + '/shared?labels=' + lbls, {});
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
			 * @param {string} spaceId - space identifier
			 * @param {array} labelIds - labels to filter by
			 * @returns {promise}
			 */
			getAll: function (spaceId, labelIds) {
				var labelParam = '';
				if (labelIds && labelIds.length > 0) {
					labelParam = '?labels=' + labelIds.join(',');
				}
				return httpService.createRequest("GET", 'space/' + spaceId + labelParam, {});
			},
			// FOLDERS
			/**
			 * Create a Folder in a Space Root
			 *
			 * @param {string} spaceId - space identifier
			 * @param {array} folder - folder params
			 * @returns {promise}
			 */
			createFolderInRoot: function (spaceId, folder) {
				// Ready for API v0.2
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder', {name: folder});
			},
			/**
			 * Retrieve a Folder metadata
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId - folder identifier
			 * @returns {promise}
			 */
			getFolder: function (spaceId, folderId) {
				return httpService.createRequest("GET", 'space/' + spaceId + '/folder/' + folderId, {});
			},
			/**
			 * Create a child Folder
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId - parent folder identifier
			 * @param {array} folder - folder parameters
			 * @returns {promise}
			 */
			createFolder: function (spaceId, folderId, folder) {
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + folderId + '/folder', {name: folder});
			},
			/**
			 * Change the name of a Folder
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId - folder indentifier
			 * @param {string} folderName - new name of folder
			 * @returns {promise}
			 */
			renameFolder: function (spaceId, folderId, folderName) {
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + folderId + '/nameChange', {name: folderName});
			},
			/**
			 * Move a Folder to a different Folder
			 *
			 * To move a Folder to a Space Root, the field parent in JSON body
			 *  must be empty string.
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId - folder identifier
			 * @param {int} parentId - parent folder identifier
			 * @returns {promise}
			 */
			moveFolder: function (spaceId, folderId, parentId) {
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + folderId + '/parentChange', {parentId: parentId});
			},
			/**
			 * Put Folder to bin
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId - fodler identifier
			 * @returns {promise}
			 */
			deleteFolder: function (spaceId, folderId) {
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + folderId + '/trash', {});
			},
			/**
			 * Removes current user from sharedWith on given folder
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId - folder identifier
			 * @returns {promise}
			 */
			removeFolderSharing: function (spaceId, folderId) {
				// Ready for API v0.2- not defined by API v0.2 yet
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + folderId + '/removeSharing', {});
			},
			/**
			 * Removes current user from sharedWith on given file
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} fileId - file identifier
			 * @returns {promise}
			 */
			removeFileSharing: function (spaceId, fileId) {
				// Ready for API v0.2- not defined by API v0.2 yet
				return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + fileId + '/removeSharing', {});
			},
			/**
			 * Make Folder online
			 *
			 * Change the state of the folder (and all child files and folders)
			 *  in CESNET storage to online.
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId
			 * @returns {promise}
			 */
			setFolderOnline: function (spaceId, folderId) {
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + folderId + '/online', {});
			},
			/**
			 * Make Folder offline
			 *
			 * Change the state of the folder (and all child files and folders)
			 *  in CESNET storage to offline.
			 *
			 * @param {string} spaceId - space identifier
			 * @param {type} folderId - folder identifier
			 * @returns {promise}
			 */
			setFolderOffline: function (spaceId, folderId) {
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + folderId + '/offline', {});
			},
			/**
			 * Add label to a Folder
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} node - file system node object
			 * @param {int} labelId - label identifier
			 * @returns {promise}
			 */
			addLabel: function (spaceId, node, labelId) {
				if (node.type === 'folder') {
					return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + node.id + '/addLabel', {labelId: labelId});
				} else {
					return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + node.uuid + '/addLabel', {labelId: labelId});
				}
			},
			/**
			 * Remove label from a Folder
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} node - file system node object
			 * @param {int} labelId - label identifier
			 * @returns {promise}
			 */
			removeLabel: function (spaceId, node, labelId) {
				if (node.type === 'folder') {
					return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + node.id + '/removeLabel', {labelId: labelId});
				} else {
					return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + node.uuid + '/removeLabel', {labelId: labelId});
				}
			},
			getFavorites: function (spaceId) {
				return httpService.createRequest("GET", "space/" + spaceId + "/favorites");
			},
			/**
			 * Pin a node to Favorite list.
			 *
			 * @param {string} spaceId - space identifier
			 * @param {object} node
			 * @returns {promise}
			 */
			favorite: function (spaceId, node) {
				if (node.type === 'folder') {
					return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + node.id + '/favorite', {});
				} else {
					return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + node.uuid + '/favorite', {});
				}
			},
			/**
			 * Unpin a node from Favorite list.
			 *
			 * @param {string} spaceId - space identifier
			 * @param {object} node
			 * @returns {promise}
			 */
			unfavorite: function (spaceId, node) {
				if (node.type === 'folder') {
					return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + node.id + '/unfavorite', {});
				} else {
					return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + node.uuid + '/unfavorite', {});
				}
			},
			/**
			 * Share a Folder with Users
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId - folder identifier
			 * @param {array} sharer - array with sharer info
			 * @returns {promise}
			 */
			shareFolder: function (spaceId, folderId, sharer) {
				// Ready for API v0.2
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + folderId + '/share', {sharer: sharer});
			},
			/**
			 * Unshare a Folder
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId - folder identifier
			 * @param {int} unsharer - unsharer
			 * @returns {promise}
			 */
			unshareFolder: function (spaceId, folderId, unsharer) {
				// Ready for API v0.2
				return httpService.createRequest("POST", 'space/' + spaceId + '/folder/' + folderId + '/unshare', {unsharer: unsharer});
			},
			/**
			 * Download folder as .zip file
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} folderId - folder identifier
			 * @returns {promise}
			 */
			downloadFolder: function (spaceId, folderId) {
				// Ready for API v0.2
				return httpService.downloadFile('space/' + spaceId + '/folder/' + folderId + '/download');
			},
			// FILES
			/**
			 * Retrieve a File metadata
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} fileId - file identifier
			 * @returns {promise}
			 */
			getFile: function (spaceId, fileId) {
				// Ready for API v0.2
				return httpService.createRequest("GET", 'space/' + spaceId + '/file/' + fileId, {});
			},
			/**
			 * Change the name of a File
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} fileId - file identifier
			 * @param {string} fileName - new name of a file
			 * @returns {promise}
			 */
			renameFile: function (spaceId, fileId, fileName) {
				// Ready for API v0.2
				return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + fileId + '/nameChange', {name: fileName});
			},
			/**
			 * Move a File to a different Folder
			 *
			 * To move a file to a Space Root, the field parent in JSON body
			 * must be empty string.
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} fileId
			 * @param {int} folderId
			 * @returns {promise}
			 */
			moveFile: function (spaceId, fileId, folderId) {
				// Ready for API v0.2
				return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + fileId + '/parentChange', {parentId: folderId});
			},
			/**
			 * Put File to bin
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} fileId - file identifier
			 * @returns {promise}
			 */
			deleteFile: function (spaceId, fileId) {
				// Ready for API v0.2
				return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + fileId + '/trash', {});
			},
			/**
			 * Make File online
			 *
			 * Change the state of the file in CESNET storage to online.
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} fileId - file identifier
			 * @returns {promise}
			 */
			setFileOnline: function (spaceId, fileId) {
				// Ready for API v0.2
				return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + fileId + '/online', {});
			},
			/**
			 * Make File offline
			 *
			 * Change the state of the file in CESNET storage to offline.
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} fileId - file identifier
			 * @returns {promise}
			 */
			setFileOffline: function (spaceId, fileId) {
				// Ready for API v0.2
				return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + fileId + '/offline', {});
			},
			/**
			 * Share a File with Users
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} fileId
			 * @param {array} users - array of user's IDs
			 * @returns {promise}
			 */
			shareFile: function (spaceId, fileId, users) {
				// Ready for API v0.2
				return httpService.createRequest("POST", 'space/' + spaceId + '/file/' + fileId + '/share', {shareWith: users});
			},
			/**
			 * Retrieve the file contents
			 *
			 * @param {string} spaceId - space identifier
			 * @param {int} fileId - file identifier
			 * @returns {promise}
			 */
			getFileContent: function (spaceId, fileId) {
				// Ready for API v0.2
				return httpService.downloadFile('space/' + spaceId + '/file/' + fileId + '/contents');
			},
			/**
			 * Upload file contents
			 *
			 * @param {string} spaceId - space identifier
			 * @param {object} file - file object
			 * @param {string} content
			 * @returns {promise}
			 */
			uploadFileContent: function (spaceId, file, content) {
				// Ready for API v0.2
				// TODO fileId????
				//return httpService.createRequest("PUT", 'space/'+ spaceId + '/file/' + fileId + '/content', {file: file}, "multipart/form-data");
			},

			downloadSelection: function(spaceId, nodeGroup){
				return httpService.downloadSelection('space/' + spaceId + '/downloadSelection', {
					files: nodeGroup.files,
					folders: nodeGroup.folders,
				});
			}
		};
	}

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

})();

