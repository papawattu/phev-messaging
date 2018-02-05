'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _phevUtils = require('phev-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SocketClient = function SocketClient() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$client = _ref.client,
        client = _ref$client === undefined ? new _net2.default.Socket() : _ref$client,
        host = _ref.host,
        port = _ref.port;

    return {
        publish: function publish(data) {
            return client.writable ? client.write(data) : undefined;
        },
        start: function start() {
            return new Promise(function (resolve, reject) {
                if (client.writable) resolve(client);

                client.removeAllListeners();

                client.on('error', function (err) {
                    _phevUtils.log.error(err);
                    //    return reject(err)
                });
                client.on('connect', function () {
                    _phevUtils.log.debug('Socket connected to ' + host + ' ' + port);
                    return resolve(client);
                });
                client.on('close', function () {
                    _phevUtils.log.debug('Connection closed');
                });
                client.on('drain', function () {
                    return _phevUtils.log.debug('***drain');
                });
                client.on('end', function () {
                    return _phevUtils.log.debug('***end');
                });
                client.on('lookup', function () {
                    return _phevUtils.log.debug('***lookup');
                });
                client.on('timeout', function () {
                    return _phevUtils.log.debug('***timeout');
                });

                client.connect(port, host);
            });
        },
        registerHandler: function registerHandler(handler) {
            client.removeListener('data', handler);
            client.on('data', handler);
        },
        stop: function stop() {
            return new Promise(function (resolve, reject) {
                client.destroy();
                client.once('close', function () {
                    return resolve();
                });
            });
        }
    };
};

exports.default = SocketClient;