(function () {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService)
    .filter("angularPrice", AngularPriceFilter);

  function AngularPriceFilter() {
    return function (input) {
      input = input || 0;
      return "$$$" + input.toFixed(2);
    };
  }

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
    toBuyList.buy = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtList = this;

    alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
    alreadyBoughtList.getTotalItemPrice = function (item) {
      return ShoppingListCheckOffService.getTotalItemPrice(item);
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuy = [
      {
        name: "cookies",
        quantity: 10,
        pricePerItem: 2.0,
      },
      {
        name: "chips",
        quantity: 3,
        pricePerItem: 3.5,
      },
      {
        name: "soda",
        quantity: 5,
        pricePerItem: 5.0,
      },
      {
        name: "ice cream",
        quantity: 2,
        pricePerItem: 5.5,
      },
      {
        name: "tortillas",
        quantity: 1,
        pricePerItem: 3.0,
      },
      {
        name: "apples",
        quantity: 3,
        pricePerItem: 0.5,
      },
      {
        name: "oranges",
        quantity: 7,
        pricePerItem: 0.5,
      },
      {
        name: "bananas",
        quantity: 4,
        pricePerItem: 1.0,
      },
    ];

    var bought = [];

    service.getToBuyItems = function () {
      return toBuy;
    };

    service.getBoughtItems = function () {
      return bought;
    };

    service.buyItem = function (itemIndex) {
      bought.push(...toBuy.splice(itemIndex, 1));
    };

    service.getTotalItemPrice = function (item) {
      return item.quantity * item.pricePerItem;
    };
  }
})();
