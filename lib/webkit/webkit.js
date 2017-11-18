var unikit = angular.module('union-webkit', ['smart-table', 'angular-loading-bar']);
unikit.config(['$compileProvider', function ($compileProvider) {
  //$compileProvider.debugInfoEnabled(false);
}]);
if (String.prototype.capitalize === undefined) {
	String.prototype.capitalize = function (allWords) {
		return (allWords) ?
										this.split(' ').map(word => word.capitalize()).join(' ') :
										this.charAt(0).toUpperCase() + this.slice(1);
	};
}
if (String.prototype.underscore === undefined) {
	String.prototype.underscore = function (upper = false) {
		var under = this.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\-|\s/g, '_');
		return upper ? under.toUpperCase() : under.toLowerCase();
	};
}



var createID = function (element, prefix) {
	var id = element ? element.attr('id') : undefined;
	if (!id) {
		id = prefix + Math.random().toString(16).slice(2);
	}
	return id;
};
/**
 * Construye el criterio de busqueda de elementos para un nodo.
	* @param {HTMLElement} element, Elemento HTMLElement
	* @param {array|string} args, criterios de busqueda de elementos
	* @returns {String} criteria, construcción del criterio de busqueda general.
 */
var createQuerySelectorCriteria = function (element, args) {
	var id;
	if (!angular.isArray(args)) {
		args = args.split(',');
	}
	if (element.id) {
		id = element.id;
	} else {
		var id = "uni" + Math.random().toString(16).slice(2);
		element.id = id;
	}
	var criteria = "";
	for (var i = 0; i < args.length; i += 1) {
		criteria += '#' + id + ' > ' + args[i];
		if (i + 1 < args.length) {
			criteria += ",";
		}
	}
	return criteria;
};
/**
	* realiza la busqueda de elementos hijos dentro del contexto del nodo Element
 * Debido a que no se soporta querySelectorAll(':scope > childElement') para la busqueda de elementos en IE EGE 
	* @param {HTMLElement } element, Elemendo DOM HTMLElement 
	* @param {type} args, argumentos para la busqueda
	* @returns {HTMLElement} retorna un conuntos de elementos HTML DOM
 */
var querySelectorAll = function (element, args) {
	var criteria = createQuerySelectorCriteria(element, args);
	return element.querySelectorAll(criteria);
};
/**
	* realiza la busqueda de elementos hijos dentro del contexto del nodo Element
 * Debido a que no se soporta querySelector(':scope > childElement') para la busqueda de elementos en IE EGE 
	* @param {HTMLElement } element, Elemendo DOM HTMLElement 
	* @param {type} args, argumentos para la busqueda
	* @returns {HTMLElement} retorna un elemento HTML DOM
 */
