app.controller('ChartCtrl', function ($scope) {

    $scope.calc = function(amount) {
        var year = $scope.year.toString() || null;
        
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