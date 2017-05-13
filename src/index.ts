import { appendFile, existsSync, mkdirSync } from 'fs';
import moment from 'moment';
import path from 'path';
import { Ilog, log as logBase } from 'ptz-log';

interface ILogFileArgs {
    /**
     * Use your custom log if you do NOT want to use the default ptz-log
     */
    log?: Ilog;
    /**
     * Use your custom dir if you do NOT want to use the default './logs'
     */
    dir?: string;
    dtFormatFile?: string;
    dtFormatLog?: string;
}

const dirDefault = './logs/';
const dtFormatFileDefault = 'YYYY-MM-DD';
const dtFormatLogDefault = 'H:mm:ss MMMM Do YYYY';

function LogFile(args: ILogFileArgs): Ilog {
     args = args || {};

     args.log = args.log || logBase;
     args.dir = args.dir || dirDefault;
     args.dtFormatFile = args.dtFormatFile || dtFormatFileDefault;
     args.dtFormatLog = args.dtFormatLog || dtFormatLogDefault;

     if (!existsSync(args.dir))
        mkdirSync(args.dir);

     function _log(...logArgs): void {
        args.log(...logArgs);

        const date = moment().format(args.dtFormatFile);
        const fileName = path.join(args.dir, `/log-${date}.txt`);

        writeFile(args.log, fileName, getFileTxt(args.dtFormatLog, logArgs));
    }

     return _log;
}

function getFileTxt(dtFormatLog, args): string {
    const date = moment().format();
    var txt =
        `\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
${date} \n`;

    if (Object.prototype.toString.call(args) === '[object Array]')
        args.forEach(arg => {
            try {
                if (typeof arg === 'object')
                    txt += JSON.stringify(arg);
                else
                    txt += String(arg);
            } catch (err) {
                logBase('Error writing to log file:', err, 'args:', args, 'arg:', arg);
                throw err;
            }
        });
    else
        txt += args;

    txt += '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \n';
    return txt;
}

function writeFile(log: Ilog, fileName: string, txt: string): void {
    appendFile(fileName, txt, (err) => {
        if (err) {
            log('Error saving Log!', err);
            throw err;
        }
    });
}

export default LogFile;

export {
    LogFile,
    dtFormatFileDefault,
    dtFormatLogDefault,
    dirDefault
};
