window.angular.module('example', ['rx'])
.controller('AppCtrl', function ($scope, observeOnScope) {
  var source = observeOnScope($scope, 'name')
  .pluck('newValue')

  source
  .filter(function (value) {
    return value && value.indexOf('a') > -1
  })
  .subscribe(function (change) {
    $scope.containA = change
  })

  source
  .filter(function (value) {
    return value && value.indexOf('b') > -1
  })
  .subscribe(function (change) {
    $scope.containB = change + 'whatever'
  })
})
