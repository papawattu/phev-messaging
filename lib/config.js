'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mqtt = exports.sendTopic = exports.receiveTopic = exports.mqttUri = undefined;

var _mqtt = require('mqtt');

var _mqtt2 = _interopRequireDefault(_mqtt);

var _mqtt_stub = require('./mqtt_stub');

var _mqtt_stub2 = _interopRequireDefault(_mqtt_stub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mqttUri = exports.mqttUri = 'wss://secure.wattu.com:8883/mqtt';
var receiveTopic = exports.receiveTopic = 'phev/receive';
var sendTopic = exports.sendTopic = 'phev/send';

var selected_mqtt = process.env.NODE_ENV === 'test' ? _mqtt_stub2.default : _mqtt2.default;

exports.mqtt = selected_mqtt;