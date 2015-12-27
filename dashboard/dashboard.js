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
      }],
      controllerAs: 'table'
    };
  });

  myApp.directive('dashboardDetail', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_detail',
      controller: ['$http', function($http) {
      }],
      controllerAs: 'detail'
    };
  });
})();
