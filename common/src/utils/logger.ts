enum LogLevel {
  LOG = 'LOG',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

type ColorTextFn = (text: string) => string;

const clc = {
  green: (text: string) => !process.env.NO_COLOR ? `\x1B[32m${text}\x1B[39m` : text,
  yellow: (text: string) => !process.env.NO_COLOR ? `\x1B[33m${text}\x1B[39m` : text,
  red: (text: string) => !process.env.NO_COLOR ? `\x1B[31m${text}\x1B[39m` : text,
};

export class Logger {
  private service: string | null = null;

  private static getTimestamp(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    };
    return new Date(Date.now()).toLocaleString(undefined, options);
  }

  private static getColorByLevel(level: LogLevel): ColorTextFn {
    if (level === LogLevel.ERROR) {
      return clc.red;
    } else if (level === LogLevel.WARN) {
      return clc.yellow;
    } else {
      return clc.green;
    }
  }

  private print(message: string, context = '', level: LogLevel = LogLevel.LOG): void {
    const color = Logger.getColorByLevel(level);
    const serviceMessage = color(this.service ? `[${this.service}] ` : '');
    const pidMessage = color(`${process.pid}  - `);
    const logLevelMessage = color(level.padStart(7, ' '));
    const contextMessage = context?.length ? clc.yellow(`[${context}]`) : '';
    const resultMessage = `${serviceMessage}${pidMessage}${Logger.getTimestamp()} ${logLevelMessage} ${contextMessage} ${color(message)}\n`;
    process.stdout.write(resultMessage);
  }

  public setService(service: string): void {
    this.service = service;
  }

  public log(message: string, context = ''): void {
    this.print(message, context, LogLevel.LOG);
  }

  public warn(message: string, context = ''): void {
    this.print(message, context, LogLevel.WARN);
  }

  public error(message: string, context = ''): void {
    this.print(message, context, LogLevel.ERROR);
  }
}

export const logger = new Logger();
