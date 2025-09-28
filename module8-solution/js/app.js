(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItems)
    .constant(
      "ApiBasePath",
      "https://coursera-jhu-default-rtdb.firebaseio.com"
    );

  function FoundItems() {
    var ddo = {
      restrict: "E",
      templateUrl: "foundItems.html",
      scope: {
        items: "<",
        onRemove: "&",
      },
    };

    return ddo;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;

    narrowItDown.searchTerm = "";

    narrowItDown.getMatchedMenuItems = function (searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise
        .then(function (foundItems) {
          narrowItDown.found = foundItems;
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    narrowItDown.removeItem = function (itemIndex) {
      narrowItDown.found.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json",
      }).then(function (result) {
        var foundItems = [];

        if (!searchTerm.trim().length) {
          return foundItems;
        }

        for (const category of Object.values(result.data)) {
          for (const menuItem of category.menu_items) {
            if (
              menuItem.description.includes(searchTerm.toLowerCase().trim())
            ) {
              foundItems.push(menuItem);
            }
          }
        }

        return foundItems;
      });
    };
  }
})();
