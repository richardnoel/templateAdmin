function MapStack() {
	//var debug = true;
	var map = new Map();
	var stack = new Array();
	this.forEach = function (callback) {
		map.forEach(callback);
	};
	this.keys = function () {
		return map.keys();
	};
	this.values = function () {
		return map.values();
	};
	this.map = function (callback) {
		var result = new Map();
		map.forEach(function (val, key, map) {
			result.set(key, callback(val, key, map));
		});
		return result;
	};
	this.attrMap = function (result, attr) {
		//result = result || new Map();
		map.forEach(function (val, key, map) {
			result.set(key, val[attr]);
		});
		return result;
	};
	this.get = function (key) {
		return map.get(key);
	};
	this.put = function (key, value) {
		map.set(key, value);
		stack.push(key);
		console.log('add: ' + key + '\t = ', value);
	};
	this.toString = function () {
		return 'MapStack => ' + map.size + ' orden ' + stack;
	};
	this.focus = function (key) {
		if (key === undefined) {
			return stack.length === 0 ? null : stack[stack.length - 1];
		} else {
			var i = stack.indexOf(key);
			if (i > -1) {
				stack.splice(i, 1);
				stack.push(key);
				return map.get(key);
			}
		}
		return null;
	};
	this.isFocus = function (key) {
		if (stack.length !== 0 && key !== undefined) {
			return stack[stack.length - 1] === key;
		}
		return false;
	};
	this.remove = function (key) {
		var value = null;
		var i = stack.indexOf(key);
		if (i > -1) {
			stack.splice(i, 1);
			value = map.get(key);
			map.delete(key);
		}
		return value;
	};
	this.clear = function () {
		map = new Map();
		stack = new Array();
	};
}
var spa = angular.module('union-spa', ['ngAnimate', 'swxSessionStorage']);
spa.constant('SPA', {version: '1.0.1'});
spa.run(['$rootScope', 'SPA', function ($rootScope, SPA) {
		$rootScope.SPA = SPA;
	}]);

spa.factory('$store', function ($sessionStorage) {
	return {
		store: function (key, value) {
			$sessionStorage.put(key, value);
		},
		get: function (key) {
			return $sessionStorage.get(key);
		},
		remove: function (key) {
			$sessionStorage.remove(key);
		},
		reset: function () {
			$sessionStorage.empty();
		}
	}
});
//spa.directive('script', ['$xhrFactory', function ($templateCache, $xhrFactory) {
spa.directive('ngForceRun', ['$xhrFactory', function ($xhrFactory) {
		return {
			restrict: 'A',
			terminal: true,
			priority: 100,
			scope: false,
			link: function (scope, elem, attr) {
				if (attr.ngForceRun === 'true') {
					try {
						var code = elem.text();
						var src = attr.src || attr.ngSrc;
						if (typeof src !== 'undefined') {
							var get = $xhrFactory();
							get.open('GET', src, false);
							get.send(null);
							if (get.status === 200) {
								code = get.responseText;
							} else {
								throw Error('Error LoadScriptLazy: script: ' + src);
							}
						}
						var f = new Function(code);
						f();
					} catch (e) {
						console.error(e);
					}
				}
			}
		};
	}]);

