angular.module('smokie.controllers', [])
  .controller('AppCtrl', function($scope) {
  
  })
  .controller('HomeCtrl', function($scope, $localstorage, $cordovaSQLite, $filter) {
    $scope.smoke = { drink: false};
    $scope.dayCount = 0;
  
    $scope.allSmokes = [];
    $scope.smokes = [];
    $scope.nextId = 0;
    $scope.chart = [];
  
    $scope.parseSmokes = function () {
      
      $scope.smokes = [];
      $scope.dayCount = 0;
      var today = $filter ('formatDate')(new Date());
      var query = "SELECT drink, timestamp, id FROM smokes WHERE timestamp LIKE ? ORDER BY timestamp DESC";
      $cordovaSQLite.execute(db, query, [today + '%']).then(function(res) {
        if(res.rows.length > 0) {
          for(i=0;i<res.rows.length;i++) {
            var smoke = {};
            smoke.id = res.rows.item(i).id;
            smoke.fullDate = res.rows.item(i).timestamp;
            smoke.drink = (res.rows.item(i).drink === "true"?true:false);
            $scope.smokes.push(smoke);
            $scope.dayCount++;
          }
          console.log($scope.smokes);
        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error(err);
      });

      
      $scope.allSmokes = [];
      
      $scope.dayCount = 0;
      /*
      angular.forEach($scope.allSmokes, function (val, key) {
        if(val.date == $filter('formatDate')(new Date ())) {
          //$scope.chart.push({ value:1, color: #e22b2f });
          $scope.dayCount++;
          $scope.smokes.push(val);
        }
      });*/
    };
  
    $scope.parseSmokes();
  
    $scope.logSmoke = function () {
      
      //console.log($scope.nextId);
      var query = "INSERT INTO smokes (drink) VALUES (?)";
      $cordovaSQLite.execute(db, query, [$scope.smoke.drink]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
      }, function (err) {
        console.error(err);
      });
      
      $scope.smoke.drink = false;
      
      $scope.parseSmokes();
      $scope.checkStats();
    };
  
    $scope.checkStats = function () {
      var query = "SELECT date(timestamp) as day, count(*) as count FROM smokes GROUP BY date(timestamp)";
      $cordovaSQLite.execute(db, query).then(function(res) {
        if(res.rows.length > 0) {
          var group = [];
          for(i=0;i<res.rows.length;i++) {
            var smoke = {};
            smoke.fullDate = res.rows.item(i).day;
            smoke.count = res.rows.item(i).count;
            group.push(smoke);
          }
          console.log(group);
        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error(err);
      });
    };
  })

  .controller('StatsCtrl', function($scope, $cordovaSQLite, $filter) {
    $scope.stats = [];
    $scope.random = parseInt(Math.random() * 100000);
  
    $scope.checkStats = function () {
      
      $scope.stats = [];
      
      var query = "SELECT date(timestamp) as day, count(*) as count FROM smokes GROUP BY date(timestamp)";
      $cordovaSQLite.execute(db, query).then(function(res) {
        if(res.rows.length > 0) {
          for(i=0;i<res.rows.length;i++) {
            var smoke = {};
            smoke.day   = res.rows.item(i).day;
            smoke.count = res.rows.item(i).count;
            $scope.stats.push(smoke);
          }
          console.log($scope.stats);
        } else {
          var noResult = {day: "No data yet.", count: 0};
          $scope.stats.push(noResult);
          console.log("No results found");
        }
      }, function (err) {
        console.error(err);
      });
    };
  
    $scope.checkStats();
  });