var querySelector = function (element, args) {
	var criteria = createQuerySelectorCriteria(element, args);
	return element.querySelector(criteria);
};
unikit.directive('ngIncludeSrc', function ($compile, $xhrFactory) {
	return {
		replace: true,
		template: '<code></code>',
		link: function ($scope, elem, attrs, ctrl) {
			attrs.$observe('ngIncludeSrc', function (val) {
				var code = '';
				var get = $xhrFactory('GET', val);
				get.open('GET', val, false);
				get.send(null);
				if (get.status === 200) {
					code = get.responseText;
					code = code
													.replace(/&/g, '&amp;')
													.replace(/"/g, '&quot;')
													.replace(/'/g, '&#39;')
													.replace(/</g, '&lt;')
													.replace(/>/g, '&gt;')
													.replace(/\n/g, '</p><p>')
													.replace(/\s/g, '&nbsp')
													.trim();
					code = '<p>' + code + '</p>';
					code = code.replace(/<p>/g, "<p style='padding:0;margin:0;'>");
				} else {
					code = 'error';
				}
				elem.text('');
				elem.append(code);
			});
		}
	};
});
unikit.directive('ngIncludeNone', function ($compile, $xhrFactory) {
	return {
		replace: true,
		template: '<div></div>',
		link: function ($scope, elem, attrs, ctrl) {
			attrs.$observe('ngIncludeNone', function (val) {
				var code = '';
				var get = $xhrFactory('GET', val);
				get.open('GET', val, false);
				get.send(null);
				if (get.status === 200) {
					code = get.responseText;
					code = code
													.replace(/\s(ui|wk|uni|uc|ou)\-/gmi, ' null-');
				} else {
					code = 'error';
				}
				var linkFn = $compile(code);
				var element = linkFn($scope);
				elem.text('');
				elem.append(element);
			});
		}
	};
});
unikit.directive('ngCompileNone', function ($compile, $xhrFactory) {
	return {
		replace: true,
		template: '<div></div>',
		link: function ($scope, elem, attrs, ctrl) {
			attrs.$observe('ngCompileNone', function (val) {
				var code = '<div>' + val + '</div>';
				code = code.replace(/\s(ui|wk|uni|uc|ou)\-/gmi, ' null-');
				var linkFn = $compile(code);
				var element = linkFn($scope);
				elem.text('');
				elem.append(element);
			});
		}
	};
});
unikit.directive('ngCompileCode', function ($compile, $xhrFactory) {
	return {
		replace: true,
		template: '<div></div>',
		link: function ($scope, elem, attrs, ctrl) {
			attrs.$observe('ngCompileCode', function (val) {
				try {
					var code = '<div>' + val + '</div>';
					var linkFn = $compile(code);
					var element = linkFn($scope);
					elem.text('');
					elem.append(element);
				} catch (e) {
					elem.text('Error: ' + e);
				}
			});
		}
	};
});
unikit.directive('ngOnlineCompile', function ($compile, $xhrFactory) {
	return {
		replace: true,
		scope: {
		},
		template: '<div class="compile-show-case">' +
										'<div uni-panels="{type:\'ACC\'}" >' +
										'<div><header><h2>{{_title}}</h2></header>' +
										'<div><div uni-grid="{cols:[5,7]}">' +
										'<div class="code-container"><div uni-panels="{type:\'tab\', level:\'success\'}">' +
										'<div>' +
										'<header>CODIGO HTLM</header>' +
										'<div class="html-code">' +
										'<textarea uni-editor class="panel-heading form-control" rows="4" ng-model="_inlineHTML"></textarea>' +
										'<div class="content-print-html" contenteditable=true></div>' +
										'</div>' +
										'</div>' +
										'<div>' +
										'<header>CONTROLLER</header>' +
										'<div class="controller-code">' +
										'<textarea readOnly uni-editor="{icon:false}" class="panel-heading form-control" rows="4" ng-model="_inlineScript"></textarea>' +
										'<div class="content-print-controller" contenteditable=true></div>' +
										'</div>' +
										'</div>' +
										'</div></div>' +
										'<div class="code-result"><div uni-panel="{level:\'default\'}">' +
										'<header><span class="header-code-result"><button href="#" ng-click="_applyHTML();_showAcc()" uni-badge="{icon:\'check\', level:\'success\'}" class="badge">Ejecutar codigo</button></span> </header>' +
										'<div class="panel-body" ng-compile-code="{{_inlineHTMLCopy}}"></div>' +
										'</div>' +
										'<div>' +
										'</div>' +
										'</div>' +
										'</div>' +
										'</div>' +
										'	</div>',
		link: function ($scope, $element, $attrs) {
			var contenHTML;
			if ($attrs.print && $attrs.print === "print-block") {
				$element.find(".panel-body .row").children().addClass($attrs.print);
			}

			if ($element.context.querySelector('.html')) {
				contenHTML = $element.context.querySelector('.html').innerHTML;
			} else {
				contenHTML = $element.context.innerHTML || '<div></div>';
			}
			contenHTML = contenHTML.replace(/&gt;/gmi, '>')
											.replace(/&lt;/gmi, '<')
											.replace(/^\s*/gm, '');
			$scope._inlineHTML = contenHTML;

			if ($element.find('.content-print-html')[0]) {
				$element.find('.content-print-html')[0].innerText = contenHTML;
			}

			var contentScript;
			if ($element.context.querySelector('.script')) {
				contentScript = $element.context.querySelector('.script textarea').value;
			} else {
				contentScript = 'El ejemplo no usa "controller"';
			}
			$scope._inlineScript = contentScript;

			if ($element.find('.content-print-controller')[0]) {
				$element.find('.content-print-controller')[0].innerText = contentScript;
			}
			if ($attrs.binding) {
				$scope._inlineDEBUG = '<br/><div class="show-case-ng-binding"><p>' + $attrs.binding + '</p><div uni-grid><pre col="12" class="result-binding">{{ ' + $attrs.binding + ' | json}}</pre></div></div>';
			} else {
				$scope._inlineDEBUG = '';
			}
			$scope._showAcc = function () {
				$element.find('.panel-collapse.collapse').eq(1).addClass('in');
				$element.find('.panel-collapse.collapse').height('auto');
			};
		},
		controller: function ($scope, $attrs) {
			$scope._title = $attrs.ngOnlineCompile || 'Ejemplo #';
			$scope._inlineHTMLCopy = '';
			$scope._applyHTML = function () {
				var controller = $attrs['controller'];
				if (controller !== undefined) {
					$scope._inlineHTMLCopy = '<div ng-controller="' + controller + '">' + $scope._inlineHTML + $scope._inlineDEBUG + '</div>';
				} else {
					$scope._inlineHTMLCopy = $scope._inlineHTML + $scope._inlineDEBUG;
				}
			};
		}
	};
});
unikit.directive('showDoc', function ($compile) {
	return {
		replace: true,
		scope: {
			_doc: '=showDoc'
		},
		template: '<div>CARGADO DOCUMENTO</div>',
		link: function ($scope, elem, attrs) {
			$scope.$watch('_doc', function (val) {
				var doc = val || {message: 'No existe el documento solicitado', error: true};
				var text = 'NONE';
				try {
					if (doc.error) {
						text = '<h1>' + doc.message + '</h1>';
					} else if (doc.description) {
						text = doc.description + ' ' + doc.style;
					} else {
						text = 'cargando....';
					}
				} catch (e) {
					text = 'Error: ' + e;
				}
				elem[0].innerHTML = text;
			});
		}
	};
});

unikit.directive('showJsdoc', function ($compile) {
	var templates = {
		api: function (param, doc) {
			var html = "<div class='api'>";
			html += '<h2>' + param + ' (Archivo:' + doc.file + '.js)</h2></div>';
			return html;
		},
		returns: function (params, doc, scope) {
			var model = 'uni' + Math.random().toString(16).slice(2);
			var html = "<div class='params'>";
			scope[model] = params;
			if (params.length) {
				html += "<h2>Valor de retorno</h2>";
				var table = '<table uni-table>' +
												'<thead><tr><th i18n="name">Nombre</th><th i18n="type">Tipo</th><th i18n="descripcion">Descripción</th>		</tr>	</thead>	' +
												'<tbody>		' +
												'<tr ng-repeat="row in {model}">		<td>{{row.name}}</td>			<td>{{row.type}}</td>			<td>{{row.description}}</td>		</tr>	' +
												'</tbody></table>';
				table = table.replace(/{model}/, model);
			}
			html += table + '</div>';
			return html;
		},
		comment: function (params, doc) {
			var html = "<div class='comment'>";
			var target = "";
			if (params["codeStart"] && params["path"]) {
				target += "<p><b>Archivo: </b>" + params["path"] + "<br><b>Inicio del código</b> linea:" + params["codeStart"] + "</p>";
			}
			if (params['code']) {
				var text = params['code'];
				if (text.search(/function/) || text.search(/var/)) {
					text = text.substring(0, text.indexOf("{"));
					text += "{...}";
				}
				text = addStyleInCode(text, doc);
				html += "<h2>Codigo</h2>" + target + "<pre>" + text + "</pre>";
			}
			html += '</div>';
			return html;
		},
		examples: function (params, doc) {
			var html = "<div class='examples'>";
			if (params.length) {
				html += "<h2>Ejemplos </h2>";
				for (var i = 0; i < params.length; i += 1) {
					var text = addStyleInCode(params[i]['code'], doc);
					html += '<pre>' + text + '</pre>';
				}
			}
			html += '</div>';
			return html;
		},
		lead: function (params) {
			var html = "<div class='lead'>";
			html += '<p>' + params + '</p>';
			html += '</div>';
			return html;
		},
		description: function (params, doc) {
			var html = "<div class='description'>";
			if (!doc.lead) {
				html += '<h2>Descripción</h2>';
				var text = addStyleInCode(params, doc);
				html += '<p>' + text + '</p>';
			}
			html += '</div>';
			return html;
		},
		params: function (params, doc, scope) {
			var model = 'uni' + Math.random().toString(16).slice(2);
			scope[model] = params;
			var html = "<div class='params'>";
			html += "<h2>Paramentros</h2>";
			var table = '<table uni-table>' +
											'<thead><tr><th i18n="name">Nombre</th><th i18n="type">Tipo</th><th i18n="descripcion">Descripción</th>		</tr>	</thead>	' +
											'<tbody>		' +
											'<tr ng-repeat="row in {model}">		<td>{{row.name}}</td>			<td>{{row.type}}</td>			<td>{{row.description}}</td>		</tr>	' +
											'</tbody></table>';
			table = table.replace(/{model}/, model);
			html += table + '</div>';
			return html;
		}
	};

	var createHTML = function (doc, scope) {
		var html = "<div class='showcase-jsdoc'>", item;
		for (var i = 0; i < doc.docs.length; i += 1) {
			var comments = orderComments(doc.docs[i]);
			html += "<div class='method'>";
			for (item in comments) {
				if (templates[item]) {
					doc.docs[i].file = doc.component;
					html += templates[item](comments[item], doc.docs[i], scope);
				}
			}
			html += "</div>";
		}
		html += "</div>";
		return html;
	};

	var addStyleInCode = function (text, doc) {
		text = text.replace(/\>/g, "{span1}");
		text = text.replace(/\</g, "{span2}");
		text = text.replace(/{span1}/g, "<span class='higher'>&gt;</span>");
		text = text.replace(/{span2}/g, "<span class='less'>&lt;</span>");
		text = text.replace(/\(/g, "<span class='parameters'><span class='parenthesis'>(</span>");
		text = text.replace(/\)/g, "<span class='parenthesis'>)</span></span>");
		text = text.replace(/\unikit/g, "<span class='unikit'>unikit</span>");
		text = text.replace(/function/g, "<span class='function'>function</span>");
		text = text.replace(/directive/g, "<span class='directive'>directive</span>");
		if (doc.api) {
			text = text.replace(new RegExp(doc.api), "<span class='component'>" + doc.api + "</span>");
		}

		//<span class='higher'>&gt;</span>
		//<span class='less'>&lt;</span>
		return text;
	};

	var orderComments = function (comments) {
		var order = ['api', 'lead', 'comment', 'description', 'params', 'returns', 'examples'];
		var comm = {};
		for (var i = 0; i < order.length; i += 1) {
			if (comments[order[i]]) {
				comm[order[i]] = comments[order[i]];
			}
		}
		return comm;
	};

	return {
		replace: true,
		scope: {
			_jsdoc: '=showJsdoc'
		},
		template: '<div>CARGADO DOCUMENTO</div>',
		link: function ($scope, elem, attrs) {
			$scope.$watch('_jsdoc', function (val) {
				var doc = val || {message: '<h1>No existe el documento solicitado</h1>', error: true};
				var html = '';
				try {
					if (doc.error) {
						html = '<h1>' + doc.message + '</h1>';
					} else if (doc.component) {
						html = createHTML(doc, $scope);
					} else {
						html = 'cargando....';
					}
				} catch (e) {
					html = '<h1>Error: ' + e + '</h1>';
				}
				html = angular.element(html);
				$compile(html)($scope);
				elem.html(html);
			});
		}
	};
});
/**
 * @version 2.1.8
 * @license MIT
 */
(function (ng, undefined) {
	'use strict';

	ng.module('smart-table', []).run(['$templateCache', function ($templateCache) {
			$templateCache.put('template/smart-table/pagination.html',
				'<div class="row">' +
				'<div class="pull-left" style="padding:3px 10px">' +
				'<st-summary></st-summary>' +
				'</div>' +
				'<div class="pull-right" style="padding:0px 10px">' +
				'<nav ng-if="numPages && pages.length >= 2">' +
				'<ul class="pagination pagination-sm" style="margin:3px 0">' +
				'<li><a href="#" ng-click="selectPage(1)"><span aria-hidden="true">Primero</span></a></li>' +
				'<li><a href="#" ng-click="selectPage(currentPage-1)"><span aria-hidden="true">&#60;</span></a></li>' +
				'<li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a href="javascript: void(0);" ng-click="selectPage(page)">{{page}}</a></li>' +
				'<li><a href="#" ng-click="selectPage(currentPage+1)"><span aria-hidden="true">&#62;</span></a></li>' +
				'<li><a href="#" ng-click="selectPage()"><span aria-hidden="true">Último</span></a></li>' +
				'</ul>' +
				'</nav>' +
				'</div>' +
				'</div>'
				);
		}]);

	ng.module('smart-table')
		.constant('stConfig', {
			pagination: {
				template: 'template/smart-table/pagination.html',
				itemsByPage: 10,
				displayedPages: 5
			},
			search: {
				delay: 400, // ms
				inputEvent: 'input'
			},
			select: {
				mode: 'single',
				selectedClass: 'st-selected'
			},
			sort: {
				ascentClass: 'st-sort-ascent',
				descentClass: 'st-sort-descent',
				descendingFirst: false,
				skipNatural: false,
				delay: 300
			},
			pipe: {
				delay: 100 //ms
			}
		});
	ng.module('smart-table')
		.controller('stTableController', ['$scope', '$parse', '$filter', '$attrs', function StTableController($scope, $parse, $filter, $attrs) {
				var propertyName = $attrs.stTable;
				var displayGetter = $parse(propertyName);
				var displaySetter = displayGetter.assign;
				var safeGetter;
				var orderBy = $filter('orderBy');
				var filter = $filter('filter');
				var safeCopy = copyRefs(displayGetter($scope));
				var tableState = {
					sort: {},
					search: {},
					pagination: {
						start: 0,
						totalItemCount: 0
					}
				};
				var filtered;
				var pipeAfterSafeCopy = true;
				var ctrl = this;
				var lastSelected;

				function copyRefs(src) {
					return src ? [].concat(src) : [];
				}

				function updateSafeCopy() {
					safeCopy = copyRefs(safeGetter($scope));
					if (pipeAfterSafeCopy === true) {
						ctrl.pipe();
					}
				}

				function deepDelete(object, path) {
					if (path.indexOf('.') !== -1) {
						var partials = path.split('.');
						var key = partials.pop();
						var parentPath = partials.join('.');
						var parentObject = $parse(parentPath)(object);
						delete parentObject[key];
						if (Object.keys(parentObject).length === 0) {
							deepDelete(object, parentPath);
						}
					} else {
						delete object[path];
					}
				}

				if ($attrs.stSafeSrc) {
					safeGetter = $parse($attrs.stSafeSrc);
					$scope.$watch(function () {
						var safeSrc = safeGetter($scope);
						return safeSrc && safeSrc.length ? safeSrc[0] : undefined;
					}, function (newValue, oldValue) {
						if (newValue !== oldValue) {
							updateSafeCopy();
						}
					});
					$scope.$watch(function () {
						var safeSrc = safeGetter($scope);
						return safeSrc ? safeSrc.length : 0;
					}, function (newValue, oldValue) {
						if (newValue !== safeCopy.length) {
							updateSafeCopy();
						}
					});
					$scope.$watch(function () {
						return safeGetter($scope);
					}, function (newValue, oldValue) {
						if (newValue !== oldValue) {
							tableState.pagination.start = 0;
							updateSafeCopy();
						}
					});
				}

				/**
				 * sort the rows
				 * @param {Function | String} predicate - function or string which will be used as predicate for the sorting
				 * @param [reverse] - if you want to reverse the order
				 */
				this.sortBy = function sortBy(predicate, reverse) {
					tableState.sort.predicate = predicate;
					tableState.sort.reverse = reverse === true;

					if (ng.isFunction(predicate)) {
						tableState.sort.functionName = predicate.name;
					} else {
						delete tableState.sort.functionName;
					}

					tableState.pagination.start = 0;
					return this.pipe();
				};

				/**
				 * search matching rows
				 * @param {String} input - the input string
				 * @param {String} [predicate] - the property name against you want to check the match, otherwise it will search on all properties
				 */
				this.search = function search(input, predicate) {
					var predicateObject = tableState.search.predicateObject || {};
					var prop = predicate ? predicate : '$';

					input = ng.isString(input) ? input.trim() : input;
					$parse(prop).assign(predicateObject, input);
					// to avoid to filter out null value
					if (!input) {
						deepDelete(predicateObject, prop);
					}
					tableState.search.predicateObject = predicateObject;
					tableState.pagination.start = 0;
					return this.pipe();
				};

				/**
				 * this will chain the operations of sorting and filtering based on the current table state (sort options, filtering, ect)
				 */
				this.pipe = function pipe() {
					var pagination = tableState.pagination;
					var output;
					filtered = tableState.search.predicateObject ? filter(safeCopy, tableState.search.predicateObject) : safeCopy;
					if (tableState.sort.predicate) {
						filtered = orderBy(filtered, tableState.sort.predicate, tableState.sort.reverse);
					}
					pagination.totalItemCount = filtered.length;
					if (pagination.number !== undefined) {
						pagination.numberOfPages = filtered.length > 0 ? Math.ceil(filtered.length / pagination.number) : 1;
						pagination.start = pagination.start >= filtered.length ? (pagination.numberOfPages - 1) * pagination.number : pagination.start;
						output = filtered.slice(pagination.start, pagination.start + parseInt(pagination.number));
					}
					displaySetter($scope, output || filtered);
				};

				/**
				 * select a dataRow (it will add the attribute isSelected to the row object)
				 * @param {Object} row - the row to select
				 * @param {String} [mode] - "single" or "multiple" (multiple by default)
				 */
				this.select = function select(row, mode) {
					var rows = copyRefs(displayGetter($scope));
					var index = rows.indexOf(row);
					if (index !== -1) {
						if (mode === 'single') {
							row.isSelected = row.isSelected !== true;
							if (lastSelected) {
								lastSelected.isSelected = false;
							}
							lastSelected = row.isSelected === true ? row : undefined;
						} else {
							rows[index].isSelected = !rows[index].isSelected;
						}
					}
				};

				/**
				 * take a slice of the current sorted/filtered collection (pagination)
				 *
				 * @param {Number} start - start index of the slice
				 * @param {Number} number - the number of item in the slice
				 */
				this.slice = function splice(start, number) {
					tableState.pagination.start = start;
					tableState.pagination.number = number;
					return this.pipe();
				};

				/**
				 * return the current state of the table
				 * @returns {{sort: {}, search: {}, pagination: {start: number}}}
				 */
				this.tableState = function getTableState() {
					return tableState;
				};

				this.getFilteredCollection = function getFilteredCollection() {
					return filtered || safeCopy;
				};

				/**
				 * Use a different filter function than the angular FilterFilter
				 * @param filterName the name under which the custom filter is registered
				 */
				this.setFilterFunction = function setFilterFunction(filterName) {
					filter = $filter(filterName);
				};

				/**
				 * Use a different function than the angular orderBy
				 * @param sortFunctionName the name under which the custom order function is registered
				 */
				this.setSortFunction = function setSortFunction(sortFunctionName) {
					orderBy = $filter(sortFunctionName);
				};

				/**
				 * Usually when the safe copy is updated the pipe function is called.
				 * Calling this method will prevent it, which is something required when using a custom pipe function
				 */
				this.preventPipeOnWatch = function preventPipe() {
					pipeAfterSafeCopy = false;
				};
			}])
		.directive('stTable', function () {
			return {
				restrict: 'A',
				controller: 'stTableController',
				link: function (scope, element, attr, ctrl) {

					if (attr.stSetFilter) {
						ctrl.setFilterFunction(attr.stSetFilter);
					}

					if (attr.stSetSort) {
						ctrl.setSortFunction(attr.stSetSort);
					}
				}
			};
		});

	ng.module('smart-table')
		.directive('stSearch', ['stConfig', '$timeout', '$parse', function (stConfig, $timeout, $parse) {
				return {
					require: '^stTable',
					link: function (scope, element, attr, ctrl) {
						var tableCtrl = ctrl;
						var promise = null;
						var throttle = attr.stDelay || stConfig.search.delay;
						var event = attr.stInputEvent || stConfig.search.inputEvent;

						attr.$observe('stSearch', function (newValue, oldValue) {
							var input = element[0].value;
							if (newValue !== oldValue && input) {
								ctrl.tableState().search = {};
								tableCtrl.search(input, newValue);
							}
						});

						//table state -> view
						scope.$watch(function () {
							return ctrl.tableState().search;
						}, function (newValue, oldValue) {
							var predicateExpression = attr.stSearch || '$';
							if (newValue.predicateObject && $parse(predicateExpression)(newValue.predicateObject) !== element[0].value) {
								element[0].value = $parse(predicateExpression)(newValue.predicateObject) || '';
							}
						}, true);

						// view -> table state
						element.bind(event, function (evt) {
							evt = evt.originalEvent || evt;
							if (promise !== null) {
								$timeout.cancel(promise);
							}

							promise = $timeout(function () {
								tableCtrl.search(evt.target.value, attr.stSearch || '');
								promise = null;
							}, throttle);
						});
					}
				};
			}]);

	ng.module('smart-table')
		.directive('stSelectRow', ['stConfig', function (stConfig) {
				return {
					restrict: 'A',
					require: '^stTable',
					scope: {
						row: '=stSelectRow',
						rowOut: '='
					},
					link: function (scope, element, attr, ctrl) {
						var mode = attr.stSelectMode || stConfig.select.mode;
						element.bind('click', function () {
							scope.$apply(function () {
								ctrl.select(scope.row, mode);
							});
						});

						scope.$watch('row.isSelected', function (newValue) {
							if (newValue === true) {
								element.addClass(stConfig.select.selectedClass);
							} else {
								element.removeClass(stConfig.select.selectedClass);
							}
						});
					}
				};
			}]);

	ng.module('smart-table')
		.directive('stSort', ['stConfig', '$parse', '$timeout', function (stConfig, $parse, $timeout) {
				return {
					restrict: 'A',
					require: '^stTable',
					link: function (scope, element, attr, ctrl) {

						var predicate = attr.stSort;
						var getter = $parse(predicate);
						var index = 0;
						var classAscent = attr.stClassAscent || stConfig.sort.ascentClass;
						var classDescent = attr.stClassDescent || stConfig.sort.descentClass;
						var stateClasses = [classAscent, classDescent];
						var sortDefault;
						var skipNatural = attr.stSkipNatural !== undefined ? attr.stSkipNatural : stConfig.sort.skipNatural;
						var descendingFirst = attr.stDescendingFirst !== undefined ? attr.stDescendingFirst : stConfig.sort.descendingFirst;
						var promise = null;
						var throttle = attr.stDelay || stConfig.sort.delay;

						if (attr.stSortDefault) {
							sortDefault = scope.$eval(attr.stSortDefault) !== undefined ? scope.$eval(attr.stSortDefault) : attr.stSortDefault;
						}

						//view --> table state
						function sort() {
							if (descendingFirst) {
								index = index === 0 ? 2 : index - 1;
							} else {
								index++;
							}

							var func;
							predicate = ng.isFunction(getter(scope)) || ng.isArray(getter(scope)) ? getter(scope) : attr.stSort;
							if (index % 3 === 0 && !!skipNatural !== true) {
								//manual reset
								index = 0;
								ctrl.tableState().sort = {};
								ctrl.tableState().pagination.start = 0;
								func = ctrl.pipe.bind(ctrl);
							} else {
								func = ctrl.sortBy.bind(ctrl, predicate, index % 2 === 0);
							}
							if (promise !== null) {
								$timeout.cancel(promise);
							}
							if (throttle < 0) {
								func();
							} else {
								promise = $timeout(func, throttle);
							}
						}

						element.bind('click', function sortClick() {
							if (predicate) {
								scope.$apply(sort);
							}
						});

						if (sortDefault) {
							index = sortDefault === 'reverse' ? 1 : 0;
							sort();
						}

						//table state --> view
						scope.$watch(function () {
							return ctrl.tableState().sort;
						}, function (newValue) {
							if (newValue.predicate !== predicate) {
								index = 0;
								element
									.removeClass(classAscent)
									.removeClass(classDescent);
							} else {
								index = newValue.reverse === true ? 2 : 1;
								element
									.removeClass(stateClasses[index % 2])
									.addClass(stateClasses[index - 1]);
							}
						}, true);
					}
				};
			}]);

	ng.module('smart-table')
		.directive('stPagination', ['stConfig', function (stConfig) {
				return {
					restrict: 'EA',
					require: '^stTable',
					scope: {
						stItemsByPage: '=?',
						stDisplayedPages: '=?',
						stPageChange: '&'
					},
					templateUrl: function (element, attrs) {
						if (attrs.stTemplate) {
							return attrs.stTemplate;
						}
						return stConfig.pagination.template;
					},
					link: function (scope, element, attrs, ctrl) {

						scope.stItemsByPage = scope.stItemsByPage ? +(scope.stItemsByPage) : stConfig.pagination.itemsByPage;
						scope.stDisplayedPages = scope.stDisplayedPages ? +(scope.stDisplayedPages) : stConfig.pagination.displayedPages;

						scope.currentPage = 1;
						scope.pages = [];

						function redraw() {
							var paginationState = ctrl.tableState().pagination;
							var start = 1;
							var end;
							var i;
							var prevPage = scope.currentPage;
							scope.totalItemCount = paginationState.totalItemCount;
							scope.currentPage = Math.floor(paginationState.start / paginationState.number) + 1;
							paginationState.currentPage = scope.currentPage;

							start = Math.max(start, scope.currentPage - Math.abs(Math.floor(scope.stDisplayedPages / 2)));
							end = start + scope.stDisplayedPages;

							if (end > paginationState.numberOfPages) {
								end = paginationState.numberOfPages + 1;
								start = Math.max(1, end - scope.stDisplayedPages);
							}

							scope.pages = [];
							scope.numPages = paginationState.numberOfPages;

							for (i = start; i < end; i++) {
								scope.pages.push(i);
							}

							if (prevPage !== scope.currentPage) {
								scope.stPageChange({newPage: scope.currentPage});
							}
						}

						//table state --> view
						scope.$watch(function () {
							return ctrl.tableState().pagination;
						}, redraw, true);

						//scope --> table state  (--> view)
						scope.$watch('stItemsByPage', function (newValue, oldValue) {
							if (newValue !== oldValue) {
								scope.selectPage(1);
							}
						});

						scope.$watch('stDisplayedPages', redraw);

						//view -> table state
						scope.selectPage = function (page) {
							if (page > 0 && page <= scope.numPages) {
								ctrl.slice((page - 1) * scope.stItemsByPage, scope.stItemsByPage);
							} else if (page === undefined) {
								ctrl.slice((scope.totalItemCount - 1) * scope.stItemsByPage, scope.stItemsByPage);
							}
						};

						if (!ctrl.tableState().pagination.number) {
							ctrl.slice(0, scope.stItemsByPage);
						}
					}
				};
			}]);

	ng.module('smart-table')
		.directive('stPipe', ['stConfig', '$timeout', function (config, $timeout) {
				return {
					require: 'stTable',
					scope: {
						stPipe: '='
					},
					link: {

						pre: function (scope, element, attrs, ctrl) {

							var pipePromise = null;

							if (ng.isFunction(scope.stPipe)) {
								ctrl.preventPipeOnWatch();
								ctrl.pipe = function () {

									if (pipePromise !== null) {
										$timeout.cancel(pipePromise);
									}

									pipePromise = $timeout(function () {
										scope.stPipe(ctrl.tableState(), ctrl);
									}, config.pipe.delay);

									return pipePromise;
								};
							}
						},

						post: function (scope, element, attrs, ctrl) {
							ctrl.pipe();
						}
					}
				};
			}]);

	ng.module('smart-table')
		.directive('stSummary', function ($timeout) {
			return {
				restrict: 'E',
				require: '^stTable',
				template: '<span>Registros {{page.totalItemCount > 0 ? page.start +1: 0}} al {{(page.number)*page.currentPage > page.totalItemCount ? page.totalItemCount : (page.number)*page.currentPage}} de un total de {{page.totalItemCount}}</span>',
				link: function (scope, element, attr, ctrl) {
					scope.page = ctrl.tableState().pagination;
				}
			};
		});

})(angular);
unikit.factory('$unikit', ['$rootScope', function ($rootScope) {

		var DEFAUTL_CLASS_ICON = 'fa fa-';

		var VALIDATE_MESSAGE = {
			convertTo: "Error al convertir el valor",
			convertTo$number: "Error al convertir el numero",
			convertTo$date: "Error al convertir la fecha",
			convertTo$datetime: "Error al convertir la fecha y hora",
			convertTo$time: "Error al convertir la hora",
			format: 'Es valor es requerido',
			format$number: 'Es valor es requerido',
			format$date: 'Es valor es requerido',
			validate: 'Es valor es requerido',
			validate$number: 'Es valor es requerido',
			validate$date: 'Es valor es requerido',
			required: 'Es requerido el valor',
			required$text: 'Se requiere un valor texto',
			required$file: 'Se requiere adjuntar archivos',
			required$date: 'Seleccione una fecha',
			required$datetime: 'Seleccione una fecha y hora',
			required$time: 'Seleccione una hora',
			required$number: 'Se requiere un valor numerico',
			required$email: 'Se requiere el correo',
			required$select: 'Seleccione un valor',
			email$email: 'Valor invalido para correo',
			number$number: 'valor nuemerico invalido',
			lbl: 'valor',
			lbl$nobre: 'Nombre',
			lbl$sexo: 'Sexo'
		};

		var REGEX = [
			//filtro
			[/filter|filtrar/i, {icon: 'filter', text: true, level: 'primary', position: 'left'}],
			[/apply|aplicar/i, {icon: 'check', text: true, level: 'success', position: 'right'}],
			[/clear|limpiar/i, {icon: 'ban', text: true, level: 'danger', position: 'left'}],
			[/volver|return/i, {icon: 'arrow-left', text: true, level: 'danger', position: 'left'}],
			//bandeja
			[/crear|adicionar|add|nuevo/i, {icon: 'plus', text: true, level: 'primary', position: 'left'}],
			[/modif|edit/i, {icon: 'pencil', text: true, level: 'primary', position: 'left'}],
			[/view|ver|dato/i, {icon: 'eye', text: true, level: 'primary', position: 'left'}],
			[/infor|show/i, {icon: 'eye', text: true, level: 'success', position: 'left'}],
			[/elimin|delete|del/i, {icon: 'remove', text: true, level: 'danger', position: 'left'}],
			//modales
			[/sigui|next/i, {icon: 'arrow-right', text: true, level: 'primary', position: 'right'}],
			[/x|X/i, {icon: 'close', text: false, level: 'danger', position: 'left'}],
			[/cerrar|close/i, {icon: 'close', text: true, level: 'danger', position: 'left'}],
			[/cancel|cancelar|no/i, {icon: 'reply', text: true, level: 'warning', position: 'left'}],
			[/save|guardar/i, {icon: 'save', text: true, level: 'info', position: 'left'}],
			[/actuali|updat/i, {icon: 'save', text: true, level: 'info', position: 'left'}],
			[/acept|aceptar|si/i, {icon: 'check', text: true, level: 'success', position: 'left'}],
			[/enviar|send/i, {icon: 'paper-plane', text: true, level: 'success', position: 'left'}],
			[/refresh|recargar/i, {icon: 'refresh', text: true, level: 'primary', position: 'left'}],
			//otros
			[/busca|search/i, {icon: 'search', text: true, level: 'primary', position: 'right'}],
			[/atras|back/i, {icon: 'arrow-left', text: true, level: 'danger', position: 'left'}],
			[/print|imprimir/i, {icon: 'print', text: true, level: 'success', position: 'left'}],
			[/download|descargar/i, {icon: 'download', text: true, level: 'success', position: 'left'}]
		];

		var UI_UNIKIT = {
			UNI_PANEL: {
				__type: 'type',
				__default: 'PANEL',
				__tag: ['div', 'fieldset'],
				PANEL: {skip: false, level: 'default'},
				SUBPANEL: {skip: false, level: 'default'},
				MODAL: {skip: false, level: 'default', content: false, size: 'md', height: 'none'}
			},
			UNI_PANELS: {
				__type: 'type',
				__default: 'TAB',
				__tag: ['div'],
				TAB: {skip: false, level: 'default'},
				ACC: {skip: false, level: 'default', autoclose: false},
				LTAB: {skip: false, level: 'default'}
				//RTAB: {skip: false, icon: 'tab', level: 'default'},
				//BTAB: {skip: false, icon: 'tab', level: 'default'},
				//SLIDE: {skip: false, icon: 'tab', level: 'default', interval: false, links: true, control: true}
			},
			UNI_GRID: {
				__type: 'type',
				__default: 'GRID',
				__tag: ['div'],
				GRID: {skip: false, extend: true, cols: [1, 3], status: 'active'},
				TABLE: {skip: false, extend: true}
			},
			UNI_INPUT: {
				__type: 'type',
				__default: 'TEXT',
				__tag: ['input'],
				TEXT: {skip: false, icon: false, defaultIcon: 'pencil', level: 'default', convert: 'text'},
				TIME: {skip: false, icon: true, defaultIcon: 'clock-o', level: 'default', convert: 'time'},
				NUMBER: {skip: false, icon: true, defaultIcon: 'hashtag', level: 'default', convert: 'number'},
				PASSWORD: {skip: false, icon: true, defaultIcon: 'key', level: 'default', convert: 'text'},
				EMAIL: {skip: false, icon: true, defaultIcon: 'envelope-o', level: 'default', convert: 'email'},
				DATE: {skip: false, icon: true, defaultIcon: 'calendar', level: 'default', convert: 'date'},
				DATETIME: {skip: false, icon: true, defaultIcon: 'calendar;clock-o', level: 'default', convert: 'datetime'},
				DATETIME_LOCAL: {skip: false, icon: true, defaultIcon: 'calendar;clock-o', level: 'default', convert: 'datetime'},
				FILE: {skip: false, icon: true, defaultIcon: 'folder-open', level: 'primary', convert: 'file'},
				OBJECT: {skip: false, icon: true, defaultIcon: 'box', convert: 'object'},
				ARRAY: {skip: false, icon: true, defaultIcon: 'box', convert: 'array'}
			},
			UNI_OUTPUT: {
				__type: 'node',
				__default: 'LABEL',
				__tag: ['label', 'span'],
				LABEL: {skip: false},
				SPAN: {skip: false}
			},
			UNI_FILTER: {
				__default: 'FILTER',
				__tag: ['input'],
				FILTER: {skip: false, icon: 'filter'}
				//FILTER: {skip: false, icon: 'filter', ope: [], nope: []}
			},
			UNI_SELECT: {
				__type: 'mode',
				__default: 'NATIVE',
				__tag: ['select'],
				NORMAL: {skip: false, icon: false, defaultIcon: 'align-justify', level: 'default', convert: false},
				SEARCH: {skip: false, icon: false, defaultIcon: 'align-justify', level: 'default', convert: false, search: true},
				NATIVE: {skip: false, icon: false, defaultIcon: 'align-justify', level: 'default', convert: false}
			},
			UNI_GROUP: {
				__type: 'type',
				__default: 'GROUP',
				__tag: ['span'],
				GROUP: {skip: false}
			},
			UNI_EDITOR: {
				__default: 'NORMAL',
				__type: 'mode',
				__tag: ['textarea'],
				NORMAL: {skip: false, icon: false, level: 'default', convert: false}
			},
			UNI_TREE: {
				__type: 'type',
				__default: 'TREE',
				__tag: ['ul'],
				TREE: {children: 'children', /*collapse: false, draggable: false,*/ state: {open: 'folder-open:+', close: 'folder', item: 'file'}}
			},
			UNI_ACTION: {
				__type: 'type',
				__default: 'BLOCK',
				__tag: ['div', 'span'],
				BLOCK: {skip: false, extend: true},
				DROPDOWN: {skip: false, extend: true, title: 'Opciones'},
				HEADER: {skip: false, extend: true}
			},
			UNI_SCROLL: {
				__type: 'type',
				__default: 'SCROLL',
				__tag: ['div', 'tbody'],
				SCROLL: {skip: false, height: 'none', always: false},
				NATIVE: {skip: false, height: 'none'}
			},
			UNI_IMAGE: {
				__type: 'type',
				__default: 'IMAGE',
				__tag: ['img'],
				IMAGE: {skip: false, design: 'rounded', expand: false, download: false}
			}
		};
		var FN_UNIKIT = {
			UNI_PAGER: {
				__type: 'type',
				__default: 'FILTER',
				__tag: ['div'],
				SIMPLE: {skip: false, config: {index: 1, size: 10, last: null}, open: false},
				FILTER: {skip: false, config: {index: 1, size: 10, last: null}, open: false}
			},
			UNI_TABLE: {
				__default: 'TABLE',
				__tag: ['table'],
				TABLE: {skip: false, select: undefined, selected: undefined}
				//TABLE: {skip: false, select: undefined, selected: undefined, sort: undefined}
			},
			UNI_VALIDATOR: {
				__type: 'type',
				__default: 'MODAL',
				__tag: ['form'],
				MODAL: {skip: false, validationsMessage: VALIDATE_MESSAGE},
				TOOLTIP: {skip: false, validationsMessage: VALIDATE_MESSAGE}
			},
			UNI_CONFIRM: {
				__default: 'CONFIRM',
				__tag: ['button'],
				CONFIRM: {skip: false, message: ''}
			},
			UNI_PART: {
				__tag: ['div'],
				PART: {skip: false, replace: null}
			},
			UNI_PLUS: {
				__type: 'type',
				__default: 'DIV',
				__tag: ['div', 'tr'],
				DIV: {skip: false},
				TR: {skip: false}
			},
			I18N: {
				__tag: ['label', 'span', 'a', 'button'],
				__type: 'lang',
				__default: 'ES',
				ES: {skip: false, variable: 'i18n'},
				EN: {skip: false, variable: 'i18n'}
			}
		};

		var CONVERT = {
			TEXT: {transform: 'none'},
			EMAIL: {mask: 'abc123@abc123.abc123'},
			TIME: {format: 'HH:mm:ss', mask: '00:00:00', options: {placeholder: '__:__:__', clearIfNotMatch: false}},
			DATE: {format: 'DD/MM/YYYY', mask: '00/00/0000', options: {placeholder: '__/__/____', clearIfNotMatch: false}},
			DATETIME: {format: "DD/MM/YYYY HH:mm:ss", mask: '00/00/0000 00:00:00', options: {placeholder: '__/__/____ __:__:__', clearIfNotMatch: false}},
			NUMBER: {},
			INTEGER: {mask: '##0', options: {reverse: true, clearIfNotMatch: true}},
			DOUBLE: {mask: '#0,0#', decimalChar: ',', options: {placeholder: '#0,0#', reverse: true, clearIfNotMatch: false}},
			MONEY: {mask: '9.999.999.999.990,00', decimalChar: ',', options: {placeholder: '#0,00', reverse: true, clearIfNotMatch: false}},
			MONEY3: {mask: '#.###.###.###.##0,000', decimalChar: ',', options: {placeholder: '#0,000', reverse: true, clearIfNotMatch: false}},
			MONEY5: {mask: '#.###.###.###.##0,00000', decimalChar: ',', options: {placeholder: '#0,00000', reverse: true, clearIfNotMatch: false}},
			MONEY8: {mask: '#.###.###.###.##0,00000000', decimalChar: ',', options: {placeholder: '#0,00000000', reverse: true, clearIfNotMatch: false}},
			FILE: {multiple: false},
			OBJECT: {},
			ARRAY: {}
		};

		var impl = {
			/**
				* Clone a DOM Element, if isRemoveAttr is true, remove all atribute
				* @param {type} dom
				* @param {type} isRemoveAttr
				* @return {unresolved}
				*/
			cloneDomNode: function (dom, isRemoveAttr = true) {
				var clone = dom.cloneNode(true);
				if (isRemoveAttr) {
					clone = document.createElement(dom.tagName);
					clone.innerHTML = dom.innerHTML;
				}
				return clone;
			},
			createConvertConfig: function (dom, config) {
				var convertName = config.convert;
				if (convertName === true || !convertName) { //auto convert by type
					convertName = config.type;
				}
				var uniConvert = dom.getAttribute('uni-convert');
				var definedConvert = undefined;
				if (convertName && !uniConvert) {
					var defaultConvert = CONVERT[convertName.toUpperCase()];
					definedConvert = {type: convertName};
					for (var attrName in defaultConvert) {
						if (config.hasOwnProperty(attrName)) {
							definedConvert[attrName] = config[attrName];
						}
					}
				}
				return definedConvert;
			},
			/**
				* Return by reference NG Attribute only with ngShow and ngHiden directives
				* Return by reference DOM Attribute with other attribute directive
				* Return DOM with name attribute if is INPUT, SELECT or TEXTAREA
				* @param {type} element : NG Element
				* @param {type} attrs : NG Attributes
				* @param {type} compName : Directive Name
				* @return {undefined}
				*/
			processAllowAttributes: function (element, attrs, compName) {
				var dom = element[0];
				var notAllowNG = ['class', 'style', compName];
				var allowInputs = ['INPUT', 'TEXTAREA', 'SELECT'];
				var removeNglist = ['ngShow', 'ngHide', 'ngClick', 'ngIf'];
				angular.forEach(notAllowNG, function (name) {
					delete attrs[name];
					name = attrs.$attr[name] || name;
					dom.removeAttribute(name);
				});
				if (allowInputs.indexOf(dom.nodeName) > -1 && dom.type !== 'button') {
					var name = dom.getAttribute('name');
					var id = attrs.id;
					if (!name) {
						name = attrs.ngModel;
						if (!name) {
							name = 'uni-' + Math.floor((Math.random() * 1000) + 1);
						}
						dom.setAttribute('name', name);
					}
					if (!id) {
						id = 'uni-' + Math.random().toString(16).slice(2);
						dom.setAttribute('id', id);
					}
					attrs.id = 'uni-control-' + id;
				}
				//if (functionalityComp.indexOf(compName) === -1) {
				//}
				angular.forEach(attrs, function (value, name) {
					if (/^ng*/i.test(name)) {
						if (removeNglist.indexOf(name) > -1) {
							var attrName = attrs.$attr[name];
							dom.removeAttribute(attrName); //remove HTML Declaration
							if (name === 'ngIf') {
								delete attrs[name];
							}
						} else {
							delete attrs[name]; //remove NG Directive
						}
					}
				});
			},
			processComponentConfig: function (component, config, dom, attrs) {
				var __type = component.__type;
				var __default = component.__default;
				var __value = config[__type] = (config[__type] || attrs[__type] || dom.getAttribute(__type) || __default).underscore(true);
				//console.log('Config [', __type, ']: ', __value, ' in ', component);
				var defaultConfig = component[__value];
				if (!defaultConfig) {
					defaultConfig = component[__default] || {};
					config['_' + __type] = __value;
					config[__type] = __default;
					config.log = 'Componente ' + __value + ' NO definido! default: ' + __default;
					console.warn(config.log);
				}
				return angular.copy(defaultConfig, {});
			},
			convertConfig: function (element, attrs, directiveName, directiveConfig) {
				var config = element.data(directiveConfig);
				if (!config) {
					config = attrs[directiveName] || '{}';
					config = $rootScope.$eval(config);
					if (config.type === undefined) {
						config.type = element[0].getAttribute('type') || 'TEXT';
					}
					config.type = config.type.toUpperCase();
					var defaultConfig = CONVERT[config.type] || {};
					defaultConfig = angular.copy(defaultConfig, {});
					config = angular.merge(defaultConfig, config);
					if (config.type === 'FILE') {
						config.multiple = element[0].hasAttribute('multiple');
					}
					element.data(directiveConfig, config);
				}
				return config;
			},
			componentConfig: function (element, attrs, directiveName, directiveConfig) {
				var config = element.data(directiveConfig);
				if (config) {
					return config;
				}
				if (typeof attrs[directiveName] === "object") {
					config = attrs[directiveName];
				} else {
					config = $rootScope.$eval(attrs[directiveName] || '{}');
				}
				impl.processAllowAttributes(element, attrs, directiveName);
				var dom = element[0];
				element[1] = dom.cloneNode(true).outerHTML;
				if (!config.skip) {
					var __name = directiveName.underscore(true);
					var COMPONENT = UI_UNIKIT[__name] || FN_UNIKIT[__name];
					if (COMPONENT) {
						var __config = impl.processComponentConfig(COMPONENT, config, dom, attrs);
						config = angular.extend(__config, config);
					} else {
						config.skip = true;
						config.warn = 'Componente ' + directiveName + ' NO soportado';
						console.warn(config.warn);
					}
				}
				element.data(directiveConfig, config);
				return config;
			},
			iconConfig_r: function (element, attrs, directiveName, directiveConfig) {
				var config = attrs[directiveName] || '{}';
				config = $rootScope.$eval(config);
				if (config.icon !== undefined && config.level !== undefined) {
					return config;
				} else {
					config = {icon: '', level: 'default', position: 'left'};
				}
				var text = dom.innerText;
				if (text) {
					for (var i = 0; i < REGEX.length; i++) {
						var regexp = REGEX [i][0];
						if (text.match(regexp)) {
							var copy = angular.copy(REGEX [i][1]);
							return angular.merge(config, copy);
						}
					}
				}
				return config;
			},
			iconConfig: function (element, attrs, directiveName, directiveConfig) {
				var config = element.data(directiveConfig);
				if (!config) {
					config = $rootScope.$eval(attrs[directiveName] || '{}');
					impl.processAllowAttributes(element, attrs, directiveName);
					var dom = element[0];
					element[1] = impl.cloneDomNode(dom, true).outerHTML;
					if (!config.icon || !config.level || !config.position) {
						var text = dom.innerText;
						if (text && text !== '') {
							for (var i = 0; i < REGEX.length; i++) {
								var regexp = REGEX [i][0];
								if (regexp.test(text)) {
									var copy = angular.copy(REGEX [i][1]);
									config = angular.merge(copy, config);
									element.data(directiveConfig, config);
									return config;
								}
							}
						}
						config = angular.merge({icon: '', level: 'default', position: 'right'}, config);
					}
					element.data(directiveConfig, config);
				}
				return config;
			},
			validateConfig: function (element, attrs, directiveName) {
				var config = element.data(directiveName);
				if (angular.element.isEmptyObject(config)) {
					config = attrs[directiveName] || '{}';
					config = $rootScope.$eval(config);
					delete attrs[directiveName];
					element.removeAttr('uni-validator');
					var __name = directiveName.underscore(true);
					var COMPONENT = UI_UNIKIT[__name] || FN_UNIKIT[__name];
					if (COMPONENT) {
						if (config.type !== undefined) {
							config.type = config.type.toUpperCase();
						}
						var __config = COMPONENT[config.type] || COMPONENT[COMPONENT.__default];
						config = angular.extend(__config, config);
						element.data(directiveName, config);
					} else {
						config.skip = true;
						config.warn = 'Componente ' + directiveName + ' NO soportado';
						console.warn(config.warn);
					}
				}
				return config;
			},
			scrollConfig: function (element, attrs, directiveName) {
				var config = element.data(directiveName);
				if (angular.element.isEmptyObject(config)) {
					config = attrs[directiveName] || '{}';
					config = $rootScope.$eval(config);
					delete attrs[directiveName];
					element.removeAttr('uni-scroll');
					var __name = directiveName.underscore(true);
					var COMPONENT = UI_UNIKIT[__name];
					if (COMPONENT) {
						if (config.type !== undefined) {
							config.type = config.type.toUpperCase();
						} else {
							config.type = COMPONENT.__default;
						}
						var __config = COMPONENT[config.type] || COMPONENT[COMPONENT.__default];
						config = angular.extend({}, __config, config);
						element.data(directiveName, config);
					} else {
						config.skip = true;
						config.warn = 'Componente ' + directiveName + ' NO soportado';
						console.warn(config.warn);
					}
				}
				return config;
			}
		};
		return {
			/**
				* Create Object Config for Convert Directive only all atribute declared in the type convert
				* @param {type} element
				* @param {type} attrs
				* @param {type} config
				* @return {undefined}
				*/
			prepareUniConvert: function (element, attrs, config) {
				if (attrs.ngModel || element.attr('ng-model') || element.attr('x-ng-model')) {
					var dom = element[0];
					var convertConfig = impl.createConvertConfig(dom, config);
					if (convertConfig) {
						convertConfig = JSON.stringify(convertConfig).replace(/\"/g, "'");
						dom.setAttribute("uni-convert", convertConfig);
					}
				}
			},
			//Fix NodeJS+ECMAScript 6, NO SUPPORT SET DEFAULT VALUE TO FUNCTION PARAMETER
			iconConfig: function (element, attrs, directiveName, directiveConfig) {
				return impl.iconConfig(element, attrs, directiveName || 'uniIcon', directiveConfig || 'icon');
			},
			/**
				* Return the config for convert type declared
				* @param {type} element
				* @param {type} attrs
				* @param {type} directiveName
				* @param {type} directiveConfig
				* @return {configL#1.impl.convertConfig.attrs|String}
				*/
			convertConfig: function (element, attrs, directiveName, directiveConfig) {
				return impl.convertConfig(element, attrs, directiveName || 'uniConvert', directiveConfig || 'convert');
			},
			/**
				* Return the config for componente by parameters and verify all inconsistences
				* @param {type} element
				* @param {type} attrs
				* @param {type} directiveName
				* @param {type} directiveConfig
				* @return {unresolved}
				*/
			componentConfig: function (element, attrs, directiveName, directiveConfig) {
				return impl.componentConfig(element, attrs, directiveName || 'uniComponent', directiveConfig || 'component');
			},
			validateConfig: function (element, attrs, directiveName) {
				return impl.validateConfig(element, attrs, directiveName);
			},
			scrollConfig: function (element, attrs, directiveName) {
				return impl.scrollConfig(element, attrs, directiveName);
			},
			confirmConfig: function (element, attrs, directiveName) {
				var config = element.data(directiveName);
				if (!config) {
					config = $rootScope.$eval(attrs[directiveName] || '{}');
					var dom = element[0];
					delete attrs[directiveName];
					if (!config.skip) {
						var __name = directiveName.underscore(true);
						var COMPONENT = UI_UNIKIT[__name];
						if (COMPONENT) {
							var __config = impl.processComponentConfig(COMPONENT, config, dom, attrs);
							config = angular.extend(__config, config);
						}
					}
					element.data(directiveName, config);
				}
				return config;
			},
			buildIconClass: function (icon) {
				var className = "";
				if (icon) {
					className = DEFAUTL_CLASS_ICON + icon;
				}
				return className;
			},
			config: function () {
				return Object.freeze({
					FUNCTIONALITY: FN_UNIKIT,
					COMPONENT: UI_UNIKIT,
					CONVERT: CONVERT,
					REGEX: REGEX,
					ICON: DEFAUTL_CLASS_ICON
				});
			},
			VERSION: '1.0.2'
		};

	}]);

/**
	* Directiva de Funcionalidad <b>uniConvert</b>, transforma o convierte valores de entrada para el 
	* uso en un determinado modelo.
	* 
	* ```html
	* <input  uni-convert type='text' uni-input=""/>
	* <input  uni-convert type='number' uni-input=""/>
	* <input  uni-convert type='email' uni-input=""/>
	* <input  uni-convert type='file' uni-input=""/>
	* <input  uni-convert type='datetime' uni-input=""/>
	* ```
	*
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.	
	* @api uniConvert
	*/
unikit.directive('uniConvert', ['$unikit', '$rootScope', function ($unikit, $rootScope) {
		/**
			* Funciones de evaluación de valores de tipo cadena
			* 
			* @api STRING_VALUE
			*/
		var STRING_VALUE = {
			//isInteger: function (value) {
			//	return typeof value === 'string' && /^-?\d+$/.test(value);
			//},
			//isDouble: function (value) {
			//	return typeof value === 'string' && /^-?\d+$/.test(value);
			//},
			/**
				* Verificar si el valor evaluado es un Obeto JSON
				* 
				* @returns {boolean} `value` Retorna verdadero si el valor evaluado es un Objeto JSON 
				* @api isObject
				*/
			isObject: function (value) {
				return typeof value === 'string' && /^\{?.*\}$/.test(value);
			},
			/**
				* Verificar si el valor evaluado es un Obeto Array
				* 
				* @returns {boolean} `value` Retorna verdadero si el valor evaluado es un Objeto Array 
				* @api isArray
				*/
			isArray: function (value) {
				return typeof value === 'string' && /^\[?.*\]$/.test(value);
			},
			/**
				* Verificar si el valor evaluado es un Obeto JSON
				* 
				* @returns {boolean} `value` Retorna verdadero si el valor evaluado es un tipo de filtro (>, <, =, %) 
				* @api isFilter
				*/
			isFilter: function (value) {
				return typeof value === 'string' && /^(\s|=|<|>|%|\!)\[?.*\]$/.test(value);
			}
		};
		/**
			* Verifica si la etiqueta es un "HTML INPUT"
			* 
			* @returns {boolean} `value` Retorna verdadero si la etiqueta es un "HTML input".
			* @api isInput
			*/
		var isInput = function (tag) {
			var result = false;
			if (tag && tag.tagName === "INPUT") {
				result = true;
			}
			return result;
		};
		/**
			* Verificar si el valor del modelo es requerido
			* 
			* @param {HTMLElement} `element` Elemento HTML input evaluado
			* @param {String} `modelValue` modelo declarado relacioando al valor de la etiqueta input 
			* @returns {boolean} `value` Retorna verdadero si la etiqueta es un "HTML input".
			* @api modelValueIsNoRequiredEmpty()
			*/
		var modelValueIsNoRequiredEmpty = function (element, modelValue) {
			if (!modelValue && !element[0].hasAttribute('required')) {
				return true;
			}
			return false;
		};
		/**
			* Objeto que almacena el conjunto de funciones de conversion o transformacion de valores
			* 
			* @api map FN_CONVERT
			*/
		var FN_CONVERT = {};
		/**
			* Define TEXT dentro de las funciones de conversion, esta propiedad almacenara todas las funciones de transformación
			* de una Cadena
			* 
			* @api map FN_CONVERT.TEXT
			*/
		FN_CONVERT.TEXT = {
			option: 'transform'
		};
		/**
			* Transforma el valor de la etiqueta input en texto mayuscula
			* 
			* @param {javscript Object} `config` configuración para la conversion del valor resive el valor: {transform: "upper", type: "TEXT"}
			* @param {javscript Object} `scope` propiedad angular Alcance del enla ce de datos
			* @param {HTMLElement} `element` Elemento HTML input evaluado
			* @param {javscript Object} `ngCtrlForm` controlador de modelo angular relacionado al formulario
			* @param {javscript Object} `ngCtrlModel` controlador de modelo angular relacionado al la etiqueta 
			* @returns {String} `modelValue` Retorna verdadero si la etiqueta es un "HTML input".
			* @api FN_CONVERT.TEXT.UPPER()
			*/
		FN_CONVERT.TEXT.UPPER = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			return {
				parser: function (viewValue) {
					var modelValue = viewValue.toUpperCase();
					ngCtrlModel.$setViewValue(modelValue);
					ngCtrlModel.$render();
					return modelValue;
				}
			};
		};
		/**
			* Transforma el valor de la etiqueta input en texto minusculas
			* 
			* @param {javscript Object} `config` configuración para la conversion del valor resive el valor: {transform: "upper", type: "TEXT"}
			* @param {javscript Object} `scope` propiedad angular Alcance del enla ce de datos
			* @param {HTMLElement} `element` Elemento HTML input evaluado
			* @param {javscript Object} `ngCtrlForm` controlador de modelo angular relacionado al formulario
			* @param {javscript Object} `ngCtrlModel` controlador de modelo angular relacionado al la etiqueta 
			* @returns {String} `modelValue` Retorna verdadero si la etiqueta es un "HTML input".
			* @api FN_CONVERT.TEXT.LOWER()
			*/
		FN_CONVERT.TEXT.LOWER = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			return {
				parser: function (viewValue) {
					var modelValue = viewValue.toLowerCase();
					ngCtrlModel.$setViewValue(modelValue);
					ngCtrlModel.$render();
					return modelValue;
				}
			};
		};
		/**
			* Transforma la primera letra del valor de la etiqueta input en mayuscula
			* 
			* @param {javscript Object} `config` configuración para la conversion del valor resive el valor: {transform: "upper", type: "TEXT"}
			* @param {javscript Object} `scope` propiedad angular Alcance del enla ce de datos
			* @param {HTMLElement} `element` Elemento HTML input evaluado
			* @param {javscript Object} `ngCtrlForm` controlador de modelo angular relacionado al formulario
			* @param {javscript Object} `ngCtrlModel` controlador de modelo angular relacionado al la etiqueta 
			* @returns {String} `modelValue` Retorna verdadero si la etiqueta es un "HTML input".
			* @api FN_CONVERT.TEXT.CAPITAL()
			*/
		FN_CONVERT.TEXT.CAPITAL = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			return {
				parser: function (viewValue) {
					var modelValue = viewValue.capitalize(false);
					ngCtrlModel.$setViewValue(modelValue);
					ngCtrlModel.$render();
					return modelValue;
				}
			};
		};
		/**
			* Transforma la primera letra de cada palabra en mayuscula
			* 
			* @param {javscript Object} `config` configuración para la conversion del valor resive el valor: {transform: "upper", type: "TEXT"}
			* @param {javscript Object} `scope` propiedad angular Alcance del enla ce de datos
			* @param {HTMLElement} `element` Elemento HTML input evaluado
			* @param {javscript Object} `ngCtrlForm` controlador de modelo angular relacionado al formulario
			* @param {javscript Object} `ngCtrlModel` controlador de modelo angular relacionado al la etiqueta 
			* @returns {boolean} `modelValue` Retorna verdadero si la etiqueta es un "HTML input".
			* @api FN_CONVERT.TEXT.CAPITAL_ALL()
			*/
		FN_CONVERT.TEXT.CAPITAL_ALL = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			return {
				parser: function (viewValue) {
					var modelValue = viewValue.capitalize(true);
					ngCtrlModel.$setViewValue(modelValue);
					ngCtrlModel.$render();
					//preventCursorPosition(element[0], modelValue);
					return modelValue;
				}
			};
		};
		/**
			* Define DATE dentro de las funciones de conversión, esta propiedad almacenara todas las funciones de conversión
			* de una campo de tipo fecha
			* 
			* @api map FN_CONVERT.DATE
			*/
		FN_CONVERT.DATE = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			element.attr('type', 'text');
			element.attr('title', 'Formato: ' + config.format);
			return {
//				changeListener: function (a, b) {
//					console.log('changeListener a->', a, ' b->', b, ngCtrlModel);
//				},
				/**
					* Transforma el valor a una fecha valida y evalua si el valor es requerido
					* 
					* @param {Date} `modelValue` Valor en formato "Fecha" GTM
					* @param {String} `viewValue` Valor literal de la fecha
					* @returns {boolean} `flag` si el valor es valido retorn "true" de lo contrario "false"
					* @api FN_CONVERT.DATE.validator()
					*/
				validator: function (modelValue, viewValue) {
					var isString = angular.isString(modelValue);
					var isNumber = angular.isNumber(modelValue);
					if (isString || isNumber) {
						try {
							ngCtrlModel.$$rawModelValue = ngCtrlModel.$modelValue = modelValue = new Date(modelValue);
							ngCtrlModel.$$writeModelToScope();
						} catch (e) {
						}
					}
					//console.log('validator::: ', modelValue, '--->', angular.isDate(modelValue), ngCtrlModel);
					return modelValueIsNoRequiredEmpty(element, modelValue) || angular.isDate(modelValue);
				},
				/**
					* Analiza el valor formato y lo transforma en un valor de tipo fecha
					* la transformación se con el uso de la libreria <a href="https://momentjs.com/">momens js</a>
					* 
					* @param {String|String} `modelValue` Valor en formato "Fecha" GTM
					* @returns {Date} `viewValue` El valor en formato "Fecha" GTM
					* @api FN_CONVERT.DATE.validator()
					*/
				formatter: function (modelValue) {
					//console.log(ngCtrlModel.$name, ' ==>formatter::: ', modelValue, '--->', ngCtrlModel);
					var viewValue;
					try {
						var isString = angular.isString(modelValue);
						var isNumber = angular.isNumber(modelValue);
						if (isString || isNumber) {
							modelValue = new Date(modelValue);
						}
						var isDate = angular.isDate(modelValue);
						if (isDate && moment) {
							viewValue = moment(modelValue).format(config.format);
						}
						//console.log('formatter isDate: ', isDate, ' modelValue:', molValue, ' viewValue:', viewValue, ' format:', config.format);
					} catch (e) {
						console.error(e);
					}
					return viewValue;
				},
				/**
					* Analiza el valor introducido y lo transforma en un valor de tipo fecha
					* la transformación se con el uso de la libreria <a href="https://momentjs.com/">momens js</a>
					* 
					* @param {String} `viewValue` Valor literal de la fecha
					* @returns {Date} `modelValue` retorna el valor transformado en una fecha GMT
					* @api FN_CONVERT.DATE.validator()
					*/
				parser: function (viewValue) {
					var modelValue = null;
					try {
						var isString = angular.isString(viewValue);
						if (isString && viewValue !== '' && moment) {
							var temp = moment(viewValue, config.format, true);
							if (temp.isValid()) {
								modelValue = temp.toDate();
							}
						}
						//console.log('parser isString: ', isString, ' modelValue:', modelValue, ' viewValue:', viewValue, ' format:', config.format);
					} catch (e) {
						console.error(e);
					}
					return modelValue;
				}
			};
		};
		FN_CONVERT.DATETIME = FN_CONVERT.DATE;
		FN_CONVERT.TIME = FN_CONVERT.DATE;
		FN_CONVERT.DATETIME_LOCAL = FN_CONVERT.DATE;
		/**
			* Define NUMBER dentro de las funciones de conversión, esta propiedad almacenara todas las funciones de conversión
			* de una campo de tipo number
			* 
			* @api map FN_CONVERT.NUMBER
			*/
		FN_CONVERT.NUMBER = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			element.attr('type', 'text');
			return {
				/**
					* Evalua y valida si el valor es requerido
					* 
					* @param {Number} `modelValue` Valor de tipo "Number"
					* @param {String} `viewValue` Valor del elemento HTML input
					* @returns {boolean} `flag` si el valor es valido retorn "true" de lo contrario "false"
					* @api FN_CONVERT.NUMBER.validator()
					*/
				validator: function (modelValue, viewValue) {
					return modelValueIsNoRequiredEmpty(element, modelValue) || angular.isNumber(modelValue);
				},
				/**
					* Analiza el valor introducido y lo transforma en un valor de tipo numerico
					* 
					* @param {String} `viewValue` Valor literal del campo input
					* @returns {boolean} `modelValue` retorna el valor transformado en un valor numerico
					* @api FN_CONVERT.NUMBER.parser()
					*/
				parser: function (viewValue) {
					var char = config.decimalChar || '.';
					if (config.mask) {
						viewValue = element.masked(viewValue);
						viewValue = viewValue.replace(/[^(0-9.,)*]/gi, '');
					}
					try {
						if (char === '.') {
							viewValue = viewValue.replace(/\,/gi, '');
						} else if (char === ',') {
							viewValue = viewValue.replace(/\./gi, '').replace(/\,/gi, '.');
						} else {
							viewValue = viewValue.replace(/\,|\./gi, '');
						}
					} catch (e) {
						console.warn(e.message);
					}
					var modelValue = Number(viewValue);
					modelValue = modelValue || modelValue === 0 ? modelValue : undefined;
					return modelValue;
				},
				/**
					* Convierte el valor introducido en un valor Numerico valido
					* 
					* @param {String} `modelValue` Valor en numerico del modelo
					* @returns {Date} `viewValue` El valor de tipo number
					* @api FN_CONVERT.NUMBER.formatter()
					*/
				formatter: function (modelValue) {
					var viewValue;
					var char = config.decimalChar || '.';
					if (config.mask) {
						viewValue = element.masked(modelValue);
					} else if (char && char === ',') {
						modelValue = angular.isNumber(modelValue) ? modelValue : parseFloat(modelValue);
						viewValue = modelValue.replace('.', char);
					} else {
						viewValue = angular.isNumber(modelValue) ? modelValue : parseInt(modelValue);
					}
					if (viewValue || viewValue === 0) {
						viewValue = '' + viewValue;
					}
					return viewValue;
				}
			};
		};
		FN_CONVERT.MONEY = FN_CONVERT.NUMBER;
		FN_CONVERT.MONEY2 = FN_CONVERT.NUMBER;
		FN_CONVERT.MONEY3 = FN_CONVERT.NUMBER;
		FN_CONVERT.MONEY5 = FN_CONVERT.NUMBER;
		FN_CONVERT.DOUBLE = FN_CONVERT.NUMBER;
		FN_CONVERT.INTEGER = FN_CONVERT.NUMBER;
		/**
			* Define OBJECT dentro de las funciones de conversión, esta propiedad almacenara todas las funciones de conversión
			* de una campo de tipo json object 
			* 
			* @param {javscript Object} `config` configuración para la conversion del valor resive el valor: {transform: "upper", type: "TEXT"}
			* @param {javscript Object} `scope` propiedad angular Alcance del enla ce de datos
			* @param {HTMLElement} `element` Elemento HTML input evaluado
			* @param {javscript Object} `ngCtrlForm` controlador de modelo angular relacionado al formulario
			* @param {javscript Object} `ngCtrlModel` controlador de modelo angular relacionado al la etiqueta 
			* @returns {String} `modelValue` Retorna verdadero si la etiqueta es un "HTML input".
			* @api FN_CONVERT.TEXT.UPPER()
			*/
		FN_CONVERT.OBJECT = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			element.attr('type', 'text');
			return {
				/**
					* Evalua y valida si el valor es requerido
					* 
					* @param {Number} `modelValue` Valor de tipo Object json
					* @param {String} `viewValue` Valor del elemento HTML input
					* @returns {boolean} `flag` si el valor es valido retorn "true" de lo contrario "false"
					* @api FN_CONVERT.OBJECT.validator()
					*/
				validator: function (modelValue, viewValue) {
					return modelValueIsNoRequiredEmpty(element, modelValue) || (angular.isObject(modelValue) && STRING_VALUE.isObject(viewValue));
				},
				/**
					* Analiza el valor introducido y lo transforma en un objeto JSON
					* 
					* @param {String} `viewValue` Valor literal del campo input
					* @returns {boolean} `modelValue` retorna el valor transformado en un objeto JSON
					* @api FN_CONVERT.OBJECT.parser()
					*/
				parser: function (viewValue) {
					var valueModel;
					try {
						if (angular.isObject(viewValue)) {
							valueModel = viewValue;
						} else if (STRING_VALUE.isObject(viewValue)) {
							valueModel = $rootScope.$eval(viewValue);
						}
					} catch (e) {
						console.error('Error conver to object: ', e.message);
					}
					return valueModel;
				},
				/**
					* Convierte el valor introducido en un valor Numerico valido
					* 
					* @param {String} `modelValue` Valor en numerico del modelo
					* @returns {Date} `viewValue` El valor de tipo number
					* @api FN_CONVERT.NUMBER.formatter()
					*/
				formatter: function (modelValue) {
					var viewValue;
					try {
						if (angular.isObject(modelValue)) {
							viewValue = JSON.stringify(modelValue);
						} else if (STRING_VALUE.isObject(modelValue)) {
							viewValue = modelValue;
						}
					} catch (e) {
						console.error('Error conver to object: ', e.message);
					}
					return viewValue;
				}
			};
		};
		/**
			* Define ARRAY dentro de las funciones de conversión, esta propiedad almacenara todas las funciones de conversión
			* de una campo de tipo ARRAY
			* 
			* @param {javscript Object} `config` configuración para la conversion del valor resive el valor: {transform: "upper", type: "TEXT"}
			* @param {javscript Object} `scope` propiedad angular Alcance del enla ce de datos
			* @param {HTMLElement} `element` Elemento HTML input evaluado
			* @param {javscript Object} `ngCtrlForm` controlador de modelo angular relacionado al formulario
			* @param {javscript Object} `ngCtrlModel` controlador de modelo angular relacionado al la etiqueta 
			* @returns {String} `modelValue` Retorna verdadero si la etiqueta es un "HTML input".
			* @api FN_CONVERT.TEXT.UPPER()
			*/
		FN_CONVERT.ARRAY = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			element.attr('type', 'text');
			return {
				/**
					* Evalua y valida si el valor es requerido
					* 
					* @param {Number} `modelValue` Valor de tipo Object Array
					* @param {String} `viewValue` Valor del elemento HTML input
					* @returns {boolean} `flag` si el valor es valido retorn "true" de lo contrario "false"
					* @api FN_CONVERT.OBJECT.validator()
					*/
				validator: function (modelValue, viewValue) {
					return modelValueIsNoRequiredEmpty(element, modelValue) || (angular.isArray(modelValue) && STRING_VALUE.isArray(viewValue));
				},
				/**
					* Analiza el valor introducido y lo transforma en un objeto JSON
					* 
					* @param {String} `viewValue` Valor literal del campo input ['a','c']
					* @returns {boolean} `valueModel` retorna el valor transformado en un objeto ARRAY
					* @api FN_CONVERT.OBJECT.parser()
					*/
				parser: function (viewValue) {
					var valueModel;
					try {
						if (angular.isArray(viewValue)) {
							valueModel = viewValue;
						} else if (STRING_VALUE.isArray(viewValue)) {
							valueModel = $rootScope.$eval(viewValue);
						}
					} catch (e) {
						console.error('Error convert to array: ', e.message);
					}
					return valueModel;
				},
				/**
					* Convierte el valor introducido en un valor Numerico valido
					* 
					* @param {String} `modelValue` Valor Objeto Array del modelo ['a','b']
					* @returns {Date} `viewValue` El valor de tipo number
					* @api FN_CONVERT.NUMBER.formatter()
					*/
				format: function (modelValue) {
					var viewValue;
					if (angular.isArray(modelValue)) {
						viewValue = JSON.stringify(modelValue);
					} else if (STRING_VALUE.isArray(modelValue)) {
						viewValue = modelValue;
					}
					return viewValue;
				}
			};
		};
		/**
			* Define SPLIT dentro de las funciones de conversión, esta propiedad almacenara todas las funciones de conversión
			* de una campo de tipo ARRAY
			* 
			* @param {javscript Object} `config` configuración para la conversion del valor resive el valor: {transform: "upper", type: "TEXT"}
			* @param {javscript Object} `scope` propiedad angular Alcance del enla ce de datos
			* @param {HTMLElement} `element` Elemento HTML input evaluado
			* @param {javscript Object} `ngCtrlForm` controlador de modelo angular relacionado al formulario
			* @param {javscript Object} `ngCtrlModel` controlador de modelo angular relacionado al la etiqueta 
			* @returns {function} `function` retorna las funciones de evaluación para el tipo SPLIT 
			* @api FN_CONVERT.SPLIT()
			*/
		FN_CONVERT.SPLIT = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			element.attr('type', 'text');
			return {
				/**
					* Evalua y valida si el valor es requerido
					* 
					* @param {Number} `modelValue` Valor de tipo Object Array
					* @param {String} `viewValue` Valor del elemento HTML input
					* @returns {boolean} `flag` si el valor es valido retorn "true" de lo contrario "false"
					* @api FN_CONVERT.SPLIT.validator()
					*/
				validator: function (modelValue, viewValue) {
					return modelValueIsNoRequiredEmpty(element, modelValue) || angular.isArray(modelValue);
				},
				/**
					* Analiza el valor introducido y lo transforma en un objeto ARRAY
					* 
					* @param {String} `viewValue` Valor literal del campo input, los criterios de division son (",","|" y ";")
					* @returns {boolean} `valueModel` retorna el valor transformado en un objeto ARRAY
					* @api FN_CONVERT.SPLIT.parser()
					*/
				parser: function (viewValue) {
					var valueModel;
					try {
						if (angular.isArray(viewValue)) {
							valueModel = viewValue;
						} else if (viewValue) {
							valueModel = viewValue.split(/\,|\;|\|/);
						}
					} catch (e) {
						console.error('Error convert to split: ', e.message);
					}
					return valueModel;
				}
			};
		};
		/**
			* Define FILE dentro de las funciones de conversión, esta propiedad almacenara todas las funciones de conversión
			* de una campo de tipo FILE
			* 
			* @param {javscript Object} `config` configuración para la conversion del valor resive el valor: {transform: "upper", type: "TEXT"}
			* @param {javscript Object} `scope` propiedad angular Alcance del enla ce de datos
			* @param {HTMLElement} `element` Elemento HTML input evaluado
			* @param {javscript Object} `ngCtrlForm` controlador de modelo angular relacionado al formulario
			* @param {javscript Object} `ngCtrlModel` controlador de modelo angular relacionado al la etiqueta 
			* @returns {function} `function` retorna las funciones de evaluación  para el campo file.
			* @api FN_CONVERT.FILE()
			*/
		FN_CONVERT.FILE = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			var parent = $(element[0].parentNode);
			element.bind('change', function (e) {
				var domViewFile = (e.srcElement || e.target).files;
				var ngViewFile = [];
				var fn = {
					init: function () {
						ngViewFile = [];
						angular.forEach(domViewFile, function (file, i) {
							ngViewFile[i] = {name: file.name, size: file.size, type: file.type, value: '', state: 0};
						});
					},
					apply: function () {
						scope.$apply(function () {
							ngCtrlModel.$setViewValue(ngViewFile);
						});
					},
					/**
						*  Evalua el "FileList" cuando se adiciona un archivo modificando ngViewFile adicionando valores como {name:"",size:0,type:"",value:""}
						*  
						* @api readBase64()
						*/
					readBase64: function () {
						parent.addClass('uni-init-file');
						angular.forEach(domViewFile, function (file, i) {
							var reader = new FileReader();
							reader.readAsBinaryString(file);
							reader.onload = function () {
								ngViewFile[i].state = 1;
								ngViewFile[i].value = btoa(reader.result);
								reader = null;
							};
							reader.onerror = function () {
								ngViewFile[i].state = 2;
								ngViewFile[i].value = '';
								reader = null;
							};
						});
					},
					/**
						*  Evalua el "FileList" cuando se adiciona un archivo modificando ngViewFile adicionando valores como {name:"",size:0,type:"",value:""}
						*  
						* @api readBase64()
						*/
					applyIfComplete: function () {
						var isComplete = fn.isComplete();
						if (isComplete === true) {
							parent.removeClass('uni-init-file');
							ngViewFile = angular.copy(ngViewFile, []); //FIX NG-CHANGE COMPLETE
							fn.apply();
							fn = undefined;
							ngViewFile = undefined;
							domViewFile = undefined;
						} else {
							setTimeout(fn.applyIfComplete, 30);
						}
					},
					/**
						*  Evalua el estado del archivo adjunto
						*  @returns {boolean} `boolean` si termino de adjuntase el archivo retorna true
						* @api readBase64()
						*/
					isComplete: function () {
						for (var i = 0; i < ngViewFile.length; i++) {
							var file = ngViewFile[i];
							if (file.state === 0) {
								return false;
							}
						}
						return true;
					}
				};
				fn.init();
				fn.apply();
				setTimeout(fn.readBase64, 10);
				setTimeout(fn.applyIfComplete, 10);
			});
			return {
				parser: function (viewFile) {
					return config.multiple ? viewFile : viewFile[0];
				}
			};
		};
		FN_CONVERT.FILTER = function (config, scope, element, ngCtrlForm, ngCtrlModel) {
			element.attr('type', 'text');
			var ALL = {
				'=': 'eq', '!': 'ne', '!=': 'ne',
				'%': 'li', '!%': 'nl',
				'>': 'gt', '>=': 'ge',
				'<': 'lt', '<=': 'le'
			};

			function createFilterValue(value = '') {
				var re = /(=|<=|>=|<|>|!|~)(.*)/g;
				var match = re.exec(value || '');
				var filter = {};
				if (match && match.length === 2) {
					filter.oper = ALL[match[0] || '='];
					filter.value = (match[1] || '').split(/\,|\;|\|/);
				} else {
					filter.oper = 'eq';
					filter.value = (value || '').split(/\,|\;|\|/);
				}
				return filter;
			}

			return {
				/**
					* Evalua y valida si el valor es requerido
					* 
					* @param {String} `modelValue` 
					* @param {String} `viewValue` Valor del elemento HTML input
					* @returns {boolean} `flag` si el valor es valido retorn "true" de lo contrario "false"
					* @api FN_CONVERT.FILTER.validator()
					*/
				validator: function (modelValue, viewValue) {
					return modelValueIsNoRequiredEmpty(element, modelValue) || angular.isObject(modelValue);
				},
				parser: function (viewValue) {
					var valueModel = {};
					if (viewValue) {
						valueModel = createFilterValue(viewValue);
					}
					return valueModel;
				}
			};
		};

		/**
			* Agrega el complemento "DateTimePicker" para crear campos de tipo fecha y hora.
			* 
			* @param {javscript Object} `config` configuración del la funcionalidad date convert
			* @param {HTMLElement} `element` Objetivo "HTML Input" el cual sera afectado con la fucionalidad de  "DateTimePicker"
			**/
		var createTimePicker = function (config, element) {
			var dateConfig = {
				TIME: {
					format: config.format,
					formatTime: config.format,
					timepicker: /TIME/gi.test(config.type),
					datepicker: /DATE/gi.test(config.type)
				},
				DATE: {
					format: config.format,
					formatDate: config.format,
					timepicker: false,
					datepicker: true
				},
				DATETIME: {
					format: config.format,
					formatDate: config.format.split(" ")[0],
					formatTime: config.format.split(" ")[1],
					timepicker: true,
					datepicker: true
				}
			};
			element.datetimepicker(dateConfig[config.type]);
		};
		return  {
			restrict: 'A',
			require: ['^?form', '?ngModel'],
			link: function (scope, element, attrs, ngCtrl) {
				var ngCtrlForm = ngCtrl[0];
				var ngCtrlModel = ngCtrl[1];
				if (!ngCtrlModel) {
					console.warn('Directive: uniConvert required ng-model or ng-value attribute!.');
					return;
				}
				var config = $unikit.convertConfig(element, attrs, 'uniConvert');
				var fnCallback = FN_CONVERT[config.type];
				if (angular.isObject(fnCallback)) {
					var option = config[fnCallback.option];
					option = option.underscore(true);
					fnCallback = fnCallback[option];
				}
				if (angular.isFunction(fnCallback)) {
					var convert = fnCallback.apply(this, [config, scope, element, ngCtrlForm, ngCtrlModel]);
					ngCtrlModel.$parsers.length = 0;
					ngCtrlModel.$formatters.length = 0;
					if (convert.validator) {
						ngCtrlModel.$validators.convertTo = convert.validator;
					}
					if (convert.parser) {
						ngCtrlModel.$parsers.unshift(convert.parser);
					}
					if (convert.formatter) {
						ngCtrlModel.$formatters.push(convert.formatter);
					}
					if (convert.changeListener) {
						ngCtrlModel.$viewChangeListeners.push(convert.changeListener);
					}
				}
				if (config.mask && isInput(element[0])) {
					config.options = config.options || {};
					config.options.placeholder = config.mask.replace(/[a-z0-9]/gi, '_').replace(/[\#]*/gi, '');
					if (/TIME|DATE/gi.test(config.type)) {
						element.mask(config.mask, config.options);
					} else if (/NUM|INT|DOUBL|CURREN|MONEY/gi.test(config.type)) {
						element.mask(config.mask, config.options);
					} else if (/TEXT|STRIN/gi.test(config.type)) {
						element.mask(config.mask, config.options);
					} else {
						config.mask = undefined;
					}
					if (config.mask) {
						ngCtrlModel.$parsers.unshift(function (value) {
							return element.masked(value);
						});
					}
				}
				if ((config.format || /TIME|DATE/gi.test(config.type)) && isInput(element[0])) {
					createTimePicker(config, element);
				}
			}
		};
	}]);