spa.factory('$runtime', function ($rootScope, $store) {
	function __copyFreeze(src) {
		var dest = {};
		for (var k in src) {
			if (src[k] instanceof Function) {
				console.log('ignore,,,' + k);
			} else if (src[k] instanceof Array) {
				dest[k] = src[k];
			} else if (src[k] instanceof Object) {
				dest[k] = __copyFreeze(src[k]);
			} else {
				dest[k] = src[k];
			}
		}
		Object.freeze(dest);
		return dest;
	}

	function __createContent(src) {
		var dest = {};
		src = src || {};
		dest.id = src.id || Math.random().toString(36).slice(2, 11);
		dest.title = src.title || ('Sin titulo' + dest.id);
		dest.mode = src.mode || 'CONTENT';
		dest.view = src.view || '/broken/none.html';
		dest.view = dest.view + '?' + new Date();
		dest.icon = src.icon || '/broken/icon.png';
		dest.focus = false;
		return dest;
	}

	function __removeFrom(array, key) {
		if (array instanceof Array) {
			var index = array.indexOf(key);
			if (index > -1) {
				array.splice(index, 1);
			}
		} else {
			delete array[key];
		}
		return array;
	}

	function __createMessage(type, text, cause, action, code) {
		if (text instanceof Object) {
			var temp = text;
			text = temp.text || 'Sin texto';
			cause = temp.cause || cause;
			action = temp.action || action;
			code = temp.code || code || 'CLI-0000';
		}
		if (cause instanceof String) {
			cause = [cause];
		}
		return {
			type: type,
			code: code,
			text: text,
			cause: cause,
			action: action,
			date: new Date().getTime()
		};
	}

	var internalTrace = {
		allContent: {},
		allMessage: {}
	};
	var internalFocus = $store.get("FOCUS") || {
			content: [],
			window: [],
			modal: []
		};
	var internalState = $store.get("STATE") || {
			template: null,
			start: null,
			access: null,
			content: {},
			window: {},
			modal: {},
			script: {},
			menu: {}
		};

	var internal = new function (state, focus) {
		function _focus(mode) {
			if (mode === 'WINDOW') {
				return focus.window;
			} else if (mode === 'MODAL') {
				return focus.modal;
			} else {
				return focus.content;
			}
		}

		function _state(mode) {
			if (mode === 'WINDOW') {
				return state.window;
			} else if (mode === 'MODAL') {
				return state.modal;
			} else {
				return state.content;
			}
		}

		function _idFocus(focus) {
			if (focus.length !== 0) {
				return focus[focus.length - 1];
			}
			return null;
		}

		function _indexFocus(focus, id) {
			return focus.indexOf(id);
		}

		this.addContent = function (item) {
			var state = _state(item.mode);
			var focus = _focus(item.mode);
			var id = _idFocus(focus);
			if (id !== null && state[id] !== undefined) {
				state[id].focus = false;
			}
			var ref = __createContent(item);
			ref.focus = true;
			state[ref.id] = ref;
			focus.push(ref.id);
		};
		this.removeContent = function (item) {
			var state = _state(item.mode);
			var focus = _focus(item.mode);
			__removeFrom(state, item.id);
			__removeFrom(focus, item.id);
			var id = _idFocus(focus);
			if (id !== null && state[id] !== undefined) {
				state[id].focus = true;
			}
		};
		this.focusContent = function (item) {
			console.log('change focus: ', item);
			var state = _state(item.mode);
			var focus = _focus(item.mode);
			var id = _idFocus(focus);
			if (id !== null && state[id] !== undefined) {
				state[id].focus = false;
			}
			var ref = state[item.id];
			if (ref !== null) {
				ref.focus = true;
				__removeFrom(focus, ref.id);
				focus.push(ref.id);
			}
		};
	}(internalState, internalFocus);

	var runtime = new function ($rootScope) {
		var config = '$' + Math.random().toString(36).slice(2, 11);
		config = '$c';
		var block = $rootScope.$block = {
			app: {},
			session: {},
			state: {},
			message: {}
		};
		$rootScope.$watch(config + '.app', function () {
			block.app = __copyFreeze(config.app);
		}, true);
		$rootScope.$watch(config + '.session', function () {
			block.session = __copyFreeze(config.session);
		}, true);
		$rootScope.$watch(config + '.setting', function () {
			runtime.changeTemplate(config.setting.template);
			runtime.changeStart(config.setting.start);
			runtime.changeAccess(config.setting.access);
			runtime.addScript(config.setting.start.ctrl, true);
			runtime.addScript(config.setting.access.ctrl, true);
			internalState.servicePath = config.setting.servicePath;
			block.state = __copyFreeze(internalState);
		}, true);
		config = $rootScope[config] = {
			app: {
				title: 'Cargando...',
				favicon: '/broken/favicon.png',
				lang: 'es',
				version: '!'
			},
			setting: {
				template: '/broken/load.html',
				start: {
					id: 'start',
					title: 'Start Page...',
					view: '/broken/none.html'
				},
				access: {
					id: 'access',
					title: 'Access Page...',
					view: '/broken/none.html'
				}
			},
			session: {}
		};
		this.init = function (data) {
			angular.merge(config.app, data.app || {});
			angular.merge(config.setting, data.setting || {});
			angular.merge(config.session, data.session || {});
		};
		this.injectPart = function ($scope, name) {
			$scope[name] = $rootScope.$block[name];
			$rootScope.$watch('$block.' + name, function (val) {
				$scope[name] = val;
			}, true);
		};
		this.injectRef = function ($scope, name) {
			$scope[name] = $rootScope.$block[name];
		};
		this.addContent = function (content) {
			var id = content.id;
			internalTrace.allContent[id] = content;
			runtime.addScript(content.ctrl, false);
			internal.addContent(content);
//			content = __createContent(content);
//			if (content.mode === 'WINDOW') {
//				internalState.window[content.id] = content;
//			} else if (content.mode === 'MODAL') {
//				internalState.modal[content.id] = content;
//			} else {
//				internalState.content[content.id] = content;
//			}
		};
		this.removeContent = function (id) {
			var content = internalTrace.allContent[id];
			if (content === undefined) {
				content = internalState.content[id] || internalState.modal[id] || internalState.window[id];
			}
			runtime.removeScript(content.ctrl);
			internal.removeContent(content);
		};
		this.focusContent = function (content) {
			internal.focusContent(content);
		};
		this.addScript = function (ctrls, isBlock) {
			ctrls = ctrls || [];
			ctrls.forEach(function (ctrl) {
				internalState.script[ctrl] = isBlock;
			});
		};
		this.removeScript = function (ctrls) {
			ctrls = ctrls || [];
			ctrls.forEach(function (ctrl) {
				var isBlock = internalState.script[ctrl];
				if (isBlock === false) {
					__removeFrom(internalState.script, ctrl);
				}
			});
		};
		this.changeTemplate = function (template) {
			internalState.template = template;
		};
		this.changeStart = function (start) {
			internalState.start = __createContent(start);
		};
		this.changeAccess = function (access) {
			internalState.access = __createContent(access);
		};
		this.startSession = function (session) {
			block.session = __copyFreeze(session);
		};
		this.refreshMenu = function (parent, children) {
			if (parent === null || parent.viewId === null) {
				internalState.menu = children;
			} else {
				console.log('search and append children menu for ', parent, ' children: ', children);
			}
		};
		this.addAllMessage = function (allMessage) {
			angular.forEach(allMessage, function (value) {
				internalTrace.allMessage[value.date] = value;
				block.message[value.date] = value;
			});
		};
		this.addMessage = function (type, text, cause, action, code) {
			var value = __createMessage(type, text, cause, action, code);
			block.message[value.date] = value;
		};
		this.applyState = function () {
			block.state = __copyFreeze(internalState);
			$store.store('STATE', internalState);
			$store.store('FOCUS', internalFocus);
		};
		this.setState = function (state) {
			internalState = state;
			__copyFreeze(internalState);
		};
		this.setFocus = function (focus) {
			internalFocus = focus;
			__copyFreeze(internalFocus);
		};
	}($rootScope);
	return {
		init: function (config) {
			runtime.init(config);
		},
		inject: function ($scope) {
			runtime.injectPart($scope, 'app');
			runtime.injectPart($scope, 'setting');
			runtime.injectPart($scope, 'session');
			runtime.injectPart($scope, 'state');
			runtime.injectRef($scope, 'message');
		},
		addContent: function (content) {
			runtime.addContent(content);
			runtime.applyState();
		},
		focusContent: function (content) {
			runtime.focusContent(content);
			runtime.applyState();
		},
		removeContent: function (content) {
			runtime.removeContent(content.id);
			runtime.applyState();
		},
		changeTemplate: function (template) {
			runtime.changeTemplate(template);
			runtime.applyState();
		},
		startSession: function (session) {
			runtime.startSession(session);
		},
		refreshMenu: function (parent, children) {
			runtime.refreshMenu(parent, children);
			runtime.applyState();
		},
		addAllMessage: function (data) {
			runtime.addAllMessage(data);
		},
		info: function (text, cause, action, code) {
			runtime.addMessage('INFO', text, cause, action, code);
		},
		warn: function (text, cause, action, code) {
			runtime.addMessage('WARN', text, cause, action, code);
		},
		error: function (text, cause, action, code) {
			runtime.addMessage('ERROR', text, cause, action, code);
		},
		fatal: function (text, cause, action, code) {
			runtime.addMessage('FATAL', text, cause, action, code);
		}
	};
});

