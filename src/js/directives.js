app.directive('uiNavbar', ['$rootScope', '$compile', function ($rootScope, $compile) {
    var createTemplate = function (element, attrs) {
      var html = '';
      var mainMenus = createMainMenus(attrs);
      html += mainMenus;
      return html;
    };
    var createMainMenus = function (attrs) {
      return 	"<div class='main-container ace-save-state' id='main-container'>" +
              "<div class='ui-main-menus sidebar-shortcuts' id='sidebar-shortcuts'>" +
              "<div class='sidebar-shortcuts-content'>" +
              "<div class='sidebar-shortcuts-large' id='sidebar-shortcuts-large' ng-show='showMainMenu'>" +
              "<button ng-click='clickMenu(item)' class='btn btn-success' ng-repeat='item in " + attrs.menu + "'>" +
              "<i class='ace-icon fa fa-cogs'></i>" +
              "<span>{{item.label|| 'Modulo ' ++ item.id}}</span>" +
              "</button>" +
              "</div>" +
              "<div class='sidebar-shortcuts-medium' id='sidebar-shortcuts-mini' ng-show='!showMainMenu'>" +
              "<button ng-click='clickMenu(item)' class='btn btn-success' ng-repeat='item in " + attrs.menu + "'>" +
              "<i class='ace-icon fa fa-cogs'></i>" +
              "</button>" +
              "</div>" +
              "<i id='sidebar-toggle-icon' class='collapse-icon fa fa-angle-double-left' ng-click='showLargeMenu()' ng-class='showMainMenu?\"fa-angle-double-left left\":\"fa-angle-double-right right\"'></i>" +
              "</div>" +
              "<div ng-show='false' class='sidebar-shortcuts-mini' id='sidebar-shortcuts-mini'>" +
              "<span class='btn btn-success' ng-repeat='item in " + attrs.menu + "'></span>" +
              "</div>" +
              "</div>" +
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
        scope.showMainMenu = true;
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


app.directive('uiNavbarModules', ['$rootScope', '$compile', function ($rootScope, $compile) {
    var createTemplate = function (element, attrs) {
      var html = "";
      var mainMenus = createMainMenus(attrs);
      html += mainMenus;
      return html;
    };
    var createMainMenus = function (attrs) {
      var template = "<ul style='top: 0px;' ng-class='" + attrs.subMenu + "?\"submenu nav-show\":\"nav nav-list\"'>{listItems}</ul>";
      var listItems = "<li ng-repeat='item in " + attrs.menu + ".children' ng-class='item.open?\"open\":\"\"'>" +
              "<a ng-click='clickItem(item)'>" +
              "<i class='menu-icon fa fa-list-alt'></i>" +
              "<span class='menu-text'> {{item.label}} {{item.type}}</span>" +
              "<b ng-if='item.type === \"GROUP\"' class='arrow fa fa-angle-down'></b>" +
              "</a>" +
              "<b class='arrow'></b>" +
              "<ul ui-navbar-modules  ng-if='item.type===\"GROUP\"'  menu='item' sub-menu='true'></ul>" +
              "</li>";
      template = template.replace(/{listItems}/g, listItems);
      return template;
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
        scope.clickItem = function (item) {
          console.log(item);
          if (item.open) {
            item.open = false;
          } else {
            item.open = true;
          }
        }
        scope.activeItem = null;
        $compile(element)(scope);
      }
    };
  }]);


app.directive('uiNavbarSubmenu', ['$rootScope', '$compile', function ($rootScope, $compile) {
    var createTemplate = function (element, attrs) {
      var html = "";
      var mainMenus = createMainMenus(attrs);
      html += mainMenus;
      return html;
    };
    var createMainMenus = function (attrs) {
      var template = "<ul class='submenu'>{listItems}</ul>";
      var listItems = "<li ng-repeat='item in " + attrs.menu + "'>" +
              "<a href='#'>" +
              "<i class='menu-icon fa fa-list-alt'></i>" +
              "<span class='menu-text'> {{item.label}} </span>" +
              "<b ng-if='item.type === \"GROUP\"' class='arrow fa fa-angle-down'></b>"
      "</a>" +
              "<b class='arrow'></b>" +
              "<ul ng-if='item.type=\"GROUP\"' un-navbar-submenu menu='item.children'></ul>" +
              "</li>";
      template = template.replace(/{listItems}/g, listItems);
      return template;
    };
    return {
      restrict: 'A',
      replace: true,
      scope: false,
      priority: 10,
      terminal: true,
      template: function (element, attrs) {
        delete attrs.uiNavbarSubmenu;
        element.removeAttr('ui-navbar-submenu');
        var templateNavbar = createTemplate(element, attrs);
        return templateNavbar;
      },
      link: function (scope, element, attrs) {
        $compile(element)(scope);
      }
    };
  }]);