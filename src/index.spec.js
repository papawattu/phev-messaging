import chai from 'chai'
import sinon from 'sinon'
import net from 'net'
import { SocketClient } from '.'

const assert = chai.assert;

let server = null
let sut = sut

describe('Integration test - Socket Connection', () => {
    beforeEach(done => {

        server = net.createServer(client => {
            client.on('end', () => console.log('Client Ended'))
            client.on('close', () => console.log('Client Connection Closed'))
            
        })
        server.listen(8080)

        sut = SocketClient({ host: 'localhost', port: 8080 })

        done()
    })
    afterEach(() => {
        server.close()
    })
    it('Should bootstrap', () => {

        assert.isNotNull(sut)
    })
    it('Should start', done => {

        sut.start()
            .then(() => done(), err => console.error(err))
    })
    it('Should stop', done => {
        sut.start()
            .then(() => {
                sut.stop()
                    .then(() => done(), err => console.error(err))
            })
        
    })
    it('Should reconnect', done => {
    
        sut.start()
            .then(() => sut.stop())
            .then(() => sut.start())
            .then(() => done())
            .catch(err => assert.fail(err))
    })
})
