import winston, { transports } from 'winston'
import path from 'path'

// winston format
const { combine, timestamp, prettyPrint } = winston.format

const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.Console(), new transports.File({ filename: path.join(__dirname, '../logs', 'logfile.log') })],
  exitOnError: false,
})
logger.exceptions.handle(new transports.File({ filename: path.join(__dirname, '../logs', 'exceptions.log'), level: 'error' }))

export default logger