/**
	* Directiva de funcionaliad <b>uni-validator</b>, que permite validar los campos de un formulario.
	* La validación  se muestra en una ventana modal listando todos los errores de validación o en un 
	* "tooltip" poniendo el foco en el campo invalido.
	* 
	* ```html
	* <form uni-validator>
	*		<div uni-grid>
	*			<!-- aca tu HTML para el cuerpo -->
	*		</div>
	* </form>
	* ```
	*
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @api uniValidator
	*/
unikit.directive('uniValidator', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		var SEPARATOR_MSG = '$';
		var elementTooltipAttached = null;
		/**
			* Obtiene los elementos "controles " de un HTML Form y adiciona una configuración a los elementos encontrados.
			* 
			* @param {HTMLElement} `form` Elemento HTML 
			* @returns {Array} `elements` Elementos que son parte del HTML Form 
			* @api metodo getFormElements()
			*/
		var getFormElements = function (form) {
			var elements = {};
			angular.forEach(form[0].elements, function (item, index) {
				if (item.name) {
					item = angular.element(item);
					var uniParentControl = item.closest('.uni-field');
					try {
						var component = uniParentControl[0] && uniParentControl.data()['component'] ? uniParentControl.data()['component'] : {};
						elements[item.attr('name')] = {
							name: item.attr('name'),
							id: item.attr('id') || '',
							model: item.attr('ng-Model') || '',
							type: component['type'] ? component['type'].toLowerCase() : item.attr('type'),
							controlElement: item,
							isUniField: uniParentControl[0] ? true : false,
							uniParentControl: uniParentControl[0] ? uniParentControl : item.parent(),
							index: index,
							isUniGroupChild: item.closest('.uni-mainGroup')[0] ? true : false
						};
					} catch (err) {
						console.log('-->', item, ' - ', index, ' Error: ', err);
					}
				}
			});
			return elements;
		};
		/**
			* Realiza una busqueda de los errores registrados en "allMessages" para un tipo de dato, 
			* recoriendo "ngErrors" que son los errores de validacion de angular, si lo encuentra fija el mensage y el mensaje i18n.
			* 
			* @param {javascrip Object} `ngErrors`  Errores que angular obtiene del formulario
			* @param {HTMLElement} `item`  HTMLElemet del cual se quiere identificar el error
			* @param {JSON Object} `allMessages` Todos los mensajes de validacion que estan registrados en el archivo config.js
			* @returns {Array} `resultMessage` conjunto de errores encontrados en elemnto
			* @api metodo getElementErrorMessages()
			*/
		var getElementErrorMessages = function (ngErrors, item, allMessages) {
			var resultMessage = [];
			for (var error in ngErrors) {
				var key = error + SEPARATOR_MSG + item.type;
				var messaje = "";
				if (allMessages[key]) {
					messaje = allMessages[key];
				} else if (allMessages[error]) {
					messaje = allMessages[error];
				} else {
					console.warn(key, ": error is not registered in config file");
				}
				resultMessage.push({
					'message': messaje,
					'i18n': allMessages[key] ? key : error
				});
			}
			return resultMessage;
		};
		/**
			* Busca la etiqueta "label" relacionado para el HTMl control.
			* 
			* @param {HTMLElement} `item` Elemento HTLM control evaluado 
			* @param {HTMLElement} `form` Element HTML Form, contexto de validación
			* @returns {Object} `Object` resultado de la busqueda, retorna el texto de la etiqueta "label" y internacionalización i18n 
			* @api metodo findLabelsInform()
			*/
		var findLabelsInform = function (item, form) {
			var result;
			if (item.isUniGroupChild) {
				var itemContainer = item.uniParentControl.closest('.uni-mainGroup').parent();
				result = itemContainer.prev().find('label');
			} else {
				result = form.find("label[for='" + item.id + "']");
			}
			return {
				i18n: result ? result.attr('i18n') : '',
				text: result.text()
			};
		};
		/**
			* Construye el conjunto configuraciones para mostrar el error de un HTML control del contexto del formulario.
			* 
			* @param {javascript Object} `ngErrors` Errores que angular obtiene del formulario
			* @param {HTMLElement} `item` Elemento HTLM control evaluado 
			* @param {javascript Object} `allMessages` Todos los mensajes de validacion que estan registrados en el archivo config.js
			* @param {HTMLElement} `form` Element HTML Form, contexto de validación
			* @returns {Object} `attributes` Retorna el conjunto de propiedades de validacion para un el elemento HTML control.
			* @api metodo buildErrorItem();
			*/
		var buildErrorItem = function (ngErrors, item, allMessages, form) {
			var atributes = {};
			if (item) {
				var labels = findLabelsInform(item, form);
				atributes = {
					id: item.id,
					model: item.name,
					messages: getElementErrorMessages(ngErrors, item, allMessages),
					label: labels.text || item.name,
					i18n: labels.i18n,
					element: item.controlElement,
					indexInForm: item.index
				};
			}
			return atributes;
		};
		/**
			* Obtiene el listado de errores de validación de angular en el contexto del formulario y los relaciona al 
			* elemento HTML control correspodiente, generando un objeto que mapea los errores por elemento HTML control.
			* 
			* @param {javascript Object} `ngErros`  Errores que angular obtiene del formulario
			* @param {javascript Object} `config` Configuración del componente definido por el usuario y unidos con la configuracion por defecto de "unikit" config.  
			* @param {HTMLElement} `form` Elemento HTML Form que se esta validando
			* @returns {Object} `messageList` Conjunto de elementos que contienen la validación para cada elemento invalido. 
			* @api metodo getListErrors()
			*/
		var getListErrors = function (ngErros, config, form) {
			var item;
			var messageList = {};
			for (item in ngErros) {
				var ngErrorList = ngErros[item];
				for (var i = 0; i < ngErrorList.length; i += 1) {
					var ngError = ngErrorList[i];
					if (!messageList[ngError.$name]) {
						item = getFormElements(form)[ngError.$name];
						if (item) {
							var result = buildErrorItem(ngError.$error, item, config.validationsMessage, form);
							messageList[result.label] = result;
						}
					}
				}
			}
			return messageList;
		};
		/**
			* Ordena los elementos invalidos en secuancia de creacion en el DOM del formulario validado.
			* 
			* 
			* @param {javascript Object} `mapErrosMessages` Errores de validación del formulario
			* @returns {OBject} `Object` Elmentos invalidos ordenado por indice de creacion en el DOM.
			*/
		var sortErrorListMessages = function (mapErrosMessages) {
			var listMessages = [];
			var removeEmptyItem = function (messagesArray) {
				var result = [];
				for (var i = 0; i < messagesArray.length; i += 1) {
					if (messagesArray[i]) {
						result.push(messagesArray[i]);
					}
				}
				return result;
			};
			for (var itemMessage in mapErrosMessages) {
				var message = mapErrosMessages[itemMessage];
				listMessages[message.indexInForm] = message;
			}
			return removeEmptyItem(listMessages);
		};
		/**
			* Adiciona estilo de interaccion con el elemento invalido
			* 
			* @param {Array} `errorList` Lista de errores de validación
			* @api metodo setErrorCssClass();
			*/
		var setErrorCssClass = function (errorList) {
			var element, i;
			for (i = 0; i < errorList.length; i += 1) {
				if (errorList[i].element.closest('.bootstrap-select')[0]) {
					element = errorList[i].element.closest('.bootstrap-select');
				} else {
					element = errorList[i].element;
				}
				element.addClass('ng-touched');
			}
		};
		/**
			* Valida el fomulario, este metodo es llamdo por el "scope" del HTML form, 
			* que ejecuta los metodos de validacion de los controle del formulario.
			* 
			* 
			* @param {javascript Object} `scope` Es un objeto que se refiere al alcance del modelo en la aplicación
			* @param {javascript Object} `ngCtrol` Es un objeto que se refiere al alcance del modelo en la aplicación
			* @param {javascript Object} `config` Enlaza un objeto FormControl a un elemento DOM Form.
			* @param {HTMLElement} `form` Elemento HTMl Form validado
			* @param {String} `model` Modelo relacionado al para visualizar la ventana de lista de validación con "ng-show"
			* @param {event} `e` Evento asociado a la ejecución a la acción de validación.
			* @api metodo validate();
			*/
		var validate = function (scope, ngCtrol, config, form, model, e) {
			var errosObject;
			if (!ngCtrol.$valid) {
				errosObject = getListErrors(ngCtrol.$error, config, form);
				scope.errorList = sortErrorListMessages(errosObject);
				setErrorCssClass(scope.errorList);
				if (scope.errorList.length) {
					if (config.type === "TOOLTIP") {
						validateTooltip(scope, form, e);
					} else {
						scope[model] = true;
					}
				}
				if (e) {
					e.stopPropagation();
					e.preventDefault();
				}
			}
		};
		/**
			* Fija el foco en el "HTML Control"	que tiene el error de validacion y muestra los errores de validación en "tooltip".
			* 
			* @param {javascript Object} `scope` Es un objeto que se refiere al alcance del modelo en la aplicación
			* @param {HTMLElement} `form` Elemento HTMl Form validado
			* @param {event} `e` Evento asociado a la ejecución a la acción de validación.
			* @api metodo validate();
			*/
		var validateTooltip = function (scope, form, e) {
			var $element = scope.errorList[0].element;
			var messages = scope.errorList[0].messages;
			var listItems = '';
			var position = 'bottom';
			if (elementTooltipAttached) {
				elementTooltipAttached.removeAttr('title');
				elementTooltipAttached.removeAttr('data-toggle');
				elementTooltipAttached.removeAttr('data-placement');
				elementTooltipAttached.removeAttr('data-html');
			}
			elementTooltipAttached = $element;
			for (var i = 0; i < messages.length; i += 1) {
				listItems = listItems + '<li>' + messages[i].message + '</li>';
			}
			if (/date|time/i.test($element[0].className)) {
				position = 'top';
			}
			$element.addClass('ng-touched');
			if ($element[0].type === "file") {
				$element = $element.closest('div').find('input').eq(0);
			} else if ($element[0].tagName === "SELECT") {
				$element = $element.closest('.uni-field').find('button');
			}
			$element.attr('title', listItems);
			$element.attr('data-content', listItems);
			$element.attr('data-html', 'true');
			$element.attr('data-trigger', "focus");
			$element.attr('data-placement', position);
			$element.focus();
		};
		/**
			* Crea un Template HTML para mostrar la lista de errores de validacion del fomulario.
			* 
			* @param {String} `nameForm` Nombre del formulaio que esta siendo validado
			* @param {String} `model` Modelo relacionado al para visualizar la ventana de lista de validación con "ng-show"
			* @param {String} `idModel` un identificador randomico para adicionar al modelo.
			* @api metodo createModalErros();
			*/
		var createModalErros = function (nameForm, model, idModel) {
			var configPanel = {type: 'MODAL', level: 'danger', width: '450px'};
			var title = "El formulario contiene errores";
			var closeIconConfig = {icon: 'close'};
			var ModalTemplate = "<div class='uni-validator-modal'><fieldset id='{idModel}' uni-scroll uni-panel='{configPanel}' ng-click='__clickModal($event)' ng-show='{model}'>" +
											"<legend><span>{title}</span><span class='uni-close'>"+
											"<button uni-badge='{closeIconConfig}' ng-click='{model}=false;__setFocus({nameForm});$event.preventDefault();'></button></span>" +
											"</legend>" +
											"<ul class='error-main list-unstyled'>" +
											"<li ng-repeat='menssage in errorList'><i class='icon fa fa-warning'></i>   <span class='main-message'> {{menssage.label}}</span>" +
											"<ul class='error-child list-unstyled'>" +
											"<li ng-repeat='error in menssage.messages' i18n='{{error.i18n}}'>- {{error.message}}</li>" +
											"</ul>" +
											"</li>" +
											"</ul>" +
											"</fieldset><div>";
			ModalTemplate = ModalTemplate.replace(/{idModel}/g, idModel);
			ModalTemplate = ModalTemplate.replace(/{configPanel}/g, JSON.stringify(configPanel));
			ModalTemplate = ModalTemplate.replace(/{model}/g, model);
			ModalTemplate = ModalTemplate.replace(/{title}/g, title);
			ModalTemplate = ModalTemplate.replace(/{closeIconConfig}/g, JSON.stringify(closeIconConfig));
			ModalTemplate = ModalTemplate.replace(/{nameForm}/g, nameForm);
			return ModalTemplate;
		};
		return {
			restrict: 'A',
			require: '^?form',
			link: function (scope, element, attrs, ngCtrol) {
				var config = $unikit.validateConfig(element, attrs, this.name);
				var model = 'uni' + Math.random().toString(16).slice(2);
				scope[model] = false;
				ngCtrol.$validate = function (e) {
					element.data('elements', getFormElements(element));
					if (ngCtrol.$invalid) {
						validate(scope, ngCtrol, config, element, model, e);
						element.removeClass('uni-valid-form');
					} else {
						element.addClass('uni-valid-form');
					}
					return ngCtrol.$valid;
				};
				scope.__setFocus = function () {
					if (scope.errorList) {
						scope.errorList[0].element.focus();
					}
				};
				if (config.type === "TOOLTIP") {
					$(element).tooltip({
						selector: "[title]",
						trigger: "focus",
						'data-html': "true"
					});
				} else {
					var idModel = 'uni' + Math.random().toString(16).slice(2);
					scope.__clickModal = function (event) {
						if (event.target.parentNode.id === idModel) {
							scope[model] = false;
							scope.__setFocus();
						}
					};
					var modal = createModalErros(attrs.name, model, idModel);
					modal = angular.element(modal, model);
					$compile(modal)(scope);
					element.after(modal);
				}
			}
		};
	}]);

/**
	* Directiva <b><code>uni-part</code> de funcionalidad</b>, que permite adicionar fragmentos de <code>HTML</code> y reemplazo de las 
	* <code>propiedades y configuraciones </code> del componente adicionado.
	* 
	* ```html
	* <div replace="{'replace values'}" uni-part="'path.html'"></div>
	* ```
	*
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$templateRequest` descarga la plantilla proporcionada usando $ http y, con éxito, almacena el contenido dentro de $ templateCache.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.	
	* @api uniPart
	*/
unikit.directive('uniPart', ['$unikit', '$templateRequest', '$rootScope', '$compile', function ($unikit, $templateRequest, $rootScope, $compile) {
		/**
			* Destruye el scope y lo fija en "null"
			* 
			* @param {javscript Object} `scope` Actual "scope" del componente adicionado
			* @api metodo destroyScope()
			*/
		var destroyScope = function (scope) {
			if (scope) {
				scope.$destroy();
				scope = null;
			}
		};
		/**
			*  Reemplaza los valores fijados en la propiedad <code>replace</code> de la directiva uni-part, en el html que se obtiene.
			*  
			* @param {String} `stringHTML` Template al cual se reemplazara los valores configurados en la propiedad "replace"
			* @param {JSON} `map` propiedades y valores fijado en la propiedad <code>replace</code>.
			* @returns {String} `part` Retorna el HTML "String" con los reemplazos en la propiedades fijadas en la propiedad "replace".
			* @api metodo replaceProperties()
			*/
		var replaceProperties = function (stringHTML, map) {
			var part = stringHTML;
			//console.log('TEMPLATE: -->', src);
			for (var key in map) {
				var value = map[key];
				var regexp = new RegExp('([^\w])' + key + '([^\wa-zA-z]|[\W])', 'g');
				var replace = '$1' + value + '$2';
				part = part.replace(regexp, replace);
			}
			return part;
		};
		/**
		 * inicia un nuevo "scope" para la parte adicionada, y compila el elemento adicionado con el nuevo "scope"
			* 
			* @param {HTML Element} `element` HTML Element principal al cual se adiciono la directiva "uni-part"
			* @param {String} `elementString` Template HTML, el cual es la parte adicionada
			* @param {javscript Object} `currentScope` Actual "scope" del componente adicionado
			* @param {javscript Object} `scope` Scope del componente
			* @api metodo initializeNewPart()
		 */
		var initializeNewPart = function (element, elementString, currentScope, scope) {
			destroyScope(currentScope);
			currentScope = scope.$new();
			element.html(elementString);
			$compile(element.contents())(currentScope);
		};
		return {
			restrict: 'A',
			scope: false,
			priority: 500,
			controller: angular.noop,
			link: function (scope, element, attrs) {
				var srcExp = attrs.uniPart || attrs.src;
				var mapExp = attrs.replace || attrs.mapper;
				var currentScope;
				scope.$watch(srcExp, function (src) {
					if (src) {
						var map = scope.$eval(mapExp);
						element.html('<h1>Cargando...</h1>');
						$templateRequest(src, true).then(function (response) {
							var part = replaceProperties(response, map);
							initializeNewPart(element, part, currentScope, scope);
						});
					} else {
						initializeNewPart(element, '', currentScope, scope);
					}
				});
			}
		};
	}]);
unikit.directive('uniCompile', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		return {
			restrict: 'A',
			scope: false,
			controller: angular.noop,
			link: function (scope, element, attrs) {
				var srcExp = attrs.uniCompile || attrs.src;
				scope.$watch(srcExp, function (srcHtml) {
					scope.__compile = new Date();
					srcHtml = srcHtml + "<hr/><b>Compile: {{__compile|date:'yyyy-MM-dd hh:mm:ss'}}</b>";
					element.html(srcHtml);
					$compile(element.contents())(scope);
				});
			}
		};
	}]);

unikit.controller('uni-tree-item', function ($scope) {
	$scope.set = function (name, node) {
		$scope[name] = node;
	};
	var show = {};
	$scope.state = function (index, node, nodeParent) {
		return show[index] ? 'open' : 'close';
	};
	$scope.toggle = function (index, node, nodeParent) {
		show[index] = !show[index];
	};
});
/**
	* La directiva realiza la agrupación de nodos en forma de arbol, los nodos creados pueden ser componentes unikit.
	* La directiva debe ser fijada en un elemento HTML  <code>UL</code>, este debe contener algun elemento, 
	* para visualizar la información de los nodos hijos que seran creados de forma recursiva.
	* 
	* 
	* ```html
	* <ul uni-tree="" value="[{lista de elementos}]" var="node">
	* <span> &#123; &#123; node.value &#125; &#125 </span>
	* </ul>
	* ```
	*
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.	
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @api uniTree
	*/
unikit.directive('uniTree', ['$rootScope', '$compile', '$unikit', function ($rootScope, $compile, $unikit) {
		/**
			* Crea un <code>HTML panel Bootstrap</code> 
			* 
			* ```js
			* var html = createTreeTemplate(htmlElement, attrs, config);
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {Object} `attrs` argumentos que son los atributos y/o propiedades de la directiva 
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createTreeTemplate()
			*/
		var createTreeTemplate = function (element, attrs, config) {
			var htmlContent = element[0].innerHTML;
			var id = createID(element);
			var template = '/tmp/' + id + '.html';
			var html = '<div class="uni-tree uni-tree-{color}" id="{id}">' +
											'{styleState}' +
											'<script type="text/ng-template" id="{template}">' +
											'<div class="uni-tree-item-state">{htmlState}</div>' +
											'<div class="uni-tree-item-content">{htmlContent}</div>' +
											'</script>{htmlTitle}' +
											'<uni-tree-item class="uni-tree-root" value="{value}" var="{var}" children="{children}" click-item="{clickItem}" state-item="{stateItem}" template="{template}"/>' +
											'</div>';
			var htmlTitle = '';
			if (config.title) {
				htmlTitle = '<div class="uni-tree-title">{title}</div>';
			}
			var htmlState = '';
			var styleState = '';
			if (config.state) {
				for (var i  in config.state) {
					var val = (config.state[i] + ':-').split(':');
					var iconClass = $unikit.buildIconClass(val[0]);
					htmlState += '<span class="icon-' + i + ' icon-text ' + iconClass + '"></span>';
					var display = val[1] === '+' ? 'block' : 'none';
					styleState += '#' + id + ' .uni-tree-item.state-' + i + ' > .uni-tree-children { display: ' + display + '; } ';
					styleState += '#' + id + ' .uni-tree-item.state-' + i + ' > .uni-tree-content > .uni-tree-item-state > .uni-tree-icon > .icon-' + i + ' { display: block; } ';
				}
				htmlState = '<a href="#" class="uni-tree-icon" ng-click="{clickItem}">' + (htmlState || 'X') + '</a>';
				styleState = '<style>' + styleState + '</style>';
				config.state = undefined;
			}
			html = html.replace(/{color}/g, config.level || 'primary');
			html = html.replace(/{htmlTitle}/g, htmlTitle);
			//html = html.replace(/{config}/g, JSON.stringify(config).replace(/\"/g, "'"));
			html = html.replace(/{styleState}/g, styleState);
			html = html.replace(/{htmlState}/g, htmlState);
			html = html.replace(/{htmlContent}/g, htmlContent);
			html = html.replace(/{clickItem}/g, attrs.clickItem || 'toggle($index, {var}, {var}Parent)');
			html = html.replace(/{stateItem}/g, attrs.stateItem || 'state($index, {var}, {var}Parent)');
			html = html.replace(/{var}/g, attrs.var);
			html = html.replace(/{value}/g, attrs.value);
			html = html.replace(/{children}/g, attrs.children || 'children');
			html = html.replace(/{id}/g, id);
			html = html.replace(/{template}/g, template);
			return html;
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			priority: 10,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniTree');
				if (config.skip) {
					return element[1].outerHTML;
				} else {
					if (attrs.value && attrs.var) {
						return createTreeTemplate(element, attrs, config);
					} else {
						console.warn(element, ': value parameter is required to iterate values in var');
					}
				}
			},
			link: function (scope, element) {
				$compile(element.contents())(scope);
			}
		};
	}]);
