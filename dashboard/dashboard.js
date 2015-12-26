(function() {
  var myApp = angular.module('dashboardApp', []);

  myApp.directive('dashboardContent', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_content'
    };
  });

  myApp.directive('dashboardNavi', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_navi'
    };
  });

  myApp.directive('dashboardSidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_sidebar'
    };
  });

  myApp.directive('dashboardGraphs', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_graphs',
      controller: ['$http', function($http) {
        var graphs = this;

        graphs.graphs = [];

        $http.get('data/graphs.json').success(function(data) {
          graphs.graphs = data;
        });
      }],
      controllerAs: 'graphs'
    };
  });

  myApp.directive('dashboardTable', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_table',
      controller: ['$http', function($http) {
        var table = this;

        table.items = [];

        $http.get('data/table.json').success(function(data) {
          table.items = data;
        });
      }],
      controllerAs: 'table'
    };
  });
})();
