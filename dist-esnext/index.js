import { appendFile, existsSync, mkdirSync } from 'fs';
import moment from 'moment';
import path from 'path';
import { log as logBase } from 'ptz-log';
const dirDefault = './logs/';
const dtFormatFileDefault = 'YYYY-MM-DD';
const dtFormatLogDefault = 'H:mm:ss MMMM Do YYYY';
function LogFile({ dir = dirDefault, dtFormatFile = dtFormatFileDefault, dtFormatLog = dtFormatLogDefault }) {
    if (!existsSync(dir))
        mkdirSync(dir);
    function log(...args) {
        logBase(...args);
        const date = moment().format(dtFormatFile);
        const fileName = path.join(dir, `/log-${date}.txt`);
        writeFile(fileName, getFileTxt(dtFormatLog, args));
    }
    return log;
}
function getFileTxt(dtFormatLog, args) {
    const date = moment().format();
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
function writeFile(fileName, txt) {
    appendFile(fileName, txt, (err) => {
        if (err) {
            logBase('Error saving Log!', err);
            throw err;
        }
    });
}
export default LogFile;
export { LogFile, dtFormatFileDefault, dtFormatLogDefault, dirDefault };
//# sourceMappingURL=index.js.map