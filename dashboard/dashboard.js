(function() {
  var myApp = angular.module('dashboardApp', []);

  myApp.directive('dashboardContent', function() {
    return {
      restrict: 'E',
      templateUrl: 'dashboard_content'
    };
  });

  myApp.directive('dashboardNavi', function() {
    return {
      restrict: 'E',
      templateUrl: 'dashboard_navi'
    };
  });

  myApp.directive('dashboardSidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'dashboard_sidebar'
    };
  });

  myApp.directive('dashboardGraphs', function() {
    return {
      restrict: 'E',
      templateUrl: 'dashboard_graphs',
      controller: function() {
        this.graphs = [
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
      },
      controllerAs: 'graphs'
    };
  });

  myApp.directive('dashboardTable', function() {
    return {
      restrict: 'E',
      templateUrl: 'dashboard_table',
      controller: function() {
        this.items = [{
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
          }];
      },
      controllerAs: 'table'
    };
  });
})();
