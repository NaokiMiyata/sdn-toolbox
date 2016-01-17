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
          selectedItems: '='
      },
      controller: ['$scope', '$http', function($scope, $http) {
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.items = [];
        $scope.showPrevNext = true;
        $scope.showFirstLast = true;

        $http.get('data/table.json').success(function(data) {
          $scope.items = data;
        });

        $scope.inArray = function(item) {
            for (var i = 0; i < $scope.selectedItems.length; i++){
                if ($scope.selectedItems[i].number === item.number) {
                    return i;
                }
            }
            return -1;
        };
                   

        $scope.isSelectedItem = function(item) {
            return $scope.inArray(item) >= 0;
        };

        $scope.setItem = function(item) {
            var index = $scope.inArray(item);
            if (index >= 0) {
                $scope.selectedItems.splice(index, 1);
            } else {
                $scope.selectedItems.push(item);
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

  myApp.directive('dashboardList', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/dashboard_list.html',
      scope: {
        items: '=',
        orderConfirmed: '='
      }
    };
  });

  myApp.directive('dashboardPrecheck', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/dashboard_precheck',
      scope: {
          showFlag: '=',
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
          showFlag: '=',
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
          showFlag: '=',
          configurationConfirmed: '=',
      }
    }
  });
})();
