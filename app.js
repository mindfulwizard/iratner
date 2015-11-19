var app = angular.module('iratner', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'MainCtrl'
        })
        .when('/about', {
            templateUrl: 'pages/about.html'
        })
        .when('/articles', {
            templateUrl: 'pages/articles.html'
        })
        .when('/projects', {
            templateUrl: 'pages/projects.html'
        })
        .otherwise({
            templateUrl: 'pages/home.html'
        });
    });

app.controller('MainCtrl', function ($scope, $location) {
    if($location.$$url === '/' || !$location.$$url) {
        $scope.tab = 1
    }
    if($location.$$url === '/about') {
        $scope.tab = 2;
    }
    if($location.$$url === '/articles') {
        $scope.tab = 3;
    }
    if($location.$$url === '/projects') {
        $scope.tab = 4;
    }

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
	};

});
