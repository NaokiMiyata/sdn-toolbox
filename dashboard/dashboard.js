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
        $scope.currentPage = 1;
        $scope.pageSize = 5;
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

  myApp.directive('dashboardNtm', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/dashboard_ntm.html',
        controller: function($scope) {
          var ntm = this;
          var tooltip = d3.select("body").select("#tooltip")

          var width = 960,
              height = 1920,
              cellSize = 12; // cell size

          var percent = d3.format(".1%");

          var color = d3.scale.quantize()
	      .domain([-.05, .05])
	      .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

          var svg = d3.select("#svg").selectAll("svg")
	      .data(d3.range(2010, 2011))
	      .enter().append("svg")
	      .attr("width", width)
	      .attr("height", height)
	      .attr("class", "RdYlGn")
	      .append("g")
              .attr("transform", "translate(" + cellSize + "," + cellSize + ")");

          svg.append("text")
              .attr("transform", "translate(" + cellSize * 4 + ", 0)")
              .style("text-anchor", "middle")
	      .text("front(out)");

	  var position = {
	  };

          var line = svg.selectAll(".cx")
              .data(d3.range(0, 12 * 90))
              .enter().append("path")
              .attr("class", "cx")
              .attr("d", function(d) { 
                  return "M" + ((11-d%12) + 0.5)*cellSize + "," + (1+parseInt(d/12)+0.5)*cellSize + 
		     "L" + ((11-d%12)+16+.5)*cellSize + "," + (1+parseInt(d/12)+.5)*cellSize;
              });

          var front_rect = svg.selectAll(".front_port")
	      .data(d3.range(0, 12 * 90))
              .enter().append("rect")
              .attr("class", "port front_port")
              .attr("width", cellSize)
              .attr("height", cellSize)
              .attr("x", function(d) { return (d % 12) * cellSize; })
              .attr("y", function(d) { return (1 + parseInt(d / 12)) * cellSize; })
              .on("click", function(d) {  
                  console.log(d); 
                  console.log('fiber number is ' + ((90-(1+parseInt(d/12)))*12+d%12));
                  console.log('x is ' + d%12);
                  console.log('y is ' + (90-(1+parseInt(d/12))));
              })
              .on("mouseover", function(d){
                return tooltip.style("visibility", "visible")
                  .text('fiber number is ' + ((90-(1+parseInt(d/12)))*12+d%12) +
                        '(' + (d%12)+ ',' + (90-(1 + parseInt(d/12))) + ')');
              })
              .on("mousemove", function(d){
                return tooltip.style("top", (event.pageY-40)+"px")
                              .style("left",(event.pageX-200)+"px");})
              .on("mouseout", function(d){
                return tooltip.style("visibility", "hidden");})

          front_rect.append('title')
              .text(function(d){
              });;

          svg.append("text")
              .attr("transform", "translate(" + cellSize * (4 + 16) + ",0)")
              .style("text-anchor", "middle")
	      .text("rear(in)");

          var rear_rect = svg.selectAll(".rear_port")
	      .data(d3.range(0, 90 * 12))
              .enter().append("rect")
              .attr("class", "port rear_port")
              .attr("width", cellSize)
              .attr("height", cellSize)
              .attr("x", function(d) { return (d % 12 + 16) * cellSize; })
              .attr("y", function(d) { return (1 +  parseInt(d / 12)) * cellSize; })
              .on("click", function(d) {
                  console.log(d); 
                  console.log('x is ' + d%12);
                  console.log('y is ' + (90-(1+parseInt(d/12))));
              })
              .on("mouseover", function(d){
                return tooltip.style("visibility", "visible")
                  .text('fiber number is ' + ((90-(1+parseInt(d/12)))*12+d%12) +
                        '(' + (d%12)+ ',' + (90-(1 + parseInt(d/12))) + ')');
              })
              .on("mousemove", function(d){
                return tooltip.style("top", (event.pageY-40)+"px")
                              .style("left",(event.pageX-200)+"px");})
              .on("mouseout", function(d){
                return tooltip.style("visibility", "hidden");})

          d3.select(self.frameElement).style("height", "2910px");

          $scope.numericalPosition = function() {
            svg.selectAll(".rear_port")
              .data(d3.range(0, 90 * 12))
              .transition().duration(1000)
              .attr("x", function(d) { return 20 * cellSize; })
              .attr("y", function(d) {
		      return (90*12-((90-(1+parseInt(d/12)))*12+d%12)) * cellSize;
	      });

            svg.selectAll(".front_port")
              .data(d3.range(0, 90 * 12))
              .transition().duration(1000)
              .attr("x", function(d) { return 4 * cellSize; })
              .attr("y", function(d) {
		      return (90*12-((90-(1+parseInt(d/12)))*12+d%12)) * cellSize;
	      });

            svg.selectAll(".cx")
              .data(d3.range(0, 90 * 12))
              .transition().duration(1000)
              .attr("d", function(d) { 
                  return "M" + (4.5*cellSize) + "," + (1+d+0.5)*cellSize +
		     "L" + (20.5)*cellSize + "," + (1+d+.5)*cellSize;});
          };

          $scope.physicalPosition = function() {
            svg.selectAll(".cx")
              .data(d3.range(0, 90 * 12))
              .transition().duration(1000)
              .attr("d", function(d) {
                  return "M" + ((11-d%12) + 0.5)*cellSize + "," + (1+parseInt(d/12)+0.5)*cellSize +
		     "L" + ((11-d%12)+16+.5)*cellSize + "," + (1+parseInt(d/12)+.5)*cellSize;
              });

            svg.selectAll(".front_port")
              .data(d3.range(0, 12 * 90))
              .transition().duration(1000)
              .attr("x", function(d) { return (d % 12) * cellSize; })
              .attr("y", function(d) { return (1 + parseInt(d / 12)) * cellSize; });

            svg.selectAll(".rear_port")
	      .data(d3.range(0, 12 * 90))
              .transition().duration(1000)
              .attr("x", function(d) { return (d % 12 + 16) * cellSize; })
              .attr("y", function(d) { return (1 + parseInt(d / 12)) * cellSize; });
          };

        },
        controllerAs: 'ntmCtrl'
    }
  });
})();
