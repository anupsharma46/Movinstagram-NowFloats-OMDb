(function(angular) {
  'use strict';
  angular.module('MovinstagramApp', ['angularUtils.directives.dirPagination'])
    .controller('searchMovies', ['$scope', '$http', function($scope, $http) {
        $scope.hasUserSearch = false;
        $scope.wasNetworkError = false;
        $scope.msg = "";
        $scope.fetch = function() {
          if ($scope.searchparam) {
            $http({
              method : 'GET',
              url: 'https://www.omdbapi.com/?s='+$scope.searchparam+'&type=movie&r=json&apikey=32e6b671'
            }).
            then(function(response) {
              $scope.hasUserSearch = true;
              $scope.movieDetails = undefined;
              if (response.data.Search && response.data.Search.length) {
                var theSrchResults = response.data;
                $scope.movieResults = theSrchResults.Search;
                $scope.movieResultsCount = theSrchResults.totalResults;
              }
              else {
                $scope.msg = "Movie not found";
                $scope.movieResults = [];
              }
            }, function(response) {
              $scope.wasNetworkError = true;
              $scope.msg = "Network or data error, please check your network connection and try again.";
            });
          }
        };
        $scope.movieDetails = undefined;
        $scope.showDetails = function(movie) {
          {
            if ($scope.searchparam) {
              $http({
                method : 'GET',
                url: 'https://www.omdbapi.com/?t='+movie.Title+'&type=movie&r=json&apikey=32e6b671'
              }).
              then(function(response)
              {
                if(response && response.data) {
                  $scope.movieDetails = response.data;
                }
                else {
                  $scope.movieDetails = undefined;
                }
              }, function(response) {
                $scope.wasNetworkError = true;
                $scope.msg = "Network or data error, please check your network connection and try again.";
              });
            }
          };
        }

        $scope.goToList = function() {
          $scope.movieDetails = undefined;
        }
      }
    ])

})(window.angular);
