import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

// Define log format with timestamp and color
const logFormat = printf(({ level, message, timestamp }) => {
  const colors = {
    info: '\x1b[32m',
    warn: '\x1b[33m',
    error: '\x1b[31m'
  };
  const color = colors[level] || '';
  return `${timestamp} ${color}[${level.toUpperCase()}]${color ? '\x1b[0m' : ''}: ${message}`;
});

// Configure logger
const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console()
  ]
});

export default logger