spa.factory("$module", function ($http) {
	var ModuleConfig = function (group, mod, path) {
		console.warn("$module.NEW is deprecated function!");
		group = group || '';
		path = path || mod;
		this.createPart = function (part) {
			var _part = {};
			angular.forEach(part, function (val) {
				_part[val] = '/' + path + '/part/' + group + '/' + val + '.html?' + new Date();
			});
			return Object.freeze(_part);
		};
		this.createServ = function (serv) {
			var _serv = {};
			angular.forEach(serv, function (val) {
				_serv[val] = '/' + path + '/rest/' + group + '/' + val;
			});
			return Object.freeze(_serv);
		};
		this.createModal = function () {
			var _modal = {};
			return {
				open: function (name) {
					_modal[name] = true;
				},
				close: function (name) {
					_modal[name] = false;
				},
				show: function (name) {
					return _modal[name] || false;
				}
			};
		};
		this.createParam = function (param) {
			//var array = angular.isArray(param)? param : [param];
			return {};
		};
	};
	return function (group, mod, path) {
		var impl = new ModuleConfig(group, mod, path);
		var serv = ['info', 'filter', 'create', 'update', 'remove'];
		var part = ['table', 'new', 'edit', 'filter', 'info'];
		this.setServ = function (array, merge = false) {
			console.warn("$module.setServ is deprecated function!");
			serv = merge ? angular.merge(serv, array) : array;
		};
		this.setPart = function (array, merge = false) {
			console.warn("$module.setPart is deprecated function!");
			part = merge ? angular.merge(part, array) : array;
		};
		this.createPart = function () {
			console.warn("$module.createPart is deprecated function!");
			return impl.createPart(part);
		};
		this.createServ = function () {
			console.warn("$module.createServ is deprecated function!");
			return impl.createServ(serv);
		};
		this.createModal = function () {
			console.warn("$module.createModal is deprecated function!");
			return impl.createModal();
		};
		this.createParam = function (config) {
			console.warn("$module.createParam is deprecated function!");
			return impl.createParam(config);
		};
	};
});
spa.factory('httpStandardInterceptor', ['$q', '$rootScope', '$injector', '$runtime', '$store', httpStandardInterceptor]);
spa.config(function ($httpProvider) {
	$httpProvider.interceptors.push('httpStandardInterceptor');
	$httpProvider.defaults.withCredentials = true;
});
function httpStandardInterceptor($q, $rootScope, $injector, $runtime, $store) {
	return {
		request: function (config) {
			config.headers['Accept-Language'] = $rootScope.lang;
			config.headers['XX-Action'] = config.url;
			//config.url = 'http://localhost:8080/union-app-web3/' + config.url;
			config.headers = config.headers || {};
			config.headers['XX-Token'] = $store.get('TKN');
			return config;
		},
		response: function (response) {
			var tkn = response.headers('XX-Token') || $store.get('TKN');
			$store.store('TKN', tkn);
			if (typeof response.data === 'object' && response.headers('XX-Delivery') === 'true') {
				$runtime.addAllMessage(response.data.message);
				response.data = response.data.data;
			}
			return response;
		},
		responseError: function (response) {
			var tkn = response.headers('XX-Token') || $store.get('TKN');
			$store.store('TKN', tkn);
			if (typeof response.data === 'object' && response.headers('XX-Delivery') === 'true') {
				$runtime.addAllMessage(response.data.message);
				response.data = response.data.data;
			}
			return $q.reject(response);
		}
	};
}
var _app = {};
var app = angular.module('ins', ['union-spa', 'union-webkit']);
//var app = angular.module('ins', ['union-spa']);
app.config(function ($controllerProvider, $compileProvider, $provide) {
	_app.controllerProvider = $controllerProvider;
	_app.compileProvider = $compileProvider;
	_app.$provide = $provide;
});

