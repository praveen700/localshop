const { createLogger, transports, format, } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp}) => {
    return `[${level}] ${timestamp} ${message}`;
})
const loggerFunction = () => {
    return createLogger({
        level: 'info',
        format: combine(format.colorize(), timestamp({ format: "HH:mm:ss"}), myFormat),
        
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'logfile-info.log' })],
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'logfile-error.log' }),],

    })
}

module.exports = loggerFunction;


