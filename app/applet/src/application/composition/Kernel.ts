import { Application } from './Application';

export class Kernel {
    constructor(private app: Application) {}

    public async boot(): Promise<void> {
        console.log('[Kernel] Boot sequence initiated...');
        await this.app.start();
        console.log('[Kernel] Boot sequence complete. Application is active.');
    }

    public async shutdown(): Promise<void> {
        console.log('[Kernel] Shutdown sequence initiated...');
        await this.app.stop();
        console.log('[Kernel] Shutdown sequence complete. Application terminated.');
    }
}
