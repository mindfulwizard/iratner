var app = angular.module('iratner', ['ngRoute', 'ng-fusioncharts']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html'
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
        .when('/taxpie', {
            templateUrl: 'pages/taxpie.html'
        })
        .when('/deductorama', {
            templateUrl: 'pages/deductorama.html'
        })
        .when('/weasel', {
            templateUrl: 'pages/weasel.html'
        })        
        .otherwise({
            redirectTo: '/'
        });
});