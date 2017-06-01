import { appendFile, existsSync } from 'fs';
import mkdirp from 'mkdirp';
import moment from 'moment';
import path from 'path';
import { log as logBase } from 'ptz-log';
const dirDefault = './logs/';
const dtFormatFileDefault = 'YYYY-MM-DD';
const dtFormatLogDefault = 'H:mm:ss MMMM Do YYYY';
/**
 * Returns a closured log function to write log into files.
 */
function LogFile(args) {
    args = args || {};
    args.log = args.log || logBase;
    args.dir = args.dir || dirDefault;
    args.dtFormatFile = args.dtFormatFile || dtFormatFileDefault;
    args.dtFormatLog = args.dtFormatLog || dtFormatLogDefault;
    if (!existsSync(args.dir))
        mkdirp.sync(args.dir);
    function _log(...logArgs) {
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
function getFileTxt(dtFormatLog, args) {
    const date = moment().format(dtFormatLog);
    var txt = `\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
${date} \n`;
    if (Object.prototype.toString.call(args) === '[object Array]')
        args.forEach(arg => {
            try {
                if (typeof arg === 'object')
                    txt += JSON.stringify(arg);
                else
                    txt += String(arg);
            }
            catch (err) {
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
function writeFile(log, fileName, txt) {
    appendFile(fileName, txt, (err) => {
        if (err) {
            log('Error saving Log!', err);
            throw err;
        }
    });
}
export default LogFile;
export { LogFile, dtFormatFileDefault, dtFormatLogDefault, dirDefault };
//# sourceMappingURL=index.js.map