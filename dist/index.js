'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dtFormatLogDefault = exports.dtFormatFileDefault = exports.LogFile = undefined;

var _fs = require('fs');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ptzLog = require('ptz-log');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dtFormatFileDefault = 'YYYY-MM-DD';
var dtFormatLogDefault = 'H:mm:ss MMMM Do YYYY';
function LogFile(_ref) {
    var dir = _ref.dir,
        _ref$dtFormatFile = _ref.dtFormatFile,
        dtFormatFile = _ref$dtFormatFile === undefined ? dtFormatFileDefault : _ref$dtFormatFile,
        _ref$dtFormatLog = _ref.dtFormatLog,
        dtFormatLog = _ref$dtFormatLog === undefined ? dtFormatLogDefault : _ref$dtFormatLog;

    if (!(0, _fs.existsSync)(dir)) (0, _fs.mkdirSync)(dir);
    function log() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _ptzLog.log.apply(undefined, args);
        var date = (0, _moment2.default)().format(dtFormatFile);
        var fileName = _path2.default.join(dir, '/log-' + date + '.txt');
        writeFile(fileName, getFileTxt(dtFormatLog, args));
    }
    return log;
}
function getFileTxt(dtFormatLog, args) {
    var date = (0, _moment2.default)().format();
    var txt = '\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n' + date + ' \n';
    args.forEach(function (arg) {
        return txt += arg;
    });
    txt += '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \n';
    return txt;
}
function writeFile(fileName, txt) {
    (0, _fs.appendFile)(fileName, txt, function (err) {
        if (err) {
            (0, _ptzLog.log)('Error saving Log!', err);
            throw err;
        }
    });
}
exports.default = LogFile;
exports.LogFile = LogFile;
exports.dtFormatFileDefault = dtFormatFileDefault;
exports.dtFormatLogDefault = dtFormatLogDefault;
//# sourceMappingURL=index.js.map