import net from 'net'
import { log } from 'phev-utils'

const SocketClient = ({ client = new net.Socket(), host, port } = {}) => ({
    publish: data => client.writable ? client.write(data) : undefined,
    start: () => new Promise((resolve, reject) => {
        if(client.writable) resolve(client)
        
        client.removeAllListeners()
   
        client.on('error', err => {
            log.error(err)
            return reject(err)
        })
        client.on('connect', () => {
            log.debug(`Socket connected to ${host} ${port}`)
            return resolve(client)
        })
        client.on('close', () => log.debug('***close'))
        client.on('drain', () => log.debug('***drain'))
        client.on('end', () => log.debug('***end'))
        client.on('lookup', () => log.debug('***lookup'))
        client.on('timeout', () => log.debug('***timeout'))
        
        client.connect(port, host)
    }),
    registerHandler: handler => {
        client.removeListener('data', handler)
        client.on('data', handler)
    },
    stop: Promise.resolve()
})

export default SocketClient