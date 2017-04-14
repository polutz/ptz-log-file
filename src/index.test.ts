import { existsSync, unlinkSync } from 'fs';
import moment from 'moment';
import path from 'path';
import { ok } from 'ptz-assert';
import rimraf from 'rimraf';
import LogFile, { dirDefault, dtFormatFileDefault, dtFormatLogDefault } from './index';

describe('ptz-log-file', () => {
    describe('LogFile', () => {
        it('create ./logs/ folder ', () => {
            if (existsSync(dirDefault))
                rimraf.sync(dirDefault);

            const log = LogFile({});

            ok(existsSync(dirDefault));
        });

        it('create ./logs/log-YYYY-MM-DD.txt file ', () => {
            const date = moment().format(dtFormatFileDefault);
            const fileName = path.join(dirDefault, `/log-${date}.txt`);

            if (existsSync(fileName))
                rimraf.sync(dirDefault);

            const log = LogFile({});

            const logMsg = 'testing creating log file';
            log(logMsg);

            console.log(fileName);
            ok(existsSync(fileName), 'File not created');
        });

        it('log obj', () => {
            const log = LogFile({});
            log({ hi: 'hoy', a: 3, b: [1, 2, 3] });
        });
    });
});
