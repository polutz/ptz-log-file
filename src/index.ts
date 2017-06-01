import { appendFile, existsSync, mkdirSync } from 'fs';
import moment from 'moment';
import path from 'path';
import { ILog, log as logBase } from 'ptz-log';

/**
 * Options to create log file
 */
interface ILogFileArgs {
    /**
     * Use your custom log function if you do NOT want to use the default ptz-log
     */
    log?: ILog;

    /**
     * Directory to store the log files
     *
     * Default dir is './logs/'
     */
    dir?: string;

    /**
     * The generated log file name will be:
     *
     * `${dir}/log-${date}.txt`
     *
     * Default format to date is 'YYYY-MM-DD'
     */
    dtFormatFile?: string;

    /**
     * The generated log file name will be:
     *
     * `${dir}/log-${date}.txt`
     *
     * Default format is 'H:mm:ss MMMM Do YYYY'
     */
    dtFormatLog?: string;
}

const dirDefault = './logs/';
const dtFormatFileDefault = 'YYYY-MM-DD';
const dtFormatLogDefault = 'H:mm:ss MMMM Do YYYY';

/**
 * Returns a closured log function to write log into files.
 */
function LogFile(args: ILogFileArgs): ILog {
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

/**
 * Get the text to write in the file for each log.
 *
 * You can create another functions as templates.
 */
function getFileTxt(dtFormatLog, args: any): string {
    const date = moment().format(dtFormatLog);
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

/**
 * Append the log text to the log file.
 */
function writeFile(log: ILog, fileName: string, txt: string): void {
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