unikit.directive('uniTreeItem', ['$rootScope', '$compile', '$unikit', function ($rootScope, $compile, $unikit) {
		var createHTMLTreeItemTemplate = function (attrs) {
			var html = '<span>' +
											'<ul ng-controller="uni-tree-item" ng-init="set(\'{var}Parent\', {var})">' +
											'<li ng-repeat="{var} in {value}" class="uni-tree-item" ng-class="\'state-\'+{stateItem}">' +
											'<div class="uni-tree-content" ng-include="\'{template}\'"></div>' +
											'<uni-tree-item' +
											' class="uni-tree-children"' +
											' value="{var}.{children}"' +
											' var="{var}"' +
											' children="{children}"' +
											' click-item="{clickItem}"' +
											' state-item="{stateItem}"' +
											' template="{template}"/>' +
											'</li>' +
											'</ul>' +
											'</span>';
			html = html.replace(/{value}/g, attrs.value);
			html = html.replace(/{children}/g, attrs.children);
			html = html.replace(/{var}/g, attrs.var);
			html = html.replace(/{clickItem}/g, attrs.clickItem);
			html = html.replace(/{stateItem}/g, attrs.stateItem);
			html = html.replace(/{template}/g, attrs.template);
			return html;
		};
		return {
			restrict: 'E',
			replace: true,
			scope: false,
			template: function (element, attrs) {
				return createHTMLTreeItemTemplate(attrs);
			}
		};
	}]);

/**
	* La directiva genera un listado incremental del contenido.
	* 
	* 
	* ```html	
	* <div uni-plus="{}" 	title="custom title"	value="[{lista de elementos}]"	clone="modelToClone"	disabled=true	max='5'	var="node"></div>
	* Donde: 
	* title, Es el titulo del conjunto de elementos clonados
	* value, Es el Arreglo que contiene a los objetos
	* clone, Es el objeto relacionado a cada nuevo elemento clonado
	* disabled, Si el valor es true, desabilita los botones de de adicio y eliminación 
	* max, Cantidad maxima de elementos que seran clonados
	* var, Es un elemento del Arreglo que se genera por cada nuevo elemento clonado
	* ```
	*
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.	
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @api uniPlus
	*/
unikit.directive('uniPlus', ['$rootScope', '$compile', '$unikit', function ($rootScope, $compile, $unikit) {
		/**
			* Crea un <code>HTML List Bootstrap</code> 
			* 
			* ```js
			* var html = createDIVPlusTemplate(htmlElement, attrs, config);
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {Object} `attrs` argumentos que son los atributos y/o propiedades de la directiva 
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createDIVPlusTemplate()
			*/
		var createDIVPlusTemplate = function (element, attrs, config) {
			var htmlContent = element[0].innerHTML;
			var html = '<div class="uni-plus">' +
											'{htmlHeader}' +
											'<ul class="uni-plus-ul">' +
											'<li ng-repeat="{var} in {value}" class="uni-plus-li">' +
											'<div class="uni-plus-content">' +
											'{htmlContent}' +
											'</div>' +
											'<div class="uni-plus-action">' +
											'<button class="btn btn-default btn-primary btn-xs uni-plus-add"' +
											' ng-click="__plus.add({value}, {clon}, {max})" ' +
											' ng-disabled="{disabled}"' +
											' ng-if="$index === 0">' +
											'<i class="fa fa-plus-square" aria-hidden="true"></i></button>' +
											'<button class="btn btn-default btn-danger btn-xs uni-plus-del"' +
											' ng-click="__plus.del($index, {value})"' +
											' ng-disabled="{disabled}"' +
											' ng-if="$index !== 0">' +
											'<i class="fa fa-minus-square" aria-hidden="true"></i></button>' +
											'</div>' +
											'</li>' +
											'</ul>' +
											'</div>';
			var htmlHeader = '';
			if (attrs.title) {
				htmlHeader = '<div class="uni-plus-title">' + attrs.title + '</div>';
			}
			html = html.replace(/{htmlHeader}/g, htmlHeader);
			html = html.replace(/{htmlContent}/g, htmlContent);
			html = html.replace(/{value}/g, attrs.value);
			html = html.replace(/{var}/g, attrs.var || 'node');
			html = html.replace(/{clon}/g, attrs.clon || '{}');
			html = html.replace(/{max}/g, attrs.max || 10);
			html = html.replace(/{disabled}/g, attrs.disabled || 'false');
			return html;
		};
		/**
			* Crea un <code>HTML TR Basico</code> 
			* 
			* ```js
			* var html = createTRPlusTemplate(htmlElement, attrs, config);
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {Object} `attrs` argumentos que son los atributos y/o propiedades de la directiva 
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createTRPlusTemplate()
			*/
		var createTRPlusTemplate = function (element, attrs, config) {
			var htmlContent = element[0].innerHTML;
			var html = '<tr class="uni-plus uni-plus-li" ng-repeat="{var} in {value}">' +
											'{htmlContent}' +
											'<th class="uni-plus-action">' +
											'<button class="btn btn-default btn-primary btn-xs uni-plus-add"' +
											' ng-click="__plus.add({value}, {clon}, {max})"' +
											' ng-disabled="{disabled}"' +
											' ng-if="$index === 0">' +
											'<i class="fa fa-plus-square" aria-hidden="true"></i></button>' +
											'<button class="btn btn-default btn-danger btn-xs uni-plus-del"' +
											' ng-click="__plus.del($index, {value})"' +
											' ng-disabled="{disabled}"' +
											' ng-if="$index !== 0">' +
											'<i class="fa fa-minus-square" aria-hidden="true"></i></button>' +
											'</th>' +
											'</tr>';
			html = html.replace(/{htmlContent}/g, htmlContent);
			html = html.replace(/{value}/g, attrs.value);
			html = html.replace(/{var}/g, attrs.var || 'node');
			html = html.replace(/{clon}/g, attrs.clon || '{}');
			html = html.replace(/{max}/g, attrs.max || 10);
			html = html.replace(/{disabled}/g, attrs.disabled || 'false');
			return html;
		};
		var atachPlusFunctions = function (scope) {
			scope.__plus = {
				init: function (array, clon = {}) {
					if (array && array.length === 0) {
						var item = angular.copy(clon, {});
						array.unshift(item);
				}
				},
				add: function (array, clon = {}, max = 10) {
					if (array && array.length < max) {
						var item = angular.copy(clon, {});
						array.push(item);
				}
				},
				del: function (index, array) {
					console.log('del--->', array);
					if (array && array.length > index) {
						array.splice(index, 1);
					}
				}
			};
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			priority: 10,
			terminal: true,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniPlus');
				if (config.skip) {
					return element[1].outerHTML;
				}
				var html = '<a>No support for template <b>' + config.type + '</b> type.</a>';
				if (!attrs.value) {
					console.warn(element, ': value parameter is required to iterate values in var');
					html = '<a>UNI-PLUS required <b>value</b> attribute.</a>';
				} else if (element[0].nodeName === 'DIV') {
					html = createDIVPlusTemplate(element, attrs, config);
				} else if (element[0].nodeName === 'TR') {
					html = createTRPlusTemplate(element, attrs, config);
				}
				return html;
			},
			link: function (scope, element, attrs) {
				if (!scope.__plus) {
					atachPlusFunctions(scope);
				}
				if (attrs.value) {
					var init = '{value}={value}||[];__plus.init({value}, {clon})';
					init = init.replace(/{value}/g, attrs.value);
					init = init.replace(/{clon}/g, attrs.clon || '{}');
					scope.$eval(init);
				}
				$compile(element)(scope);
			}
		};
	}]);

/**
	* Directiva <b><code>uni-confirm</code> de funcionalidad</b>, que permite adicionar un evento de confirmación que muestra
	* un <code>HTML</code>  con botones "yes" y "no".
	* ```html
	* <button ng-click="event()" uni_confirm="remove">Eliminar</button>
	* ```
	*
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.	
	* @api uniConfirm
	*/
unikit.directive('uniConfirm', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		/**
			* Crea una estructura <code> HTML Modal Bootstrap</code> con el uso de la directiva <code>uni-panel="{type:'modal'}"</code> de confirmación con dos botones "si" y "no"
			* 
			* @param {javascrip Object} `config` Configuración fijada por el usuario unida con la configuracion por defecto para el componente.
			* @param {String} `clickEvent` evento ng-click que se ejecuta al presionar el boton "si".
			* @param {String} `model` Modelo relacionado para la directiva "ng-show"
			* @returns {String}
			* @api metodo createModalConfirm()
			*/
		var createModalConfirm = function (config, clickEvent, model) {
			var click = clickEvent;
			var level = config.level || 'warning';
			var mensage = config.message || "Esta seguro?";
			var textConfirm = config.textConfirm || "Si";
			var textClose = config.textClose || "No";
			var modalTemplate = '<span class="uni-confirm">' +
											'<fieldset uni-panel="{size:\'sm\', type:\'MODAL\', level:\'{level}\'}" ng-show="{model}">' +
											'<legend>Confirmar accion</legend>' +
											'{mensage}' +
											'<footer>' +
											'<button uni-badge="{level:\'danger\'}" ng-click="{model} = false">{textClose}</button>' +
											'<button uni-badge="{level:\'success\'}" ng-click="{model} = false; {click}">{textConfirm}</button>' +
											'</footer>' +
											'</fieldset>' +
											'</span>';
			modalTemplate = modalTemplate.replace(/{click}/g, click);
			modalTemplate = modalTemplate.replace(/{model}/g, model);
			modalTemplate = modalTemplate.replace(/{level}/g, level);
			modalTemplate = modalTemplate.replace(/{textConfirm}/g, textConfirm);
			modalTemplate = modalTemplate.replace(/{textClose}/g, textClose);
			modalTemplate = modalTemplate.replace(/{mensage}/g, mensage);
			return modalTemplate;
		};
		/**
			* Valores predeterminados para "create", "update", "remove" y "cancel" que son fijados para mostrar el mensaje de confirmación
			* 
			* @api MESSAGE
			*/
		var MESSAGE = {
			create: 'Esta seguro de guardar los datos?',
			update: 'Esta seguro de actualizar los datos?',
			remove: 'Esta seguro de eliminar el registro?',
			cancel: 'Esta seguro de abandonar la operacion?'
		};
		/**
			* Crea una cadena de manera randomica que sera el modelo "ng-model" para ocultar la ventan con la directiva "ng-show"
			* 
			* @returns {String} `model` una cadena aleatoria.
			* @api metodo createRandomModel()
			*/
		var createRandomModel = function () {
			var model = 'uni' + Math.random().toString(16).slice(2);
			return model;
		};
		/**
			* Personaliza configuración de atributos que se obtienen del uso de la directiva "uni-confirm"
			* 
			* @api metodo customConfig()
			*/
		var customConfig = function (attrs) {
			var confirmText = attrs.uniConfirm;
			attrs['uniConfirm'] = {};
			attrs['uniConfirm'].message = confirmText;
		};
		/**
			* Remueve atributos de HTMLElement y de la propiedad attrs
			* 
			* @api metodo removeAttributes()
			*/
		var removeAttributes = function (attrs, element) {
			delete attrs.uniConfirm;
			element.removeAttr('uni-confirm');
			element.removeAttr('ng-click');
		};
		/**
			* Crea un nuevo evento "ng-click" verificando si el html al cual se adiciono la directiva "uni-confirm"
			* es parte de un formulario 
			*
			* @param {javascript Object} `ngForm` Scope del HTML Form
			* @param {String} `newNgClick` modelo angular para visualizar la ventana de confirmación.
			* @returns {String} `newClick` Cdena que contiene los argumentos de validacion y confirmación.
			* @api metodo createClickForm()
			*/
		var createClickForm = function (ngForm, newNgClick) {
			var newClick = ngForm.$name + '.$validate()? (' + newNgClick.trim() + ') : null';
			return newClick;
		};
		/**
			* Crea un nuevo evento "ng-click" adicionando todos los eventos de validación de fomularios
			* si encuentra algun evento de validación este debe ser ejecutado con prioridad y posteriormente
			* se debe ejecutar el evento de confirmación.
			*
			* @param {String} `oldNgClick` evento angular ng-click original de la etiqueta al cual se adiciono la directiva "uni-confirm"
			* @returns {String} `newClick` Cdena que contiene los argumentos de validacion y confirmación.
			* @returns {String} `model` una cadena aleatoria.
			* @api metodo createClickForm()
			*/
		var createClick = function (oldNgClick, ngClick) {
			var result = oldNgClick.split(/&&|;/g);
			var selfClick = "";
			for (var i = 0; i < result.length; i += 1) {
				if (result[i].indexOf('$validate()') !== -1) {
					selfClick = selfClick + (!selfClick ? result[i] : ('&&' + result[i]));
				}
			}
			var newNgClick = selfClick.trim() + '? (' + ngClick.trim() + ') : null';
			return newNgClick;
		};
		/**
			* Crea una nuevo evento "ng-click" para el boton de confirmación y lo fija en la propiedad "attrs" 
			* 
			* @api metodo createRandomModel()
			*/
		var createNewClickEvent = function (attrs, ngForm, oldNgClick, model) {
			var newNgClick = model + ' = true';
			if (ngForm && ngForm.$name) {
				newNgClick = createClickForm(ngForm, newNgClick);
			} else if (oldNgClick && oldNgClick.indexOf('.$validate()') !== -1) {
				newNgClick = createClick(oldNgClick, newNgClick);
			}
			attrs.$set('ngClick', newNgClick);
		};
		return {
			restrict: 'A',
			scope: false,
			terminal: true,
			priority: 20,
			require: '^?form',
			link: function (scope, element, attrs, ngForm) {
				var model = createRandomModel();
				var oldNgClick = attrs.ngClick;
				delete attrs.ngClick;
				customConfig(attrs);
				var config = $unikit.componentConfig(element, attrs, 'uniConfirm');
				removeAttributes(attrs, element);
				createNewClickEvent(attrs, ngForm, oldNgClick, model);
				var modal = createModalConfirm({message: MESSAGE[config.message] || config.message}, oldNgClick, model);
				modal = angular.element(modal);
				$compile(modal)(scope);
				element.after(modal);
				$compile(element)(scope);
			}
		};
	}]);
unikit.directive('uniOption', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			terminal: true,
			link: function (scope, element, attrs) {
				var uniOption = attrs.uniOption;
				if (uniOption && element[0].nodeName === 'SELECT') {
					var optionElement = angular.element("<option ng-repeat='o in " + uniOption + "' value='{{o.value}}'>{{o.description}}</option>");
					element.append(optionElement);
				}
				$compile(element.contents())(scope);
			}
		};
	}]);

unikit.directive('uniLov', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		return {
			restrict: "A",
			compile: function (element, attributes) {
				return {
					post: function (scope, element, attrs, controller) {
						var lovName = attrs.uniLov;
						var lovHandler = scope.$eval(lovName);
						if (lovName && lovHandler) {
							var html = `
<div uni-panel="{size:'lg'}" type="modal" ng-show="LOV.show">
	<header> <b>{{LOV.title || 'Seleccione un elemento'}}</b> <span class="uni-close"><button uni-badge="" ng-click="LOV.callCancel()">X</button></span></header>
	<div uni-part="LOV.part" replace="LOV.replace('LOV')">
 </div>
</div>`;
							html = html.replace(/LOV/g, lovName);
							var modalLOV = angular.element(html);
							$compile(modalLOV)(scope);
							element.after(modalLOV);
						} else {
							console.warn('Required LOVHandler');
						}
					}
				};
			}
		};
	}]);
/**
	* Directiva de aspecto <code>uni-group</code> realiza la agrupación de elemetos HTML adicionando <code>CSS class input-group</code>compatible con <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a> 
	* a las etiquetas tradicionales HTML BUTTON, HTML INPUT y LINK
	* 
	* ```html
	* <span uni-group><button>Test1</button><input value="Test2"/></span>
	* ```
	*
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.	
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @api uniGroup
	*/
unikit.directive('uniGroup', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		/**
			* Genera una template <code>HTML</code> "String", que agrupa los elemntos validos
			* 
			* ```js
			* var html = createHTML(HTMLElement, config);
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-group".
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTML()
			*/
		var createHTML = function (element, config) {
			var clone = element.cloneNode(true), tagName;
			var spanContent = document.createElement("span");
			var span;
			spanContent.className = "input-group-addon";
			tagName = clone.tagName.toLowerCase();
			angular.forEach(clone.children, function (element, index) {
				if (!(element.attributes['uni-input'] || element.attributes['uni-select'])) {
					span = spanContent.cloneNode(false);
					if (element.tagName === "BUTTON") {
						span.className = "input-group-btn";
						element.className = "btn btn-default";
					}
					clone.insertBefore(span, element);
					span.appendChild(element);
					if ((clone.children.length - 1) === index) {
						span.className = span.className + " uni-last-addon";
					} else if (index === 0) {
						span.className = span.className + " uni-first-addon";
					} else {
						span.className = span.className + " uni-medium-addon";
					}
				}
			});
			var endTag = new RegExp(tagName + ".$");
			clone.className = "uni-mainGroup input-group";
			clone.removeAttribute("uni-group");
			clone = clone.outerHTML;
			clone = clone.replace(tagName, "div");
			clone = clone.replace(endTag, 'div>');
			return clone;
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			terminal: true,
			priority: 10,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniGroup');
				var dom = element[0];
				if (config.skip) {
					return element[1];
				}
				return createHTML(dom, attrs);
			},
			link: function (scope, element, attrs) {
				element.removeAttr("uni-group");
				$compile(element)(scope);
			}
		};
	}]);

/**
	* Directiva de aspecto <b>uniInput</b>, que transforma un <code>html input</code>, adiciona classes como '<code>form-control</code>'
	* generando una nueva estructura <code>HTML</code> compatible con <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a>.
	* Se debe agregar la directiva unicamente en etiquetas <b>HTML input</b></code> de tipo <code>"text", "number", "date", "time", "file", "password" e "email".</code>
	* <p><b>La propiedad icon:</b>  Nombre corto del icono Font Awesome <a href='http://fontawesome.io/icons/' target='_blank'>Icons</a>. </p>
	* <p><b>La propiedad level:</b>  Color de prioridad segun distintivos de Bootstrap, los valores permitidos son <code>danger, success, primary, warning, info y default</code></p>
	* 
	* ```html
	* <input type='text' uni-input=""/>
	* <input type='text' uni-input="{}"/>
	* <input type='text' uni-input="{icon:'pencil', level:'danger'}"/>
	* ```
	*
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @api uniInput
	*/
unikit.directive('uniInput', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		/**
			* Genera una cadena <code>HTML</code>, que contiene a los iconos de componente, la generaración se produce en base al tipo de 
			* <code>HTML input</code>
			* 
			* ```js
			* var htmlIcon = getIconHTML(config, position);
			* ```
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {String} `position` Alineación del icono, los valores permitidos son: "left" y "right".
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del icono. 
			* @api Method getIconHTML()
			*/
		var getIconHTML = function (config, position) {
			var html = '<span class="icon input-group-addon uni-addon-' + (position ? position : '') + '">';
			var icon = config.icon;
			if (typeof icon === 'boolean') {
				icon = config.defaultIcon;
			}
			if (angular.isString(icon)) {
				icon = icon.split(/\s|\;|\,/);
			}
			if (!angular.isArray(icon)) {
				icon = [icon];
			}
			for (var i = 0; i < icon.length; i += 1) {
				html = html + '<span uni-badge="{ level:\'' + (config.level ? config.level : 'default') + '\', icon:\'' + icon[i] + '\'}"></span>';
			}
			html = html + '</span>';
			return html;
		};
		/**
			* Genera una cadena <code>HTML</code>, que contiene al componente, la generaración se produce en base al tipo de 
			* <code>HTML input</code> <code>"text", "number", "date", "time", "email" y "password".</code>.
			* 
			* ```js
			* var html = basicHtml(html, config, position);
			* ```
			*
			* @param {htmlElement} `cloneRoot` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {String} `position` Alineación del icono, los valores permitidos son: "left" y "right".
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method basicHtml()
			*/
		var basicHtml = function (cloneRoot, config, position) {
			var html;
			if (config.icon) {
				var htmlIcon = getIconHTML(config, position);
				html = '<div class="uni-field uni-input input-group uni-' + config.type.toLowerCase() + (position === "normal" ? '' : ' uni-group') + '">' + cloneRoot.outerHTML + htmlIcon + '</div>';
			} else {
				html = '<div class="uni-field uni-input uni-' + config.type.toLowerCase() + '">' + cloneRoot.outerHTML + '</div>';
			}
			return html;
		};
		/** 
			* Genera una cadena <code>HTML</code>, que contiene al componente, la generaración se produce en base al tipo de 
			* <code>HTML input type "file"</code>
			* 
			* ```js
			* var html = fileHtml(cloneRoot, config, position, ngModel);
			* ```
			*
			* @param {htmlElement} `cloneRoot` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {String} `position` Alineación del icono, los valores permitidos son: "left" y "right".
			* @param {String} `ngModel` Modelo angular del componente, se usa para realizar el enlace al dato original del scope.
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method fileHtml()
			*/
		var fileHtml = function (cloneRoot, config, position, ngModel) {
			var html;
			var htmlIcon = "";
			if (config.icon) {
				htmlIcon = getIconHTML(config, position);
			}
			html = '<div>' +
											'<div class="uni-field uni-input input-group uni-{type}">' +
											'<input class="form-control" readOnly="true" ng-value="__fileName({ngModel})" title="{{__fileName({ngModel}, true)}}"/>' +
											'<span class="input-group-btn">' +
											'<label class="btn btn-{level}">{icon}<span>Browser...</span> {rootHTML} </label>' +
											'<button class="btn btn-danger" ng-click="{ngModel}= undefined">' +
											'<span class="fa fa-trash-o"></span>' +
											'</button>' +
											'</span>' +
											'</div>' +
											'</div>';
			//cloneRoot.id = undefined;
			//html = html.replace(/{rootId}/g, cloneRoot.id);
			html = html.replace(/{type}/g, config.type.toLowerCase());
			html = html.replace(/{ngModel}/g, ngModel);
			html = html.replace(/{level}/g, config.level);
			html = html.replace(/{icon}/g, htmlIcon);
			html = html.replace(/{rootHTML}/g, cloneRoot.outerHTML);
			return html;
		};
		/** 
			* Adiciona <code>clases CSS</code> al elemento htmlElement principal, para generar un nuevo elemento DOM compatible con css de Bootstrap.
			* 
			* ```js
			* var html = createHTMLControl(htmlElement, config, position);
			* ```
			*
			* @param {htmlElement} `cloneRoot` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {String} `position` Alineación del icono, los valores permitidos son: "left" y "right".
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLControl()
			*/
		var createHTMLControl = function (cloneRoot, config, position) {
			var html;
			var typeClass = "uni-input-" + config.type.toLowerCase();
			if (position === "normal") {
				cloneRoot.className = "form-control " + typeClass;
			} else {
				cloneRoot.className = "form-control uni-group " + typeClass;
			}
			var ngModel = cloneRoot.getAttribute('ng-model');
			if (config.type === 'FILE') {
				cloneRoot.style.display = "none";
				cloneRoot.type = "file";
				html = fileHtml(cloneRoot, config, position, ngModel);
			} else {
				html = basicHtml(cloneRoot, config, position);
			}
			return html;
		};
		/** 
			* Verifica si el elemento es parte de una directiva <code>uni-group</code>, y obtiene su posición.
			* 
			* ```js
			* var position = 	var position = elementPosInGroup(element);
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML  input al cual se adiciona la directiva "uni-input"..
			* @returns {String} `html` Retorna una cadena que indica la posición del elemento si pertenece a un "uni-group"
			* @api Method elementPosInGroup()
			*/
		var elementPosInGroup = function (element) {
			var parent, position = "normal";
			parent = element.parent();
			if (parent && parent.hasClass("input-group")) {
				if (element.index() === 0) {
					position = "first";
				} else if (element.index() === (parent.children().length - 1)) {
					position = "last";
				} else {
					position = "medium";
				}
			}
			return position;
		};
		/** 
			* Elimina un atributo del HTML Element
			* 
			* ```js
			* removeNgAttribute(element, 'uni-convert');
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML  input al cual se adiciona la directiva "uni-input"..
			* @param {String} `value` atributo que se eliminara del HTML Element
			* @api Method removeNgAttribute()
			*/
		var removeNgAttribute = function (element, value) {
			element.removeAttr(value);
		};
		/** 
			* Adiciona el evento "click" en el icono, para asignar el foco al HTML Control
			* 
			* ```js
			* addFocus(element);
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML  input al cual se adiciona la directiva "uni-input"..
			* @api Method addFocus()
			*/
		var addFocus = function (element) {
			element.find('.icon').on('click', function () {
				element.find('input').focus();
			});
		};
		var addFileHandler = function (scope) {
			if (scope.__nameFile === undefined) {
				scope.__fileName = function (ngValue, full = false) {
					var toString = '...';
					if (ngValue) {
						if (angular.isArray(ngValue)) {
							var out = '';
							for (var i = 0; i < ngValue.length && (full || i < 3); i++) {
								out += ngValue[i].name + (full ? '\n' : ', ');
							}
							if (ngValue.length >= 3 && !full) {
								out = out + '..(' + ngValue.length + ' files)';
							}
							toString = out || 'NaN';
						} else {
							toString = ngValue.name || 'NaN';
						}
					}
					return toString;
				};
			}
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			terminal: true,
			priority: 10,
			require: '^?form',
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniInput');
				if (config.skip) {
					return element[1];
				}
				$unikit.prepareUniConvert(element, attrs, config);
				var htmlElement = element[0];
				var position = elementPosInGroup(element);
				return createHTMLControl(htmlElement, config, position);
			},
			link: function (scope, element, attrs, ngCtrol) {
				removeNgAttribute(element, 'uni-convert');
				addFocus(element);
				if (attrs.type === "file") {
					addFileHandler(scope);
				}
				$compile(element)(scope);
			}
		};
	}]);

/**
	* Directiva de aspecto <b>uniEditor</b>, que transforma un <code>html textarea</code>, adiciona classes como '<code>form-control</code>'
	* generando una nueva estructura <code>HTML</code> compatible con <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a>.
	* Se debe agregar la directiva unicamente en etiquetas <code>HTML textarea</code>
	* <p><b>La propiedad icon:</b>  Nombre corto del icono Font Awesome <a href='http://fontawesome.io/icons/' target='_blank'>Icons</a>. </p>
	* <p><b>La propiedad level:</b>  Color de prioridad segun distintivos de Bootstrap, los valores permitidos son <code>danger, success, primary, warning, info y default</code></p>
	* 
	* ```html
	* <textarea type='text' uni-editor></textarea>
	* <textarea type='text' uni-editor="{icon:'pencil', level:'danger'}"></textarea>
	* ```
	*
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @api uniEditor
	*/
unikit.directive('uniEditor', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		/**
			* Genera una cadena <code>HTML</code>, que contiene a los iconos de componente
			* 
			* ```js
			* var htmlIcon = getIconHTML(config, position);
			* ```
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {String} `position` Alineación del icono, los valores permitidos son: "left" y "right".
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del icono. 
			* @api Method getIconHTML()
			*/
		var getIconHTML = function (config, position) {
			var html = '<span class="icon input-group-addon uni-addon-' + position + '">';
			var icon = config.icon;
			if (typeof icon === 'boolean') {
				icon = config.defaultIcon;
			}
			if (angular.isString(icon)) {
				icon = icon.split(/\s|\;|\,/);
			}
			if (!angular.isArray(icon)) {
				icon = [icon];
			}
			for (var i = 0; i < icon.length; i += 1) {
				html = html + '<span uni-badge="{ level:\'' + config.level + '\', icon:\'' + icon[i] + '\'}"></span>';
			}
			html = html + '</span>';
			return html;
		};
		/**
			* Genera una cadena <code>HTML</code>, que contiene al componente, la generaración se produce en base al tipo de 
			* <code>HTML textarea</code>
			* 
			* ```js
			* var html = createHTMLControl(config, id);
			* ```
			*  
			* @param {htmlElement} `cloneRoot` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-editor".
			* @param {Javascript Object} `config` Configuración de los atributos del componente, como  icon, level, mode.
			* @returns {HTMLElement} `html` Retorna una estructura HTML, que contiene al componente.
			* @api Method createTemplate()
			*/
		var createTemplate = function (cloneRoot, config) {
			var html = "<div  class='uni-field {_compClass_} input-group'>{_htmlControl_}{_icon_}</div>";
			var icon = config.icon ? getIconHTML(config) : '';
			cloneRoot.className = "form-control uni-editor";
			html = html.replace(/{_compClass_}/g, "uni-editor");
			html = html.replace(/{_icon_}/g, icon);
			html = html.replace(/{_htmlControl_}/g, cloneRoot.outerHTML);
			return html;
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			terminal: true,
			priority: 10,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, this.name);
				if (config.skip) {
					return element[1];
				}
				var html = '<a>No support for template <b>' + config.mode + '</b> mode.</a>';
				var dom = element[0];
				if (config.mode === 'NORMAL') {
					html = createTemplate(dom, config);
				}
				return html;
			},
			link: function (scope, element, attrs) {
				$compile(element)(scope);
			}
		};
	}]);
/**
	* Directiva de aspecto <b>uniSelect</b>, que transforma un <code>html select</code>, adiciona classes como '<code>form-control</code>'
	* generando una nueva estructura <code>HTML</code> compatible con <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a>.
	* Se debe agregar la directiva unicamente en etiquetas <b>HTML select</b></code>.
	* 
	* ```html
	* <select uni-select></select>
	* <select uni-select=''></select>
	* <select uni-select="{}"></select>
	* <select uni-select="{mode:'native'}" multiple></select>
	* <select uni-select="{mode:'normal'}" multiple></select>
	* <select uni-select="{mode:'search'}" multiple></select>
	* ```
	*
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @api uniSelect
	*/
unikit.directive('uniSelect', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		/**
			* Genera una cadena <code>HTML</code>, que contiene a los iconos de componente, la generaración se produce en base al tipo de 
			* <code>HTML input</code>
			* 
			* ```js
			* var htmlIcon = getIconHTML(config, position);
			* ```
			* @api Method getIconHTML()
			* @param {htmlElement} `cloneRoot` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {String} `position` Alineación del icono, los valores permitidos son: "left" y "right".
			* @returns {String} `html` Retorna una plantilla html, que contiene las configuraciones del icono. 
			*/
		var getIconHTML = function (config, position) {
			var html = '<span class="icon input-group-addon uni-addon-' + position + '">';
			var icon = config.icon;
			if (typeof icon === 'boolean') {
				icon = config.defaultIcon;
			}
			if (angular.isString(icon)) {
				icon = icon.split(/\s|\;|\,/);
			}
			if (!angular.isArray(icon)) {
				icon = [icon];
			}
			for (var i = 0; i < icon.length; i += 1) {
				html = html + '<span uni-badge="{ level:\'' + config.level + '\', icon:\'' + icon[i] + '\'}"></span>';
			}
			html = html + '</span>';
			return html;
		};
		/**
			* Genera una cadena <code>HTML</code>, que contiene al componente, la generaración se produce en base al tipo de 
			* <code>HTML input</code> <code>"text", "number", "date", "time", "email" y "password".</code>.
			* 
			* ```js
			* var html = basicHtml(html, config, position);
			* ```
			*
			* @api Method basicHtml()
			* @param {htmlElement} `cloneRoot` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {String} `position` Alineación del icono, los valores permitidos son: "left" y "right".
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			*/
		var basicHtml = function (cloneRoot, config, position) {
			var html;
			if (config.mode === "NATIVE") {
				cloneRoot.className = "form-control";
			} else {
				cloneRoot.className = "form-control selectpicker";
			}
			if (config.search) {
				cloneRoot.setAttribute('data-live-search', 'true');
			}
			if (config.icon) {
				var htmlIcon = getIconHTML(config, position);
				html = '<div class="uni-field uni-select ' + (position === 'normal' ? '' : 'uni-group') + '">' + cloneRoot.outerHTML + htmlIcon + '</div>';
			} else {
				html = '<div class="uni-field uni-select ">' + cloneRoot.outerHTML + '</div>';
			}
			return html;
		};
		/** 
			* Verifica si el elemento es parte de una directiva <code>uni-group</code>, y obtiene su posición.
			* 
			* ```js
			* var position = 	var position = elementPosInGroup(element);
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML  input al cual se adiciona la directiva "uni-input"..
			* @returns {String} `html` Retorna una cadena que indica la posición del elemento si pertenece a un "uni-group"
			* @api Method elementPosInGroup()
			*/
		var elementPosInGroup = function (element) {
			var parent, position = "normal";
			if (element) {
				if (!(element instanceof angular.element)) {
					element = angular.element(element);
				}
				parent = element.parent();
				if (parent && parent.hasClass("input-group")) {
					if (element.index() === 0) {
						position = "first";
					} else if (element.index() === (parent.children().length - 1)) {
						position = "last";
					} else {
						position = "medium";
					}
				}
			}
			return position;
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			terminal: true,
			priority: 10,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniSelect');
				if (config.skip) {
					return element[1];
				}
				$unikit.prepareUniConvert(element, attrs, config);
				var htmlControl = element[0];
				delete attrs.uniConvert;
				var position = elementPosInGroup(element);
				if (config.mode === 'NATIVE') {
					return basicHtml(htmlControl, config);
				} else {
					htmlControl.setAttribute('unx-select-watch', 'true');
					return basicHtml(htmlControl, config, position);
				}
			},
			link: function (scope, element, attrs) {
				$compile(element)(scope);
			}
		};
	}]);

/**
	* Directiva que complementa al componente <code>uni-select</code>, cuando este usa el plugin, 
	* <a href="https://silviomoreto.github.io/bootstrap-select/examples/" target="_blank">Bootstrap Select</a>
	* para recargar las opciones cuando se actualiza el listado del modelo usado.
	* 
	* 
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @api unxSelectWatch
	*/
