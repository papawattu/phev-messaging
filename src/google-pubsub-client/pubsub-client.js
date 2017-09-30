import PubSub from '@google-cloud/pubsub'
import { log } from 'phev-utils'

const PubSubClient = ({ pubSub = PubSub(), topicName = 'receive', subscriptionName = 'send' } = {}) => {

    let topic, publisher

    const start = () => {
        log.info('Started Google PubSub')
        topic = pubSub.topic(topicName)
        publisher = topic.publisher();
    }
    const stop = () => {
        return new Promise.resolve()
    }
    const publish = message => {
        log.debug('Publish ' + JSON.stringify(message))
        
        publisher.publish(message)
    }

    const registerHandler = handler => {

        const subscription = pubSub.subscription(subscriptionName)
        subscription.removeListener('message', handler)
        subscription.on('message', message => { 
            log.debug('Incoming message ' + JSON.stringify(message.data))
            
            message.ack()
            handler(message.data)
        })
    }
    return { 
        start,
        stop,
        publish,
        registerHandler,
    }

}

export default PubSubClient