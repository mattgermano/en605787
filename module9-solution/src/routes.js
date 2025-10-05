(function () {
  "use strict";

  angular.module("MenuApp").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "src/menuapp/templates/home-view.template.html",
      })
      .state("categories", {
        url: "/categories",
        templateUrl: "src/menuapp/templates/categories-view.template.html",
        controller: "CategoriesListController as categoriesList",
        resolve: {
          categories: [
            "MenuDataService",
            function (MenuDataService) {
              return MenuDataService.getAllCategories().then(function (items) {
                return items.data;
              });
            },
          ],
        },
      })
      .state("items", {
        url: "/items/{categoryShortName}",
        templateUrl: "src/menuapp/templates/items-view.template.html",
        controller: "ItemsListController as itemsList",
        resolve: {
          items: [
            "$stateParams",
            "MenuDataService",
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory(
                $stateParams.categoryShortName
              ).then(function (items) {
                return items.data;
              });
            },
          ],
        },
      });
  }
})();
