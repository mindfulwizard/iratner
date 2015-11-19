var app = angular.module('iratner', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'MainCtrl'
        })
        .when('/about', {
            templateUrl : 'pages/about.html',
            //controller  : 'aboutController'
        })
        .when('/articles', {
            templateUrl : 'pages/articles.html',
            //controller  : 'articlesController'
        })
        .when('/projects', {
            templateUrl : 'pages/projects.html',
            //controller  : 'projectsController'
        });
    });

app.controller('MainCtrl', function ($scope) {

    $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
	};

});

// app.controller('mainCtrl', function($scope) {
//     $scope.message = 'Everyone come and see how good I look!';
// });

// app.controller('aboutController', function($scope) {
//     $scope.message = 'Look! I am an about page.';
// });

// app.controller('contactController', function($scope) {
//     $scope.message = 'Contact us! JK. This is just a demo.';
// });


