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

  myApp.factory('dashboard', function() {
    return {
      selected_item: null
    }
  });

  myApp.directive('dashboardTable', ['dashboard', function(dashboard) {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_table',
      controller: ['$http', function($http) {
        var table = this;

        table.items = [];
        table.page = 0;
        table.items_per_page = 5;
        table.selected_item = null;

        $http.get('data/table.json').success(function(data) {
          table.items = data;
        });

        table.pager = function(value, index, array) {
          return index % table.items_per_page === 0;
        };
        table.isPage = function(page) {
            return table.page === page;
        };
        table.isFirstPage = function() {
            return table.isPage(0);
        };
        table.isLastPage = function(selectedItems) {
            return table.isPage(parseInt(selectedItems.length / table.items_per_page));
        };
        table.prevPage = function() {
            table.page--;
        };
        table.nextPage = function() {
            table.page++;
        };
        table.isSelectedItem = function(item) {
            console.log(dashboard);
            return dashboard.selected_item === item;
        };
        table.setSelectedItem = function(item) {
            dashboard.selected_item = item;
        };
      }],
      controllerAs: 'table'
    };
  }]);

  myApp.directive('dashboardDetails', ['dashboard', function(dashboard) {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_details',
      controller: ['$http', function($http) {
        var details = this;

        details.getSelectedItem = function() {
            return dashboard.selected_item;
        };
      }],
      controllerAs: 'detailsCtrl'
    };
  }]);
})();
