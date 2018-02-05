'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stub_mqtt = {};
var client = new _events2.default();

client.publish = function (topic, message) {
    return client.emit('message', topic, message);
};
client.subscribe = function (topic) {
    return undefined;
};
client.unsubscribe = function (topic) {
    return undefined;
};
stub_mqtt.connect = function () {
    return client;
};

client.on('message', function (topic, message) {
    if (process.env.DEBUG === 'true') console.log('topic ' + topic + ' - message = ' + message.toString('hex'));
});

exports.default = stub_mqtt;