import { ILogEntry } from './interfaces';
import { LogLevel } from './LogLevel';

export class LogEntry implements ILogEntry {
    public readonly timestamp: string;

    constructor(
        public readonly level: LogLevel,
        public readonly context: string,
        public readonly message: string,
        public readonly metadata?: Record<string, any>,
        public readonly error?: Error
    ) {
        this.timestamp = new Date().toISOString();
        Object.freeze(this); // Enforce immutability per specification
    }
}
