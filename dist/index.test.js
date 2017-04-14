'use strict';

var _fs = require('fs');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ptzAssert = require('ptz-assert');

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ptz-log-file', function () {
    describe('LogFile', function () {
        it('create ./logs/ folder ', function () {
            var dir = './logs/';
            if ((0, _fs.existsSync)(dir)) _rimraf2.default.sync(dir);
            var log = (0, _index2.default)({ dir: dir });
            (0, _ptzAssert.ok)((0, _fs.existsSync)(dir));
        });
        it('create ./logs/log-YYYY-MM-DD.txt file ', function () {
            var dir = './logs/';
            var date = (0, _moment2.default)().format(_index.dtFormatFileDefault);
            var fileName = _path2.default.join(dir, '/log-' + date + '.txt');
            if ((0, _fs.existsSync)(fileName)) _rimraf2.default.sync(dir);
            var log = (0, _index2.default)({ dir: dir });
            var logMsg = 'testing creating log file';
            log(logMsg);
            console.log(fileName);
            (0, _ptzAssert.ok)((0, _fs.existsSync)(fileName), 'File not created');
        });
    });
});
//# sourceMappingURL=index.test.js.map