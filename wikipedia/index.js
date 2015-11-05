window.angular.module('example', ['rx'])
.controller('AppCtrl', function ($http, $scope, observeOnScope) {
  /* Only get the value from each change */
  var keyups = observeOnScope($scope, 'name')
    .pluck('newValue')
    .filter(function (text) {
      return text && text.length > 2
    })

  /* Now debounce the input for 500ms */
  var debounced = keyups
    .debounce(500 /* ms */)

  /* Now get only distinct values, so we eliminate the arrows and other control characters */
  var distinct = debounced
    .distinctUntilChanged()

  var suggestions = window.Rx.Observable.catch(
    distinct
      .flatMapLatest(searchWikipedia)
      .retry(3),
    window.Rx.Observable.just({
      data: [
        'SearchText',
        ['Bunch', 'of', 'default', 'text'],
        ['Bunch', 'of', 'default', 'text'],
        ['Bunch', 'of', 'default', 'text']
      ]
    })
  )

  suggestions.subscribe(
    function (response) {
      var bindable = response.data[1].reduce(function (prev, current, index) {
        prev.push({
          name: current,
          link: response.data[3][index]
        })
        return prev
      }, [])
      $scope.results = bindable
      // Nasty eh?
      $scope.$apply()
    },
    function (error) {
      throw error
    })

  function searchWikipedia (term) {
    return $http.jsonp('https://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=opensearch&format=json&search=' + term)
  }
})
