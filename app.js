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
        .when('/deductorama', {
            templateUrl: 'pages/deductorama.html'
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

app.controller('DeductoramaCtrl', function ($scope) {

    var counter;
    var colorCycler = function($index, array) {
        var availableColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
        //start colorCycler from red if clicking on new circle
        if(!array[$index]) {
            counter = 0;
        }

        //cycle through colors when hitting end of availableColors array
        counter = counter || 0;
        if(counter === availableColors.length) {
            counter = 0;
        }

        //push colors into colorsArray to be rendered in working column
        array[$index] = availableColors[counter];
        counter++;
    }

    var verify = function(array) {
        //make sure all circles are colored
        if(_.includes(array, null)) {
            $scope.notAllFilledOut = true;
            return;
        }
    }

    var evaluate = function(array) {
        var rightSpot = 0;
        var rightColor = 0;
        var tempColors = _.clone($scope.colorsArray);
        var tempAnswers = _.clone($scope.answersArray);
        var colorCount = {};
        var answerCount = {};

        //if correct color is in correct spot, increase counter, else store in objs
        _.forEach(tempColors, function(element, index) {
            if(element === tempAnswers[index]) {
                rightSpot++;
            } else {
                colorCount[element] = (colorCount[element] + 1) || 1;
                answerCount[tempAnswers[index]] = (answerCount[tempAnswers[index]] + 1) || 1;
            }
        });

        //compare objs to find amount of correct colors in wrong spot
        _.forOwn(answerCount, function(value, key) {
            if(_.has(colorCount, key.toString())) {
                if(colorCount[key] <= answerCount[key]) {
                    rightColor += colorCount[key];
                } else {
                    rightColor += (answerCount[key] - colorCount[key]);
                }
            }
        })
    }

    function sendHints(rightColor, rightSpot) {
        //push correct amount of black/gray/white pegs to pegsArray to be rendered
        for(var a = 0; a < rightColor; a++) {
            $scope.currentPegs.push('gray');
            console.log('gray');
        };

        for(var b = 0; b < rightSpot; b++) {
            $scope.currentPegs.push('black');
            console.log('black');
        };
    };

    $scope.setPattern = function(){
        //set answer by calling colorCycler randNum times on each circle
        $scope.rows.forEach(function(e) {
            var randomNum = Math.floor((Math.random() * 6) + 1);
            for(var x = randomNum; x <= 6; x++) {
                $scope.colorCycler(e, $scope.answersArray);
            }
        });
        console.log('If you know enough to look here, you earned the answer:', $scope.answersArray);
    }();
});