unikit.directive('unxSelectWatch', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		var valueRepeat = "";
		/**
			* Oberva los cambios que pueda sufrir el modelo "valueRepeat" asociado al componente
			* 
			* @param {HTMLElement} `element` Elemento HTML Select principal afectado por la directiva uni-select.
			* @param {javascript Object} `scope` Alcance del del modelo dentro del controller definido para el componente.
			* @api dynamicOptionsSync
			*/
		var dynamicOptionsSync = function (element, scope) {
			scope.$watch(valueRepeat, function (newVal, oldValue) {
				scope.$evalAsync(function () {
					if (!angular.equals(newVal, oldValue)) {
						element.selectpicker('refresh');
					}
				});
			});
		};
		/**
			* Oberva los cambios que pueda sufrir el modelo asociado al componente
			* 
			* @param {HTMLElement} `element` Elemento HTML Select principal afectado por la directiva uni-select.
			* @param {javascript Object} `scope` Alcance del del modelo dentro del controller definido para el componente.
			* @param {String} `model` ng-model de angular que usa el componente afectado por uni-select.
			* @api watchModelSelect
			*/
		var watchModelSelect = function (element, scope, model) {
			scope.$watch(model, function (newVal, oldVal) {
				element.closest('.uni-field').find('button').removeAttr('data-original-title');
				scope.$evalAsync(function () {
					element.selectpicker('refresh');
					if (element.prop("required")) {
						if (newVal) {
							element.closest('.uni-field').removeClass('has-uni-error');
							element.closest('.bootstrap-select').removeClass('ng-invalid ng-invalid-required');
						} else {
							element.closest('.uni-field').addClass('has-uni-error');
						}
					}
				});
			});
		};
		/**
			* Si el componente es parte de una ventana Modal con alto absoluto, el metodo repinta el listado de opciones y se muestra por delante de la ventana.
			* El metodo calcula las dimensiones y corrige la posicion que inicialmente es creado por el plugin bootstrap-select, haciendo uso del evento 
			* creando una funcion de corrección de CSS en el evento <a  target='_blank' href='https://silviomoreto.github.io/bootstrap-select/options/#events'>shown.bs.select</a> del plugin mencionado.
			* 
			* ```js
			* showSelectHandler(HTMLElement);
			* ```
			* 
			* @param {HTMLElement} `element` Elemento HTML Select principal afectado por la directiva uni-select.
			* @api onShowSelectHandler
			*/
		var onShowSelectHandler = function (element) {
			var bootstrapSelect = element.closest('.uni-field.uni-select');
			var modalPanel = element.closest('.modal-dialog.modal-md');
			var menu = bootstrapSelect.find('.dropdown-menu.open');
			var modalBody = element.closest('.modal-body');
			var offssetModal = modalPanel.offset();
			var offssetSelect = bootstrapSelect.offset();
			var cssConfig = {
				position: 'fixed',
				top: offssetSelect.top - offssetModal.top + bootstrapSelect.outerHeight(),
				minWidth: bootstrapSelect.outerWidth(),
				left: offssetSelect.left - offssetModal.left
			};
			menu.css(cssConfig);
			modalBody.scroll(function () {
				bootstrapSelect.find('.btn-group.bootstrap-select').removeClass('open');
			});
		}
		/**
			* Fija la variable del componente "valueRepeat" si existe, para identificar el argumento (modelo angular) que se va iterar.
			* 
			* @param {HTMLElement} `element` Elemento HTML Select principal afectado por la directiva uni-select.
			* @api watchModelSelect
			*/
		var fixDynamicLoad = function (element) {
			var result = "";
			var option = element.find('*[ng-repeat]') || element.find('*[data-ng-repeat]') || element.find('*[x-ng-repeat]');
			if (option.get(0)) {
				result = option.attr("ng-repeat") || option.attr("data-ng-repeat") || option.attr("x-ng-repeat");
				result = result.split(" ");
				result = result[result.indexOf("in") + 1];
			}
			valueRepeat = result;
		};
		return {
			restrict: 'A',
			require: '?ngModel',
			compile: function (element, attrs) {
				fixDynamicLoad(element);
				return function (scope, element, attrs, ngModel) {
					if (!ngModel) {
						console.warn("ngModel es requerido en: ", element[0].outerHTML.substring(0, element[0].outerHTML.indexOf('>') + 1));
						element.removeClass('selectpicker');
						return;
					}
					if (attrs.uniOption) {
						scope.$watch(attrs.uniOption, function (a, b) {
							scope.$evalAsync(function () {
								element.selectpicker('refresh');
							});
						});
					}
					if (valueRepeat) {
						dynamicOptionsSync(element, scope);
					}
					watchModelSelect(element, scope, attrs.ngModel);
					if (element.closest('.modal-scrollbar').get(0)) {
						element.on('shown.bs.select', function (e) {
							onShowSelectHandler(element, e);
						});
					}
					ngModel.$render = function () {
						scope.$evalAsync(function () {
							element.selectpicker('refresh');
						});
					};
				};
			}
		};
	}]);
/**
	* Directiva de aspecto <b>uniFilter</b>, que transforma un <code>html input</code>, adiciona CSS classes como '<code>form-control</code>'
	* generando una nueva estructura <code>HTML</code> compatible con <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a>,
	* que muestra una lista de opciones con operadores logicos.
	* 
	* ```html
	* <input uni-filter="{}" type="text" ng-model="uniFilter">
	* ```
	*
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @api uniFilter
	*/
unikit.directive('uniFilter', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		/**
			* Mapa de configuración, base para la creación del menu de operadores logicos.
			* 
			* @api const CONFIG
			*/
		const CONFIG = {
			IS_NULL: {label: 'nulo', level: 'default', input: 0},
			NOT_NULL: {label: 'no nulo', level: 'default', input: 0},
			EQUALS: {label: '=', level: 'default', input: 1},
			NOT_EQUALS: {label: '<>', level: 'default', input: 1},
			GREATER_THAN: {label: '>', level: 'default', input: 1},
			GREATER_EQUALS: {label: '>=', level: 'default', input: 1},
			LESS_THAN: {label: '<', level: 'default', input: 1},
			LESS_EQUALS: {label: '<=', level: 'default', input: 1},
			LIKE: {label: 'contiene', level: 'default', input: 1},
			NOT_LIKE: {label: 'no contiene', level: 'default', input: 1},
			BETWEEN: {label: 'entre', level: 'default', input: 2},
			NOT_BETWEEN: {label: 'no entre', level: 'default', input: 2}
		};
		/**
			* Conjunto de operadores agrupados segun tipo de dato.
			* 
			* @api const OPER_BY
			*/
		const OPER_BY = {
			ALL: {eq: CONFIG.EQUALS, ne: CONFIG.NOT_EQUALS, li: CONFIG.LIKE, nl: CONFIG.NOT_LIKE, gt: CONFIG.GREATER_THAN, ge: CONFIG.GREATER_EQUALS, lt: CONFIG.LESS_THAN, le: CONFIG.LESS_EQUALS, be: CONFIG.BETWEEN, nb: CONFIG.NOT_BETWEEN, nu: CONFIG.IS_NULL, nn: CONFIG.NOT_NULL},
			BASIC: {eq: CONFIG.EQUALS, ne: CONFIG.NOT_EQUALS, nu: CONFIG.IS_NULL, nn: CONFIG.NOT_NULL},
			NUMBER: {eq: CONFIG.EQUALS, ne: CONFIG.NOT_EQUALS, gt: CONFIG.GREATER_THAN, ge: CONFIG.GREATER_EQUALS, lt: CONFIG.LESS_THAN, le: CONFIG.LESS_EQUALS, be: CONFIG.BETWEEN, nb: CONFIG.NOT_BETWEEN, nu: CONFIG.IS_NULL, nn: CONFIG.NOT_NULL},
			DATE: {eq: CONFIG.EQUALS, ne: CONFIG.NOT_EQUALS, gt: CONFIG.GREATER_THAN, ge: CONFIG.GREATER_EQUALS, lt: CONFIG.LESS_THAN, le: CONFIG.LESS_EQUALS, be: CONFIG.BETWEEN, nb: CONFIG.NOT_BETWEEN, nu: CONFIG.IS_NULL, nn: CONFIG.NOT_NULL},
			TEXT: {eq: CONFIG.EQUALS, ne: CONFIG.NOT_EQUALS, li: CONFIG.LIKE, nl: CONFIG.NOT_LIKE, nu: CONFIG.IS_NULL, nn: CONFIG.NOT_NULL}
		};
		/**
			* Genera una cadena <code>HTML</code>, que contiene al componente, la generaración se produce en base al tipo de 
			* <code>HTML input</code> <code>"text", "number", "date"</code>.
			* 
			* ```js
			* var html = createHTMLInputFilterTemplate(dom);
			* ```
			*
			* @param {htmlElement} `dom` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-filter".
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLInputFilterTemplate()
			*/
		var createHTMLInputFilterTemplate = function (dom) {
			var type = (dom.getAttribute('type') || 'text').toUpperCase();
			var ngModel = dom.getAttribute('ng-model');
			dom.setAttribute('ng-model', '{ngModel}.value');
			dom.setAttribute('type', 'split');
			dom.setAttribute('class', 'form-control');
			dom.setAttribute('uni-convert', '{}');
			dom.setAttribute('ng-disabled', '__oper.disable({ngModel})');
			var html = '<div class="uni-filter input-group">' +
											'<div class="input-group-btn">' +
											'<button type="button" class="btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
											'	{{__oper.label({ngModel}.oper)}} <span class="caret"></span>' +
											'</button>' +
											'<div class="dropdown-menu">' +
											'<a class="btn btn-danger btn-xs" ng-click="{ngModel} = undefined"><span class="fa fa-eraser"></span></a>' +
											'{htmlAllowOperator}' +
											'</div>' +
											'</div>' +
											'	{htmlControl}' +
											'<div class="input-group-addon">' +
											'<span class="fa fa-filter"></span>' +
											'</div>' +
											'</div>';
			var htmlAllowOperator = '<a ng-repeat="(k,v) in __oper.allow(\'{type}\')" class="btn btn-{{v.level}} btn-xs" ng-click="{ngModel}.oper = k">{{v.label}}</a>';
			html = html.replace('{htmlAllowOperator}', htmlAllowOperator);
			html = html.replace('{htmlControl}', dom.outerHTML);
			html = html.replace('{type}', type);
			html = html.replace(/{ngModel}/gi, ngModel);
			return html;
		};
		/**
			* Genera una cadena <code>HTML</code>, que contiene al componente, la generaración se produce en base al tipo de 
			* <code>HTML select</code>
			* 
			* ```js
			* var html = createHTMLSelectFilterTemplate(dom);
			* ```
			*
			* @param {htmlElement} `dom` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-filter".
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLInputFilterTemplate()
			*/
		var createHTMLSelectFilterTemplate = function (dom) {
			var ngModel = dom.getAttribute('ng-model');
			dom.setAttribute('ng-model', '{ngModel}.value');
			dom.setAttribute('class', 'form-control');
			dom.options[dom.options.length] = new Option('---', '');
			var html = '<div class="input-group">' +
											'<div class="input-group-btn">' +
											'<button type="button" class="btn btn-danger" ng-click="{ngModel} = undefined">' +
											'<span class="glyphicon glyphicon-erase"></span>' +
											'</button>' +
											'</div>' +
											'	{htmlControl}' +
											'<div class="input-group-addon">' +
											'<span class="glyphicon glyphicon-filter"></span>' +
											'</div>' +
											'</div>';
			html = html.replace('{htmlControl}', dom.outerHTML);
			html = html.replace(/{ngModel}/gi, ngModel);
			return html;
		};
		/**
			* Adiciona operaciones al <a href='https://docs.angularjs.org/guide/scope' target='_blank'>scope</a> del componente.
			* <p> <b>function disable:</b> Al inicio el componente se encuentra deshabilitado, y vuelve a este estado cuando se realiza la limpieza.</p>
			* <p> <b>function allow:</b> retorna el conjunto de operaciónes logicas que se encuentra mapeada.
			* <p> <b>function label:</b> retorna el texto de la operación logica seleccionada.
			* 
			* ```js
			* operation(scope);
			* ```
			*
			* @param {javascript Object} `scope` Es un objeto que se refiere al modelo de aplicación
			* @api Method addOperation()
			*/
		var addOperation = function (scope) {
			scope.__oper = {
				disable: function (filter) {
					var isDisable = filter === undefined || filter === null || filter.oper === undefined || filter.oper === 'nu' || filter.oper === 'nn';
					if (isDisable && filter) {
						filter.value = undefined;
					}
					return isDisable;
				},
				allow: function (key) {
					return OPER_BY[key] || OPER_BY.BASIC;
				},
				label: function (key) {
					return  (OPER_BY.ALL[key] || {}).label;
				}
			};
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			terminal: true,
			priority: 10,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniFilter');
				if (config.skip) {
					return element[1];
				}
				var dom = element[0].cloneNode(true);
				var html = '<a>No support for template <b>' + config.type + '</b> type.</a>';
				if (dom.nodeName === 'INPUT') {
					html = createHTMLInputFilterTemplate(dom);
				} else if (dom.nodeName === 'SELECT') {
					html = createHTMLSelectFilterTemplate(dom);
				}
				return html;
			},
			link: function (scope, element) {
				if (!scope.__oper) {
					addOperation(scope);
				}
				$compile(element)(scope);
			}
		};
	}]);
/**
	* Directiva de diseño <b>uniGrid</b>, transforma un <code>html DIV</code> a una regilla, generando una nueva estructura <code>HTML Conatiner de 
	* </code> <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a>.	
	* 
	* ```html
	* <div uni-grid></div>
	* <div uni-grid=""></div>
	* <div uni-grid="{cols:[2,2,2,2,2,2]}"></div>
	* ```
	*
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @api uniGrid
	*/
unikit.directive('uniGrid', ['$rootScope', '$unikit', '$compile', function ($rootScope, $unikit, $compile) {
		/**
			* Adicionar un identificador <code>HTML id</code> a una etiqueta, si tiene identificador lo mantiene.
			* 
			* ```js
			* var html = addIdToElement(HTMLElement)
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML DOM al cual se adiciona el identificador
			* @api metodo addIdToElement()
			*/
		var addIdToElement = function (element) {
			if (!element.prop("id")) {
				var id = "uni-" + Math.random().toString(16).slice(2);
				element.prop("id", id);
			}
			return element;
		};
		/**
			* Relaciona elementos <code>HTMl input, select, textarea</code> con la etiqueta <coode>HTML label</code>, para asignar a traves de la 
			* propiedad <code>for</code>.
			* 
			* ```js
			* relateInputWithLabel(HTMLElement)
			* ```
			*
			* @param {htmlElement} `element` Elemento HTML DOM al cual se adiciona la relación entre "HTML label" y "HTML control"
			* @api metodo relateInputWithLabel()
			*/
		var relateInputWithLabel = function (element) {
			var id;
			var tagName = element.prop("tagName");
			var relatedToTag = ["INPUT", "SELECT", "TEXTAREA"];
			element = addIdToElement(element);
			if (tagName === "LABEL") {
				var nextNode = element.next();
				var nodeName = nextNode.prop("tagName");
				if (relatedToTag.indexOf(nodeName) !== -1) {
					id = addIdToElement(nextNode).prop("id");
					element.prop("for", id);
				}
				if (nextNode.prop("nodeName") === "SPAN") {
					id = addIdToElement(nextNode).prop("id");
					element.prop("for", id);
				}
			}
		};
		/**
			* Si el valor de la propiedad <code>extend</code> es <code>true</code>, adiciona las directivas correspondientes a las etiquetas: 
			* <p><code>HTML input, HTML select, HTML textarea, HTML span</code></p>
			* 
			* ```js
			* processExtendDirectives(HTMLElement)
			* ```
			*
			* @param {htmlElement} `item` Elemento HTML Element
			* @api metodo  processExtendDirectives()
			*/
		var processExtendDirectives = function (item) {
			if (item.nodeName === 'INPUT' && !item.hasAttribute('uni-input') && !item.hasAttribute('uni-filter')) {
				item.setAttribute('uni-input', '{}');
			} else if (item.nodeName === 'SELECT' && !item.hasAttribute('uni-select') && !item.hasAttribute('uni-filter')) {
				item.setAttribute('uni-select', '{}');
			} else if (item.nodeName === 'TEXTAREA' && !item.hasAttribute('uni-editor')) {
				item.setAttribute('uni-editor', "{type:'simple'}");
			} else if (item.nodeName === 'LABEL' && !item.hasAttribute('uni-text')) {
				item.setAttribute('uni-text', '{}');
				item.className = "control-label";
			} else if (item.nodeName === 'SPAN' && !item.hasAttribute('uni-group')) {
				item.setAttribute('uni-group', '{}');
			}
		};
		/**
			* Genera el sistema de regillas para la estructura <code>HTML Bootstrap</code> 
			* Se basa en 12 columnas, itera los nodos hijos del <code>HTML principal</code>, si se tiene un nodo &lt;br&gt; crea una fila 
			* <code>&lt;div class='row'&gt;&lt;/div&gt</code>
			* 
			* ```js
			* createHTMLGridTemplate(HTMLElement, config)
			* ```
			*
			* @param {htmlElement} `gridDom` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-grid".
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `html` Cadena HTML formada a partir de todos los hijos de nodo principal.
			* @api metodo createHTMLGridTemplate()
			*/
		var createHTMLGridTemplate = function (gridDom, config) {
			var i = 0;
			var html = '<div class="row">';
			angular.forEach(gridDom.children, function (item, index) {
				relateInputWithLabel(angular.element(item));
				if (item.nodeName === 'BR') {
					html = html + '</div><div class="row uni-grid-row">';
					i = 0;
				} else {
					var col = item.getAttribute('col') || config.cols[i];
					var lcol = item.getAttribute('lcol') || "";
					if (lcol) {
						lcol = 'col-md-offset-' + lcol;
					}
					i = (i + 1) % config.cols.length;

					if (config.extend) {
						processExtendDirectives(item);
					}
					html = html + '<div class="col-md-' + col + " " + lcol + ' uni-grid-item">' + item.outerHTML + '</div>';
				}
			});
			html = html + '</div>';
			html = '<div class="container-fluid uni-grid-' + config.status + '">' + html + '</div>';
			return html;
		};
		/**
			* Genera el sistema de regillas para la estructura <code>HTML TABLE</code> 
			* Se basa la creacion de filas y columnas, itera los nodos hijos del <code>HTML principal</code>, si se tiene un nodo &lt;br&gt; crea una nueva fila .
			* 
			* ```js
			* createHTMLTableTemplate(HTMLElement, config)
			* ```
			*
			* @param {htmlElement} `gridDom` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-grid".
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `html` Cadena HTML formada a partir de todos los hijos de nodo principal.
			* @api metodo createHTMLTableTemplate()
			*/
		var createHTMLTableTemplate = function (gridDom, config) {
			var html = '<tr>';
			angular.forEach(gridDom.children, function (item) {
				item = item.cloneNode(true);
				if (item.nodeName === 'BR') {
					html = html + '</tr><tr>';
				} else {
					if (config.extend) {
						processExtendDirectives(item);
					}
					html = html + '<td>' + item.outerHTML + '</td>';
				}
			});
			html = html + '</tr>';
			html = '<table class="table">' + html + '</table>';
			return html;
		};

		return {
			restrict: 'A',
			replace: true,
			scope: false,
			priority: 10,
			terminal: true,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniGrid');
				if (config.skip) {
					return element[1];
				}
				var gridDom = element[0];
				var html = '<a>No support for template <b>' + config.type + '</b> type.</a>';
				if (config.type === 'GRID') {
					html = createHTMLGridTemplate(gridDom, config);
				} else if (config.type === 'TABLE') {
					html = createHTMLTableTemplate(gridDom, config);
				}
				return html;
			},
			link: function (scope, element) {
				$compile(element)(scope);
			}
		};
	}]);
/**
	* La directiva sirve para la personalización de etiquetas tradicionales HTML BUTTON, HTML SPAN, HTML LINK:
	* 
	* Directiva de aspecto <b>uniBadge</b>, que transforma un <code>html textarea</code>, adiciona classes como '<code>btn label lnk</code>'
	* generando una nueva estructura <code>HTML</code> compatible con <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a>	
	* <p><b>La propiedad icon:</b>  Nombre corto del icono Font Awesome <a href='http://fontawesome.io/icons/' target='_blank'>Icons</a>. </p>
	* <p><b>La propiedad level:</b>  Color de prioridad segun distintivos de Bootstrap, los valores permitidos son <code>danger, success, primary, warning, info y default</code></p>
	* 
	* ```html
	* <button uni-badge></button>
	* <span uni-badge></span>
	* <a uni-badge></a>
	* ```
	*	
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @api uniBadge
	*/
unikit.directive('uniBadge', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		var TAG = {
			SPAN: 'label',
			DIV: 'alert',
			BUTTON: 'btn',
			A: 'lnk',
			LI: 'list-group-item',
			PANEL: 'panel',
			INPUT: 'btn'
		};
		/** 
			* Verifica si el elemento es parte de una directiva <code>uni-group o clase CSS 'input-group-addon'</code>.
			* 
			* ```js
			* var position = 	var position = parentNodeIsInInputGroup(element);
			* ```
			*
			* @param {htmlElement} `domRoot` Elemento HTML  input al cual se adiciona la directiva 'uni-input'..
			* @returns {htmlElement} `parentNode` Retorna un HTML Element o undefined;
			* @api Method parentNodeIsInInputGroup()
			*/
		var parentNodeIsInInputGroup = function (domRoot) {
			var parentNode;
			if (!(domRoot instanceof angular.element)) {
				domRoot = angular.element(domRoot);
			}
			if (domRoot.parent().hasClass('input-group-addon')) {
				parentNode = domRoot.parent();
			}
			return parentNode;
		};
		/**
			* Construye la estructura HTML para el contenido y para el ícono que acompaña al componente uni-badge,
			* 
			* @param {String} `position` Determina la posición en la cual se adicionara el icono si corresponde.
			* @param {HTMLElement} `domRoot` Elemento HTML DOM clon del HTML al cual se adiciona la directiva 'uni-badge'.
			* @returns {String} `iconClass` Css class que determina el icono que se adicionara al componente.
			* @returns {HTMLElement} `domRoot` Elemento HTML principal con modificaciones en sus nodos hijos.
			* @api positionIconAndText
			*/
		var positionIconAndText = function (position, domRoot, iconClass) {
			var domIcon = document.createElement('span');
			if (domRoot.innerHTML) {
				var textContentNode = document.createElement('span');
				textContentNode.setAttribute('class', 'text-content');
				textContentNode.innerHTML = domRoot.innerHTML;
				domRoot.innerHTML = textContentNode.outerHTML;
			}
			domIcon.setAttribute('class', 'icon-text ' + iconClass);
			if (position === 'left') {
				domRoot.insertBefore(domIcon, domRoot.firstChild);
			} else {
				domRoot.appendChild(domIcon);
			}
			return domRoot;
		};
		/**
			* Genera una cadena <code>HTML</code>, que contiene a los iconos de componente, la generaración se produce en base al tipo de 
			* <code>HTML input</code>
			* 
			* ```js
			* var htmlIcon = createHTMLIconTemplate(HTMLElement, config);
			* ```
			* @param {htmlElement} `cloneRoot` Elemento HTML DOM clon del HTML al cual se adiciona la directiva 'uni-badge'.
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura HTML del icono. 
			* @api Method createHTMLIconTemplate()
			*/
		var createHTMLIconTemplate = function (domRoot, config) {
			var html = '';
			if (config.text === false) {
				domRoot.innerHTML = '';
			}
			var iconClass = $unikit.buildIconClass(config.icon);
			var parentNode = parentNodeIsInInputGroup(domRoot);
			if (!parentNode) {
				domRoot = positionIconAndText(config.position, domRoot, iconClass);
				var pre = TAG[domRoot.nodeName];
				if (pre) {
					var classColor = 'uni-badge ' + pre + ' ' + pre + '-' + config.level;
					domRoot.setAttribute('class', classColor + ' ' + (iconClass ? config.position : ""));
				}
			} else {
				parentNode.addClass("uni-badge label");
				domRoot.setAttribute('class', 'icon-text ' + iconClass);
				if (iconClass === config.icon) {
					domRoot.textContent = config.icon;
				}
				parentNode.addClass("label-" + config.level);
			}
			html = domRoot.outerHTML;
			return html;
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			terminal: true,
			priority: 10,
			template: function (element, attrs) {
				var config = $unikit.iconConfig(element, attrs, 'uniBadge');
				if (config.skip) {
					return element[1];
				}
				var dom = element[0];
				return createHTMLIconTemplate(dom, config);
			},
			link: function (scope, element) {
				$compile(element)(scope);
			}
		};
	}]);

/**
	* La directiva realiza la agrupación y adiciona estilos <code>CSS class btn-group</code>compatible con <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a> 
	* a las etiquetas tradicionales HTML BUTTON, HTML INPUT type "button".
	* Esta Directiva puede ser combinada con la directiva <code>uni-badge</code> para la personalización de los botones.	
	* 
	* ```html
	* <div uni-action><button >Test1</button><input value="Test2"/></div>
	* ```
	*
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.	
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @api uniAction
	*/
unikit.directive('uniAction', ['$rootScope', '$unikit', '$compile', function ($rootScope, $unikit, $compile) {
		/** 
			* Verifica si el elemento HTML al cual se adiciono la directiva es un elemento valido <code>HTML BUTTON, HTML INPUT "type Button o Submit"</code>, 
			* si es valido se adiciona la directiva <code>uni-badge</code>.
			* 
			* ```js
			* processExtendDirectives(htmlElement);
			* ```
			*
			* @param {htmlElement} `item` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @api Method processExtendDirectives()
			*/
		var processExtendDirectives = function (item) {
			var hasNotBadge = !item.hasAttribute('uni-badge');
			var nodeName = item.nodeName;
			var type = item.getAttribute('type');
			if (hasNotBadge) {
				if (nodeName === 'BUTTON') {
					item.setAttribute('uni-badge', '{}');
				} else if (nodeName === 'A') {
					item.setAttribute('uni-badge', '{}');
				} else if (nodeName === 'INPUT') {
					if (type === 'submit') {
						item.setAttribute('uni-badge', '{}');
					} else if (type === 'button') {
						item.setAttribute('uni-badge', '{}');
					}
				}
			}
		};

		/** 
			* 
			* Evalua a los HTML hijos y adiciona la directiva <code>"uni-badge"</code>, ademas de agrupar a los HTML hijos en un contenedor <code>HTML DIV con CSS class btn-group</code>
			* Creando asi un  "HTML template".
			* 
			* ```js
			* createHTMLBlockTemplate(id, dom, config);
			* ```
			*
			* @param {String} `id` Identificador para la propieddad "id" del componente
			* @param {htmlElement} `dom` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-action".
			* @param {javascrip Object} `config` Configuración fijada por el usuario unida con la configuracion por defecto para el componente.
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLBlockTemplate()
			*/
		var createHTMLBlockTemplate = function (id, dom, config) {

			var html = '';
			angular.forEach(dom.children, function (item) {
				if (config.extend) {
					processExtendDirectives(item);
				}
				html = html + item.outerHTML;
			});

			html = '<div class="btn-group uni-action-block" role="group">' + html + '</div>';
			return html;
		};

		var createHTMLHeaderTemplate = function (id, dom, config) {
			var html = dom.innerHTML;
			html = '';
			angular.forEach(dom.children, function (item) {
				if (config.extend) {
					processExtendDirectives(item);
				}
				html = html + item.outerHTML;
			});
			html = '<div class="btn-group uni-action-header pull-right" role="group">' + html + '</div>';
			return html;
		};

		var createHTMLDropdownTemplate = function (id, dom, config) {
			//var header = dom.querySelector(':scope > legend, :scope > header');
			var header = querySelector(dom, 'legend, header');
			if (header) {
				dom.removeChild(header);
				header = header.innerHTML;
			}
			var htmlHeader = header || config.title || 'Opciones';
			var htmlOption = '';
			angular.forEach(dom.children, function (item, index) {
				if (item.nodeName === 'BR') {
					htmlOption = htmlOption + '<li role="separator" class="divider"></li>';
				} else {
					if (config.extend) {
						processExtendDirectives(item);
					}
					htmlOption = htmlOption + '<li>' + item.outerHTML + '</li>';
				}
			});
			var html = '<div class="dropdown uni-action-dropdown">' +
											'<span class="dropdown-toggle uni-click" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
											' {htmlHeader}' +
											'<span class="caret"></span>' +
											'</span>' +
											'<ul class="dropdown-menu">' +
											' {htmlOption}' +
											'</ul>' +
											'</div>';
			//html = html.replace(/{id}/g, id);
			html = html.replace(/{htmlHeader}/g, htmlHeader);
			html = html.replace(/{htmlOption}/g, htmlOption);
			return html;
		};

		return {
			restrict: 'A',
			replace: true,
			scope: false,
			priority: 10,
			terminal: true,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniAction');
				var id = createID(element);
				//var config = {skip: false, type: 'GROUP', extend: true};
				//delete attrs.uniAction;
				element[0].removeAttribute('uni-action');
				if (config.skip) {
					return element[1];
				}
				var dom = element[0];
				var html = '<a>No support for template <b>' + config.type + '</b> type.</a>';
				if (config.type === 'BLOCK') {
					html = createHTMLBlockTemplate(id, dom, config);
				} else if (config.type === 'HEADER') {
					html = createHTMLHeaderTemplate(id, dom, config);
				} else if (config.type === 'DROPDOWN') {
					html = createHTMLDropdownTemplate(id, dom, config);
				}
				return html;
			},
			link: function (scope, element) {
				$compile(element)(scope);
			}
		};
	}]);

/**
	* Directiva de diseño <b>uniPanel</b>, transforma un <code>html DIV o Fieldset a un </code>HTML Panel<code>
	* de </code> <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a>.	
	* 
	* ```html
	* <div uni-panel></div>
	* <div uni-panel=""></div>
	* <div uni-panel="{type:'panel'}"></div>
	* <div uni-panel="{type:'modal'}"></div>
	* <div uni-panel="{type:'subpanel'}"></div>
	* ```
	*
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @api uniPanel
	*/
unikit.directive('uniPanel', ['$rootScope', '$unikit', '$compile', function ($rootScope, $unikit, $compile) {
		/**
			* Configura la partes <code>header, body, footer</code> del panel en un objeto JSON
			* 
			* ```js
			* var parts = createPanelObject(HTMLElement)
			* ```
			* @param {HTMLElement} `dom` HTML original sobre el cual se asigno la directiva 
			* @returns {JSON Object} `panel` Configuración de los elemento que componen al panel "header", "body" y "footer".
			* @api createPanelObject
			*/
		var createPanelObject = function (dom) {
			var panel = {header: undefined, content: undefined, footer: undefined};
			panel.header = querySelector(dom, 'legend, header');
			if (panel.header) {
				dom.removeChild(panel.header);
			} else if (dom.getAttribute('title')) {
				panel.header = document.createElement("div");
				var title = dom.getAttribute('title');
				title = document.createTextNode(title);
				panel.header.appendChild(title);
			}
			//panel.footer = dom.querySelector('#' + id + '> footer');
			//panel.footer = dom.querySelector(':scope > footer');
			panel.footer = querySelector(dom, 'footer');
			if (panel.footer) {
				dom.removeChild(panel.footer);
			}
			panel.content = dom;
			return panel;
		};
		/**
			* Crea un <code>HTML panel Bootstrap</code> 
			* 
			* ```js
			* var html = createHTMLPanelTemplate(htmlElement, config, css);
			* ```
			*
			* @param {htmlElement} `dom` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {String} `css` Css class del componente
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLPanelTemplate()
			*/
		var createHTMLPanelTemplate = function (dom, config, css) {
			var panel = createPanelObject(dom);
			var templateHTML = '<div class="panel panel-{color} {css}">{headerHTML} {contentHTML} {footerHTML}</div>';
			var headerHTML = '';
			if (panel.header) {
				headerHTML = '<div class="panel-heading">{innerHTML}</div>'.replace('{innerHTML}', panel.header.innerHTML);
			}
			var contentHTML = '';
			if (panel.content) {
				contentHTML = '<div class="panel-body">{innerHTML}</div>'.replace('{innerHTML}', panel.content.innerHTML);
			}
			var footerHTML = '';
			if (panel.footer) {
				footerHTML = '<div class="panel-footer">{innerHTML}</div>'.replace('{innerHTML}', panel.footer.innerHTML);
			}
			templateHTML = templateHTML.replace('{color}', config.level);
			templateHTML = templateHTML.replace('{headerHTML}', headerHTML);
			templateHTML = templateHTML.replace('{contentHTML}', contentHTML);
			templateHTML = templateHTML.replace('{footerHTML}', footerHTML);
			templateHTML = templateHTML.replace(/{css}/g, css);
			return templateHTML;
		};
		/**
			* Crea un <code>HTML modeal Bootstrap</code> 
			* 
			* ```js
			* var html = createHTMLModalTemplate(htmlElement, config, css);
			* ```
			*
			* @param {htmlElement} `dom` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-input".
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {String} `css` Css class del componente
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLPanelTemplate()
			*/
		var createHTMLModalTemplate = function (dom, config, css) {
			var panel = createPanelObject(dom);
			var templateHTML = '<div class="uni-panel uni-modal"><div class="modal-backdrop fade in {css}"></div>' +
											'<div tabindex="-1" role="dialog" class="modal fade in {css}-content {cssScroll}" style="display: block; overflow:visible">' +
											'<div role="document" class="modal-dialog modal-{size}" style="width:{width}">' +
											'<div class="modal-content modal-{color}">{headerHTML} {contentHTML} {footerHTML}' +
											'</div></div></div></div>';
			var headerHTML = '';
			var contentHTML = '';
			var footerHTML = '';

			if (config.content === false) {
				if (panel.header) {
					headerHTML = '<div class="modal-header {css}-header">{innerHTML}</div>'.replace('{innerHTML}', panel.header.innerHTML);
				}
				if (panel.content) {
					contentHTML = '<div class="panel-body modal-body {css}-body" style="{height}; {overflow}">{innerHTML}</div>'.replace('{innerHTML}', panel.content.innerHTML);
				}
				if (panel.footer) {
					footerHTML = '<div class="modal-footer {css}-footer">{innerHTML}</div>'.replace('{innerHTML}', panel.footer.innerHTML);
				}
			} else {
				if (panel.header) {
					contentHTML += panel.header.innerHTML;
				}
				if (panel.content) {
					contentHTML += panel.content.innerHTML;
				}
				if (panel.footer) {
					contentHTML += panel.footer.innerHTML;
				}
			}
			templateHTML = templateHTML.replace('{headerHTML}', headerHTML);
			templateHTML = templateHTML.replace('{contentHTML}', contentHTML);
			templateHTML = templateHTML.replace('{footerHTML}', footerHTML);
			templateHTML = templateHTML.replace('{color}', config.level);
			templateHTML = templateHTML.replace('{size}', config.size);
			templateHTML = templateHTML.replace('{width}', config.width);
			templateHTML = templateHTML.replace('{cssScroll}', config.height !== 'none' ? 'modal-scrollbar' : '');
			templateHTML = templateHTML.replace('{height}', config.height !== 'none' ? 'height:' + config.height : '');
			templateHTML = templateHTML.replace('{overflow}', config.height !== 'none' ? 'overflow:auto' : '');
			templateHTML = templateHTML.replace(/{css}/g, css);
			return templateHTML;
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			priority: 10,
			terminal: true,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, this.name);
				if (config.skip) {
					return element[1];
				}
				var html = '<a>No support for template <b>' + config.type + '</b> type.</a>';
				var dom = element[0];
				if (config.type === 'PANEL') {
					html = createHTMLPanelTemplate(dom, config, 'uni-panel');
				} else if (config.type === 'SUBPANEL') {
					html = createHTMLPanelTemplate(dom, config, 'uni-subpanel');
				} else if (config.type === 'MODAL') {
					html = createHTMLModalTemplate(dom, config, 'uni-modal');
				}
				return html;
			},
			link: function (scope, element) {
				$compile(element)(scope);
			}
		};
	}]);
/**
	* Directiva de diseño <b>uniPanels</b>, transforma un <code>html DIV </code>HTML Panels <code>
	* de </code> <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a>
	* <p>La agrupación de paneles puede ser <code>Tabs o Accordions</code></p>
	* 
	* ```html
	* <div uni-panels></div>
	* <div uni-panels=""></div>
	* <div uni-panels="{type:'tab'}"></div>
	* <div uni-panels="{type:'ltab'}"></div>
	* <div uni-panels="{type:'acc'}"></div>
	* ```
	*
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @api uniPanels
	*/
