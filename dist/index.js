'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dirDefault = exports.dtFormatLogDefault = exports.dtFormatFileDefault = exports.LogFile = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _fs = require('fs');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ptzLog = require('ptz-log');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dirDefault = './logs/';
var dtFormatFileDefault = 'YYYY-MM-DD';
var dtFormatLogDefault = 'H:mm:ss MMMM Do YYYY';
function LogFile(args) {
    args = args || {};
    args.log = args.log || _ptzLog.log;
    args.dir = args.dir || dirDefault;
    args.dtFormatFile = args.dtFormatFile || dtFormatFileDefault;
    args.dtFormatLog = args.dtFormatLog || dtFormatLogDefault;
    if (!(0, _fs.existsSync)(args.dir)) (0, _fs.mkdirSync)(args.dir);
    function _log() {
        var _args;

        for (var _len = arguments.length, logArgs = Array(_len), _key = 0; _key < _len; _key++) {
            logArgs[_key] = arguments[_key];
        }

        (_args = args).log.apply(_args, logArgs);
        var date = (0, _moment2.default)().format(args.dtFormatFile);
        var fileName = _path2.default.join(args.dir, '/log-' + date + '.txt');
        writeFile(args.log, fileName, getFileTxt(args.dtFormatLog, logArgs));
    }
    return _log;
}
function getFileTxt(dtFormatLog, args) {
    var date = (0, _moment2.default)().format();
    var txt = '\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n' + date + ' \n';
    if (Object.prototype.toString.call(args) === '[object Array]') args.forEach(function (arg) {
        try {
            if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') txt += JSON.stringify(arg);else txt += String(arg);
        } catch (err) {
            (0, _ptzLog.log)('Error writing to log file:', err, 'args:', args, 'arg:', arg);
            throw err;
        }
    });else txt += args;
    txt += '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \n';
    return txt;
}
function writeFile(log, fileName, txt) {
    (0, _fs.appendFile)(fileName, txt, function (err) {
        if (err) {
            log('Error saving Log!', err);
            throw err;
        }
    });
}
exports.default = LogFile;
exports.LogFile = LogFile;
exports.dtFormatFileDefault = dtFormatFileDefault;
exports.dtFormatLogDefault = dtFormatLogDefault;
exports.dirDefault = dirDefault;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map