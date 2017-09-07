import chai from 'chai';
import sinon from 'sinon';
import PhevMqtt from '.';
import mqtt from './mqtt_stub'

const assert = chai.assert;

describe('mqtt wrapper', () => {
    
    it('Should connect to correct uri', () => {
        
        const spy = sinon.spy(mqtt,'connect')
        const sut = PhevMqtt({mqtt, uri: 'test'})
        
        assert(spy.withArgs('test').calledOnce)
    })
    it('Should default mqtt', (done) => {
        
        const sut = PhevMqtt({uri: 'mqtt://test.mosquitto.org'})
        sut.subscribe('test')
        assert(sut.client)
        sut.client.on('connect', () => done())
    })
    it('Should send and receive buffer', (done) => {
        
        const sut = PhevMqtt({mqtt, uri: ''})
        sut.subscribe('test')
        const sub = sut.messages('test').subscribe(x => {
            assert.deepEqual(x.message,Buffer.from([0,1,2,3,4]),'expected Buffer[0,1,2,3,4] got ' + x)
            sub.unsubscribe();
            sut.unsubscribe('test')
            done()
        })
        sut.send('test',Buffer.from([0,1,2,3,4]))
    })
})