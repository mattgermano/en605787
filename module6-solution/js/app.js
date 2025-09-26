(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope) {
    $scope.dishes = "";
    $scope.message = "";
    $scope.messageClass = "";

    $scope.checkDishes = function () {
      let allDishes = $scope.dishes
        .split(",")
        .map((dish) => dish.trim())
        .filter((dish) => dish.length);

      if ($scope.dishes === "" || allDishes.length === 0) {
        $scope.message = "Please enter data first";
        $scope.messageClass = "no-data";
      } else if (allDishes.length <= 3) {
        $scope.message = "Enjoy!";
        $scope.messageClass = "enjoy";
      } else {
        $scope.message = "Too much!";
        $scope.messageClass = "too-much";
      }
    };
  }
})();
