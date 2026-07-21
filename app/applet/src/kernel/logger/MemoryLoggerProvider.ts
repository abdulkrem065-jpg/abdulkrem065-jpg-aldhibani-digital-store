import { ILogEntry, ILoggerProvider } from './interfaces';

export class MemoryLoggerProvider implements ILoggerProvider {
    public readonly name = 'MemoryLogger';
    private entries: ILogEntry[] = [];
    private readonly maxSize: number;

    constructor(maxSize: number = 1000) {
        this.maxSize = maxSize;
    }

    public log(entry: ILogEntry): void {
        try {
            this.entries.push(entry);
            if (this.entries.length > this.maxSize) {
                this.entries.shift(); // Keep only the latest maxSize entries to avoid unbounded memory growth
            }
        } catch (e) {
            // Failure-safe logging
            console.error('[MemoryLoggerProvider] Failed to store memory log', e);
        }
    }

    public getEntries(): ILogEntry[] {
        return [...this.entries];
    }
    
    public clear(): void {
        this.entries = [];
    }
}