unikit.directive('uniPanels', ['$rootScope', '$unikit', '$compile', function ($rootScope, $unikit, $compile) {
		/**
			* Mapa de valores para las clases css del componente, segun su <code>tipo: TAB o LTAB</code>
			* 
			* 
			* @api CSS_TAB
			*/
		var CSS_TAB = {
			TAB: 'uni-tabs-top',
			RTAB: 'uni-tabs-right',
			LTAB: 'uni-tabs-left',
			BTAB: 'uni-tabs-bottom'
		};
		/**
			* Evalua si el componente tiene las directivas de visibilidad <code>ng-show, ng-hide, ng-if</code> en el DOM, si es asi los adicionad al elemento
			* 
			* ```js
			* evaluateNgVisibility(domRoot, element);
			* ```
			* 
			* @param {HTMLElement} `dom` Nodo HTML el cual es avaluado para verificar si existe atributos angular
			* @param {HTMLElement} `elem` Elemento html que heredara las directivas angular
			* @api Method getIconHTML()
			*/
		var evaluateNgVisibility = function (dom, elem) {
			var listNg = ['ng-show', 'ng-hide', 'ng-if'];
			for (var i = 0; i < listNg.length; i += 1) {
				var value = dom.getAttribute(listNg[i]);
				if (value) {
					elem.setAttribute(listNg[i], value);
				}
			}
		};
		/**
			* Configura la partes <code>header, body, footer</code>,  para los elementos del contenedor de paneles en un objeto JSON
			* 
			* ```js
			* var parts = createPanelObject(HTMLElement)
			* ```
			* @param {HTMLElement} `dom` HTML original sobre el cual se asigno la directiva 
			* @returns {JSON Object} `panel` Configuración de los elemento que componen al panel "header", "body" y "footer".
			* @api createPanelObject()
			*/
		var createPanelObject = function (dom) {
			var panel = {id: 0, item: []};
			panel.id = dom.id || Math.random().toString(16).slice(2);
			var itemList = querySelectorAll(dom, 'fieldset, div');
			angular.forEach(itemList, function (content, index) {
				content = content.cloneNode(true);
				var header = querySelector(content, 'legend, header');
				if (header) {
					content.removeChild(header);
				} else if (content.getAttribute('title')) {
					header = document.createElement("div");
					var title = content.getAttribute('title');
					title = document.createTextNode(title);
					header.appendChild(title);
				}
				evaluateNgVisibility(content, header);
				var footer = querySelector(content, 'footer');
				if (footer) {
					content.removeChild(footer);
				}
				panel.item[index] = {
					header: header === null ? undefined : header,
					content: content,
					footer: footer === null ? undefined : footer
				};
				var value = content.getAttribute('ng-repeat');
				if (value) {
					panel.item[index].ngRepeat = value;
				}
			});
			return panel;
		};
		/**
			* Remplaza el <code>Tag Name</code> de una etiquet <code>HTML Element</code>
			* 
			* ```js
			* var html = replaceTagName(HTMLElement);
			* ```
			* 
			* @param {HTMLElement} `element` Elemento HTML que se quiere cambiar el "tagName"
			* @param {String} `val` Nuevo "TagName"
			* @returns {HTMLElement} `html` Etiqueta HTML con el cambio de "tagName"
			* @api replaceTagName()
			*/
		var replaceTagName = function (element, val) {
			var tagName = element.tagName.toLowerCase();
			var resultHTML = element.outerHTML;
			var html;
			resultHTML = resultHTML.replace(tagName, val);
			resultHTML = resultHTML.replace(new RegExp(tagName + ".$"), val + '>');
			html = angular.element(resultHTML)[0];
			return html;
		};
		/**
			* Crea el conjunto de cabeceras para <code>HTML tabs Bootstrap</code> 
			* 
			* ```js
			* var html = createHTMLTabHeaderTemplate(id, itemList, config);
			* ```
			*
			* @param {String} `id` Identificador del HTML Element original
			* @param {Array} `itemList` Elementos HTML  hijos del nodo principal, los cuales seran parte del conjunto de paneles
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLPanelTemplate()
			*/
		var createHTMLTabHeaderTemplate = function (id, itemList, config) {
			var justified = config.type === "TAB" || config.type === "BTAB" ? "nav-justified" : "";
			var htmlTemplate = '<ul	class="uni-tabs-list {componentClass}-list  nav nav-tabs ' + justified + '">{itemHTML}</ul>';
			var itemHTML = '';
			angular.forEach(itemList, function (item, index) {
				if (item.header) {
					var html = replaceTagName(item.header, 'li');
					html.setAttribute('data-toggle', 'tab');
					if (item.ngRepeat) {
						html.setAttribute('data-target', '#{idContent}-{{$index}}');
						html.setAttribute('class', "uni-tab-item a");
						var ngClass = item.header.getAttribute('ng-class');
						var ngActiveClass = "$index === 0?\'active\':\'\'";
						if (ngClass) {
							ngActiveClass = ngActiveClass + ";" + ngClass;
							item.header.setAttribute("ng-class", ngActiveClass);
							html.setAttribute('ng-class', ngActiveClass);
						} else {
							item.header.setAttribute('ng-class', ngActiveClass);
							html.setAttribute('ng-class', ngActiveClass);
						}
						html.setAttribute('ng-repeat', item.ngRepeat);
					} else {
						html.setAttribute('class', "uni-tab-item a {active}");
						html.setAttribute('data-target', '#{idContent}');
						html.setAttribute('data-toggle', 'tab');
					}
				}
				html = html ? html.outerHTML : '';
				//html = html.replace('{ngRepeat}', item.ngRepeat ? item.ngRepeat : '');
				html = html.replace('{active}', index === 0 ? 'active' : '');
				html = html.replace('{idContent}', id + '-' + index);
				html = html.replace('{headerHTML}', item && item.header ? item.header.innerHTML : '--Title--');
				itemHTML += html;
			});
			htmlTemplate = htmlTemplate.replace('{itemHTML}', itemHTML);
			return htmlTemplate;
		};
		/**
			* Crea el conjunto de cuerpos para <code>HTML tabs Bootstrap</code> 
			* 
			* ```js
			* var html = createHTMLTabContentTemplate(id, itemList, config);
			* ```
			*
			* @param {String} `id` Identificador del HTML Element original
			* @param {Array} `itemList` Elementos HTML  hijos del nodo principal, los cuales seran parte del conjunto de paneles
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLTabContentTemplate()
			*/
		var createHTMLTabContentTemplate = function (id, itemList) {
			var htmlTemplate = '<div	class="tab-content {componentClass}">{itemHTML}</div>';
			var itemHTML = '';
			angular.forEach(itemList, function (item, index) {
				var html = '<div class="tab-pane fade {active}" id="{idContent}">{itemContent} {htmlFooter}</div>';
				if (item.ngRepeat) {
					html = '<div {ngClass} class=" tab-pane" id="{idContent}-{{$index}}" {ngRepeat}>{itemContent} {htmlFooter}</div>';
					html = html.replace('{ngRepeat}', 'ng-repeat="' + item.ngRepeat + '"');
					html = html.replace('{ngClass}', 'ng-class="' + item.header.getAttribute('ng-class') + '"');
				}
				var content = item.content;
				var footer = item.footer;
				html = html.replace('{active}', index === 0 ? ' active in' : '');
				html = html.replace('{idContent}', id + '-' + index);
				html = html.replace('{itemContent}', content ? content.innerHTML : '--Content--');
				if (footer) {
					html = html.replace('{htmlFooter}', '<div class="panel-footer">{htmlFooter}</div>');
					html = html.replace('{htmlFooter}', footer.innerHTML);
				} else {
					html = html.replace('{htmlFooter}', '');
				}
				html = angular.element(html)[0];
				evaluateNgVisibility(item.content, html);
				itemHTML += html.outerHTML;
			});
			htmlTemplate = htmlTemplate.replace('{itemHTML}', itemHTML);
			return htmlTemplate;
		};
		/**
			* Crea el la estructura HTML template para <code>HTML tabs Bootstrap</code> 
			* 
			* ```js
			* var html = createHTMLTabTemplate(dom, config);
			* ```
			*
			* @param {HTMLElement} `dom` * HTML original sobre el cual se asigno la directiva 
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `templateHTML` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLTabTemplate()
			*/
		var createHTMLTabTemplate = function (dom, config) {
			var panel = createPanelObject(dom);
			var templateHTML = '<div class="uni-panels {componentClass} {level} with-nav-tabs">{headerHTML} {contentHTML}</div>';
			if (config.type === 'BTAB') {
				templateHTML = '<div class="uni-panels {componentClass} with-nav-tabs">{contentHTML} {headerHTML}</div>';
			}
			var headerHTML = createHTMLTabHeaderTemplate(panel.id, panel.item, config);
			var contentHTML = createHTMLTabContentTemplate(panel.id, panel.item);
			templateHTML = templateHTML.replace('{headerHTML}', headerHTML);
			templateHTML = templateHTML.replace('{contentHTML}', contentHTML);
			templateHTML = templateHTML.replace(/{componentClass}/g, CSS_TAB [config.type]);
			templateHTML = templateHTML.replace(/{level}/g, config.level);
			return templateHTML;
		};
		/**
			* Crea el la estructura HTML template para <code>HTML accordion Bootstrap</code> 
			* 
			* ```js
			* var html = createHTMLAccTemplate(dom, config);
			* ```
			*
			* @param {HTMLElement} `dom` * HTML original sobre el cual se asigno la directiva 
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `templateHTML` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLAccTemplate()
			*/
		var createHTMLAccTemplate = function (dom, config) {
			var panel = createPanelObject(dom);
			var templateHTML = '<div class="uni-panels uni-accordion uni-accordion-{color} panel-group" id="{idParent}">{contentHTML}</div>';
			var contentHTML = '';
			var itemHTML = '<div class="panel panel-{color}" {ngRepeat}>' +
											'<div class="panel-heading">' +
											'<div class="panel-title">{headHTML}</div>' +
											'</div>{bodyHTML}</div>';
			angular.forEach(panel.item, function (item, index) {
				var content = item.content;
				var footer = item.footer;
				var html = itemHTML;
				var bodyHTML = '<div class="panel-collapse collapse {active}" id="{idContent}"><div class="panel-body">{htmlContent}</div> {htmlFooter} </div>';
				var headHTML = item.header;
				headHTML.setAttribute('data-parent', "#{idParent}");
				headHTML.setAttribute('data-toggle', "collapse");
				headHTML.setAttribute('data-target', '#{idContent}');
				headHTML.setAttribute('class', "collapsed");
				headHTML = replaceTagName(headHTML, 'div');
				headHTML = headHTML.outerHTML;
				if (item.ngRepeat) {
					headHTML = headHTML.replace(/{idContent}/g, panel.id + '-' + "{{$index}}");
					bodyHTML = createDinamicHTMLACCItem(html, item, panel.id);
					html = html.replace('{ngRepeat}', 'ng-repeat="' + item.ngRepeat + '"');
					html = html.replace(/{bodyHTML}/g, bodyHTML);
					html = html.replace('{active}', '');
				} else {
					headHTML = headHTML.replace(/{idContent}/g, panel.id + '-' + index);
					bodyHTML = bodyHTML.replace(/{idContent}/g, panel.id + '-' + index);
					html = html.replace('{ngRepeat}', '');
					html = html.replace(/{bodyHTML}/g, bodyHTML);
					html = html.replace('{active}', index === 0 ? 'in' : '');
				}
				html = html.replace(/{headHTML}/g, headHTML);
				html = html.replace('{color}', config.level);
				html = html.replace('{idParent}', config.autoclose ? panel.id : '');
				html = html.replace('{htmlContent}', content ? content.innerHTML : '--Content--');
				if (footer) {
					html = html.replace('{htmlFooter}', '<div class="panel-footer">{htmlFooter}</div>');
					html = html.replace('{htmlFooter}', footer.innerHTML);
				} else {
					html = html.replace('{htmlFooter}', '');
				}
				html = angular.element(html)[0];
				evaluateNgVisibility(item.content, html);
				contentHTML += html.outerHTML;
			});
			templateHTML = templateHTML.replace('{contentHTML}', contentHTML);
			templateHTML = templateHTML.replace('{idParent}', panel.id);
			templateHTML = templateHTML.replace('{color}', config.level);
			return templateHTML;
		};

		var createDinamicHTMLACCItem = function (html, item, idPanel) {
			var bodyHTML = '<div class="panel-collapse collapse" id="{idContent}" {ngClass}>' +
											'<div class="panel-body">{htmlContent}</div> {htmlFooter} </div>';
			var ngClass = item.header.getAttribute('ng-class');
			bodyHTML = bodyHTML.replace(/{ngClass}/g, ngClass ? 'ng-class="' + ngClass + '"' : '');
			bodyHTML = bodyHTML.replace(/{idContent}/g, idPanel + '-' + '{{$index}}');
			return bodyHTML;
			html = html.replace('{ngRepeat}', 'ng-repeat="' + item.ngRepeat + '"');
			return html;
		};

		/**
			* Crea el la estructura HTML template para <code>HTML Slide Bootstrap</code> 
			* 
			* ```js
			* var html = createHTMLSliceTemplate(dom, config);
			* ```
			*
			* @param {HTMLElement} `dom` * HTML original sobre el cual se asigno la directiva 
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @returns {String} `templateHTML` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createHTMLSliceTemplate()
			*/
		var createHTMLSliceTemplate = function (dom, config) {
			var panel = createPanelObject(dom);
			var templateHTML = '<div class="carousel slide">{contentLINK}{contentHTML}{contentCTRL}</div>';
			var contentHTML = '';
			var itemHTML = '<div class="panel panel-{color}">' +
											'<div class="panel-heading">' +
											'<h4 class="panel-title"><div class="a" data-target="#{idContent}" data-parent="#{idParent}" data-toggle="collapse" class="collapsed"><span class="glyphicon glyphicon-th"></span> {htmlHeader}</div></h4>' +
											'</div>' +
											'<div class="panel-collapse collapse {active}" id="{idContent}"><div class="panel-body">{htmlContent}</div> {htmlFooter} </div>' +
											'</div>';
			itemHTML = itemHTML.replace('{idParent}', panel.id);
			itemHTML = itemHTML.replace('{color}', config.level);
			angular.forEach(panel.item, function (item, index) {
				var html = itemHTML;
				var header = item.header;
				var content = item.content;
				var footer = item.footer;
				html = html.replace('{active}', index === 0 ? 'in' : '');
				html = html.replace(/{idContent}/g, panel.id + '-' + index);
				html = html.replace('{htmlHeader}', header ? header.innerHTML : '--Header--');
				html = html.replace('{htmlContent}', content ? content.innerHTML : '--Content--');
				if (footer) {
					html = html.replace('{htmlFooter}', '<div class="panel-footer">{htmlFooter}</div>');
					html = html.replace('{htmlFooter}', footer.innerHTML);
				} else {
					html = html.replace('{htmlFooter}', '');
				}
				contentHTML += html;
			});
			templateHTML = templateHTML.replace('{contentHTML}', contentHTML);
			return templateHTML;
		};

		return {
			restrict: 'A',
			replace: true,
			scope: false,
			priority: 10,
			terminal: true,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniPanels');
				if (config.skip) {
					return element[1];
				}
				var html = '<a>No support for template <b>' + config.type + '</b> type.</a>';
				var panelsDom = element[0];
				if (/TAB/.test(config.type)) {
					html = createHTMLTabTemplate(panelsDom, config);
				} else if (config.type === 'ACC' || config.type === 'ACCORDION') {
					html = createHTMLAccTemplate(panelsDom, config);
				} else if (config.type === 'SLIDE') {
					//Este componente no es oficial
					html = createHTMLSliceTemplate(panelsDom, config);
				}
				return html;
			},
			link: function (scope, element) {
				//var config = element.attr('uni-panels');
				element.removeAttr('uni-panels');
				$compile(element)(scope);
				//element.attr('uni-panel', config);
			}
		};
	}]);

/**
	* Directiva de aspecto <b>uniTable</b>, que transforma un <code>HTML table</code>a una nueva estructura <code>HTML</code> 
	* compatible con <a href='http://getbootstrap.com/css/#forms' target='_blank'>Bootstrap</a>.
	* Se debe agregar la directiva unicamente en etiquetas <code>HTML table</code>
	* 
	* ```html
	*<table uni-table="">
	*	<thead>
	*		<tr>
	*			<th i18n="id">Title col1</th>
	*			<th i18n="codigo">Title col2</th>
	*		</tr>
	*	</thead>
	*	<tbody>
	*		<tr ng-repeat="row in dataList">
	*			<td>{{row.col1}}</td>
	*			<td>{{row.col2}}</td>
	*		</tr>
	*	</tbody>
	*</table>	
	* ```
	*
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @api uniTable
	*/
unikit.directive('uniTable', ['$unikit', '$rootScope', '$compile', function ($unikit, $rootScope, $compile) {
		/**
			* Adiciona CSS clases de "Table Bootstrap" al elemento "HTML Table"
			* 
			* @param {HTMLElement} `element` Elemento HTML "Table" al cual se adiciona la directiva "uni-table"
			* @returns {HTMLElement} `element` Elemento HTML con adición de Css clases para visualizar "Bootstrap Table"
			* @api metodo addCssClass()
			*/
		var addCssClass = function (element, plus) {
			element.addClass('uni-table table');
			element.addClass('table-sm');
			element.addClass('table-responsive');
			element.addClass(plus ? 'table-plus' : 'table-striped');
			return element;
		};
		/**
			* Adiciona CSS clases de "Table Bootstrap" al elemento "HTML Table"
			* 
			* @param {HTMLElement} `element` Elemento HTML "Table" al cual se adiciona la directiva "uni-table"
			* @returns {HTMLElement} `element` Elemento HTML con adición de Css clases para visualizar "Bootstrap Table"
			* @api metodo addCssClass()
			*/
		var addUniSortInRows = function (element, config) {
			var rows = element.find('*[sort]');
			angular.forEach(rows, function (row) {
				var attr = row.getAttribute('sort');
				row.setAttribute("uni-sort", config.sort + "('" + attr + "')");
				row.setAttribute("ng-click", config.sort + "('" + attr + "')");
			});
		};
		/**
			* Fija los eventos de seleccion de fila, para adicionar un clase con "ng-class" y "ng-click" para obtener los datos seleccionados, 
			* asi se tiene dos parametros "select" que contiene los datos seleccionados y "selected" que fija el estilo de seleccion de fila.
			* 
			* @param {HTMLElement} `element` Elemento HTML "Table" al cual se adiciona la directiva "uni-table"
			* @returns {javascript Object} `config` Configuración del componente que es fijado por el usuario y unido con la configuracion por defecto.
			* @api metodo createSelectionEvents()
			*/
		var createSelectionEvents = function (element, config) {
			var rows = element.find('*[ng-repeat]') || element.find('*[data-ng-repeat]') || element.find('*[x-ng-repeat]');
			angular.forEach(rows, function (row) {
				var param = row.getAttribute('ng-repeat') || row.getAttribute('data-ng-repeat') || row.getAttribute('x-ng-repeat');
				param = param.trim().split(/\s|in/)[0];
				param = '(' + param + ', $index)';
				if (config.select && !row.hasAttribute('ng-click')) {
					row.setAttribute('ng-click', config.select + param);
				}
				if (config.selected && !row.hasAttribute('ng-class')) {
					row.setAttribute('ng-class', config.selected + param + "? 'st-selected' : ''");
				}
			});
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			terminal: true,
			priority: 500,
			template: function (element, attrs) {
				var config = $unikit.componentConfig(element, attrs, 'uniTable');
				if (config.skip) {
					return element[1];
				}
				var dom = element[0];
				//var plus = true && dom.querySelector(':scope > *[uni-plus], :scope > * > *[uni-plus]');
				var plus = true && querySelector(dom, '*[uni-plus], * > *[uni-plus]');
				element = addCssClass(element, plus);
				if (config.sort) {
					addUniSortInRows(element, config);
				}
				if (config.select || config.selected) {
					createSelectionEvents(element, config);
				}
				return element[0].outerHTML;
			},
			link: function (scope, element) {
				$compile(element)(scope);
			}
		};
	}]);

/**
	* Directiva de aspecto <b>uni-scroll</b>, permite adicionar una barra de desplazamiento <code> Nativo </code> o con un <code>plugin</code> a algun tipo de HTML contenedor.
	* 
	* ```html
	* <div uni-scroll></div>
	* ```
	*
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$timeout` Envoltura de AngularJS para window.setTimeout, propio de angularJs
	* @api uniScroll
	*/
unikit.directive('uniScroll', ['$unikit', '$rootScope', '$compile', '$timeout', function ($unikit, $rootScope, $compile, $timeout) {
		var directiveName = 'uniScroll';
		/*
			* Fija el alto absoluto para visualizar la bara de desplazamiento.
			* 
			* @param {HTMLElement} `element` Elemento contendor, afectado por la directiva 
			* @api method fixAbsoluteHeight(element)
			*/
		var fixAbsoluteHeight = function (element) {
			var config = element.data()[directiveName];
			var currentHeight;
			if (/^\d+(\.\d+)?px$/.test(config.height)) {
				currentHeight = config.height;
			} else {
				currentHeight = element.css('height');
			}
			config.height = currentHeight;
			element.css({
				height: currentHeight
			});
		};
		/*
			* Evalua si el elemento principal es un componente uni-panel, uni-table con contenido "body", 
			* para retornar un elemento HTML valido para adicionar la barra de desplazamiento.
			* 
			* @param {HTMLElement} `element` Elemento contendor, afectado por la directiva 
			* @return {HTMLElement} `element` Elemento contendor, afectado por la directiva
			* @api method evaluateScrollElement(element)
			*/
		var evaluateScrollElement = function (element) {
			var affectedItem = element;
			element.addClass("uni-scroll-container");
			if (element.hasClass('uni-panel')) {
				affectedItem = element.find('.panel-body').eq(0);
			} else if (element.hasClass('uni-table')) {
				affectedItem = element.find('tbody').eq(0);
			}
			return affectedItem;
		};
		/*
			* Adiciona los eventos javascript para actualizar las dimensiones del scroll en el plugin
			* 
			* @param {HTMLElement} `element` Elemento contendor, afectado por la directiva
			* @param {javascript Object} `scope` Es un objeto que se refiere al modelo de aplicación 
			* @api method atachUpdateScrollEvents(element, scope)
			*/
		var atachUpdateScrollEvents = function (element, scope) {
			element.bind("mouseenter click", function () {
				scope.$evalAsync(function () {
					Ps.update(element.get(0));
				});
			});
		};
		/**
			* Si el contenedor usa la directiva ng-show, ng-hide o ng-if, para su vizualización se adiciona, un evento para observar al modelo relacionado a la 
			* vizualización, para fijar las dimensiones de los elementos afectados.
			* 
			* 
			* @param {javascript Object} `attrs` Atributos fijados en la etiqueta principal
			* @param {javascript Object} `scope` Es un objeto que hace refiere al objeto de modelos y funciones de aplicación
			* @param {HTMLElement} `element` Elemento contendor, afectado por la directiva
			* @param {HTMLElement} `parent` Si el elemento es parte de un contenedor que es afectado por las directivas ng-show, ng-hide, se requiere el paret.
			* @returns {undefined}
			* @api method fixWatchToUpdate(attrs, scope, elm, parent)
			*/
		var fixWatchToUpdate = function (attrs, scope, elm, parent) {
			var criteriaShow = attrs.ngShow || attrs.ngIf || attrs.ngHide;
			scope.$watch(criteriaShow, function (newVal) {
				if (newVal) {
					$timeout(function () {
						fixAbsoluteHeight(elm);
						var items = $('.uni-scroll');
						angular.forEach(items, function (elm) {
							if (elm.closest('.modal-body') === parent.get(0)) {
								fixAbsoluteHeight(angular.element(elm));
							}
						});
					}, 0);
				}
			});
		};
		/**
			* Metodo principal que evalua al elemento afectado por la directiva 'uni-scroll', 
			* adiciona eventos de actualizacion de dimensiones, y evalua si adiciona barra de desplazamiento nativo o con plugin.
			* 
			* 
			* @param {javascript Object} `scope` Es un objeto que hace refiere al objeto de modelos y funciones de aplicación
			* @param {HTMLElement} `affectedItem` Elemento contendor, afectado por la directiva 
			* @param {javascript Object} `attrs` Atributos fijados en la etiqueta principal
			* @param {HTMLElement} `config` Configuracion del componente 
			* @returns {undefined}
			* @api method applyScroll(scope, affectedItem, attrs, config)
			*/
		var applyScroll = function (scope, affectedItem, attrs, config) {
			var modalParent = null;
			affectedItem.addClass('uni-scroll');
			if (config.always) {
				affectedItem.addClass('always-visible');
			}
			if (!affectedItem.closest('.modal-body').get(0)) {
				fixAbsoluteHeight(affectedItem);
			} else {
				modalParent = affectedItem.closest('.modal-body');
			}
			atachUpdateScrollEvents(affectedItem, scope);
			if (attrs.ngShow || attrs.ngIf || attrs.ngHide) {
				fixWatchToUpdate(attrs, scope, affectedItem, modalParent);
			}
			if (config.type === "SCROLL") {
				Ps.initialize(affectedItem.get(0));
			} else {
				affectedItem.css({
					overflow: 'auto'
				});
				console.log(affectedItem);
			}
		};
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.removeAttr('uni-scroll');
				var affectedItem = evaluateScrollElement(element);
				var config = $unikit.scrollConfig(affectedItem, attrs, directiveName);
				if (!config.skip) {
					var afterRender = function () {
						applyScroll(scope, affectedItem, attrs, config);
					};
					$timeout(afterRender, 0);
				}
			}
		};
	}]);
/**
	* La directiva de apariencia HTML IMAGE Bootstrap, con opciones de descarga, expandir una imagen de una direccion absoluta o un valor angular
	* 
	* 
	* ```html	
	* <img	uni-image="{design: 'circle', expand: true, download: true}"	ng-src="{{imgData.src}}"	alt="{{imgData.name}}"/>
	*	<img	uni-image="{design: 'rounded', expand: true, download: true}"	src="/static/img/test.jpg"	alt="paisaje"/>
	*	<img	uni-image="{design: 'circle'}"	src="http://localhost/static/images/test.png"	alt="paisaje"/>
	*	<img	uni-image="{design: 'thumbnail'}"	src="http://www.anypage/avatar.png"	alt="paisaje"/>
	* Donde: 
	* design, Es el estilo que presenta la imagen segun img Botstrap 
	* expand, Si es lavor es "true", el boton de expandir sera visualizado en una ventan modal.
	* download, Si el valor es true, el boton de descarga estara visible.
	* alt, Es el nombre alternativo si la imagen no logra cargar.
	* src, Se debe usar esta propiedad cuando la imagen sea una dirección URL 
	* ng-src, Se debe usar en caso de tener como referencia de la imagen a un modelo de angular, previamente definido.
	* ```
	*
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.	
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$http` Objeto angular que tiene la función de realizar peticiones al servidor.
	* @api <h1>uni-image</h1>
	*/
unikit.directive('uniImage', ['$unikit', '$rootScope', '$compile', '$http', function ($unikit, $rootScope, $compile, $http) {
		/**
			* Crea el template de Botones
			* 
			* ```js
			* var html = createAreaButtons(config, attrs);
			* ```
			*
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {Object} `attrs` argumentos que son los atributos y/o propiedades de la directiva 
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura de los botones de descarga y expandir imagen.
			* @api Method createAreaButtons()
			*/
		var createAreaButtons = function (config, attrs) {
			var modalModel = "uni" + Math.random().toString(16).slice(2);
			var html = "<div><span class='buttons img-area-buttons'>{buttonDownloadTpl}{buttonZoomTpl}</span>{modalTpl}</div>";
			var buttonZoomTpl = "<button ng-init='{model} = false' ng-click='{model} = true; {expandClick}()' uni-badge='{confBtn}'></button>";
			var buttonDownloadTpl = "<button ng-click='{download}(this)' uni-badge='{icon:\"download\"}'></button>";
			var zoomModal = "<div uni-panel='{configPanel}' ng-show='{model}' uni-scroll='{height:\"450px\"}'>" +
											"<header><span class='uni-close'><button ng-click='{model} = false' uni-badge=''>X</button></span></header>" +
											"<div><img class='img img-expand' ng-src={srcImage}></div>" +
											"<footer>{buttonDownloadTpl}</footer></div>";

			html = html.replace(/{modalTpl}/g, config.expand ? zoomModal : '');
			html = html.replace(/{buttonDownloadTpl}/g, config.download ? buttonDownloadTpl : '');
			html = html.replace(/{buttonZoomTpl}/g, config.expand ? buttonZoomTpl : '');
			html = html.replace(/{model}/g, modalModel);
			html = html.replace(/{expandClick}/g, attrs.expandClick);
			html = html.replace(/{srcImage}/g, config.src ? config.src : '');
			html = html.replace(/{download}/g, attrs.downloadModel);
			html = html.replace(/{confBtn}/g, JSON.stringify({icon: 'expand'}));
			html = html.replace(/{configPanel}/g, JSON.stringify({type: 'modal', size: 'lg'}));
			return html;
		};
		/**
			* Crea el template del componente
			* 
			* ```js
			* var html = createTemplate(config, attrs);
			* ```
			*
			* @param {Javascript Object} `config` Configuración de los atributos del componente.
			* @param {Object} `attrs` argumentos que son los atributos y/o propiedades de la directiva 
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method createTemplate()
			*/
		var createTemplate = function (config, attrs) {
			var html = "<div class='uni-image'><span class='image-container'>{imgTpl}{areaButtons}</span></div>";
			var areaButtons = createAreaButtons(config, attrs);
			var imgTpl;
			imgTpl = "<img class='img img-simple img-{designImg}' ng-src={srcImg} alt={alt}>";
			html = html.replace(/{imgTpl}/g, imgTpl);
			html = html.replace(/{areaButtons}/g, areaButtons);
			html = html.replace(/{designImg}/g, config.design);
			html = html.replace(/{srcImg}/g, config.src);
			html = html.replace(/{alt}/g, config.alt);
			return html;
		};
		/**
			* Verifica si el valor de recurso "img" es una direccion URL o un modelo angular
			* 
			* ```js
			* var result = isUrlPath(val)
			* ```
			*
			* @param {String} `val` Valor que tiene el atributo src o ng-src del componente.
			* @returns {String} `html` Retorna una plantilla html, que contiene las estructura del componente.
			* @api Method isUrlPath()
			*/
		var isUrlPath = function (val) {
			var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			var result = false;
			if (expression.test(val)) {
				result = true;
			}
			return result;
		};
		/**
			* Adiciona el evento para expandir la imagen en una ventana modal
			* - Si la imagen es base64, no se realiza la peticion de la imagen mejorada
			* - Si la imagen es un URL se realizara la petición de una imagen mejorarda URL?img-high.jpg,
			*			si no se cuenta con una imagen mejorada se reutiliza la imagen basica que se tiene inicialmente.
			* 
			* @param {HTMLElement} `element` Elemento HTML img que contiene el valor del recurso imagen
			* @api Method expandEvent()
			*/
		var expandEvent = function (element) {
			var imgElm = element.find('.img-expand');
			var imgMinSrc = element.find('.img-simple').attr('src');
			if (isUrlPath(imgMinSrc)) {
				var index = imgMinSrc.lastIndexOf('.');
				var newPath = imgMinSrc.substr(0, index);
				var ext = imgMinSrc.substr(index, imgMinSrc.length);
				var newPath = newPath + '-high' + ext;
				$http({
					method: 'GET',
					url: newPath
				}).then(function success(response) {
					imgElm.attr('src', newPath);
				}, function error(response) {
					imgElm.attr('src', imgMinSrc);
					console.warn('no high quality image', newPath);
				});
			}
		};
		/**
			* Adiciona el evento en el boton para descargar la imagen
			* @param {HTMLElement} `element` Elemento HTML img que contiene el valor del recurso imagen
			* @param {Object} `attrs` argumentos que son los atributos y/o propiedades de la directiva 
			* @api Method expandEvent()
			*/
		var downloadEvent = function (element, attrs) {
			var imgSrc = element.find('.img-simple').attr('src');
			if (isUrlPath(imgSrc)) {
				download(imgSrc);
			} else {
				download(imgSrc, attrs.alt);
			}
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			terminal: true,
			priority: 10,
			template: function (element, attrs) {
				var ngSrc = attrs.ngSrc || attrs.src || 'untitle';
				var alt = attrs.alt || '';
				var config = $unikit.componentConfig(element, attrs, 'uniImage');
				var html;
				if (config.skip) {
					html = element[1];
				} else {
					config.src = ngSrc;
					config.alt = alt;
					attrs.downloadModel = "uni" + Math.random().toString(16).slice(2);
					attrs.expandClick = "uni" + Math.random().toString(16).slice(2);
					html = createTemplate(config, attrs);
					delete attrs['src'];
					element.removeAttr('src');
				}
				return html;
			},
			link: function (scope, element, attrs) {
				var model = attrs.downloadModel;
				var expandClick = attrs.expandClick;
				scope[model] = function (a) {
					downloadEvent(element, attrs);
				};
				scope[expandClick] = function () {
					expandEvent(element);
				};
				$compile(element)(scope);
			}
		};
	}]);
unikit.filter('code', function () {
	return function (input, uppercase) {
		input = input || {};
		input.code = input.code || 'S/C';
		if (uppercase && input.value) {
			input.value = input.value.toUpperCase();
		}
		if(input.value === input.code){
			return input.code;
		}
		return '[' + input.code + ']' + input.value;		
	};
});
unikit.filter('param', function () {
	return function (value, values) {
		var valueString = '' + value;
		var toString = '[' + value + ']';
		if (!value && value !== 0) {
			toString = '[' + value + ']';
		} else if (angular.isArray(values)) {
			for (var i in values) {
				var item = values[i];
				if (item.code === value || ('' + item.code) === valueString) {
					toString = item.value || toString;
					break;
				} else if (item.value === value || ('' + item.value) === valueString) {
					toString = item.description || toString;
					break;
				}
			}
		} else if (angular.isObject(values)) {
			toString = values[value] || values[valueString] || toString;
		}
		return toString;
	};
});
unikit.filter('typeof', function() {
  return function(obj) {
    return typeof obj
  };
});
unikit.filter('trusted', ['$sce', function ($sce) {
		return function (url) {
			return $sce.trustAsResourceUrl(url);
		};
	}]);
