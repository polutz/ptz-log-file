import { appendFile, existsSync, mkdirSync } from 'fs';
import moment from 'moment';
import path from 'path';
import { Ilog, log as logBase } from 'ptz-log';

interface ILogFileArgs {
    dir?: string;
    dtFormatFile?: string;
    dtFormatLog?: string;
}

const dirDefault = './logs/';
const dtFormatFileDefault = 'YYYY-MM-DD';
const dtFormatLogDefault = 'H:mm:ss MMMM Do YYYY';

function LogFile({
    dir = dirDefault,
    dtFormatFile = dtFormatFileDefault,
    dtFormatLog = dtFormatLogDefault }: ILogFileArgs): Ilog {

    if (!existsSync(dir))
        mkdirSync(dir);

    function log(...args): void {
        logBase(...args);

        const date = moment().format(dtFormatFile);
        const fileName = path.join(dir, `/log-${date}.txt`);

        writeFile(fileName, getFileTxt(dtFormatLog, args));
    }

    return log;
}

function getFileTxt(dtFormatLog, args): string {
    const date = moment().format();
    var txt =
        `\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
${date} \n`;

    if (Object.prototype.toString.call(args) === '[object Array]')
        args.forEach(arg => {
            try {
                txt += arg;
            } catch (err) {
                logBase('Error', err);
            }
        });
    else
        txt += args;

    txt += '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \n';
    return txt;
}

function writeFile(fileName: string, txt: string): void {
    appendFile(fileName, txt, (err) => {
        if (err) {
            logBase('Error saving Log!', err);
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
