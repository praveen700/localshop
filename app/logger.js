const { createLogger, transports, format, } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp}) => {
    return `[${level}] ${timestamp} ${message}`;
})
const options = {
    file: {
      level: 'info',
      filename: './logs/logfile-info.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'info',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

const loggerFunction = () => {
    return createLogger({
        level: 'info',
        format: combine(format.colorize(), timestamp({ format: "HH:mm:ss"}), myFormat),
        transports: [
            new transports.File(options.file)],
            exitOnError: false

    })
}

module.exports = loggerFunction;
