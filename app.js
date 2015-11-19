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

app.controller('MainCtrl', function ($scope) {

    $scope.tab = 1;
    //http://stackoverflow.com/questions/16384134/how-to-call-a-function-in-angularjs-when-route-matches

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
	};

});
