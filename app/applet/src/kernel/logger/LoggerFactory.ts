import { LoggerManager } from './LoggerManager';
import { IConfiguration } from '../config/interfaces';
import { ILoggerProvider, ILogger } from './interfaces';

export class LoggerFactory {
    /**
     * Instantiates a new root LoggerManager with bound configurations and providers.
     * Maintains a stateless structure to align with the "no global mutable state" mandate.
     */
    public createLogger(config: IConfiguration, providers: ILoggerProvider[], context: string = 'Root'): ILogger {
        const logger = new LoggerManager(context);
        
        logger.configure(config);
        
        for (const provider of providers) {
            logger.addProvider(provider);
        }
        
        return logger;
    }
}
