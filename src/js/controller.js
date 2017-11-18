app.controller('ctrl$template', function main$index($scope, $http, $log, $runtime, $window, $store) {
$scope.menu = 
[
  {
    "viewId": null,
    "moduleId": "Administrador de accesos",
    "icon": null,
    "label": "Administración de Accesos",
    "action": null,
    "state": null,
    "type": "GROUP",
    "color": "#FFB752",
    "children": [
      {
        "viewId": null,
        "moduleId": "Administrador de accesos",
        "icon": null,
        "label": "Parametrización",
        "action": null,
        "state": null,
        "type": "GROUP",
        "children": [
          {
            "viewId": "domain",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Parámetros",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#domain",
              "title": "Page: /view/domain.html",
              "version": "1.0.0",
              "view": "/access/view/domain.html",
              "ctrl": [
                "/access/ctrl/domain.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "system",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Sistemas",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#system",
              "title": "Page: /view/system.html",
              "version": "1.0.0",
              "view": "/access/view/system.html",
              "ctrl": [
                "/access/ctrl/system.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "module",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Módulos",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#module",
              "title": "Page: /view/module.html",
              "version": "1.0.0",
              "view": "/access/view/module.html",
              "ctrl": [
                "/access/ctrl/module.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "resource",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Recursos",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#resource",
              "title": "Page: /view/resource.html",
              "version": "1.0.0",
              "view": "/access/view/resource.html",
              "ctrl": [
                "/access/ctrl/resource.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "controller",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Controladores",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#controller",
              "title": "Page: /view/controller.html",
              "version": "1.0.0",
              "view": "/access/view/controller.html",
              "ctrl": [
                "/access/ctrl/controller.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "service",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Servicios",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#service",
              "title": "Page: /view/service.html",
              "version": "1.0.0",
              "view": "/access/view/service.html",
              "ctrl": [
                "/access/ctrl/service.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "agency",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Agencias",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#agency",
              "title": "Page: /view/agency.html",
              "version": "1.0.0",
              "view": "/access/view/agency.html",
              "ctrl": [
                "/access/ctrl/agency.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "externalSystem",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Sistemas externos",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#externalSystem",
              "title": "Page: /view/externalSystem.html",
              "version": "1.0.0",
              "view": "/access/view/externalSystem.html",
              "ctrl": [
                "/access/ctrl/externalSystem.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "externalEntity",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Entidades externas",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#externalEntity",
              "title": "Page: /view/externalEntity.html",
              "version": "1.0.0",
              "view": "/access/view/externalEntity.html",
              "ctrl": [
                "/access/ctrl/externalEntity.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "businessUnity",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Unidades de negocio",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#businessUnity",
              "title": "Page: /view/businessUnity.html",
              "version": "1.0.0",
              "view": "/access/view/businessUnity.html",
              "ctrl": [
                "/access/ctrl/businessUnity.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "position",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Cargos",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#position",
              "title": "Page: /view/position.html",
              "version": "1.0.0",
              "view": "/access/view/position.html",
              "ctrl": [
                "/access/ctrl/position.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "workstation",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Estaciones de trabajo",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#workstation",
              "title": "Page: /view/workstation.html",
              "version": "1.0.0",
              "view": "/access/view/workstation.html",
              "ctrl": [
                "/access/ctrl/workstation.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "reason",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Motivos",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#reason",
              "title": "Page: /view/reason.html",
              "version": "1.0.0",
              "view": "/access/view/reason.html",
              "ctrl": [
                "/access/ctrl/reason.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          }
        ],
        "content": null
      },
      {
        "viewId": null,
        "moduleId": "Administrador de accesos",
        "icon": null,
        "label": "Asignaciones",
        "action": null,
        "state": null,
        "type": "GROUP",
        "children": [
          {
            "viewId": "profile",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Perfiles",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#profile",
              "title": "Page: /view/profile.html",
              "version": "1.0.0",
              "view": "/access/view/profile.html",
              "ctrl": [
                "/access/ctrl/profile.js",
                "/access/ctrl/profileRole.js",
                "/access/ctrl/profileBusUnity.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "role",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Roles",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#role",
              "title": "Page: /view/role.html",
              "version": "1.0.0",
              "view": "/access/view/role.html",
              "ctrl": [
                "/access/ctrl/role.js",
                "/access/ctrl/roleResource.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "user",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Usuarios",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#user",
              "title": "Page: /view/user.html",
              "version": "1.0.0",
              "view": "/access/view/user.html",
              "ctrl": [
                "/access/ctrl/user.js",
                "/access/ctrl/userProfile.js",
                "/access/ctrl/userAgency.js",
                "/access/ctrl/exceptUserResource.js",
                "/access/ctrl/exceptUserRole.js",
                "/access/ctrl/exceptUserBusUnity.js",
                "/access/ctrl/userExternalSystem.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "delegatedProfile",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Perfiles delegados",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#delegatedProfile",
              "title": "Page: /view/delegatedProfile.html",
              "version": "1.0.0",
              "view": "/access/view/delegatedProfile.html",
              "ctrl": [
                "/access/ctrl/delegatedProfile.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "userExternalSystem",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Usuario sistemas externos",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#userExternalSystem",
              "title": "Page: /view/userExternalSystem.html",
              "version": "1.0.0",
              "view": "/access/view/userExternalSystem.html",
              "ctrl": [
                "/access/ctrl/userExternalSystem.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "externalUser",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Usuarios externos",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#externalUser",
              "title": "Page: /view/externalUser.html",
              "version": "1.0.0",
              "view": "/access/view/externalUser.html",
              "ctrl": [
                "/access/ctrl/externalUser.js",
                "/access/ctrl/userProfile.js",
                "/access/ctrl/userAgency.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "vacation",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Vacaciones",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#vacation",
              "title": "Page: /view/vacation.html",
              "version": "1.0.0",
              "view": "/access/view/vacation.html",
              "ctrl": [
                "/access/ctrl/vacation.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "userFile",
            "moduleId": "Administrador de accesos",
            "icon": null,
            "label": "Registro de bloqueos",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "Administrador de accesos#userFile",
              "title": "Page: /view/userFile.html",
              "version": "1.0.0",
              "view": "/access/view/userFile.html",
              "ctrl": [
                "/access/ctrl/userFile.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          }
        ],
        "content": null
      }
    ],
    "content": null
  },
  {
    "viewId": null,
    "moduleId": "manager-param",
    "icon": null,
    "label": "MANAGER::PARAM",
    "action": null,
    "state": null,
    "type": "GROUP",
    "color": "#FFB752",
    "children": [
      {
        "viewId": "parameter",
        "moduleId": "manager-param",
        "icon": null,
        "label": "Parametros",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "manager-param#parameter",
          "title": "Page: /view/parameter.html",
          "version": "1.0.0",
          "view": "/param/view/parameter.html",
          "ctrl": [
            "/param/ctrl/parameter.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "test",
        "moduleId": "manager-param",
        "icon": null,
        "label": "TEST",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "manager-param#test",
          "title": "Page: /view/test.html",
          "version": "1.0.0",
          "view": "/param/view/test.html",
          "ctrl": [
            "/param/ctrl/test.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      }
    ],
    "content": null
  },
  {
    "viewId": null,
    "moduleId": "WorkFlow",
    "icon": null,
    "label": "Flujos de Trabajo - Gestión",
    "action": null,
    "state": null,
    "type": "GROUP",
    "color": "#FFB752",
    "children": [
      {
        "viewId": "1",
        "moduleId": "WorkFlow",
        "icon": null,
        "label": "Gestión de Modelos BPMN",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "WorkFlow#1",
          "title": "Page: /view/model.html",
          "version": "1.0.0",
          "view": "/flow/view/model.html",
          "ctrl": [
            "/flow/ctrl/model.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "2",
        "moduleId": "WorkFlow",
        "icon": null,
        "label": "Gestión de Actores y Grupos",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "WorkFlow#2",
          "title": "Page: /view/actorAndGroup.html",
          "version": "1.0.0",
          "view": "/flow/view/actorAndGroup.html",
          "ctrl": [
            "/flow/ctrl/actorAndGroup.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "3",
        "moduleId": "WorkFlow",
        "icon": null,
        "label": "Relación de Formularios",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "WorkFlow#3",
          "title": "Page: /view/formRelation.html",
          "version": "1.0.0",
          "view": "/flow/view/formRelation.html",
          "ctrl": [
            "/flow/ctrl/formRelation.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      }
    ],
    "content": null
  },
  {
    "viewId": null,
    "moduleId": "static-showcase",
    "icon": null,
    "label": "UNIKIT - ShowCase",
    "action": null,
    "state": null,
    "type": "GROUP",
    "color": "#FFB752",
    "children": [
      {
        "viewId": null,
        "moduleId": "static-showcase",
        "icon": null,
        "label": "Formulario",
        "action": null,
        "state": null,
        "type": "GROUP",
        "children": [
          {
            "viewId": "uni-input",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-input",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-input",
              "title": "Page: /view/base/input.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/input.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-select",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-select",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-select",
              "title": "Page: /view/base/select.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/select.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-filter",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-filter",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-filter",
              "title": "Page: /view/base/filter.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/filter.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-editor",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-editor",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-editor",
              "title": "Page: /view/base/editor.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/editor.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          }
        ],
        "content": null
      },
      {
        "viewId": null,
        "moduleId": "static-showcase",
        "icon": null,
        "label": "Diseño",
        "action": null,
        "state": null,
        "type": "GROUP",
        "children": [
          {
            "viewId": "uni-grid",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-grid",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-grid",
              "title": "Page: /view/base/grid.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/grid.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-panel",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-panel",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-panel",
              "title": "Page: /view/base/panel.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/panel.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-panels",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-panels",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-panels",
              "title": "Page: /view/base/panels.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/panels.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-tree",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-tree",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-tree",
              "title": "Page: /view/base/tree.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/tree.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-scroll",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-scroll",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-scroll",
              "title": "Page: /view/base/scroll.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/scroll.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-plus",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-plus",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-plus",
              "title": "Page: /view/base/plus.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/plus.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          }
        ],
        "content": null
      },
      {
        "viewId": null,
        "moduleId": "static-showcase",
        "icon": null,
        "label": "Funcionalidad",
        "action": null,
        "state": null,
        "type": "GROUP",
        "children": [
          {
            "viewId": "uni-convert",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-convert",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-convert",
              "title": "Page: /view/base/convert.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/convert.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-validator",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-validator",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-validator",
              "title": "Page: /view/base/validator.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/validator.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          }
        ],
        "content": null
      },
      {
        "viewId": null,
        "moduleId": "static-showcase",
        "icon": null,
        "label": "Auxiliares",
        "action": null,
        "state": null,
        "type": "GROUP",
        "children": [
          {
            "viewId": "uni-badge",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-badge",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-badge",
              "title": "Page: /view/base/badge.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/badge.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-action",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-action",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-action",
              "title": "Page: /view/base/action.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/action.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          }
        ],
        "content": null
      },
      {
        "viewId": null,
        "moduleId": "static-showcase",
        "icon": null,
        "label": "Comun",
        "action": null,
        "state": null,
        "type": "GROUP",
        "children": [
          {
            "viewId": "uni-part",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-part",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-part",
              "title": "Page: /view/base/part.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/part.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-pager",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-pager",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-pager",
              "title": "Page: /view/base/pager.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/pager.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-table",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-table",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-table",
              "title": "Page: /view/base/table.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/table.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-confirm",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-confirm",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-confirm",
              "title": "Page: /view/base/confirm.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/confirm.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "uni-image",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "uni-image",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#uni-image",
              "title": "Page: /view/base/image.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/base/image.html",
              "ctrl": [
                "/static/showcase/ctrl/forms.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          }
        ],
        "content": null
      },
      {
        "viewId": null,
        "moduleId": "static-showcase",
        "icon": null,
        "label": "Embebido",
        "action": null,
        "state": null,
        "type": "GROUP",
        "children": [
          {
            "viewId": "une-table",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "une-table",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#une-table",
              "title": "Page: /view/embedded/table.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/embedded/table.html",
              "ctrl": [
                "/static/showcase/ctrl/embedded.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          },
          {
            "viewId": "une-filter",
            "moduleId": "static-showcase",
            "icon": null,
            "label": "une-filter",
            "action": null,
            "state": null,
            "type": "LINK",
            "children": [],
            "content": {
              "id": "static-showcase#une-filter",
              "title": "Page: /view/embedded/filter.html",
              "version": "1.0.0",
              "view": "/static/showcase/view/embedded/filter.html",
              "ctrl": [
                "/static/showcase/ctrl/embedded.js"
              ],
              "icon": null,
              "mode": "CONTENT"
            }
          }
        ],
        "content": null
      }
    ],
    "content": null
  },
  {
    "viewId": null,
    "moduleId": "runtime-report",
    "icon": null,
    "label": "RUNTIME::REPORT",
    "action": null,
    "state": null,
    "type": "GROUP",
    "color": "#FFB752",
    "children": [
      {
        "viewId": "example",
        "moduleId": "runtime-report",
        "icon": null,
        "label": "Example Execute",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "runtime-report#example",
          "title": "Page: /view/example.html",
          "version": "1.0.0",
          "view": "/runtime/report/view/example.html",
          "ctrl": [
            "/runtime/report/ctrl/example.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      }
    ],
    "content": null
  },
  {
    "viewId": null,
    "moduleId": "laika-pru",
    "icon": null,
    "label": "MODULO BANCO*************",
    "action": null,
    "state": null,
    "type": "GROUP",
    "children": [
      {
        "viewId": "persona",
        "moduleId": "laika-pru",
        "icon": null,
        "label": "Personas",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "laika-pru#persona",
          "title": "Page: /view/persona.html",
          "version": "1.0.0",
          "view": "/pru/view/persona.html",
          "ctrl": [
            "/pru/ctrl/persona.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "cliente",
        "moduleId": "laika-pru",
        "icon": null,
        "label": "Clientes",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "laika-pru#cliente",
          "title": "Page: /view/cliente.html",
          "version": "1.0.0",
          "view": "/pru/view/cliente.html",
          "ctrl": [
            "/pru/ctrl/cliente.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "cuenta",
        "moduleId": "laika-pru",
        "icon": null,
        "label": "Cuentas",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "laika-pru#cuenta",
          "title": "Page: /view/cuenta.html",
          "version": "1.0.0",
          "view": "/pru/view/cuenta.html",
          "ctrl": [
            "/pru/ctrl/cuenta.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "consulta",
        "moduleId": "laika-pru",
        "icon": null,
        "label": "Consultas",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "laika-pru#consulta",
          "title": "Page: /view/cli2.html",
          "version": "1.0.0",
          "view": "/pru/view/cli2.html",
          "ctrl": [
            "/pru/ctrl/cliente.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "todos",
        "moduleId": "laika-pru",
        "icon": null,
        "label": "todos",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "laika-pru#todos",
          "title": "Page: /view/todos.html",
          "version": "1.0.0",
          "view": "/pru/view/todos.html",
          "ctrl": [
            "/pru/ctrl/todos.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "Form",
        "moduleId": "laika-pru",
        "icon": null,
        "label": "Form",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "laika-pru#Form",
          "title": "Page: /view/form.html",
          "version": "1.0.0",
          "view": "/pru/view/form.html",
          "ctrl": [
            "/pru/ctrl/form.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "tree",
        "moduleId": "laika-pru",
        "icon": null,
        "label": "Tree",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "laika-pru#tree",
          "title": "Page: /view/tree.html",
          "version": "1.0.0",
          "view": "/pru/view/tree.html",
          "ctrl": [
            "/pru/ctrl/tree.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      }
    ],
    "content": null
  },
  {
    "viewId": null,
    "moduleId": "manager-report",
    "icon": null,
    "label": "MANAGER::REPORT",
    "action": null,
    "state": null,
    "type": "GROUP",
    "color": "#FFB752",
    "children": [
      {
        "viewId": "folder",
        "moduleId": "manager-report",
        "icon": null,
        "label": "Carpetas",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "manager-report#folder",
          "title": "Page: /view/folder.html",
          "version": "1.0.0",
          "view": "/manager/report/view/folder.html",
          "ctrl": [
            "/manager/report/ctrl/folder.js",
            "/manager/report/ctrl/report.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "resource",
        "moduleId": "manager-report",
        "icon": null,
        "label": "Recursos",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "manager-report#resource",
          "title": "Page: /view/resource.html",
          "version": "1.0.0",
          "view": "/manager/report/view/resource.html",
          "ctrl": [
            "/manager/report/ctrl/resource.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "task",
        "moduleId": "manager-report",
        "icon": null,
        "label": "Tareas Programadas",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "manager-report#task",
          "title": "Page: /view/task.html",
          "version": "1.0.0",
          "view": "/manager/report/view/task.html",
          "ctrl": [
            "/manager/report/ctrl/task.js",
            "/manager/report/ctrl/notification.js",
            "/manager/report/ctrl/mail.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "print",
        "moduleId": "manager-report",
        "icon": null,
        "label": "Impresiones",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "manager-report#print",
          "title": "Page: /view/print.html",
          "version": "1.0.0",
          "view": "/manager/report/view/print.html",
          "ctrl": [
            "/manager/report/ctrl/print.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      }
    ],
    "content": null
  },
  {
    "viewId": null,
    "moduleId": "BPM",
    "icon": null,
    "label": "Flujos de Trabajo - Operaciones",
    "action": null,
    "state": null,
    "type": "GROUP",
    "color": "#FFB752",
    "children": [
      {
        "viewId": "0",
        "moduleId": "BPM",
        "icon": null,
        "label": "Procesos Instanciados",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "BPM#0",
          "title": "Page: /view/ProcessInstance.html",
          "version": "1.0.0",
          "view": "/bpm/view/ProcessInstance.html",
          "ctrl": [
            "/bpm/ctrl/ProcessInstance.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "1",
        "moduleId": "BPM",
        "icon": null,
        "label": "Procesos Definidos",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "BPM#1",
          "title": "Page: /view/ProcessDefinition.html",
          "version": "1.0.0",
          "view": "/bpm/view/ProcessDefinition.html",
          "ctrl": [
            "/bpm/ctrl/ProcessDefinition.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "2",
        "moduleId": "BPM",
        "icon": null,
        "label": "Bandeja de Entrada",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "BPM#2",
          "title": "Page: /view/Inbox.html",
          "version": "1.0.0",
          "view": "/bpm/view/Inbox.html",
          "ctrl": [
            "/bpm/ctrl/Inbox.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      },
      {
        "viewId": "3",
        "moduleId": "BPM",
        "icon": null,
        "label": "Reportes Históricos",
        "action": null,
        "state": null,
        "type": "LINK",
        "children": [],
        "content": {
          "id": "BPM#3",
          "title": "Page: /view/HistoricInstance.html",
          "version": "1.0.0",
          "view": "/bpm/view/HistoricInstance.html",
          "ctrl": [
            "/bpm/ctrl/HistoricInstance.js"
          ],
          "icon": null,
          "mode": "CONTENT"
        }
      }
    ],
    "content": null
  },
  {
    "viewId": null,
    "moduleId": null,
    "icon": null,
    "label": "Opciones",
    "action": null,
    "state": null,
    "type": "GROUP",
    "color": "#FFB752",
    "children": [
      {
        "viewId": null,
        "moduleId": null,
        "icon": null,
        "label": "Salir",
        "action": "alert('Cris'); logout_click();",
        "state": null,
        "type": "EVENT",
        "children": [],
        "content": null
      }
    ],
    "content": null
  }
];
$scope.session = {
	userName: 'pepito Perez',
	photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhURExATFRUVFRMVFhIWFhUVFxYQFhgYGBUWFhgYHSggGBslIRYVITMhJTUrLi4uFx8/ODUsOCo5MDcBCgoKDg0OGxAQGyslHyUtLS0tLS8vLSstLS0vLS0tLS4tKy0tMi0rLTctLi0tLy8uKy0tLTUvLTErKy0tKy0tK//AABEIAIAAgAMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgECBAUHAwj/xAA+EAABAwICBQoEAwYHAAAAAAABAAIDBBEhMQUGEkFRBxMiMkJhcXKBsZGhwtEzUrIjJFOCksEUFRZDYmPh/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAMEAQIFBv/EADARAAICAQIEAwcEAwEAAAAAAAABAgMRBDEFEiFBMlFxEyJCYYGRobHB0fAj4fEU/9oADAMBAAIRAxEAPwDuKAIAgCAICBa5cpMNK4wwNE0wuHG/7NjuBI6x7h8VpKeNiSMM7nMNKa8aQnJ2qp7QezGebAHDo2J9bqJybJFFI0U1U9+L3uceLnE+6wZKw1UjMWSPaeLXEeyA3WjdddIQkFtXIR+WQ84PCz729FlSaMOKZ0bVLlTjmc2Kra2J5wErfwyf+QOLPHEeCkjZ5kcq/I6OCpCMqgCAIAgCAIAgCAhHKprO6kpxFE60s9wHDNkY6zhwOIA8TwWk5YRvCOWcIKgJwgCAIAgCA7PyO6yOmidRyOu6EB0ZOZhyLf5SR6OHBTVy7ENi7nR1IRhAEAQBAEAQGNpKtZDE+Z56MbXPdxs0XsO9G8GUsnztrhrI+vn557QwBoYxgJNmAk4k5nE44KvKWWTxjhGjWpsEAQBAEAQG91N06aGqZUFhc3Zc0tB2dpjsLg77EX9FtF4ZrJZWD6J0fWMmiZNGbskaHNPcRfHgVYTyV2sGQgCAIAgCAICM8pRP+W1Nvys+HOMutZ7G0PEfO6rlglOg9R55wHyHmWHEXF3keXd6/BaSsS2NlDzJTTcn1I3rGR573W+TQFH7SRvyIyjqPQ/wj/W/7rHPIcqMWo5PqU9UyM8HX/UCs+0kORGtm5Nh2ak272A+xC29r8jHIetHyexMIMsr5B+UAMB8bEn2WHa+xlQRqOUalaySDZaGt5otDQLABjsAP6ltU+jNbEdU5LHE6Mgv/wBoHgJH2VyGxVn4iWLY0CAIAgCAIDU62UnO0VRGM3QyW8waS35gLEtjMX1ON8nmr/OSGolYdhlubDgQHvN+kL9YC3xIVKyXZFyC7nTFCSBAEAQBAeVRl6oEQPlLp3OZC8NcQ0ybRAJDQdmxJ3KSp7mth1LUak5rR9Mw5801xHe/pn9SvR2KUtzerY1CAIAgCAICyY9E+B9lhvCMrcihaB0QLAYADIAYABcw6AQBAEAQBAeVRl6oEY+wD0SLg4EcQcCFgyTemADGgCw2W2HAWyXUWxznueiyYCAIAgCAIAQgIzW0xY4jduPFc6cHF4L0JKSyY60NwgCAIAgPKoy9UCL9HUZkcABhvPALauDk8GJzUVkmAC6RzwgCAIAgCAIAgMXSUe1Ge7H7/K6iujmDJKniRG1QLoQBAEAQGPOcbLBlEo0NDsxN78fjl8rLoUxxBFK6WZmcpSIIAgCAIAgCAIAQgI1pCm2HEbtx7lzrIcssF6EuZZMZaG4QBAUcbYoBo2lMsgG7MnuW9cOeWDWcuWOSXALolAqgCAIAgCAIAgCAIDwrKcPbY+hWlkFNYZvCbi8kcnhLTY/HcVQlFxfUuRkpLoea1NihQHm1pe6wy4/dZjFyfQxKSisslOj6RsbbNxviXcVfrrUFhFKc3JmUpDQIAgCAIAgCAIDGqq+KP8SVjPM4D3WkrIR8TSJYU2WeCLf0NPV66UbMBIXngxp9zYKvPW0x759C7XwrUz3WPU12jNdmVE3M83sB2DHE3JfwPC4yUdWsVk+XGPIk1XC5UVe0Tzjf0N84A4EXVtrO5yk8EQ1n08yCQRxNDnA9O5NgdzRbtey5uptjCXLHfudvQaKV0HOx4Xb+fQs1c002oeY5Ghrz1ACdl1s249rf3pprI2S5Zb9hr9HKiCnB5Xf5fP0JMG2wtbuXRSxscZvJpazXtsE3M83zjW4PcDYh+8Dcbb+9VbNaq58uMo6mn4VK6rnbw3t6G2o9eKJ+BkMZ4PafcXCkhrapd8epDZwrUw2WfQ3VJpGGX8OaN/lc0/IFWI2Rl4WmU502V+OLX0MpbkQQBAEBGtZdb4qYmNo25d47LfMePd7KnqNZGr3Y9WdTRcMneueXSP5foQXSus1RMOlM4A9ll2jwwz9brl2am2e7O9ToaKtor1fU1AILTcm6gLZbAG3zT1DLRa+BIxwIzBvgR3om11QaysMmE+u37sAD+9G7Dhg23+94EEWHG/BdR6xeyyvF/ep56PCX/wChxfg3/wBGi0LXRwytleC/rXOZ2ndrHM/dUaLVCzml1Otq9PK2l1weNvx2GmK+OaV0zAWdWxGDtpvbwyP2Wb7VOznj0Gk08qqVVZ13/PY3p10DqbZuBVE7BwwAtjOO6278yuvWL2Wfi/vU5K4S1qcfBv8A6/vYhpjZffn/AHXLyz0OOgnhbfArOQkWuFgDcoYNvorWmph6s7nAdl/Tb4Y5ellPDU2w2ZUu0NFviivVdCf6r65RVREbxzcu4dl3lJ393uunp9XGz3X0Zwdbw2dC549Y/lepKFcOYa3WHSHMU75B1gLN87jYH0vf0UOos9nW5FrR0e2ujB7d/Q41VNJcSTcnEniSvPZ8z2awlhFJITYYhBkMhOycQgyIITfNNw2W81jnvQzkrNDjuyCbGEzZaEpInSsE7gGEHfYF1sATuCm08YOxc+xV1tlsam6V1/YppqkibK8QOBYAN9wHWxAO8JqIwVj5Nho7LZVJ2r3jXQw47slDuWmynNY570M5LpoTfNNjCYfD0RiEGTxMFgSsmGW0wIcCDYjEHKxCznyDw1hnbdWtI/4imjlPWIs7ztNifW1/Vd/T2e0rUjxuso9jdKC27ehHeU6pIiiiHaeXHwaLfV8lU4jL3VE6PBIZnKfksff/AIc5lYb5Fck9Gir2GwwKANYdk4FAUhYb5FGCmyb5b0BWVhvkUQM7ROi3TvbEDs3BJcRfADGw3lS0VO2fKVtVqVp63NrI0rox0D3RE7VgCHAWwIwuNxS6p1z5RpdStRWrEsGDCw3yKiZZKbJvlvQFZmG+RRAq5h2RgUBbzZ2TgUMMx42m+S2MHS+SupJimiPZeHAdzhb6Pmupw+XuuJ57jUMTjPzWPt/0w+U+X9tC3gwn4u/8UXEX78fQs8EX+Ob+f7EKmkN81zjtIq+U2GKAMkOycUGCkMhvmmwZbzhvnvQF00hvmm4Rk0Qme5jYdrb7OzgRhib7gt61NyxDchvlVGDduOXvkVoma57Zdrb7W1iTcYG+9LFNSxPcUSqlBOrHL2wY0MhvmtNiZlvOG+e9AXTSG+abhIq+Q7IxQxgoyQ7JxQYMaN5usmCcclUv7aZvFgPwcB9S6HD377XyONxpf44v5/sTXS+r0FS4PkadoDZDgSMAScst5V+7TV2vMjkabXXadcsH09DR1fJ9E7Fkzm+Zod7WVSXDo9pMvw43NeKKf4/k11VqBNYBksRtx2m3+AKilw6fZosw41V8UX+Ga+XUysaCBE1/le36rKJ6G5dvyWI8V00u7X0ML/TlWw3NK/0G1+m6jemtXwsmWu00tpr9DCdouoBxpZRjvjcP7LR02LeL+xKtRS9pr7o8qmF4OMTh6H7LTlfkSKcfNfc9aHSToHNkY0XAIIORBzBW9Vkq5cyItRp4XwcJbFa7SL53Oke0bRsABkAMgEtslZLmYo08KIKEdjypqaQnCFx/lP2WvJLyZK5wW8l9z2ZompJwpZjj/Dd9lsqbHtF/YjeppW8190Zh1arHm4pX+tm/qst1pbn8LInr9NHea/Uzo9SqtwAMbG+Z7fpupFobn2x9SCXFtMtm39P5M+m5P5bEPljF/wAoLvcBSx4dPvJFeXGq/hi/0Myl5OYRi+Z7vKGt97qaPDoreTK0+NWPwxS/Jv8AQ2rdPTOL4mnaI2S4uJ6JINrZbgrVWmhU8xKGo112oXLN9PQ//9k=',
	appName: 'CAJAS',
	logo: 'images/minlogo.png',
	title: 'BUSA SA'
};
});