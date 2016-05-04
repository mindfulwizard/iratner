app.controller('DeductoramaCtrl', function ($scope, $route) {

    var evaluate = function(guesses, answers) {
        var rightSpot = 0;
        var rightColor = 0;
        var guessCount = {};
        var answerCount = {};

        //if correct color is in correct spot, increase counter, else store in objs
        _.forEach(guesses, function(element, index) {
            if(element === answers[index]) {
                rightSpot++;
            } else {
                guessCount[element] = (guessCount[element] + 1) || 1;
                answerCount[answers[index]] = (answerCount[answers[index]] + 1) || 1;
            }
        });

        //compare objs to find amount of correct colors in wrong spot
        for (var key in answerCount) {
            if (answerCount.hasOwnProperty(key)) {
                if(guessCount[key] >= answerCount[key]) {
                    rightColor += answerCount[key];
                } else if(guessCount[key] < answerCount[key]) {
                    rightColor += guessCount[key];
                }
            }
        }
        return [rightColor, rightSpot];
    }

    var sendHints = function(rightColor, rightSpot) {
        //push correct amount of black/gray/white pegs to pegsArray to be rendered
        for(var a = 0; a < rightColor; a++) {
            $scope.currentPegs.push('gray');
        };

        for(var b = 0; b < rightSpot; b++) {
            $scope.currentPegs.push('black');
        };
    }

    $scope.pegsArray = [];
    $scope.currentPegs = [];
    $scope.guesses = [];
    $scope.answersArray = _.fill(Array(4), null);
    $scope.colorsArray = _.fill(Array(4), null);
    $scope.rows = [0,1,2,3];
    $scope.submissions = 12;
    var counter;

    $scope.colorCycler = function($index, array) {
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
            return false;
        }
        return true;
    }

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

    $scope.submit = function(guess) {
        if(!verify(guess)) {
            $scope.notAllFilledOut = true;
            return;
        }
        $scope.notAllFilledOut = false;
        //check if win
        if(_.isEqual(guess, $scope.answersArray)) {
            $scope.winner = true;
            $scope.colorCycler = null;
            $scope.won = 'black';
            return;
        }
        //check if lose
        if(!$scope.submissions) {
            $scope.loser = true;
            $scope.colorCycler = null;
            $scope.submissions--;
            return;
        }

        //return hints
        var results = evaluate(guess, $scope.answersArray);
        sendHints(results[0], results[1]);
        
        //push colorsArray into guesses to be rendered by previous columns
        $scope.guesses.push(guess);
        $scope.pegsArray.push($scope.currentPegs);

        //reset arrays to be used in working column
        $scope.colorsArray = _.fill(Array(4), null);
        $scope.currentPegs = [];
        $scope.submissions--;
    }

    $scope.revealAnswer = function() {
        $scope.loser = true;
        $scope.peeked = true;
        $scope.colorsArray = _.clone($scope.answersArray);
        $scope.colorCycler = null;
    };

    $scope.playAgain = function() {
        $route.reload();
    }
});