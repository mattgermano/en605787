(function () {
  "use strict";

  angular
    .module("MenuApp")
    .controller("ItemsListController", ItemsListController);

  ItemsListController.$inject = ["items"];
  function ItemsListController(items) {
    var itemsList = this;
    itemsList.category = items.category;
    itemsList.items = items.menu_items;
  }
})();
