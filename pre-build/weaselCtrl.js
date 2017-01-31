app.controller('WeaselCtrl', function ($scope) {
      var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
      
      function randomStr(size) {
        var str = '';
        for(var i = 0; i < size; i++) {
          str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return str;
      }
      
      function randomizeChar(str) {
        return str.split('').map(function(el) {
          if(Math.random() < .05) {
            return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
          }
          return el;
        }).join('');
      }
      
      function highest(prev, curr, ind, arr) {
        return curr > arr[prev] ? ind : prev;
      }

    $scope.weasel = function(input) {
      
      function compare(str) {
        var score = 0;
        for(var j = 0; j < str.length; j++) {
          if(str[j] === input[j]) {
            score ++;
          }
        }
        return score;
      }
          
      $scope.results = [];
      input = input.replace(/[^a-z\s]/gi, '');    
      input = input.toUpperCase();
      var start = randomStr(input.length);
      var startTime = performance.now();  
      var generations = 0;
      
      while(true) {
        var mutations = Array(100).fill(start).map(randomizeChar);
        var best = mutations.map(compare).reduce(highest);
        $scope.results.push(mutations[best]);
        if(compare(mutations[best]) === input.length) {
          var endTime = performance.now();
          break;
        }
        start = mutations[best];
        generations++;
      }

      $scope.final = generations + ' generations (' + Math.round(endTime - startTime) + ' milliseconds)';
    }    

});


