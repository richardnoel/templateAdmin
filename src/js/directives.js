app.directive('uiNavbar', ['$rootScope', '$compile', function ($rootScope, $compile) {
		var createSideBarMenus = function (attrs) {
			var sidebarMenus = {
				template: "<div class='sidebar-shortcuts-content'>" +
												"<div  ng-class='{ngClassContent}'>" +
												"<button ng-click='{clickBtn}' class='btn btn-success' ng-repeat='item in {menu}' ng-class='{ngClassBtn}'>" +
												"<i class='ace-icon fa fa-cogs'></i><span ng-if='showMainMenu'>{{item.label}}</span></button>" +
												"<i ng-show='!collapseSidebar' class='collapse-icon fa' ng-click='{clickIcon}' ng-class='{ngClassIcon}'></i>" +
												"</div>" +
												"<div class='sidebar-shortcuts-mini'>" +
												"<span ng-if='$index < 4' class='btn btn-success'  ng-repeat='item in {menu}' ng-click='{clickBtn}'></span>" +
												"</div>" +
												"</div>",
				replaces: {
					clickBtn: 'clickMenu(item)',
					clickIcon: 'showLargeMenu()',
					ngClassBtn: '{active: (item === selectedChild)}',
					ngClassContent: '{\"sidebar-shortcuts-medium\": !showMainMenu, \"sidebar-shortcuts-large\": showMainMenu}',
					ngClassIcon: 'showMainMenu?\"fa-angle-double-left left\":\"fa-angle-double-right right\"',
					menu: attrs.menu
				}
			};
			return replacesHTML(sidebarMenus.template, sidebarMenus.replaces);
		};

		var createTemplate = function (attrs) {
			var mainContainerMenus = {
				template: "<div class='main-container ace-save-state'>" +
												"<div class='ui-main-menus sidebar-shortcuts'>{sidebarMenus}</div>" +
												"</div>",
				replaces: {
					sidebarMenus: createSideBarMenus(attrs) || ''
				}
			};
			var mainTemplate = {
				template: "<div class='uni-sidebar-menu sidebar responsive ace-save-state' ng-class='{ngClass}'>{sidebarContent}</div>",
				replaces: {
					ngClass: '{\"menu-min\": collapseSidebar, \"menu-medium\": !showMainMenu, display:hideSidebar}',
					sidebarContent: replacesHTML(mainContainerMenus.template, mainContainerMenus.replaces)
				}
			};
			return replacesHTML(mainTemplate.template, mainTemplate.replaces);
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			priority: 10,
			terminal: true,
			template: function (element, attrs) {
				delete attrs.uiNavbar;
				element.removeAttr('ui-navbar');
				var templateNavbar = createTemplate(attrs);
				return templateNavbar;
			},
			link: function (scope, element, attrs) {
				scope.showMainMenu = false;
				scope.showLargeMenu = function () {
					scope.showMainMenu = !scope.showMainMenu;
				};
				scope.clickMenu = function (item) {
					scope.selectedChild = item;
				};
				$compile(element)(scope);
			}
		};
	}]);

app.directive('uiSidebar', ['$rootScope', '$compile', function ($rootScope, $compile) {
		var createTemplate = function (attrs) {
			var collapseTemplate = "<div ng-show='{menu}' ng-click='collapseClick()' class='sidebar-toggle sidebar-collapse' id='sidebar-collapse'>" +
											"<i id='sidebar-toggle-icon' class='ace-save-state ace-icon fa' ng-class='{ngClassIconCollapse}'></i>" +
											"</div>";
			var templateOptions = "<ul ui-navbar-modules menu='{menu}' ng-init='parent = selectedChild'></ul>";
			var mainTemplate = {
				template: "<div class='ui-sidebar sidebar responsive ace-save-state' ng-class='{ngClassSidebarCollapse}'>" +
												"{collapseTemplate}{templateOptions}{collapseTemplate}</div>",
				replaces: {
					collapseTemplate: collapseTemplate,
					templateOptions: templateOptions,
					menu: attrs.menu,
					ngClassIconCollapse: 'collapseSidebar? \"fa-angle-double-right\": \"fa-angle-double-left\"',
					ngClassSidebarCollapse: '{\"menu-min\":collapseSidebar, display:hideSidebar}'
				}
			};
			return replacesHTML(mainTemplate.template, mainTemplate.replaces);
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			priority: 10,
			terminal: true,
			template: function (element, attrs) {
				delete attrs.uiSidebar;
				element.removeAttr('ui-sidebar');
				var templateNavbar = createTemplate(attrs);
				return templateNavbar;
			},
			link: function (scope, element, attrs) {
				scope.collapseSidebar = false;
				scope.collapseClick = function () {
					scope.collapseSidebar = !scope.collapseSidebar;
				};
				$compile(element)(scope);
			}
		};
	}]);