unikit.directive('uneTable', function ($timeout) {
	return {
		restrict: 'A',
		scope: {
			data: "="
		},
		controller: function ($scope) {
			$scope.rowsToShow = ["10", "25", "50"];
			$scope.mode = $scope.data.multiple ? "multiple" : "single";
			$scope.colspan = $scope.data.cols.length + ($scope.data.multiple ? 1 : 0);
			$scope.selectRows = [];
			$scope.deleteItem = function (item) {
				angular.forEach($scope.selectRows, function (data, index) {
					if (data === item) {
						$scope.selectRows.splice(index, 1);
						return;
					}
				});
			};

			$scope.isSelected = function (obj) {
				return $scope.data.multiple ? $scope.selectRows.indexOf(obj) > -1 : false;
			};

			$scope.selectRow = function (selRow) {
				if ($scope.canSelectRow) {
					if ($scope.data.multiple) {
						if ($scope.isSelected(selRow)) {
							$scope.deleteItem(selRow);
						} else {
							$scope.selectRows.push(selRow);
						}

						if ($scope.selectRows.length === 0) {
							$scope.selectedAll = false;
						}
					} else {
						if (!angular.equals($scope.selectRows.$$hashKey, selRow.$$hashKey)) {
							$scope.selectRows = selRow;
							if ($scope.data.fnRow !== undefined) {
								$scope.data.fnRow.fn(selRow);
							}
						} else {
							$scope.selectRows = {};
						}
					}
				}
			};

		},
		replace: true,
		template:
			'<div>' +
			'<span ng-show="data.rowsPage"><label for="items">Mostrar ' +
			'<select name="items" ng-model="itemsByPage" class="btn btn-default btn-xs">' +
			'<option ng-repeat="r in rowsToShow" value="{{r}}">{{r}}</option>' +
			'</select> registros</label>&nbsp;</span>' +
			'<button class="btn btn-default btn-xs" ng-show="data.quickSearch" ng-click="showLocalSearch = !showLocalSearch" title="Buscar en los resultados"><span class="glyphicon glyphicon-search"></span></button>' +
			'<div class="pull-right">' +
			'<div class="btn-group">' +
			'<button ng-repeat="fn in data.fn" ng-click="fn.fn(selectRows)" class="btn btn-default btn-xs" title="{{fn.tooltip}}"><span ng-show="fn.icon" class="glyphicon {{fn.icon}}"></span> {{fn.label}}</button>' +
			'</div>' +
			'</div>' +
			'<table st-table="displayRows" st-safe-src="data.rows" class="table table-striped">' +
			'<thead>' +
			'<tr ng-show="showLocalSearch">' +
			'<td colspan="{{colspan}}">' +
			'<input st-search="" type="text" ng-model="tmpLocalSearch" placeholder="Buscar en los resultados" class="input-sm form-control">' +
			'</td>' +
			'</tr>' +
			'<tr>' +
			'<th ng-hide="!data.multiple"><input type="checkbox" ng-model="selectedAll" ng-click="checkAll(selectedAll)"></th>' +
			'<th st-sort="{{column.id}}" ng-repeat="column in data.cols">{{column.title}}</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody>' +
			'<tr st-select-row="row" ng-click="selectRow(row)" st-select-mode="{{mode}}" ng-repeat="row in displayRows">' +
			'<td ng-hide="!data.multiple"><input type="checkbox" ng-checked="isSelected(row)"></td>' +
			'<td ng-repeat="column in data.cols" unx-print-column valor="row" pcolumn="column.id"></td>' +
			'</tr>' +
			'</tbody>' +
			'<tfoot>' +
			'<tr>' +
			'<td colspan="{{colspan}}">' +
			'<span st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages=""></span>' +
			'</td>' +
			'</tr>' +
			'</tfoot>' +
			'</table>' +
			'</div>',
		link: function (scope, element, attr) {
			$timeout(function () {
				scope.itemsByPage = scope.rowsToShow[0];
				scope.canSelectRow = true;
			});

			scope.checkAll = function (opt) {
				scope.selectedAll = opt;
				scope.selectRows.splice(0);
				angular.forEach(scope.data.rows, function (dataRow) {
					dataRow.isSelected = scope.selectedAll;
					if (scope.selectedAll) {
						scope.selectRows.push(dataRow);
					}
				});
			};
		}
	};
}).directive('unxPrintColumn', function ($compile, $timeout) {
	return {
		require: '^?uneTable',
		restrict: 'A',
		scope: {
			valor: "=",
			pcolumn: "="
		},
		link: function (scope, element) {
			scope.htmlElement = undefined;

			scope.getData = function (object, column) {
				if (object) {
					var cols = column.split('.');
					if (cols.length === 1) {
						scope.htmlElement = object[cols[0]];
					} else {
						var newObject = object[cols[0]];
						var newCols = cols.slice(1, cols.length);
						scope.getData(newObject, newCols.join().replace(',', '.'));
					}
				}
			};
			scope.getData(scope.valor, scope.pcolumn);

			var contenido = "";
			if (angular.isArray(scope.htmlElement)) {
				angular.forEach(scope.htmlElement, function (value, key) {
					angular.forEach(value, function (v1, k1) {
						contenido += '<div><b>' + k1 + ':</b> ' + v1 + "</div>";
					});
				});
			} else {
				contenido += scope.htmlElement !== undefined ? scope.htmlElement : "";
			}

			element.html(contenido);
			$compile(element.contents())(scope);
		}
	};
});
/**
	* <p>Directiva de <b>funcionalidad embedido</b>, que permite la navegabilidad entre varios datos.</p>
	* <p>Construye un <code>HTML de navegación</code>  con un indicador numerico y un limite de listado por pagina.</p>
	* 
	* ```html
	* <div click-apply="event.apply()" config="{index: 2, size: 15, last: null}" uni-pager="{type:'simple'}"></div>
	* ```
	*
	* @param {JavaScript Object} `$unikit` Modulo principal de todos los componentes.
	* @param {JavaScript Object} `$templateRequest` descarga la plantilla proporcionada usando $ http y, con éxito, almacena el contenido dentro de $ templateCache.
	* @param {JavaScript Object} `$rootScope` Variable de ámbito raiz, propio de angularJS.
	* @param {JavaScript Object} `$compile` Compila una cadena HTML o DOM en una plantilla, propio de angularJS.	
	* @param {JavaScript Object} `$runtime` Modulo angular implementado en el SPA union-static.	
	* @api uniPager
	*/
unikit.directive('uniPager', ['$unikit', '$rootScope', '$compile', '$runtime', function ($unikit, $rootScope, $compile, $runtime) {
		/**
			* manejador de eventos de paginación del componente 'uni-pager'
			* 
			* ```html
			* var handler = new UniPagerHandler(scope, attrs);
			* ```
			* 
			* @param {javascript Object} `scope` Scope del componente
			* @param {type} `attrs` Atributos del HTML al cual se adiciono la directiva "uni-pager"
			* @api UniPagerHandler()
			*/
		var UniPagerHandler = function (scope, attrs) {
			var __this = this;
			var expresionConfig = attrs.config || '$config';
			expresionConfig = expresionConfig + ' = ' + expresionConfig + ' || {index: 1, size: 10, last: null}';
			var expresionClickClear = attrs.clickClear || 'apply()';
			var expresionClickApply = attrs.clickApply || 'clear()';
			/**
				* Evalua la pagina actual y la cantidad de elementos por pagina, si el valor supera los 100 registros no seran visualizados
				* 
				* @param {Number} `index` indice actual de la pagina
				* @param {config} `config` Un object que contiene la configuracion de la paginación.
				* @returns {Boolean} `Boolean`
				* @api UniPagerHandler.allowChangePager()
				*/
			var allowChangePager = function (index, config) {
				var max = config.allowMax || 100;
				var size = config.size || 10;
				var total = index * size - 1;
				if (max > 0 && total > max) {
					$runtime.warn('No esta permitido paginar mas de ' + max + ' registros', ['Criterio de busqueda no es suficiente'], 'Debe ');
					return false;
				}
				return true;
			};
			/**
				* Evalua los indices del paginador en un "array" que seran visibles en el HTML
				* 
				* @param {object JSON} `config` Un object que contiene la configuracion de la paginación.
				* @returns {Array} `pager` Una lista de datos que contiene los indices validos visibles para el paginador
				* @api allowChangePager.allowPagerArray()
				*/
			var allowPagerArray = function (config) {
				var i = config.index || 1;
				var len = config.length || 2;
//				var max = config.allowMax || 100;
//				var size = config.size || 10;
				var n = 2 * len + 1;
				var start = 1;
				if (i > len) {
					start = i - len;
				}
				var end = start + n;
//				var maxEnd = max / (i * size);
//				if(end > maxEnd){
//					end = maxEnd;
//				}
				//console.log('start:', start, ' end:', end);
				var pager = [];
				for (var j = start; j < end; j++) {
					pager.push(j);
				}
				return pager;
			};
			/**
				* Evalua la configuración y retorna los valores de la posicion de la pagina "index", el tamaño de paginación "size" y fecha de actualización "last"
				* 
				* @returns {Object} `Object` Retorna un object que contiene la configuracion de la paginación.
				* @api UniPagerHandler.currentConfig()
				*/
			var currentConfig = function () {
				return __this.config = scope.$eval(expresionConfig);
			};
			__this.config = currentConfig();
			__this.sizeAllow = [10, 15, 25, 50, 100];
			__this.pagerArray = [1, 2, 3, 4, 5];
			/**
				* Evalua la configuración actual y retorna los valores de la posicion de la pagina "index", el tamaño de paginación "size" y fecha de actualización "last" 
				* 
				* @api UniPagerHandler.refresh()
				*/
			__this.refresh = function () {
				var config = currentConfig();
				config.last = config.last = new Date();
				scope.$eval(expresionClickApply);
			};
			/**
				* reinicia el index en un valor inicial, evalua la funcion apply definida en la directiva y fija los datos de la pagina
				* 
				* @api UniPagerHandler.apply()
				*/
			__this.apply = function () {
				var config = currentConfig();
				config.index = 1;
				config.last = new Date();
				scope.$eval(expresionClickApply);
				__this.pagerArray = allowPagerArray(config);
			};
			/**
				* Reinicia el index en un valor inicial, evalua la funcion apply definida en la directiva y fija los datos de la pagina
				* 
				* @api UniPagerHandler.clear()
				*/
			__this.clear = function () {
				var config = currentConfig();
				config.index = 1;
				config.last = new Date();
				scope.$eval(expresionClickClear);
				__this.pagerArray = allowPagerArray(config);
			};
			/**
				* Actualiza el tamaño de paginas que seran en la configuración de la paginación
				* 
				* @returns {Number} `size` Tamaño actual de la paginación. 
				* @api UniPagerHandler.size()
				*/
			__this.size = function (size) {
				var config = currentConfig();
				config.size = size || config.size || 10;
				return config.size;
			};
			/**
				* Ejecuta la funcion "apply" para ir a la pagina fijada en el index.
				* 
				* @param {Number} `index` indice actual de la pagina
				* @api UniPagerHandler.go()
				*/
			__this.go = function (index) {
				var config = currentConfig();
				config.index = index;
				config.last = new Date();
				scope.$eval(expresionClickApply);
				__this.pagerArray = allowPagerArray(config);
			};
			/**
				* Evalua la accion de navegación del paginador y fija los valores validos de indices en el paginador.
				* 
				* @param {Number} `step` Valor positivo si la navegacion es a la derecha o negativo -1 si la navegacion es a la izquierda.
				* @api UniPagerHandler.step()
				*/
			__this.step = function (step) {
				var config = currentConfig();
				var index = config.index || 1;
				index = index + step;
				if (index <= 0) {
					index = 1;
				}
				if (allowChangePager(index, config)) {
					config.index = index;
					scope.$eval(expresionClickApply);
				}
				__this.pagerArray = allowPagerArray(config);
			};
			/**
				* Evalua el indice seleccionado y retorna un estado para el indice
				* 
				* @param {type} `index` indice de la paginacion
				* @returns {String} `state` Si el valor del index es igual al de la configuracion de la pagina, retorna "active" si no "inactive"
				* @api UniPagerHandler.active()
				*/
			__this.active = function (index) {
				return __this.config && __this.config.index === index ? 'active' : 'inactive';
			};
		};
		/**
			* Genera una cadena <code>HTML Template</code>, que contiene la estructura <code>HTML</code>  del componente.
			* 
			* ```js
			* var html = createHTMLSimpleTemplate(dom, config, id);
			* ```
			*  
			* @param {htmlElement} `dom` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-editor".
			* @param {Javascript Object} `config` Configuración del componente "uni-pager"
			* @param {String} `id` Identificador para el template
			* @returns {HTMLElement} `html` Retorna una estructura HTML, que contiene al componente.
			* @api Method createHTMLSimpleTemplate()
			*/
		var createHTMLSimpleTemplate = function (dom, config, id) {
			var html = '';
			html += '<div class="uni-pager collapse panel panel-default" id="{id}">';
			html += ' <div class="panel-heading">';
			html += '  <span class="uni-pager-left">{header}</span>';
			html += '  <span class="uni-pager-right pull-right">';
			html += '   <ul class="pagination btn">';
			html += '    <li>';
			html += '     <a ng-click="{handler}.go(1)"> <span class="fa fa-fast-backward"></span> </a>';
			html += '    </li>';
			html += '    <li>';
			html += '     <a ng-click="{handler}.step(-1)"> <span class="fa fa-backward"></span> </a>';
			html += '    </li>';
			html += '    <li ng-repeat="i in pagerArray()" ng-class="pagerActive(i)">';
			html += '     <a ng-click="{handler}.go(i)">{{i}}</a>';
			html += '    </li>';
			html += '    <li>';
			html += '     <a ng-click="{handler}.step(+1)"> <span class="fa fa-forward"></span> </a>';
			html += '    </li>';
			html += '   </ul>';
			html += '   <div class="btn-group">';
			html += '    <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
			html += '     <span>{{{handler}.config.size}}</span> Registros';
			html += '      <span class="caret"></span>';
			html += '    </button>';
			html += '    <ul class="dropdown-menu">';
			html += '     <li ng-repeat="i in {handler}.sizeAllow"><a href="#" ng-click="{handler}.size(i)">{{i}} Registros</a></li>';
			html += '    </ul>';
			html += '   </div>';
			html += '   <div class="btn-group">';
			html += '    <button type="button" class="btn btn-primary" ng-click="{handler}.refresh()">';
			html += '     <span class="fa fa-refresh" ></span>';
			html += '    </button>';
			html += '   </div>';
			html += '  </span>';
			html += ' </div>';
			html += '</div>';
			html = html.replace(/{id}/g, id);
			html = html.replace(/{handler}/g, '__' + id);
			var header = querySelector(dom, 'legend, header');
			if (header) {
				header = header.innerHTML;
			}
			html = html.replace(/{header}/g, header || '');
			return html;
		};
		/**
			* Genera una cadena <code>HTML Template</code>, que contiene la estructura <code>HTML</code>  del componente, 
			* este contiene elemento HTML para aplicar un filtro
			* 
			* ```js
			* var html = createHTMLFilterTemplate(dom, config, id);
			* ```
			*  
			* @param {htmlElement} `dom` Elemento HTML DOM clon del HTML al cual se adiciona la directiva "uni-editor".
			* @param {Javascript Object} `config` Configuración del componente "uni-pager"
			* @param {String} `id` Identificador para el template
			* @returns {HTMLElement} `html` Retorna una estructura HTML, que contiene al componente.
			* @api Method createHTMLSimpleTemplate()
			*/
		var createHTMLFilterTemplate = function (dom, config, id) {
			var html = '';
			html += '<div class="uni-pager {collapse} panel panel-default" id="{id}">';
			html += ' <div class="panel-heading">';
			html += '  <span class="uni-pager-left">{header}</span>';
			html += '  <span class="uni-pager-right pull-right">';
			html += '   <ul class="pagination btn">';
			html += '    <li>';
			html += '     <a ng-click="{handler}.go(1)"> <span class="fa fa-fast-backward"></span> </a>';
			html += '    </li>';
			html += '    <li>';
			html += '     <a ng-click="{handler}.step(-1)"> <span class="fa fa-backward"></span> </a>';
			html += '    </li>';
			html += '    <li ng-repeat="i in {handler}.pagerArray" ng-class="{handler}.active(i)">';
			html += '     <a ng-click="{handler}.go(i)">{{i}}</a>';
			html += '    </li>';
			html += '    <li>';
			html += '     <a ng-click="{handler}.step(+1)"> <span class="fa fa-forward"></span> </a>';
			html += '    </li>';
			html += '   </ul>';
			html += '   <div class="btn-group pagination-size">';
			html += '    <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
			html += '     <span>{{{handler}.config.size}}</span> Registros';
			html += '     <span class="caret"></span>';
			html += '    </button>';
			html += '    <ul class="dropdown-menu">';
			html += '     <li ng-repeat="i in {handler}.sizeAllow"><a href="#" ng-click="{handler}.size(i)">{{i}} Registros</a></li>';
			html += '    </ul>';
			html += '   </div>';
			html += '   <div class="btn-group update-date">';
			html += '    <span class="badge">{{{handler}.config.last | date:"MM/dd/yyyy H:mm:ss"}}</span>';
			html += '   </div>';
			html += '   <div class="btn-group filter-on">';
			html += '    <button type="button" class="filter-button btn btn-primary" ng-click="{handler}.apply()">';
			html += '     <span class="fa fa-filter"></span>';
			html += '     filtrar';
			html += '    </button>';
			html += '    <button type="button" class="filter-clear btn btn-danger" ng-click="{handler}.clear()">';
			html += '     <span class="fa fa-eraser"></span>';
			html += '     Limpiar';
			html += '    </button>';
			html += '    <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#{id}">';
			html += '     <span class="fa fa-chevron-circle-down"></span>';
			html += '    </button>';
			html += '   </div>';
			html += '   <div class="btn-group filter-off">';
			html += '    <button type="button" class="btn btn-primary" ng-click="{handler}.refresh()">';
			html += '     <span class="fa fa-refresh" ></span>';
			html += '    </button>';
			html += '    <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#{id}">';
			html += '     <span class="fa fa-chevron-circle-left"></span>';
			html += '    </button>';
			html += '   </div>';
			html += '  </span>';
			html += ' </div>';
			html += ' <div id="{id}Body" class="panel-body pager-body">';
			html += '  {content}';
			html += ' </div>';
			html += '</div>';
			html = html.replace(/{id}/g, id);
			html = html.replace(/{handler}/g, '__' + id);
			html = html.replace(/{collapse}/g, config.open ? '' : 'collapse');
			var header = querySelector(dom, 'legend, header');
			if (header) {
				dom.removeChild(header);
				header = header.innerHTML;
			}
			var content = dom.innerHTML;
			html = html.replace(/{header}/g, header || '');
			html = html.replace(/{content}/g, content || '');
			return html;
		};


		return {
			template: function (element, attrs) {
				var id = createID(element);
				var config = $unikit.componentConfig(element, attrs, 'uniPager');
				if (config.skip) {
					return element[1];
				}
				var html = '<a>No support for template <b>' + config.type + '</b> type.</a>';
				var dom = element[0];
				//config.config = attrs.config;
				if (config.type === 'SIMPLE') {
					html = createHTMLSimpleTemplate(dom, config, id);
				} else if (config.type === 'FILTER') {
					html = createHTMLFilterTemplate(dom, config, id);
				}
				return html;
			},
			link: function (scope, element, attrs) {
				var handler = '__' + attrs.id;
				scope[handler] = new UniPagerHandler(scope, attrs);
			},
			replace: true
		};
	}]);
unikit.directive('uneGroupFilter', function ($compile, $timeout) {
	return {
		transclude: true,
		restrict: 'A',
		scope: {
			title: "@title",
			availableFields: "=",
			requestFilter: "=",
			fnApply: "&",
			fnClear: "&"
		},
		controller: function ($scope) {
			$scope.listFilters = [];
			$scope.deleteFilter = function (item) {
				angular.forEach($scope.listFilters, function (data, index) {
					if (data === item) {
						$scope.listFilters.splice(index, 1);
						return;
					}
				});
			};
			//Adiciona un nuevo filtro al grupo
			$scope.addFilter = function () {
				$scope.listFilters.push({"field": "", "operation": "", "value1": "", "value2": ""});
			};

			//Actualiza el arreglo requestFilter con la selección de filtros.
			$scope.$watch("listFilters", function (n, o) {
				if (n.length > 0 && n[0].field !== "") {
					$scope.requestFilter = {};
					angular.forEach(n, function (value, key) {
						if (value.operation === 'be' || value.operation === 'nb') {
							$scope.requestFilter[value.field] = {"oper": value.operation, "value": [value.value1, value.value2]};
						} else {
							$scope.requestFilter[value.field] = {"oper": value.operation, "value": value.value1};
						}
					});
				}
			}, true);
		},
		replace: true,
		template:
			'<div class="panel panel-default">' +
			'<div class="panel-heading">' +
			'<h3 class="panel-title pull-left">{{title}}</h3>' +
			'<button class="btn btn-default btn-xs pull-right" ng-click="addFilter();">Nuevo Filtro</button>' +
			'<div class="clearfix"></div>' +
			'</div>' +
			'<div class="panel-body">' +
			'<form name="form" class="form-inline" ng-submit="fnApply()">' +
			'<span unx-input-filter ng-repeat="item in listFilters" filter="item" fields="availableFields" del="deleteFilter(item);"></span>' +
			'<span style="white-space:nowrap;">' +
			'&nbsp;<input type="reset" value="Limpiar" class="btn btn-default" ng-click="fnClear();" ng-disabled="listFilters.length === 0"/>&nbsp;' +
			'<input type="submit" value="Aplicar" class="btn btn-primary" ng-disabled="listFilters.length === 0" />' +
			'</span>' +
			'</form>' +
			'<ng-transclude></ng-transclude>' +
			'<div>' +
			'</div>' +
			'</div>' +
			'</div>'
	};
}).directive('unxInputFilter', function ($compile) {
	return {
		restrict: 'A',
		scope: {
			del: "&",
			fields: "=",
			filter: "="
		},
		controller: function ($scope) {
			$scope.operations = [
				{id: "eq", name: "="},
				{id: "ne", name: "<>"},
				{id: "nn", name: "no nulo"},
				{id: "nb", name: "no entre"},
				{id: "nl", name: "no contiene"},
				{id: "nu", name: "nulo"},
				{id: "be", name: "entre"},
				{id: "li", name: "contiene"},
				{id: "le", name: "<="},
				{id: "ge", name: ">="},
				{id: "lt", name: "<"},
				{id: "gt", name: ">"}
			];
			$scope.filter.operation = $scope.operations[0].id;
			$scope.filter.field = $scope.fields[0].id;

			$scope.isInFilter = function () {
				return $scope.filter.operation === 'be' || $scope.filter.operation === 'nb';
			};

			$scope.isSingle = function () {
				return $scope.filter.operation === 'nn' || $scope.filter.operation === 'nu';
			};
		},
		replace: true,
		link: function (scope, element, attrs) {
			scope.checkdel = ('del' in attrs);

			var htmlFilter =
				'<div class="input-group" style="padding:3px">' +
				'<span class="input-group-btn" style="width: auto;">' +
				'<select class="form-control" ng-model="filter.field" ng-init="filter.field">' +
				' <option ng-repeat="f in fields" value="{{f.id}}">{{f.name}}</option>' +
				'</select>' +
				'</span>' +
				'<span class="input-group-btn" style="width: auto;">' +
				'<select class="form-control" ng-model="filter.operation">' +
				' <option ng-repeat="ope in operations" value="{{ope.id}}">{{ope.name}}</option>' +
				'</select>' +
				'</span>' +
				'<span class="input-group-addon" style="width:0px; padding-left:0px; padding-right:0px; border:none;"></span>' +
				'<input type="text" class="form-control" required ng-model="filter.value1" placeholder="Valor de búsqueda" ng-required="!isSingle()" ng-hide="isSingle()">' +
				'<span class="input-group-addon" ng-show="isInFilter();">-</span>' +
				'<input type="text" class="form-control" ng-required="isInFilter()" ng-show="isInFilter();" ng-model="filter.value2" placeholder="Valor de búsqueda">' +
				'<span class="input-group-addon" style="width:0px; padding-left:0px; padding-right:0px; border:none;"></span>' +
				(scope.checkdel ? '<span class="input-group-btn">' + '<button class="btn btn-danger" title="Eliminar Filtro" type="button" ng-click="del({itemid: id})"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>' + '</span>' : "") +
				'</div>';

			element.html(htmlFilter);
			$compile(element.contents())(scope);
		}
	};
});


function toCamelCase(str) {
	return str.toLowerCase()
									.replace(/[-_\/]+/g, ' ')
									.replace(/[^\w\s]/g, '')
									.replace(/ (.)/g, function ($1) {
										return $1.toUpperCase();
									})
									.replace(/ /g, '');
}
function assetValue(attr, object) {
	var value = object[attr];
	if (typeof value === 'function') {
		value = value();
	}
	return value;
}
function assetFunction(fnValue, fnDefault = function() {}){
	return typeof fnValue === 'function' ? fnValue : fnDefault;
}
function DebugHandler(name, handler) {
	this.debug = function (method, params) {
		if (handler.debug) {
			console.log('LOG:' + name + ' CALL: ' + method + ' WITH:', params);
		}
	};
	this.serv = function (method, service, params) {
		if (handler.debug) {
			console.log('LOG:' + name + ' CALL: ' + method + ' URL:' + service + ' WITH:', params);
		}
	};
	this.call = function (method, params) {
		if (handler.debug) {
			console.log('LOG:' + name + ' CALL:' + method + ' WITH:', params);
		}
	};
	this.get = function (attr, value) {
		if (handler.debug) {
			console.log('LOG:' + name + ' GET: ', attr, ' VAL:', value);
		}
	};
	this.set = function (attr, value) {
		if (handler.debug) {
			console.log('LOG:' + name + ' SET: ', attr, ' VAL:', value);
		}
	};
}
function ParamHandler(ngHttp, paramRequired, paramServ = '/param/rest/param') {
//	var __THIS = this;
	this.debug = false;
	var _log = new DebugHandler('ParamHandler', this);
	var _undefined = {children: true, nodeName: true};
	var _internal = {};
	var _impl = {
		value: function (dataList, valueList) {
			dataList.forEach(function (data) {
				var name = data.name;
				var value = [{value: null, description: 'Error al obtener los datos'}];
				if (name) {
					value = valueList[name] || value;
				}
//				if(name in ['attach', 'refresh']){
//					console.log('NOT ALLOW OVERWRITE THIS  ATTRIBUTE: ', name);
//				} else {
//					__THIS[name] = value;
//				}
				_internal[name] = value;
			});
		},
		asset: function (paramRequired) {
			if (!Array.isArray(paramRequired)) {
				paramRequired = [paramRequired];
			}
			var paramInfo = [];
			paramRequired.forEach(function (param) {
				var info = {};
				if (typeof param === 'string') {
					param = (param + '::').split(':');
					info.name = param[0];
					info.code = param[1] || param[0];
					info.domain = param[2];
				} else if (typeof param === 'object') {
					info.name = param.name;
					info.code = param.code || param.name;
					info.domain = param.domain;
				} else {
					info.name = param;
				}
				paramInfo.push(info);
			});
			return paramInfo;
		},
		attach: function (paramList) {
			_log.serv('attach', paramServ, paramList);
			ngHttp.post(paramServ, paramList)
											.success(function (paramValue) {
												_log.set('attach-sucess', paramValue);
												_impl.value(paramList, paramValue);
											})
											.error(function () {
												_log.set('attach-error', {});
												_impl.value(paramList, {});
											});
		},
		refresh: function (paramName) {
			if (!Array.isArray(paramName)) {
				paramName = [paramName];
			}
			var paramTemp = [];
			paramCache.forEach(function (o) {
				paramName.forEach(function (n) {
					if (o.name === n)
						paramTemp.push(o);
				});
			});
			_impl.attach(paramTemp);
		}
	};
	var paramCache = _impl.asset(paramRequired);
	_impl.attach(paramCache);
	//Fuera del alcance del Proxy
	this.internal = function () {
		console.warn('Replace this line for same object');
		return this;
	};
	this.attach = function (paramRequired) {
		paramRequired = _impl.asset(paramRequired);
		_log.call('attach', paramRequired);
		_impl.attach(paramRequired);
		paramCache = Object.assign([], paramCache, paramRequired);
	};
	this.refresh = function (paramName = '*') {
		_log.call('refresh', paramName);
		if (paramName === undefined || paramName === '*') {
			_impl.attach(paramCache);
		} else {
			_impl.refresh(paramName);
		}
	};
	this.set = function (paramName, paramValue) {
		if (paramValue === undefined || paramValue === null) {
			paramValue = [{value: null, description: 'S/D'}];
		} else if (typeof paramValue === 'boolean' || typeof paramValue === 'number' || typeof paramValue === 'string') {
			paramValue = [{value: paramValue, description: paramValue}];
		} else if (!Array.isArray(paramValue)) {
			paramValue = [paramValue];
		}
		_log.call('set', paramName, '=', paramValue);
		_internal[paramName] = paramValue;
	};
	//Definicion PROXY
	this.__proto__ = new Proxy(_internal, {
		get: function (target, attr) {
			if (attr in _undefined) {
				return undefined;
			}
			//console.log('--->GET: ', target, ' - ', attr);
			var value = [{value: null, description: 'Parameter no definido: ' + attr}];
			if (attr in target || typeof attr === 'symbol') {
				value = target[attr];
				if (typeof value === "function") {
					if (attr === 'valueOf') {
						value = _internal.valueOf;
						target = _internal;
					}
					return function () {
						return value.apply(target, arguments);
					};
				}
			} else {
				target[attr] = value;
			}
			return value;
		},
		set: function (target, attr, value) {
			console.warn('NOT ALLOW SET ATTRIBUTE ParamHandler[' + attr + '] = ', value);
		}
	});
}
	
function ActionHandler(ngHttp, dataHandler, servHandler, filterHandler, panelHandler, methods) {
	this.debug = false;
	function assertMethod(array) {
		for (var i in array) {
			var value = array[i];
			if (typeof value === 'string') {
				value = {
					name: value,
					serv: value,
					data: value,
					success: undefined,
					error: function () {}
				};
			}
			array[i] = value;
		}
		return array;
	}
	var _log = new DebugHandler('ActionHandler', this);
	var _this = this;
	var _impl = this.delegate = {};
	_this.cancel = _impl.cancel = function (name) {
		dataHandler.clear(name);
		panelHandler.close(name);
	};
	_this.open = _impl.open = function (name) {
		if (name === 'create') {
			dataHandler.current({});
		}
		panelHandler.open(name);
	};
	methods = ['create', 'update', 'remove'].concat(methods || []);
	methods = assertMethod(methods);
	methods.forEach(function (method) {
		_this[method.name] = _impl[method.name] = function () {
			var data = assetValue(method.data, dataHandler);
			var serv = assetValue(method.serv, servHandler);
			_log.serv(method.name, serv, data);
			var successCallback = assetFunction(method.success, function () {
				dataHandler.clear(method.name);
				filterHandler.refesh(method.name);
				panelHandler.close(method.name);
			});
			var errorCallback = assetFunction(method.error);
			ngHttp.post(serv, data)
											.success(successCallback)
											.error(errorCallback);

		};
	});
}
	
/**
	* Esta clase soporta la manipulacion y selecion de un registro
	* @param {type} attrId   Nombre del Atributo Identificador
	* @returns {DataHandler}
	*/
function DataHandler(attrId = 'id') {
	this.debug = false;
	var _this = this;
	var _log = new DebugHandler('DataHandler', this);
	const _internal = {
		filter: {},
		list: [],
		current: undefined,
		parent: undefined
	};
	//const _stack = new Array();
	var internalCurrentData = function () {
		var __current = _internal.current || {};
		var __parent =  _this.parent();
		if (__parent) {
			__current = {
				parent: __parent,
				current: __current
			};
		}
		return __current;
	};
	var internalToggleSimple = function (data) {
		if (data) {
			var idData = data[attrId];
			if (_internal.current && idData === _internal.current[attrId]) {
				_internal.current = undefined;
			} else {
				_internal.current = Object.assign({}, data);
			}
			return true;
		}
		return false;
	};
	var internalIN = function (data) {
		if (data) {
			var idData = data[attrId];
			var idCurrent = (_internal.current || {})[attrId];
			return idData && idCurrent && idData === idCurrent;
		}
		return false;
	};
	var internalIsSimpleSelect = function () {
		return _internal.current && true;
	};
	_this.parent = function (data) {
		if (data) {
			_internal.parent = data;
			_internal.current = undefined;
			_internal.list = [];
			_internal.filter = {};
		}
		return _internal.parent;
	};
	_this.current = function (data) {
		return _internal.current = data ? data : _internal.current;
	};
	_this.currentId = function () {
		return _internal.current? _internal.current[attrId] : undefined;
	};
	_this.list = function (data) {
		return _internal.list = data ? data : _internal.list;
	};
	_this.config = function (data) {
		var __filter = _internal.filter || {};
		return __filter.$config = data ? data : __filter.$config;
	};
	_this.filter = function (data) {
		var __filter = _internal.filter = data ? data : _internal.filter;
		var __parent = this.parent();
		if (__parent) {
			__filter = {
				parent: __parent,
				filter: __filter || {}
			};
		}
		_log.get('filter', __filter);
		return __filter;
	};
	_this.internal = function () {
		return _internal;
	};
	_this.create = internalCurrentData;
	_this.update = internalCurrentData;
	_this.remove = internalCurrentData;
	_this.clear = function (moment) {
		_log.call('clear', moment);
		_internal.current = undefined;
		_internal.select = {};
	};
	_this.toggle = internalToggleSimple;
	_this.in = internalIN;
	_this.isOneSelect = internalIsSimpleSelect;
	_this.isMoreSelect = internalIsSimpleSelect;
}

function FilterHandler(ngHttp, filterServ, dataHandler) {
	this.debug = false;
	var _log = new DebugHandler('FilterHandler', this);
	var _this = this;
	var _impl = this.delegate = {
		refesh: function (moment) {
			_log.call('refesh', moment);
			_this.apply();
		},
		apply: function () {
			const filterData = dataHandler.filter();
			_log.serv('apply', filterServ, filterData);
			ngHttp.post(filterServ, filterData)
											.success(function (data) {
												dataHandler.list(data);
											})
											.error(function () {
												dataHandler.list([]);
											});
		},
		clear: function () {
			_log.call('clear');
			dataHandler.filter({});
			dataHandler.list([]);
		},
		sort: function (attr) {
			_log.call('sort');
			var config = dataHandler.config() || {};
			if (config.orderBy === attr) {
				config.orderAsc = config.orderAsc? false : true;
			} else {
				config.orderBy = attr;
				config.orderAsc = true;
			}
			dataHandler.config(config);
			_impl.apply();
		}
	};
	this.refesh = function (moment) {
		_impl.refesh(moment);
	};
	this.apply = function () {
		_impl.apply();
	};
	this.clear = function () {
		_impl.clear();
	};
	this.sort = function (attr) {
		_impl.sort(attr);
	};
}
	
/**
	* Esta Clase define los metodos basicos de ejecucion de un PANEL-FILTER 
	* @param {type} dataHandler
	* @param {type} dataChildrenHandler
	* @returns {ListHandler}
	*/
function ListHandler(dataHandler, dataChildrenHandler) {
	this.debug = false;
	var _log = new DebugHandler('ListHandler', this);
	dataChildrenHandler = dataChildrenHandler ? assetChildren(dataChildrenHandler) : [];
	function assetChildren(children) {
		if (!Array.isArray(children)) {
			children = [children];
		}
		var _value = [];
		children.forEach(function (item, i) {
			if (item instanceof DataHandler) {
				_value.push(item);
			} else {
				console.warn('CHILDREN ' + i + ' NOT IS TYPE D ', item);
			}
		});
		return _value;
	}
	this.toggle = function (row) {
		_log.call('toggle', row);
		dataHandler.toggle(row);
		var clon = dataHandler.current();
		dataChildrenHandler.forEach(function (children) {
			children.parent(clon);
		});
	};
	this.in = function (row) {
		return dataHandler.in(row);
	};
	this.isOneSelect = function () {
		return dataHandler.isOneSelect();
	};
	this.isMoreSelect = function () {
		return dataHandler.isMoreSelect();
	};
}
	
/**
	* Esta clase manipula los estado de los PANEL.
	* Para ser visibles
	* @returns {PanelHandler}
	*/
function PanelHandler() {
	this.debug = false;
	var _log = new DebugHandler('PanelHandler', this);
	var _panel = {};
	this.open = function (name) {
		_log.call('open', name);
		_panel[name] = true;
	};
	this.close = function (name) {
		_log.call('close', name);
		_panel[name] = false;
	};
	this.toggle = function (name) {
		_log.call('toggle', name);
		_panel[name] = _panel[name] === false || _panel[name] === undefined;
	};
	this.show = function (name) {
		return _panel[name] || false;
	};
	this.if = function (name) {
		return _panel[name] || false;
	};
	this.hide = function (name) {
		return !this.show(name);
	};
}
/**
	* Esta clase protege la rescritura de attributos al objeto
	* Preve el valor por defecto '/broken/part.html' cuando acceden a un attributo no definido
	* Garantiza la visualizacion de un contenido HTML BROKEN para alertar cuando se acceda a un attributo no definido
	* @param {type} module   Modulo SPA
	* @param {type} group    Grupo o Funcionalidad del Modulo
	* @param {type} html     Lista de Partes/Fragmentos HTML disponibles
	* @param {type} concat   Flag para concatenar la lista de fragmentos PREDEFINIDOS con la nueva lista
	* @returns {PartHandler}
	*/
