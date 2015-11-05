import angular from 'angular'

/**
 * @class RxExampleCtrl
 */
class RxExampleCtrl {

  /**
   * @constructs RxExampleCtrl
   * @param {Object} Message
   * @param {Object} rx
   */
  constructor(Message, rx) {
    this.Message = Message
    this.Rx = rx

    this.formEnabled = false
    this.inputDisabled = false

    this.handleMessageStreams()
  }

  /**
   * @method handleMessageStreams
   */
  handleMessageStreams() {
    this.Message.resetStream
      .filter(() => {
        return this.formEnabled && !this.inputDisabled
      })
      .subscribe(this.reset.bind(this))

    this.Rx.Observable.merge(
      this.Message.saveStream
        .filter(() => {
          return this.formEnabled && !this.inputDisabled
        })
        .flatMapLatest(() => {
          return this.Rx.Observable.fromPromise(this.save.bind(this))
        }),
      this.Message.saveStream
        .filter(() => {
          return this.formEnabled && this.inputDisabled
        })
        .flatMapLatest(() => {
          return this.Rx.Observable.fromPromise(this.delete.bind(this))
        })
    )
    .subscribe((data) => {
      this.$log.debug('stream has processed: ', data)
    })
  }


  /**
   * @method delete
   */
  delete() {
    return Promise.resolve('this is a function to handle delete logic')
  }

  /**
   * @method save
   */
  save() {
    return Promise.resolve('this is a function to handle save logic')
  }

  /**
   * @method reset
   */
  reset() {
    return Promise.resolve('this is a function to handle reset logic')
  }

  /**
   * @method create
   * @returns {Object} instance of class
   * @static
   */
  static create() {
    return ['Message', 'rx',
      RxExampleCtrl]
  }
}
