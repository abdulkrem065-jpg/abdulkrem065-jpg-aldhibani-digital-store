import { LogLevel } from './LogLevel';

export interface ILogEntry {
    readonly timestamp: string;
    readonly level: LogLevel;
    readonly context: string;
    readonly message: string;
    readonly metadata?: Record<string, any>;
    readonly error?: Error;
}

export interface ILogger {
    trace(message: string, metadata?: Record<string, any>): void;
    debug(message: string, metadata?: Record<string, any>): void;
    info(message: string, metadata?: Record<string, any>): void;
    warn(message: string, metadata?: Record<string, any>): void;
    error(message: string, error?: Error, metadata?: Record<string, any>): void;
    fatal(message: string, error?: Error, metadata?: Record<string, any>): void;
    
    withContext(context: string): ILogger;
}

export interface ILoggerProvider {
    name: string;
    log(entry: ILogEntry): void;
}
