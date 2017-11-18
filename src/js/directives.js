app.directive('uiNavbar', ['$rootScope', '$compile', function ($rootScope, $compile) {
	var createTemplate = function(element, attrs){
		var html = '';
		var mainMenus = createMainMenus(attrs);
		html += mainMenus;
		return html;
	};
	var createMainMenus = function(attrs){
		return 	"<div class='main-container ace-save-state' id='main-container'>"+
			"<div class='ui-main-menus sidebar-shortcuts' id='sidebar-shortcuts'>"+
				"<div class='sidebar-shortcuts-content'>"+
					"<div class='sidebar-shortcuts-large' id='sidebar-shortcuts-large' ng-show='showMainMenu'>"+
						"<button class='btn btn-success' ng-repeat='item in "+attrs.menu+"'>"+
							"<i class='ace-icon fa fa-cogs'></i>"+
							"<span>{{item.label|| 'Modulo ' ++ item.id}}</span>"+
						"</button>"+
					"</div>"+
					"<div class='sidebar-shortcuts-medium' id='sidebar-shortcuts-mini' ng-show='!showMainMenu'>"+
						"<button class='btn btn-success' ng-repeat='item in "+attrs.menu+"'>"+
							"<i class='ace-icon fa fa-cogs'></i>"+
						"</button>"+
					"</div>"+
					"<i id='sidebar-toggle-icon' class='collapse-icon fa fa-angle-double-left' ng-click='showLargeMenu()' ng-class='showMainMenu?\"fa-angle-double-left left\":\"fa-angle-double-right right\"'></i>"+
				"</div>"+
				"<div ng-show='false' class='sidebar-shortcuts-mini' id='sidebar-shortcuts-mini'>"+
					"<span class='btn btn-success' ng-repeat='item in "+attrs.menu+"'></span>"+
				"</div>"+
			"</div>"+
		"</div>";
	}
	return {
		restrict: 'A',
		replace: true,
		scope: false,
		priority: 10,
		terminal: true,
		template: function (element, attrs) {
			delete attrs.uiNavbar;
			element.removeAttr('ui-navbar');
			var templateNavbar = createTemplate(element, attrs);
			return templateNavbar;
		},
		link: function (scope, element, attrs) {
			scope.showMainMenu = false;
			scope.showLargeMenu = function(){
				scope.showMainMenu = !scope.showMainMenu;
			};
			$compile(element)(scope);
		}
	};
}]);