_app.controller = function ($name, $function) {
	_app.controllerProvider.register($name, $function);
};

_app.directive = function ($name, $function) {
	_app.compileProvider.directive($name, $function);
};

_app.factory = function ($name, $function) {
	_app.$provide.factory($name, $function);
};

var __app = _app;
app.controller('$', function main$index($scope, $http, $log, $runtime, $window, $store) {
	$runtime.inject($scope);
	$scope.active = $store.get('MENU') || {title: 'Modulo', children: {}};
	$scope.activeMenu = function (menu) {
		$scope.active = menu;
		$store.store('MENU', menu);
	};
	$scope.openContent = function (content) {
		$runtime.addContent(content);
	};
	$scope.closeContent = function (content) {
		$runtime.removeContent(content);
	};
	$scope.focusContent = function (content) {
		$runtime.focusContent(content);
	};
	$scope.loadRootMenu = function () {
		$scope.loadMenu({viewId: null});
	};
	$scope.loadMenu = function (menu) {
		$http.post('/rest/menu', menu).success(function (data) {
		$scope.menu = data;
			$runtime.refreshMenu(menu, data);
		}).error(function () {
			console.log('error...');
			$runtime.error('No se pudo cargar el menu: ' + menu);
		});
	};
	$scope.logout_click = function () {
		$http.post($scope.state.servicePath + '/logout').success(function (data) {
			$store.reset();
			$window.location.href = '/';
		}).error(function () {
			console.log('error...', data);
			$runtime.error('No se pudo finalizar la sessión del usuario.');
		});
	};
});
app.run(function ($http, $runtime, $timeout) {
	var runtimeInit = function () {
		$http.post('/rest/init').success(function (data) {
			$runtime.init(data);
			$runtime.info('Inicializando...');
			// $runtime.changeTemplate('/static/template/default.html');
		}).error(function (data, status) {
			console.log('ERROR AT GETTING DATA ' + status);
			$runtime.init({
				app: {
					title: "Banco Union S.A. - 2017",
					copyright: "Banco Union S.A. - 2017",
					favicon: "/broken/favicon.png",
					logo: "/broken/logo.png",
					lang: "es-BO"
				},
				setting: {
					template: "/broken/error.html"
				}
			});
		});
	};
	$timeout(runtimeInit, 1000);
});

app.directive('uiTreeMenu', function () {
	return {
		restrict: 'A',
		templateUrl: '/spa/ui-tree-menu.html',
		replace: true,
		scope: {
			menuList: '=uiTreeMenu',
			openContent: '=openContent'
		},
		link: function ($scope, elem, attrs, ctrl) {
			$scope.openGroup = function (x, e) {
				console.log(x, e);
			};
		}
	};
});