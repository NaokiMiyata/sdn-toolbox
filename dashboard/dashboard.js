(function() {
  var myApp = angular.module('dashboardApp', ['ngAnimate', 'bw.paging']);

  myApp.factory('navigation', function(){
    return {
      selected_navigation: 'one_by_one'
    }
  });

  myApp.directive('dashboardContent', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_content',
      controller: function() {
      },
      controllerAs: 'contentCtrl'
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

  myApp.factory('dashboard', function() {
    return {
      selected_item: null,
    }
  });

  myApp.directive('dashboardTable', ['dashboard', function(dashboard) {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_table',
      controller: ['$scope', '$http', function($scope, $http) {
        var table = this;

        table.items = [];
        table.page = 0;
        table.items_per_page = 5;
        table.selected_item = null;

        $scope.showPrevNext = true;
        $scope.showFirstLast = true;

        $http.get('data/table.json').success(function(data) {
          table.items = data;
        });

        table.isSelectedItem = function(item) {
            return dashboard.selected_item === item;
        };

        table.setSelectedItem = function(item) {
            if (dashboard.selected_item === item) {
                dashboard.selected_item = null;
            } else {
                dashboard.selected_item = item;
            }
        };
      }],
      controllerAs: 'table'
    };
  }]);

  myApp.directive('dashboardDetails', ['dashboard', function(dashboard) {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_details.html',
      controller: ['$http', function($http) {
        var details = this;

        details.dashboard = dashboard;
        details.getSelectedItem = function() {
            return dashboard.selected_item;
        };
      }],
      controllerAs: 'detailsCtrl'
    };
  }]);

  myApp.directive('dashboardPrecheck', ['dashboard', function(dashboard) {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_precheck',
      controller: function() {
      },
      controllerAs: 'precheckCtrl'
    };
  }]);

})();
