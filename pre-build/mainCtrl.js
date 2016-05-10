app.controller('MainCtrl', function ($scope, $location) {
    if($location.$$url === '/' || !$location.$$url) {
        $scope.tab = 1;
    }
    if($location.$$url === '/about') {
        $scope.tab = 2;
    }
    if($location.$$url === '/articles') {
        $scope.tab = 3;
    }
    if($location.$$url === '/projects' || $location.$$url === '/taxpie' || $location.$$url === '/deductorama') {
        $scope.tab = 4;
    }

    $scope.setTab = function(newTab) {
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
      return $scope.tab === tabNum;
    };

});