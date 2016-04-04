var app = angular.module('iratner', ['ngRoute', 'ng-fusioncharts']);

app.config(function($routeProvider) {
    //$locationProvider.html5Mode(true);
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
        .when('/taxpie', {
            templateUrl: 'pages/taxpie.html'
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
    if($location.$$url === '/projects' || $location.$$url === '/taxpie') {
        $scope.tab = 4;
    }

    $scope.setTab = function(newTab) {
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
      return $scope.tab === tabNum;
    };
});

app.controller('ChartCtrl', function ($scope) {
    var taxinfo = {
        '2010': {
            'defense': .21,
            'education': .02,
            'healthcare': .26,
            'agriculture': .04,
            'socialSecurity': .22,
            'veterans': .04
        },
        '2011': {
            'defense': .24,
            'education': .01,
            'healthcare': .25,
            'agriculture': .04,
            'socialSecurity': .22,
            'veterans': .04
        },
        '2012': {
            'defense': .20,
            'education': .02,
            'healthcare': .25,
            'agriculture': .04,
            'socialSecurity': .23,
            'veterans': .04
        },
        '2013': {
            'defense': .19,
            'education': .01,
            'healthcare': .25,
            'agriculture': .12,
            'socialSecurity': .25,
            'veterans': .04
        },
        '2014': {
            'defense': .18,
            'education': .02,
            'healthcare': .27,
            'agriculture': .05,
            'socialSecurity': .25,
            'veterans': .05
        },
        '2015': {
            'defense': .16,
            'education': .02,
            'healthcare': .28,
            'agriculture': .04,
            'socialSecurity': .25,
            'veterans': .04
        },
    }

    $scope.calc = function(amount) {
        var year = $scope.year.toString();
        
        FusionCharts.ready(function () {
            var myChart = new FusionCharts({
                type: 'pie3d',
                renderAt: 'chart-container',
                dataFormat: 'json',
                width: '100%',
                height: '100%',
                dataSource: {
                    'chart': {
                        // 'caption': 'How Your Federal Tax Dollars Were Spent',
                        // 'captionFontSize': '36',
                        'manageResize': '1',
                        'decimals': '2',
                        'formatNumber': '1',
                        'formatNumberScale': '0',
                        'forceDecimals': '1',
                        'numberPrefix': '$',
                        'baseFont': 'Arvo',
                        'baseFontSize': '1rem'
                    },
                    'data': [{
                        'label': 'Defense',
                        'value': amount * taxinfo[year].defense,
                            }, {
                        'label': 'Education',
                        'value': amount * taxinfo[year].education,
                            }, {
                        'label': 'Healthcare',
                        'value': amount * taxinfo[year].healthcare,
                            }, {
                        'label': 'Food and Agriculture',
                        'value': amount * taxinfo[year].agriculture,
                            }, {
                        'label': 'Veterans',
                        'value': amount * taxinfo[year].veterans,
                            }, {        
                        'label': 'Social Security',
                        'value': amount * taxinfo[year].socialSecurity,
                            }, {
                        'label': 'Other',
                        'value': amount * (1 - taxinfo[year].defense - taxinfo[year].education - taxinfo[year].healthcare - taxinfo[year].agriculture - taxinfo[year].veterans - taxinfo[year].socialSecurity),
                    }]
                }
            });
            if(!isNaN($scope.amount)) {
                myChart.render();
                $scope.$apply(function() {
                    $scope.rendered = true;
                });
            var tags = document.getElementsByTagName('tspan');
            tags = Array.prototype.slice.call(tags);
            tags[tags.length-1].innerHTML = '';
            }
        });

    }
});
