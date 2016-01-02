(function() {
  var myApp = angular.module('dashboardApp', ['ngAnimate', 'bw.paging']);

  myApp.directive('dashboardContent', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_content',
      scope: {},
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

  myApp.directive('dashboardTable', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/dashboard_table',
      scope: {
          selectedItem: '='
      },
      controller: ['$scope', '$http', function($scope, $http) {
        var table = this;

        table.page = 0;
        table.items_per_page = 5;

        $scope.items = [];
        $scope.showPrevNext = true;
        $scope.showFirstLast = true;

        $http.get('data/table.json').success(function(data) {
          $scope.items = data;
        });

        $scope.isSelectedItem = function(item) {
            return $scope.selectedItem === item;
        };
        $scope.setItem = function(item) {
            if ($scope.selectedItem === item) {
                $scope.selectedItem = null;
            } else {
                $scope.selectedItem = item;
            }
        };
      }],
      controllerAs: 'tableCtrl'
    };
  });

  myApp.directive('dashboardDetails', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/dashboard_details.html',
      scope: {
          item: '=',
          orderConfirmed: '='
      },
      controller: ['$http', function($http) {
      }],
      controllerAs: 'detailsCtrl'
    };
  });

  myApp.directive('dashboardPrecheck', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/dashboard_precheck',
      scope: {
          orderConfirmed: '=',
          precheckConfirmed: '=',
      },
      controller: function() {
      },
      controllerAs: 'precheckCtrl'
    };
  });

  myApp.directive('dashboardConfiguration', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/dashboard_configuration.html',
      scope: {
          precheckConfirmed: '=',
          configurationConfirmed: '=',
      }
    }
  });

  myApp.directive('dashboardPostcheck', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/dashboard_postcheck.html',
      scope: {
          configurationConfirmed: '=',
      }
    }
  });
})();
