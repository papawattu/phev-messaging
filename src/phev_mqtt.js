import _mqtt from 'mqtt'
import { Observable } from 'rxjs'
import log from 'phev-utils'

const PhevMqtt = ( { mqtt = _mqtt, uri, options } ) => {
    
    log.info(`Starting MQTT Uri ${uri} ${JSON.stringify(options)}`)

    const client = mqtt.connect(uri, options)

    client.on('connected', ()=> log.debug('Connected to ' + uri))
    client.on('error', err => log.error(err))
    client.on('message', (topic, msg) => log.debug(`Received >> topic ${topic} >> ${JSON.stringify(msg)}`))

    const send = ( topic, message ) => { 
        log.debug(`Sending >> topic ${topic} >> message ${JSON.stringify(message)}`)
        client.publish(topic, message) 
        return message 
    }
    
    const subscribe = topic => client.subscribe(topic)
    
    const unsubscribe = topic => client.unsubscribe(topic)
    
    const observeEvent = ev => Observable.fromEvent(client, ev, (topic, message) => ({topic, message}))  
    
    const messages = topic => observeEvent('message').filter(x => x.topic === topic)
    

    return { 
        send: send, 
        messages: messages, 
        subscribe: subscribe, 
        unsubscribe: unsubscribe, 
        connected: client.connected,
        client: client
    }
}
export default PhevMqtt 