app.directive('uiNavbarModules', ['$rootScope', '$compile', function ($rootScope, $compile) {
		var createTemplate = function (element, attrs) {
			var html = "";
			var mainMenus = createMainMenus(attrs);
			html += mainMenus;
			return html;
		};

		var createTemplateItems = function (attrs) {
			var listItems = {
				template: "<li ng-repeat='item in {menu}.children' ng-class='{active:item.active, open: (item.open && item.type==\"GROUP\")}'>" +
												"<a ng-click='{ngClickShow}'>" +
												"<i ng-if='!{subMenu}' class='menu-icon fa fa-list-alt'></i>" +
												"<i ng-if='{subMenu}' class='menu-icon fa fa-caret-right'></i>" +
												"<span class='menu-text'> {{item.label}}</span>" +
												"<b ng-if='item.type === \"GROUP\"' class='arrow fa fa-angle-down'></b>" +
												"</a>" +
												"<b class='arrow'></b>" +
												"<ul ng-if='item.type===\"GROUP\"' ui-navbar-modules menu='item' sub-menu='true' ng-init='parent = $parent.$parent.item'></ul>" +
												"</li>",
				replaces: {
					parent: attrs.menu,
					menu: attrs.menu,
					subMenu: attrs.subMenu,
					ngClickShow: 'clickItem(item,' + attrs.menu + ', parent)'
				}
			};
			return replacesHTML(listItems.template, listItems.replaces);
		};
		var createMainMenus = function (attrs) {
			var mainTemplate = {
				template: "<ul style='top: 0px;' ng-class='{ngClassSubMenu}'>{listItems}</ul>",
				replaces: {
					listItems: createTemplateItems(attrs),
					ngClassSubMenu: attrs.subMenu + '?\"submenu nav-show\":\"nav nav-list\"'
				}
			};
			return replacesHTML(mainTemplate.template, mainTemplate.replaces);
		};
		var closeLinkItems = function (menu, item, parent) {
			var items = menu.children;
			for (var i = 0; i < items.length; i += 1) {
				if (items[i].type === "GROUP") {
					parent = closeLinkItems(items[i], item, parent);
					if (parent && !menu.root) {
						parent = menu;
					}
					if (menu.root) {
						items[i].active = false;
					}
				} else {
					if (item === items[i]) {
						parent = menu;
					}
					items[i].open = false;
					items[i].active = false;
				}
			}
			return parent;
		};
		return {
			restrict: 'A',
			replace: true,
			scope: false,
			priority: 10,
			terminal: true,
			template: function (element, attrs) {
				delete attrs.uiNavbarModules;
				element.removeAttr('ui-navbar-modules');
				var templateNavbar = createTemplate(element, attrs);
				return templateNavbar;
			},
			link: function (scope, element, attrs) {
				scope.clickItem = function (item, menu, parent) {
					if (item.type === "GROUP") {
						for (var i = 0; i < parent.children.length; i += 1) {
							if (parent.children[i] === item) {
								item.open = !item.open;
							} else {
								parent.children[i].open = false;
							}
						}
					} else {
						scope.selectedChild.root = true;
						var root = closeLinkItems(scope.selectedChild, item, null);
						if (root) {
							root.active = true;
						}
						item.active = true;
					}
				};
				scope.activeItem = null;
				$compile(element)(scope);
			}
		};
	}]);