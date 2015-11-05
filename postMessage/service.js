/**
 * @class MessageService
 */
class MessageService {

  /**
   * @constructs MessageService
   * @param {Object} $window
   */
  constructor ($window, $log, rx) {
    this.Rx = rx
    this.$log = $log
    this.$window = $window

    let messageStream = this.getMessageStream()
    this.saveStream = this.filterMessageStream(messageStream, 'save')
    this.resetStream = this.filterMessageStream(messageStream, 'reset')
    this.resetStream = this.filterMessageStream(messageStream, 'push')
      .filter(({payload}) => {
        return payload.product.price > 1000
      })
  }

  /**
   * @method filterMessageStream
   */
  filterMessageStream (messageStream, filterOption) {
    return messageStream
      .filter(({event}) => event === filterOption)
      .pluck('payload')
  }

  /**
   * @method getMessageStream
   */
  getMessageStream () {
    return this.Rx.Observable.fromEvent(this.$window, 'message')
      .map((event) => {
        return {
          event: event.data.event,
          payload: event.data.payload
        }
      })
  }

  /**
   * @method create
   * @returns {Object} instance of class
   * @static
   */
  static create () {
    return ['$window', '$log', 'rx', ($window, $log, rx) => {
      return new MessageService($window, $log, rx)
    }]
  }
}

export default MessageService
