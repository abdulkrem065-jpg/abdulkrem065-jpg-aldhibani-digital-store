import { IKernelHook } from '../bootstrap/interfaces';
import { LoggerFactory } from './LoggerFactory';
import { IConfiguration } from '../config/interfaces';
import { ConsoleLoggerProvider } from './ConsoleLoggerProvider';
import { ILogger, ILoggerProvider } from './interfaces';

export class LoggerBootHook implements IKernelHook {
    public readonly name = 'LoggerBootHook';
    public logger: ILogger | null = null; // Exposed strictly for controlled extraction by Kernel during Boot

    constructor(
        private configuration: IConfiguration,
        private providers: ILoggerProvider[] = [],
        private factory: LoggerFactory = new LoggerFactory()
    ) {}

    public async execute(): Promise<void> {
        // Fallback to ConsoleProvider if none specified by the boot orchestrator
        const activeProviders = this.providers.length > 0 
            ? this.providers 
            : [new ConsoleLoggerProvider()];

        this.logger = this.factory.createLogger(this.configuration, activeProviders, 'Kernel');
        
        this.logger.info('Logger subsystem initialized successfully.');
    }
}
