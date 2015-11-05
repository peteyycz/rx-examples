// Interactive

function getComments () {
  return [{
    sender: 'Joey',
    content: 'React sucks',
    likes: 19
  }, {
    sender: 'Mary',
    content: 'Angular rocks',
    likes: 49
  }]
}

var source = getComments()

source
  .filter(function (comment) {
    return comment.likes > 30
  })
  .map(function (comment) {
    return comment.content
  })
  .forEach(function (sender) {
    console.log('Likes higher than 30: ' + sender)
  })
