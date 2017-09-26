import _mqtt from 'mqtt'
import { log } from 'phev-utils'

const MqttClient = ({ mqtt = _mqtt, mqttUri, topicName = 'topic', subscriptionName = 'subscription' } = {}) => {

    let client = null 

    return {
        start: () => new Promise((resolve, reject) => {
            log.info('Started MQTT')
            client = mqtt.connect(mqttUri)
            
            client.on('error', err => {
                log.error(err)
                reject(err)
            })
            client.on('connect', () => {
                log.info('MQTT connected')
                resolve(client)
            })
    }),
        registerHandler: handler => {
            log.debug('Registered Handler')

            client.subscribe(subscriptionName)
            client.removeListener('message', handler)
            client.on('message', (subscription, message) => {
                log.debug(`MQTT received message ${subscription} : ${JSON.stringify(message)}`)
                subscription === subscriptionName ? handler(message) : undefined
            })
        },
        publish: message => client.publish(topicName, message)
    }
}

export default MqttClient