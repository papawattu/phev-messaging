import { log } from 'phev-utils'

const MessagingClient = ({ messaging }) => {

    const registerHandler = handler => messaging.registerHandler(handler)
    
    const start = () => messaging.start()

    const publish = message => messaging.publish(message)
        
    return {
        start,
        registerHandler,
        publish
    }
}

export default MessagingClient