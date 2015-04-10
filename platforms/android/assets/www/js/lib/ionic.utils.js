angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      if($window.localStorage[key])
        return $window.localStorage[key] || defaultValue;
      return [] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])
.filter('fromNow', function() {
	return function(date) {
    	return moment(date).fromNow();
  	}
})
.filter('formatDate', function() {
	return function(date) {
    	return moment(date).format('YYYY-MM-DD');
  	}
})
.filter('dayString', function() {
	return function(date) {
      return moment(date, "YYYY-MM-DD").format('ddd Do MMM');
  	}
})
.filter('formatTime', function() {
	return function(date) {
    	return moment(date).format('hh:mm A');
  	}
})
.filter('formatDateTime', function() {
	return function(date) {
    	return moment(date).format('YYYY-MM-DD hh:mm A');
  	}
});
