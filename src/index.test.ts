import { existsSync, unlinkSync } from 'fs';
import moment from 'moment';
import path from 'path';
import { ok } from 'ptz-assert';
import rimraf from 'rimraf';
import LogFile, { dtFormatFileDefault, dtFormatLogDefault } from './index';

describe('ptz-log-file', () => {
    describe('LogFile', () => {
        it('create ./logs/ folder ', () => {
            const dir = './logs/';

            if (existsSync(dir))
                rimraf.sync(dir);

            const log = LogFile({ dir });

            ok(existsSync(dir));
        });

        it('create ./logs/log-YYYY-MM-DD.txt file ', () => {
            const dir = './logs/';
            const date = moment().format(dtFormatFileDefault);
            const fileName = path.join(dir, `/log-${date}.txt`);

            if (existsSync(fileName))
                rimraf.sync(dir);

            const log = LogFile({ dir });

            const logMsg = 'testing creating log file';
            log(logMsg);

            console.log(fileName);
            ok(existsSync(fileName), 'File not created');
        });
    });
});
