import { ILogEntry, ILoggerProvider } from './interfaces';
import { LogLevel } from './LogLevel';

export class ConsoleLoggerProvider implements ILoggerProvider {
    public readonly name = 'ConsoleLogger';

    public log(entry: ILogEntry): void {
        try {
            const formattedMessage = `[${entry.timestamp}] [${LogLevel[entry.level]}] [${entry.context}] ${entry.message}`;
            
            let metaString = '';
            if (entry.metadata && Object.keys(entry.metadata).length > 0) {
                metaString = `\n  Metadata: ${JSON.stringify(entry.metadata)}`;
            }
            
            let errorString = '';
            if (entry.error) {
                errorString = `\n  Error: ${entry.error.message}\n  Stack: ${entry.error.stack}`;
            }

            const output = formattedMessage + metaString + errorString;

            switch (entry.level) {
                case LogLevel.TRACE:
                case LogLevel.DEBUG:
                    console.debug(output);
                    break;
                case LogLevel.INFO:
                    console.info(output);
                    break;
                case LogLevel.WARN:
                    console.warn(output);
                    break;
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                    console.error(output);
                    break;
            }
        } catch (e) {
            // Failure-safe logging: Never throw exceptions during logging format/emission
            console.error('[ConsoleLoggerProvider] Failed to write to console logger', e);
        }
    }
}