function PartHandler(module, group, html, concat = true) {
	var __THIS = this;
	var internalPart = {};
	html = html || [];
	if (concat || html.length === 0) {
		html = ['table', 'filter', 'form', 'view', 'info'].concat(html);
	}
	internalAddPart(html);
	function internalAddPath(_name, _path) {
		internalPart[_name] = _path;
	}
	function internalAddPart(array) {
		var _path = '/' + module + '/part/' + group;
		for (var i in array) {
			var part = array[i];
			var attr = toCamelCase(part);
			internalPart[attr] = _path + '/' + part + '.html';
		}
	}
	function internalDelPart(array) {
		for (var i in array) {
			var attr = array[i];
			delete internalPart[attr];
		}
	}
	var internalHandler = {
		get: function (target, attr) {
			var value = '/broken/part.html';
			if (attr in target || typeof attr === 'symbol') {
				value = target[attr];
				if (typeof value === "function") {
					if (attr === 'valueOf') {
						value = internalPart.valueOf;
						target = internalPart;
					}
					return function () {
						return value.apply(target, arguments);
					};
				}
				if (__THIS.debug) {
					value = value + '?' + new Date().getTime();
				}
			}
			return value;
		},
		set: function (target, attr, value) {
			console.warn('NOT ALLOW SET ATTRIBUTE PartHandler[' + attr + '] = ' + value);
		}
	};
	//Definiciones fuera del alcance del PROXY
	this.addPath = function (name, path) {
		internalAddPath(name, path);
	};
	this.addPart = function (value) {
		if (typeof value === 'string' || value instanceof String)
			value = [value];
		internalAddPart(value);
	};
	this.delPart = function (value) {
		if (typeof value === 'string' || value instanceof String)
			value = [value];
		internalDelPart(value);
	};
	this.debug = false;
	//Definicion PROXY
	this.__proto__ = new Proxy(internalPart, internalHandler);
}

/**
	* Esta clase protege la rescritura de attributos al objeto
	* Preve el valor por defecto '/broken/part.html' cuando acceden a un attributo no definido
	* Garantiza la visualizacion de un contenido HTML BROKEN para alertar cuando se acceda a un attributo no definido
	* @param {type} module   Modulo SPA
	* @param {type} group    Grupo o Funcionalidad del Modulo
	* @param {type} html     Lista de Sub Vistas HTML disponibles
	* @param {type} concat   Flag para concatenar la lista de fragmentos PREDEFINIDOS con la nueva lista
	* @returns {ViewHandler}
	*/
function ViewHandler(module, group, html, concat = true) {
	var __THIS = this;
	var internalView = {};
	html = html || [];
	if (concat || html.length === 0) {
		html = ['inbox', 'create', 'update', 'detail', 'delete'].concat(html);
	}
	internalAddView(html);
	function internalAddPath(_name, _path) {
		internalView[_name] = _path;
	}
	function internalAddView(array) {
		var _path = '/' + module + '/view/' + group;
		for (var i in array) {
			var part = array[i];
			var attr = toCamelCase(part);
			internalView[attr] = _path + '/' + part + '.html';
		}
	}
	function internalDelView(array) {
		for (var i in array) {
			var attr = array[i];
			delete internalView[attr];
		}
	}
	var internalHandler = {
		get: function (target, attr) {
			var value = '/broken/view.html';
			if (attr in target || typeof attr === 'symbol') {
				value = target[attr];
				if (typeof value === "function") {
					if (attr === 'valueOf') {
						value = internalView.valueOf;
						target = internalView;
					}
					return function () {
						return value.apply(target, arguments);
					};
				}
				if (__THIS.debug) {
					value = value + '?' + new Date().getTime();
				}
			}
			return value;
		},
		set: function (target, attr, value) {
			console.warn('NOT ALLOW SET ATTRIBUTE ViewHandler[' + attr + '] = ' + value);
		}
	};
	//Definiciones fuera del alcance del PROXY
	this.addPath = function (name, path) {
		internalAddPath(name, path);
	};
	this.addView = function (value) {
		if (typeof value === 'string' || value instanceof String)
			value = [value];
		internalAddView(value);
	};
	this.delView = function (value) {
		if (typeof value === 'string' || value instanceof String)
			value = [value];
		internalDelView(value);
	};
	this.debug = false;
	//Definicion PROXY
	this.__proto__ = new Proxy(internalView, internalHandler);
}

/**
	* Esta clase protege la rescritura de attributos al objeto
	* Preve el valor por defecto '/rest/broken' cuando acceden a un attributo no definido
	* Garantiza la visualizacion de un contenido HTML BROKEN para alertar cuando se acceda a un attributo no definido
	* @param {type} module   Modulo SPA
	* @param {type} group    Grupo o Funcionalidad del Modulo
	* @param {type} rest     Lista de Servicios REST disponibles
	* @param {type} concat   Flag para concatenar la lista de servicios PREDEFINIDOS con la nueva lista
	* @returns {PartHandler}
	*/
function ServHandler(module, group, rest, concat = true) {
	var __THIS = this;
	var internalServ = {};
	rest = rest || [];
	if (concat || rest.length === 0) {
		rest = ['filter', 'create', 'update', 'remove', 'refresh', 'audit', 'param'].concat(rest);
	}
	if (rest.length === 0) {
		rest = ['table', 'filter', 'new', 'edit', 'info'];
	}
	internalAddServ(rest);
	function internalAddServ(array) {
		var _path = '/' + module + '/rest/' + group;
		for (var i in array) {
			var rest = array[i];
			var attr = toCamelCase(rest);
			internalServ[attr] = _path + '/' + rest;
		}
	}
	function internalDelServ(array) {
		for (var i in array) {
			var attr = array[i];
			delete internalServ[attr];
		}
	}
	var internalHandler = {
		get: function (target, attr) {
			var value = '/rest/broken';
			if (attr in target || typeof attr === 'symbol') {
				value = target[attr];
				if (typeof value === "function") {
					if (attr === 'valueOf') {
						value = internalServ.valueOf;
						target = internalServ;
					}
					return function () {
						return value.apply(target, arguments);
					};
				}
				if (__THIS.debug) {
					console.log('CALL TO REST SERVICE', value);
				}
			}
			return value;
		},
		set: function (target, attr, value) {
			console.warn('NOT ALLOW SET ATTRIBUTE ServHandler[' + attr + '] = ' + value);
		}
	};
	//Definiciones fuera del alcance del PROXY
	this.addServ = function (value) {
		if (typeof value === 'string' || value instanceof String)
			value = [value];
		internalAddServ(value);
	};
	this.delServ = function (value) {
		if (typeof value === 'string' || value instanceof String)
			value = [value];
		internalDelServ(value);
	};
	this.debug = false;
	//Definicion PROXY
	this.__proto__ = new Proxy(internalServ, internalHandler);
}


function LOVHandler($http, module, name, _select, _cancel) {
	var dataLOV = {
		show: false,
		list: [],
		filter: {},
		part: '/' + module + '/part/' + name + '/lov.html',
		serv: '/' + module + '/rest/lov/' + name
	};
	var actionLOV = {
		select: _select || function (data, lov) {
			console.log('required select function(data, lov) :', data, lov);
			return true;
		},
		cancel: _cancel || function (lov) {
			console.log('required cancel function(lov) :', lov);
			return true;
		},
		apply: function () {
			$http.post(dataLOV.serv, dataLOV.filter)
											.success(function (data) {
												dataLOV.list = data;
											});
		},
		clear: function () {
			dataLOV.filter = {};
			dataLOV.list = [];
		}
	};
	this.select = function (fn) {
		actionLOV.select = fn;
	};
	this.cancel = function (fn) {
		actionLOV.cancel = fn;
	};
	this.callSelect = function (data) {
		var resp = actionLOV.select ? actionLOV.select(data, this) : true;
		dataLOV.show = resp === true ? false : dataLOV.show;
	};
	this.callCancel = function () {
		var resp = actionLOV.cancel ? actionLOV.cancel(this) : true;
		dataLOV.show = resp === true ? false : dataLOV.show;
	};
	this.callApply = function () {
		actionLOV.apply();
	};
	this.callClear = function () {
		actionLOV.clear();
	};
	this.close = function () {
		dataLOV.show = false;
	};
	this.open = function () {
		dataLOV.show = true;
		dataLOV.filter = {};
		dataLOV.list = [];
	};
	this.openEQ = function (a, b) {
		dataLOV.show = a === b;
		dataLOV.filter = {};
		dataLOV.list = [];
	};
	this.replace = function (name) {
		return {
			_filter: name + '.filter',
			_list: name + '.list',
			_clickSelect: name + '.callSelect',
			_clickCancel: name + '.callCancel',
			_clickApply: name + '.callApply',
			_clickClear: name + '.callClear'
		};
	};
	var internalHandler = {
		set: function (target, attr, value) {
			console.warn('NOT ALLOW SET ATTRIBUTE PartHandler[' + attr + '] = ' + value);
		}
	};
	//Definicion PROXY
	this.__proto__ = new Proxy(dataLOV, internalHandler);
}
/* perfect-scrollbar v0.8.1 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ps = require('../main');

if (typeof define === 'function' && define.amd) {
  // AMD
  define(ps);
} else {
  // Add to a global object.
  window.PerfectScrollbar = ps;
  if (typeof window.Ps === 'undefined') {
    window.Ps = ps;
  }
}

},{"../main":6}],2:[function(require,module,exports){
'use strict';

var DOM = {};

DOM.create = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

DOM.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

DOM.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

DOM.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    // must be IE11 and Edge
    return element.msMatchesSelector(query);
  }
};

DOM.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};

DOM.queryChildren = function (element, selector) {
  return Array.prototype.filter.call(element.childNodes, function (child) {
    return DOM.matches(child, selector);
  });
};

module.exports = DOM;

},{}],3:[function(require,module,exports){
'use strict';

var EventElement = function (element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = (typeof handler !== 'undefined');
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function () {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;

},{}],4:[function(require,module,exports){
'use strict';

module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

},{}],5:[function(require,module,exports){
'use strict';

var dom = require('./dom');

var toInt = exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

exports.isEditable = function (el) {
  return dom.matches(el, "input,[contenteditable]") ||
         dom.matches(el, "select,[contenteditable]") ||
         dom.matches(el, "textarea,[contenteditable]") ||
         dom.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  for (var i = 0; i < element.classList.length; i++) {
    var className = element.classList[i];
    if (className.indexOf('ps-') === 0) {
      element.classList.remove(className);
    }
  }
};

exports.outerWidth = function (element) {
  return toInt(dom.css(element, 'width')) +
         toInt(dom.css(element, 'paddingLeft')) +
         toInt(dom.css(element, 'paddingRight')) +
         toInt(dom.css(element, 'borderLeftWidth')) +
         toInt(dom.css(element, 'borderRightWidth'));
};

function psClasses(axis) {
  var classes = ['ps--in-scrolling'];
  var axisClasses;
  if (typeof axis === 'undefined') {
    axisClasses = ['ps--x', 'ps--y'];
  } else {
    axisClasses = ['ps--' + axis];
  }
  return classes.concat(axisClasses);
}

exports.startScrolling = function (element, axis) {
  var classes = psClasses(axis);
  for (var i = 0; i < classes.length; i++) {
    element.classList.add(classes[i]);
  }
};

exports.stopScrolling = function (element, axis) {
  var classes = psClasses(axis);
  for (var i = 0; i < classes.length; i++) {
    element.classList.remove(classes[i]);
  }
};

exports.env = {
  isWebKit: typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: typeof window !== 'undefined' && (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof window !== 'undefined' && window.navigator.msMaxTouchPoints !== null
};

},{"./dom":2}],6:[function(require,module,exports){
'use strict';

var destroy = require('./plugin/destroy');
var initialize = require('./plugin/initialize');
var update = require('./plugin/update');

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};

},{"./plugin/destroy":8,"./plugin/initialize":16,"./plugin/update":20}],7:[function(require,module,exports){
'use strict';

module.exports = function () {
  return {
    handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: false,
    suppressScrollY: false,
    swipePropagation: true,
    swipeEasing: true,
    useBothWheelAxes: false,
    wheelPropagation: false,
    wheelSpeed: 1,
    theme: 'default'
  };
};

},{}],8:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  i.event.unbindAll();
  dom.remove(i.scrollbarX);
  dom.remove(i.scrollbarY);
  dom.remove(i.scrollbarXRail);
  dom.remove(i.scrollbarYRail);
  _.removePsClasses(element);

  instances.remove(element);
};

},{"../lib/dom":2,"../lib/helper":5,"./instances":17}],9:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = function (e) { e.stopPropagation(); };

  i.event.bind(i.scrollbarY, 'click', stopPropagation);
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var positionTop = e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    updateScroll(element, 'top', element.scrollTop + direction * i.containerHeight);
    updateGeometry(element);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'click', stopPropagation);
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var positionLeft = e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    updateScroll(element, 'left', element.scrollLeft + direction * i.containerWidth);
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};

},{"../instances":17,"../update-geometry":18,"../update-scroll":19}],10:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + (deltaX * i.railXRatio);
    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
    updateScroll(element, 'left', scrollLeft);
  }

  var mouseMoveHandler = function (e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
    _.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + (deltaY * i.railYRatio);
    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
    updateScroll(element, 'top', scrollTop);
  }

  var mouseMoveHandler = function (e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
    _.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};

},{"../../lib/dom":2,"../../lib/helper":5,"../instances":17,"../update-geometry":18,"../update-scroll":19}],11:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if ((e.isDefaultPrevented && e.isDefaultPrevented()) || e.defaultPrevented) {
      return;
    }

    var focused = dom.matches(i.scrollbarX, ':focus') ||
                  dom.matches(i.scrollbarY, ':focus');

    if (!hovered && !focused) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (_.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
    case 37: // left
      if (e.metaKey) {
        deltaX = -i.contentWidth;
      } else if (e.altKey) {
        deltaX = -i.containerWidth;
      } else {
        deltaX = -30;
      }
      break;
    case 38: // up
      if (e.metaKey) {
        deltaY = i.contentHeight;
      } else if (e.altKey) {
        deltaY = i.containerHeight;
      } else {
        deltaY = 30;
      }
      break;
    case 39: // right
      if (e.metaKey) {
        deltaX = i.contentWidth;
      } else if (e.altKey) {
        deltaX = i.containerWidth;
      } else {
        deltaX = 30;
      }
      break;
    case 40: // down
      if (e.metaKey) {
        deltaY = -i.contentHeight;
      } else if (e.altKey) {
        deltaY = -i.containerHeight;
      } else {
        deltaY = -30;
      }
      break;
    case 33: // page up
      deltaY = 90;
      break;
    case 32: // space bar
      if (e.shiftKey) {
        deltaY = 90;
      } else {
        deltaY = -90;
      }
      break;
    case 34: // page down
      deltaY = -90;
      break;
    case 35: // end
      if (e.ctrlKey) {
        deltaY = -i.contentHeight;
      } else {
        deltaY = -i.containerHeight;
      }
      break;
    case 36: // home
      if (e.ctrlKey) {
        deltaY = element.scrollTop;
      } else {
        deltaY = i.containerHeight;
      }
      break;
    default:
      return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};

},{"../../lib/dom":2,"../../lib/helper":5,"../instances":17,"../update-geometry":18,"../update-scroll":19}],12:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(deltaX, deltaY) {
    var child = element.querySelector('textarea:hover, select[multiple]:hover, .ps-child:hover');
    if (child) {
      var style = window.getComputedStyle(child);
      var overflow = [
        style.overflow,
        style.overflowX,
        style.overflowY
      ].join('');

      if (!overflow.match(/(scroll|auto)/)) {
        // if not scrollable
        return false;
      }

      var maxScrollTop = child.scrollHeight - child.clientHeight;
      if (maxScrollTop > 0) {
        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = child.scrollLeft - child.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByChild(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};

},{"../instances":17,"../update-geometry":18,"../update-scroll":19}],13:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};

},{"../instances":17,"../update-geometry":18}],14:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = {top: 0, left: 0};
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    _.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'keyup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = {x: e.pageX, y: e.pageY};
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        _.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        _.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        _.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        _.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};

},{"../../lib/helper":5,"../instances":17,"../update-geometry":18,"../update-scroll":19}],15:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
          ((deltaY > 0) && (scrollTop === 0))) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
          ((deltaX > 0) && (scrollLeft === 0))) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    updateScroll(element, 'top', element.scrollTop - differenceY);
    updateScroll(element, 'left', element.scrollLeft - differenceX);

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = (new Date()).getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inLocalTouch && i.settings.swipePropagation) {
      touchStart(e);
    }
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = (new Date()).getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      if (i.settings.swipeEasing) {
        clearInterval(easingLoop);
        easingLoop = setInterval(function () {
          if (!instances.get(element)) {
            clearInterval(easingLoop);
            return;
          }

          if (!speed.x && !speed.y) {
            clearInterval(easingLoop);
            return;
          }

          if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
            clearInterval(easingLoop);
            return;
          }

          applyTouchMove(speed.x * 30, speed.y * 30);

          speed.x *= 0.8;
          speed.y *= 0.8;
        }, 10);
      }
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element) {
  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
    return;
  }

  var i = instances.get(element);
  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
};

},{"../../lib/helper":5,"../instances":17,"../update-geometry":18,"../update-scroll":19}],16:[function(require,module,exports){
'use strict';

var instances = require('./instances');
var updateGeometry = require('./update-geometry');

// Handlers
var handlers = {
  'click-rail': require('./handler/click-rail'),
  'drag-scrollbar': require('./handler/drag-scrollbar'),
  'keyboard': require('./handler/keyboard'),
  'wheel': require('./handler/mouse-wheel'),
  'touch': require('./handler/touch'),
  'selection': require('./handler/selection')
};
var nativeScrollHandler = require('./handler/native-scroll');

module.exports = function (element, userSettings) {
  element.classList.add('ps');

  // Create a plugin instance.
  var i = instances.add(
    element,
    typeof userSettings === 'object' ? userSettings : {}
  );

  element.classList.add('ps--theme_' + i.settings.theme);

  i.settings.handlers.forEach(function (handlerName) {
    handlers[handlerName](element);
  });

  nativeScrollHandler(element);

  updateGeometry(element);
};

},{"./handler/click-rail":9,"./handler/drag-scrollbar":10,"./handler/keyboard":11,"./handler/mouse-wheel":12,"./handler/native-scroll":13,"./handler/selection":14,"./handler/touch":15,"./instances":17,"./update-geometry":18}],17:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var defaultSettings = require('./default-setting');
var dom = require('../lib/dom');
var EventManager = require('../lib/event-manager');
var guid = require('../lib/guid');

var instances = {};

function Instance(element, userSettings) {
  var i = this;

  i.settings = defaultSettings();
  for (var key in userSettings) {
    i.settings[key] = userSettings[key];
  }

  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = dom.css(element, 'direction') === "rtl";
  i.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  function focus() {
    element.classList.add('ps--focus');
  }

  function blur() {
    element.classList.remove('ps--focus');
  }

  i.scrollbarXRail = dom.appendTo(dom.create('div', 'ps__scrollbar-x-rail'), element);
  i.scrollbarX = dom.appendTo(dom.create('div', 'ps__scrollbar-x'), i.scrollbarXRail);
  i.scrollbarX.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarX, 'focus', focus);
  i.event.bind(i.scrollbarX, 'blur', blur);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  dom.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = dom.appendTo(dom.create('div', 'ps__scrollbar-y-rail'), element);
  i.scrollbarY = dom.appendTo(dom.create('div', 'ps__scrollbar-y'), i.scrollbarYRail);
  i.scrollbarY.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarY, 'focus', focus);
  i.event.bind(i.scrollbarY, 'blur', blur);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
  dom.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  return element.getAttribute('data-ps-id');
}

function setId(element, id) {
  element.setAttribute('data-ps-id', id);
}

function removeId(element) {
  element.removeAttribute('data-ps-id');
}

exports.add = function (element, userSettings) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element, userSettings);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};

},{"../lib/dom":2,"../lib/event-manager":3,"../lib/guid":4,"../lib/helper":5,"./default-setting":7}],18:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateScroll = require('./update-scroll');

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = {width: i.railXWidth};
  if (i.isRtl) {
    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  dom.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  dom.css(i.scrollbarYRail, yRailOffset);

  dom.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
  dom.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  var existingRails;
  if (!element.contains(i.scrollbarXRail)) {
    existingRails = dom.queryChildren(element, '.ps__scrollbar-x-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    existingRails = dom.queryChildren(element, '.ps__scrollbar-y-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add('ps--active-x');
  } else {
    element.classList.remove('ps--active-x');
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    updateScroll(element, 'left', 0);
  }
  if (i.scrollbarYActive) {
    element.classList.add('ps--active-y');
  } else {
    element.classList.remove('ps--active-y');
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    updateScroll(element, 'top', 0);
  }
};

},{"../lib/dom":2,"../lib/helper":5,"./instances":17,"./update-scroll":19}],19:[function(require,module,exports){
'use strict';

var instances = require('./instances');

var createDOMEvent = function (name) {
  var event = document.createEvent("Event");
  event.initEvent(name, true, true);
  return event;
};

module.exports = function (element, axis, value) {
  if (typeof element === 'undefined') {
    throw 'You must provide an element to the update-scroll function';
  }

  if (typeof axis === 'undefined') {
    throw 'You must provide an axis to the update-scroll function';
  }

  if (typeof value === 'undefined') {
    throw 'You must provide a value to the update-scroll function';
  }

  if (axis === 'top' && value <= 0) {
    element.scrollTop = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-y-reach-start'));
  }

  if (axis === 'left' && value <= 0) {
    element.scrollLeft = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-x-reach-start'));
  }

  var i = instances.get(element);

  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
    // don't allow scroll past container
    value = i.contentHeight - i.containerHeight;
    if (value - element.scrollTop <= 2) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollTop;
    } else {
      element.scrollTop = value;
    }
    element.dispatchEvent(createDOMEvent('ps-y-reach-end'));
  }

  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
    // don't allow scroll past container
    value = i.contentWidth - i.containerWidth;
    if (value - element.scrollLeft <= 2) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollLeft;
    } else {
      element.scrollLeft = value;
    }
    element.dispatchEvent(createDOMEvent('ps-x-reach-end'));
  }

  if (i.lastTop === undefined) {
    i.lastTop = element.scrollTop;
  }

  if (i.lastLeft === undefined) {
    i.lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && value < i.lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-up'));
  }

  if (axis === 'top' && value > i.lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-down'));
  }

  if (axis === 'left' && value < i.lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-left'));
  }

  if (axis === 'left' && value > i.lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-right'));
  }

  if (axis === 'top' && value !== i.lastTop) {
    element.scrollTop = i.lastTop = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-y'));
  }

  if (axis === 'left' && value !== i.lastLeft) {
    element.scrollLeft = i.lastLeft = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-x'));
  }

};

},{"./instances":17}],20:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateGeometry = require('./update-geometry');
var updateScroll = require('./update-scroll');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

  // Recalculate rail margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  dom.css(i.scrollbarXRail, 'display', 'none');
  dom.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  // Update top/left scroll to trigger events
  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  dom.css(i.scrollbarXRail, 'display', '');
  dom.css(i.scrollbarYRail, 'display', '');
};

},{"../lib/dom":2,"../lib/helper":5,"./instances":17,"./update-geometry":18,"./update-scroll":19}]},{},[1]);

// autor http://danml.com/download.html
/* global decodeURIComponent, Blob */

var download = function (data, strFileName, strMimeType) {
	var self = window, // this script is only for browsers anyway...
									defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
									mimeType = strMimeType || defaultMime,
									payload = data,
									url = !strFileName && !strMimeType && payload,
									anchor = document.createElement("a"),
									toString = function (a) {
										return String(a);
									},
									myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
									fileName = strFileName || "download",
									blob,
									reader;
	myBlob = myBlob.call ? myBlob.bind(self) : Blob;

	if (String(this) === "true") { //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
		payload = [payload, mimeType];
		mimeType = payload[0];
		payload = payload[1];
	}
	if (url && url.length < 2048) { // if no filename and no mime, assume a url was passed as the only argument
		fileName = url.split("/").pop().split("?")[0];
		anchor.href = url; // assign href prop to temp anchor
		if (anchor.href.indexOf(url) !== -1) { // if the browser determines that it's a potentially valid url path:
			var ajax = new XMLHttpRequest();
			ajax.open("GET", url, true);
			ajax.responseType = 'blob';
			ajax.onload = function (e) {
				download(e.target.response, fileName, defaultMime);
			};
			setTimeout(function () {
				ajax.send();
			}, 0); // allows setting custom ajax headers using the return:
			return ajax;
		} // end if valid url?
	} // end if url?
	//go ahead and download dataURLs right away
	if (/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)) {
		if (payload.length > (1024 * 1024 * 1.999) && myBlob !== toString) {
			payload = dataUrlToBlob(payload);
			mimeType = payload.type || defaultMime;
		} else {
			return navigator.msSaveBlob ? // IE10 can't do a[download], only Blobs:
											navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
											saver(payload); // everyone else can save dataURLs un-processed
		}
	}//end if dataURL passed?
	blob = payload instanceof myBlob ?
									payload :
									new myBlob([payload], {type: mimeType});
	function dataUrlToBlob(strUrl) {
		var parts = strUrl.split(/[:;,]/),
										type = parts[1],
										decoder = parts[2] === "base64" ? atob : decodeURIComponent,
										binData = decoder(parts.pop()),
										mx = binData.length,
										i = 0,
										uiArr = new Uint8Array(mx);

		for (i; i < mx; ++i)
			uiArr[i] = binData.charCodeAt(i);
		return new myBlob([uiArr], {type: type});
	}
	function saver(url, winMode) {

		if ('download' in anchor) { //html5 A[download]
			anchor.href = url;
			anchor.setAttribute("download", fileName);
			anchor.className = "download-js-link";
			anchor.innerHTML = "downloading...";
			anchor.style.display = "none";
			document.body.appendChild(anchor);
			setTimeout(function () {
				anchor.click();
				document.body.removeChild(anchor);
				if (winMode === true) {
					setTimeout(function () {
						self.URL.revokeObjectURL(anchor.href);
					}, 250);
				}
			}, 66);
			return true;
		}

		// handle non-a[download] safari as best we can:
		if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
			url = url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			if (!window.open(url)) { // popup blocked, offer direct download:
				if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
					location.href = url;
				}
			}
			return true;
		}

		//do iframe dataURL download (old ch+FF):
		var f = document.createElement("iframe");
		document.body.appendChild(f);

		if (!winMode) { // force a mime that will download:
			url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
		}
		f.src = url;
		setTimeout(function () {
			document.body.removeChild(f);
		}, 333);

	}//end saver




	if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
		return navigator.msSaveBlob(blob, fileName);
	}

	if (self.URL) { // simple fast and modern way using Blob and URL:
		saver(self.URL.createObjectURL(blob), true);
	} else {
		// handle non-Blob()+non-URL browsers:
		if (typeof blob === "string" || blob.constructor === toString) {
			try {
				return saver("data:" + mimeType + ";base64," + self.btoa(blob));
			} catch (y) {
				return saver("data:" + mimeType + "," + encodeURIComponent(blob));
			}
		}

		// Blob but not URL support:
		reader = new FileReader();
		reader.onload = function (e) {
			saver(this.result);
		};
		reader.readAsDataURL(blob);
	}
	return true;
};
unikit.directive("uniReport", function () {

	var support = {
		PDF: 'application/pdf',
		ODT: 'application/vnd.oasis.opendocument.text',
		ODS: 'application/vnd.oasis.opendocument.spreadsheet',
		DOC: 'application/msword',
		XLS: 'application/vnd.ms-excel',
		RTF: 'application/rtf',
		XML: 'application/xml',
		CSV: 'text/csv',
		TXT: 'text/plain',
		HTM: 'text/html',
		PNG: 'image/png'
	};
	return {
		replace: true,
		scope: {
			code: '=code'
		},
		controller: ['$scope', '$http', function ($scope, $http) {
				const serv = {
					config: '/runtime/report/rest/config',
					execute: '/runtime/report/rest/execute'
				};
				$scope.info = {
					title: 'Cargando...',
					form: '/broken/report.html',
					state: 'none',
					src: 'NaN',
					print: false
				};
				$scope.report = {
					format: 'PDF',
					param: {}
				};
				$scope.paramReport = new ParamHandler($http, []);
				var impl = {
					init: function (code) {
						$scope.info.title = 'Reporte #' + code;
						$scope.info.description = 'Descripcion #' + code;
						$scope.info.form = '/broken/report.html?' + code;
						$scope.info.format = [{value: 'PDF', description: 'Archivo PDF'}];
						$scope.info.state = 'none';
						$scope.info.print = false;
					},
					config: function (code) {
						$http.post(serv.config, code).success(function (data) {
							data = data || $scope.info;
							$scope.info = data;
							$scope.info.state = 'none';
							$scope.info.print = false;
							$scope.info.src = 'NaN';
							$scope.paramReport = new ParamHandler($http, data.param || []);
							$scope.paramReport.set('format', data.format);
						}).error(function () {
							$scope.info.state = 'error';
						});
					}
				};
				$scope.$watch('code', function (code) {
					code = code || 'IGNORE';
					impl.init(code);
					impl.config(code);
				});
				var processInternal = function () {
					var info = $scope.info;
					info.id = 'FILE-' + Math.random().toString(16).slice(2);
					var base64String = 'data:' + info.contentType + ';base64,' + info.content;
					var idContent = $scope.idElement + '-content';
					console.log('idContent::::---->', htmlContent);
					var htmlContent = document.getElementById(idContent);
					htmlContent.innerHTML = '';
					var div = document.createElement('div');
					div.setAttribute('style', 'max-height:405px;overflow:auto;');
					info.print = info.type === 'XML' || info.type === 'TXT' || info.type === 'CSV' || info.type === 'HTML'; //impresion solo a tipo texto
					if (info.type === 'XML' || info.type === 'TXT' || info.type === 'CSV') {
						var xml = atob(info.content);
						var pre = document.createElement('pre');
						pre.id = info.id;
						pre.style = 'width:100%;height:auto;min-height:400px;overflow:auto;';
						pre.textContent = xml;
						div.appendChild(pre);
					} else {
						var embed = document.createElement('object');
						embed.id = info.id;
						embed.name = info.name;
						embed.type = info.contentType;
						embed.data = base64String;
						embed.style = 'width:100%;height:auto;min-height:400px;overflow:auto;';
						div.appendChild(embed);
					}
					htmlContent.appendChild(div);
					info.state = 'show';
				};

				$scope.flag = {
					showModal: function () {
						var info = $scope.info;
						return info.state !== 'none' && info.state !== 'error';
					},
					showReport: function () {
						var info = $scope.info;
						return info.state === 'show';
					},
					showPrint: function () {
						var info = $scope.info;
						return info.print;
					},
					disabled: function () {
						var info = $scope.info;
						return info.state === 'error';
					}
				};

				$scope.action = {
					execute: function () {
						var info = $scope.info;
						info.state = 'load';
						info.print = false;
						var reportRequest = angular.copy($scope.report, {});
						reportRequest.code = $scope.code;
						var param = angular.copy(reportRequest.param, {});
						reportRequest.param = [];
						for (var n in param) {
							var v = param[n];
							reportRequest.param.push({name: n, value: v});
						}
						$http.post(serv.execute, reportRequest)
														.success(function (data) {
															info.name = data.name;
															info.type = data.type;
															info.content = data.content;
															info.contentType = data.contentType || support[data.type];
															processInternal();
														})
														.error(function () {
															$scope.info.state = 'error';
														});

					},
					clear: function () {
						$scope.report = {
							format: 'PDF',
							param: {}
						};
					},
					refresh: function () {
						impl.config($scope.code);
					},
					print: function () {
						var info = $scope.info;
						var textContent = atob(info.content);
						if (info.type !== 'HTML') {
							textContent = '<pre>' + textContent + '</pre>';
						}
						var printWin = window.open("", "ProcessPrint");
						printWin.document.open();
						printWin.document.write(textContent);
						printWin.document.close();
						setTimeout(function () {
							printWin.print();
							printWin.close();
						}, 1000);
					},
					download: function () {
						var info = $scope.info;
						if (info.contentType && info.content) {
							var link = document.createElement('a');
							var hrefValue = 'data:' + info.contentType + ';base64,' + info.content;
							link.setAttribute('href', hrefValue);
							link.setAttribute('download', info.name);
							link.setAttribute('target', '_blank');
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
						} else {
							//no plica la descarga
						}
					},
					close: function () {
						$scope.info.state = 'none';
					}
				};
			}],
		template: function (element, attrs) {
			var id = attrs.id = attrs.id || ('uni-' + Math.random().toString(16).slice(2));
			return  '<div>' +
											'<div uni-panel="">' +
											'<header>{{info.title}}</header>' +
											'<form name="reportForm">' +
											'<div uni-part="info.form" replace="{dataReport: \'report.param\'}">Cargando...</div>' +
											'</form>' +
											'<footer>' +
											'<div uni-grid="{cols:[1,2,2,2,2,3]}">' +
											'<label>Opciones:</label>' +
											'<select uni-select="" ng-model="report.format" uni-option="paramReport.format" ng-disabled="flag.disabled()"></select>' +
											'<button uni-badge="" ng-click="action.execute(report)" ng-disabled="flag.disabled()">Ejecutar Reporte</button>' +
											'<button uni-badge="" ng-click="action.clear(report)" ng-disabled="flag.disabled()">Limpiar</button>' +
											'<button uni-badge="" ng-click="action.refresh(report)">Actualizar</button>' +
											'<label>Status: {{info.state}}</label>' +
											'</div>' +
											'</footer>' +
											'</div>' +
											'<i uni-badge="">{{info.description}}</i>' +
											'<div uni-panel="{type:\'modal\', size: \'lg\'}" ng-if="flag.showModal()">' +
											'<header>' +
											'Reporte {{info.name}} - {{info.type}}' +
											'<div uni-action="{type:\'header\'}">' +
											'<button ng-click="action.execute(report)" uni-confirm="Esta seguro de volver a generar el reporte?">Recargar</button>' +
											'<button ng-click="action.print(report)" ng-if="flag.showPrint()">Imprimir</button>' +
											'<button ng-click="action.download(report)" ng-if="flag.showReport()">Descargar</button>' +
											'<button ng-click="action.close()">Cerrar</button>' +
											'</div>' +
											'</header>' +
											'<center ng-show="info.state===\'load\'">' +
											'<div class="uni-loader"></div>' +
											'<div>Cargando...</div>' +
											'</center>' +
											'<h1 ng-show="info.state===\'error\'">' +
											'No se pudo executar el reporte' +
											'</h1>' +
											'<div id="' + id + '-content" ng-show="flag.showReport()" > Cargando el reporte... </div>' +
											'</div>' +
											'</div>';
		},
		link: function (scope, element, attrs) {
			scope.idElement = attrs.id;
		}
	};
});