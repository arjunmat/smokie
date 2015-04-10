// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('smokie', ['ionic', 'ionic.utils', 'ngCordova', 'smokie.controllers'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    //db = $cordovaSQLite.openDB("smokie.db");
    db = window.openDatabase("smokie.db", "1.0", "Cordova Demo", 200000);
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS smokes (id integer primary key, drink boolean DEFAULT false, timestamp DATETIME DEFAULT (datetime('now','localtime')))");
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/app/home')
  
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "views/home.html"
        ,controller: "HomeCtrl"
      }
    }
  })
  
  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "views/about.html"
      }
    }
  })
  
  .state('app.stats', {
    url: "/stats",
    views: {
      'menuContent': {
        templateUrl: "views/stats.html"
        ,controller: "StatsCtrl"
      }
    }
  })
});