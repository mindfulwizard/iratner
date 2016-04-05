var counter;
app.controller('DeductoramaCtrl', function ($scope) {
    $scope.submissions = 12;
    $scope.rows = [0,1,2,3];
    $scope.guesses = [];
    $scope.answersArray = [null, null, null, null];
    $scope.colorsArray = [null, null, null, null];
    $scope.pegsArray = [];
    $scope.currentPegs = [];
    $scope.loser = false;
    $scope.winner = false;
    $scope.canClick = true;

    $scope.colorCycler = function($index, array) {
        if(!$scope.canClick) {
            return;
        };

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
    };

    $scope.verify = function(array) {
        //make sure all circles are colored
        if(_.includes(array, null)) {
            $scope.notAllFilledOut = true;
            return;
        }

        $scope.notAllFilledOut = false;
        $scope.submissions--;
        $scope.evalGuess(array);
    };

    $scope.evalGuess = function(array) {
        //compare colorsObj to answersObj
        if(_.isEqual(array, $scope.answersArray)) {
            $scope.winner = true;
            $scope.canClick = false;
            return;
        }

        if(!$scope.submissions) {
            $scope.loser = true;
            $scope.canClick = false;
            return;
        }

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

        sendHints(rightColor, rightSpot);

        //push colorsArray into guesses to be rendered by previous columns
        $scope.guesses.push(array);
        $scope.pegsArray.push($scope.currentPegs);

        //reset arrays to be used in working column
        $scope.colorsArray = [null, null, null, null];
        $scope.currentPegs = [];
    };

    function sendHints(rightColor, rightSpot) {
        //push correct amount of black/gray/white pegs to pegsArray to be rendered
        for(var a = 0; a < rightColor; a++) {
            $scope.currentPegs.push('gray');
        };

        for(var b = 0; b < rightSpot; b++) {
            $scope.currentPegs.push('black');
        };
    };

    $scope.revealAnswer = function() {
        $scope.notAllFilledOut = false;
        $scope.colorsArray = _.clone($scope.answersArray);
        $scope.canClick = false;
        $scope.loser = true;
    };

    $scope.playAgain = function() {
        window.location.reload();
    }

    $scope.setPattern = function(){
        //set answer by calling colorCycler randNum times on each circle
        $scope.rows.forEach(function(e) {
            var randomNum = Math.floor((Math.random() * 6) + 1);
            for(var x = randomNum; x <= 6; x++) {
                $scope.colorCycler(e, $scope.answersArray);
            }
        });
        //console.log('answer:', $scope.answersArray);
    }();
});
