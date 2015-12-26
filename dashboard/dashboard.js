(function() {
  var myApp = angular.module('dashboardApp', []);

  myApp.controller('graphCtrl', function($scope) {
    $scope.graphs = [
      {
        'label': 'first',
        'description': '1st desc'
      }, {
        'label': 'second',
        'description': '2nd desc'
      }, {
        'label': 'third',
        'description': '3rd desc'
      }, {
        'label': 'fourth',
        'description': '4th desc'
      }
    ];
  });

  myApp.controller('tableCtrl', function($scope) {
    $scope.items = [
      {
        'number': 1001,
        'first': 'Lorem',
        'second': 'ipsum',
        'third': 'dolor',
        'fourth': 'sit',
      }, {
        'number': 1002,
        'first': 'amet',
        'second': 'consectetur',
        'third': 'adipiscing',
        'fourth': 'elit',
      }, {
        'number': 1003,
        'first': 'Integer',
        'second': 'nec',
        'third': 'odio',
        'fourth': 'Praesent',
      }
    ];
  });
})();
