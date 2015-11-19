var app = angular.module('iratner', ['ngRoute','ngMockE2E']);

app.run(function($httpBackend) {
    $httpBackend.whenGET('/home.html').passThrough();
    $httpBackend.whenGET('/articles.html').passThrough();
    $httpBackend.whenGET('/projects.html').passThrough();
    $httpBackend.whenGET('/about.html').passThrough();
    $httpBackend.whenGET('pages/home.html').passThrough();
    $httpBackend.whenGET('pages/about.html').passThrough();
    $httpBackend.whenGET('pages/articles.html').passThrough();
    $httpBackend.whenGET('pages/projects.html').passThrough();
});

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

	$routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'MainCtrl'
        })
        .when('/index.html', {
            templateUrl: 'pages/home.html',
            controller: 'MainCtrl'
        })
        .when('/about.html', {
            templateUrl: 'pages/about.html'
        })
        .when('/articles.html', {
            templateUrl: 'pages/articles.html'
        })
        .when('/projects.html', {
            templateUrl: 'pages/projects.html'
        });
});

app.controller('MainCtrl', function ($scope, $window) {
    this.goToTemplate = function(template) {
        $window.location.href = '/pages/' + template + '.html';
    };
    $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
	};

});