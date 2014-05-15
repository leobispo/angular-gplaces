angular.module('Example', ['ngGplaces']).controller('ExampleCtrl', function ($scope) {
  $scope.opts = {
    types: ['(cities)']
  };

  $scope.changed = function(place) {
    console.log('Place changed');
  };
});
