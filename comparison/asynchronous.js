var Rx = require('rx')

/* Comments will be PUSHED to us once they are made (websocket, RSS whatever) */
var source = getAsyncComments()

var subscription = source
  .filter(function (comment) {
    return comment.likes > 30
  })
  .map(function (comment) {
    return comment.content
  })
  .subscribe(
    function (comment) {
      console.log('Likes higher than 30: ' + comment)
    },
    function (err) {
      console.log('Something went wrong: ' + err.message)
    })

/* When we're done */
subscription.dispose()

function getAsyncComments () {
  return Rx.Observable.from([{
    sender: 'Joey',
    content: 'React sucks',
    likes: 19
  }, {
    sender: 'Mary',
    content: 'Angular rocks',
    likes: 49
  }])
}
