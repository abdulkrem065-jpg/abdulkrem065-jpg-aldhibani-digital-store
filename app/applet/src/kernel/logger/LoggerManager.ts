import { ILogger, ILoggerProvider } from './interfaces';
import { LogLevel } from './LogLevel';
import { LogEntry } from './LogEntry';
import { IConfiguration } from '../config/interfaces';

export class LoggerManager implements ILogger {
    private providers: ILoggerProvider[] = [];
    private minLevel: LogLevel = LogLevel.INFO;
    private readonly context: string;

    constructor(context: string = 'System') {
        this.context = context;
    }

    public configure(config: IConfiguration): void {
        const configuredLevel = config.get<string>('logger.level', 'INFO').toUpperCase();
        this.minLevel = LogLevel[configuredLevel as keyof typeof LogLevel] ?? LogLevel.INFO;
    }

    public addProvider(provider: ILoggerProvider): void {
        this.providers.push(provider);
    }

    public withContext(context: string): ILogger {
        const childLogger = new LoggerManager(context);
        childLogger.minLevel = this.minLevel;
        // Inherit providers array by reference to avoid duplication overhead
        childLogger.providers = this.providers;
        return childLogger;
    }

    private emit(level: LogLevel, message: string, metadata?: Record<string, any>, error?: Error): void {
        if (level < this.minLevel) return;

        try {
            const entry = new LogEntry(level, this.context, message, metadata, error);
            for (const provider of this.providers) {
                provider.log(entry);
            }
        } catch (e) {
            // Failure-safe logging: Enforce the global no-crash telemetry rule
            console.error('[LoggerManager] encountered an error while emitting logs', e);
        }
    }

    public trace(message: string, metadata?: Record<string, any>): void {
        this.emit(LogLevel.TRACE, message, metadata);
    }

    public debug(message: string, metadata?: Record<string, any>): void {
        this.emit(LogLevel.DEBUG, message, metadata);
    }

    public info(message: string, metadata?: Record<string, any>): void {
        this.emit(LogLevel.INFO, message, metadata);
    }

    public warn(message: string, metadata?: Record<string, any>): void {
        this.emit(LogLevel.WARN, message, metadata);
    }

    public error(message: string, error?: Error, metadata?: Record<string, any>): void {
        this.emit(LogLevel.ERROR, message, metadata, error);
    }

    public fatal(message: string, error?: Error, metadata?: Record<string, any>): void {
        this.emit(LogLevel.FATAL, message, metadata, error);
    }
}
