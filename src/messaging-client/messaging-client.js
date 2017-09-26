const MessagingClient = ({ messaging }) => {

    let _handler = null
    let _started = false

    const registerHandler = handler => {
        if(_handler === null) {
            _handler = handler
            messaging.registerHandler(handler)
        } else {
            log.warn('Can only register one handler')
        }
    }
    const start = () => {
        if(!_started) {
            _started = true
            return messaging.start()
        } else {
            log.warn('Start already called once')
            return Promise.resolve()
        }
    }
    return {
        start,
        registerHandler,
        publish: messaging.publish
    }
}

export default MessagingClient