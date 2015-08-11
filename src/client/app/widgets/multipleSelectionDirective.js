(function () {

	"use strict";

	/**
	 * Angular JS multiple-selection module
	 * @author Maksym Pomazan
	 * @version 0.0.3
	 */
	angular.module('multipleSelection', [])
		.directive('multipleSelectionZone', multipleSelectionZoneDirective)
		.directive('multipleSelectionItem', multipleSelectionItemDirective);

	/* @ngInject */
	function multipleSelectionZoneDirective($document) {
		return {
			scope: true,
			restrict: 'A',
			require: 'multipleSelectionZone',
			controller: function ($scope, $attrs, $parse) {
				var modelGet = $parse($attrs.model);
				var modelSet = modelGet.assign;

				var actualModel = null;

				if (!modelSet) {
					throw 'Expression ' + $attrs.model + ' is non-assignable.';
				}

				$scope.$watchCollection(modelGet, function(model) {
					if (actualModel === model) {
						return;
					}
					actualModel = model;

					for(var i in elements) {
						var el = elements[i];
						var elScope = el.scope();
						var value = $parse(values[i], el.scope());

						if (angular.isArray(model)) {
							var idx = model.indexOf(value);
							if (idx >= 0) {
								elScope.isSelected = true;
							} else {
								elScope.isSelected = false;
							}
						}
					}
				});

				this.updateModel = function () {
					var newModel = [];
					for (var i in elements) {
						var elScope = elements[i].scope();
						if (elScope.isSelected) {
							newModel.push($parse(values[i])(elScope));
						}
					}
					actualModel = newModel;
					modelSet($scope, newModel);
					$scope.$apply();
				};

				var elements = [];
				var values = [];
				var helperSelecting = false;

				this.addElement = function (el, valueExpression) {
					var model = modelGet($scope);
					var elScope = el.scope();
					var value = $parse(valueExpression)(elScope);
					if (angular.isArray(model) && model.indexOf(value) !== -1) {
						elScope.isSelected = true;
					}
					elements.push(el);
					values.push(valueExpression);
				};

				this.removeElement = function (el) {
					var idx = elements.indexOf(el);
					elements.splice(idx, 1);
					values.splice(idx, 1);
				};

				this.getElements = function () {
					return elements;
				};

				this.setHelperSelecting = function(selecting) {
					helperSelecting = selecting;
				};

				this.isHelperSelecting = function() {
					return helperSelecting;
				};
			},
			link: function (scope, element, iAttrs, controller) {

				scope.isSelectableZone = true;

				var startX = 0,
					startY = 0;
				var helper;
				var started = false;

				element.on('mousedown', function (event) {
					if (event.which !== 1) {
						return;
					}

					started = true;

					startX = event.pageX;
					startY = event.pageY;

					// Attach events
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				});

				function onFirstMove(event) {
					event.preventDefault();

					if (!event.ctrlKey) {
						// Skip all selected or selecting items
						var childs = controller.getElements();
						for (var i = 0; i < childs.length; i++) {
							if (childs[i].scope().isSelecting === true || childs[i].scope().isSelected === true) {
								childs[i].scope().isSelecting = false;
								childs[i].scope().isSelected = false;
								childs[i].scope().$apply();
							}
						}
					}
					// Create helper
					helper = angular
						.element("<div></div>")
						.addClass('select-helper');

					$document.find('body').eq(0).append(helper);
				}


				/**
				 * Method on Mouse Move
				 * @param  {Event} @event
				 */
				function mousemove(event) {
					if (event.pageX !== startX || event.pageY !== startY) {
						if (started) {
							onFirstMove(event);
							started = false;
						}

						controller.setHelperSelecting(true);

						// Prevent default dragging of selected content
						event.preventDefault();
						// Move helper
						moveSelectionHelper(helper, startX, startY, event.pageX, event.pageY);
						// Check items is selecting
						var childs = controller.getElements(element);
						for (var i = 0; i < childs.length; i++) {
							if (checkElementHitting(transformBox(offset(childs[i][0]).left, offset(childs[i][0]).top, offset(childs[i][0]).left + childs[i].prop('offsetWidth'), offset(childs[i][0]).top + childs[i].prop('offsetHeight')), transformBox(startX, startY, event.pageX, event.pageY))) {
								if (childs[i].scope().isSelecting === false) {
									childs[i].scope().isSelecting = true;
									childs[i].scope().$apply();
								}
							} else {
								if (childs[i].scope().isSelecting === true) {
									childs[i].scope().isSelecting = false;
									childs[i].scope().$apply();
								}
							}
						}
					}
				}


				/**
				 * Event on Mouse up
				 * @param  {Event} event
				 */
				function mouseup(event) {
					if (helper) {
						helper.remove();
					}

					$document.off('mousemove', mousemove);
					$document.off('mouseup', mouseup);

					controller.setHelperSelecting(false);

					if (event.pageX !== startX || event.pageY !== startY) {
						// Prevent default dragging of selected content
						event.preventDefault();

						// Change all selecting items to selected
						var childs = controller.getElements(element);

						for (var i = 0; i < childs.length; i++) {
							if (childs[i].scope().isSelecting === true) {
								childs[i].scope().isSelecting = false;

								childs[i].scope().isSelected = event.ctrlKey ? !childs[i].scope().isSelected : true;
								childs[i].scope().$apply();
							} else {
								if (checkElementHitting(transformBox(offset(childs[i][0]).left, offset(childs[i][0]).top, offset(childs[i][0]).left + childs[i].prop('offsetWidth'), offset(childs[i][0]).top + childs[i].prop('offsetHeight')), transformBox(startX, startY, event.pageX, event.pageY))) {
									if (childs[i].scope().isSelected === false) {
										childs[i].scope().isSelected = true;
										childs[i].scope().$apply();
									}
								}
							}
						}

						controller.updateModel();
					}
				}

				/**
				 * Check that 2 boxes hitting
				 * @param  {Object} box1
				 * @param  {Object} box2
				 * @return {Boolean} is hitting
				 */
				function checkElementHitting(box1, box2) {
					return (box2.beginX <= box1.beginX && box1.beginX <= box2.endX || box1.beginX <= box2.beginX && box2.beginX <= box1.endX) &&
						(box2.beginY <= box1.beginY && box1.beginY <= box2.endY || box1.beginY <= box2.beginY && box2.beginY <= box1.endY);
				}

				/**
				 * Transform box to object to:
				 *  beginX is always be less then endX
				 *  beginY is always be less then endY
				 * @param  {Number} startX
				 * @param  {Number} startY
				 * @param  {Number} endX
				 * @param  {Number} endY
				 * @return {Object} result Transformed object
				 */
				function transformBox(startX, startY, endX, endY) {

					var result = {};

					if (startX > endX) {
						result.beginX = endX;
						result.endX = startX;
					} else {
						result.beginX = startX;
						result.endX = endX;
					}
					if (startY > endY) {
						result.beginY = endY;
						result.endY = startY;
					} else {
						result.beginY = startY;
						result.endY = endY;
					}
					return result;
				}

				/**
				 * Method move selection helper
				 * @param  {Element} hepler
				 * @param  {Number} startX
				 * @param  {Number} startY
				 * @param  {Number} endX
				 * @param  {Number} endY
				 */
				function moveSelectionHelper(hepler, startX, startY, endX, endY) {

					var box = transformBox(startX, startY, endX, endY);

					helper.css({
						"top": box.beginY + "px",
						"left": box.beginX + "px",
						"width": (box.endX - box.beginX) + "px",
						"height": (box.endY - box.beginY) + "px"
					});
				}
			}
		};
	}

	/* @ngInject */
	function multipleSelectionItemDirective($parse) {
		return {
			scope: true,
			restrict: 'A',
			require: '?^multipleSelectionZone',
			link: function (scope, element, attrs, zoneController) {

				scope.isSelectable = true;
				scope.isSelecting = false;
				scope.isSelected = false;

				var model = $parse(attrs.value);

				zoneController.addElement(element, model);

				scope.$on('$destroy', function () {
					zoneController.removeElement(element);
				});

				element.on('mouseup', function (event) {
					if (zoneController.isHelperSelecting()) {
						return;
					}

					event.preventDefault();

					if (!event.ctrlKey) {
						var childs = zoneController.getElements();
						for (var i = 0; i < childs.length; i++) {
							if (childs[i].scope().isSelectable) {
								if (childs[i].scope().isSelecting === true || childs[i].scope().isSelected === true) {
									childs[i].scope().isSelecting = false;
									childs[i].scope().isSelected = false;
									childs[i].scope().$apply();
								}
							}
						}
					}
					scope.isSelected = !scope.isSelected;

					zoneController.updateModel();
				});
			}
		};
	}

	function offset(element) {
		var documentElem,
			box = {
				top: 0,
				left: 0
			},
			doc = element && element.ownerDocument;
		documentElem = doc.documentElement;

		if (typeof element.getBoundingClientRect !== undefined) {
			box = element.getBoundingClientRect();
		}

		return {
			top: box.top + (window.pageYOffset || documentElem.scrollTop) - (documentElem.clientTop || 0),
			left: box.left + (window.pageXOffset || documentElem.scrollLeft) - (documentElem.clientLeft || 0)
		};
	}

})();