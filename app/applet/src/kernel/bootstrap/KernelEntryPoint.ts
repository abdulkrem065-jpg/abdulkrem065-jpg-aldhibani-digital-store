import { KernelStateManager } from './KernelStateManager';
import { InitializationPipeline } from './InitializationPipeline';
import { ShutdownPipeline } from './ShutdownPipeline';
import { FailureDetector } from './FailureDetector';
import { BootVerification } from './BootVerification';
import { KernelLifecycleController } from './KernelLifecycleController';
import { IKernelPipeline } from './interfaces';

export class KernelEntryPoint {
    private static instance: KernelEntryPoint;
    private lifecycleController: KernelLifecycleController;
    private failureDetector: FailureDetector;

    public readonly initializationPipeline: IKernelPipeline;
    public readonly shutdownPipeline: IKernelPipeline;

    private constructor() {
        const stateManager = new KernelStateManager();
        this.initializationPipeline = new InitializationPipeline();
        this.shutdownPipeline = new ShutdownPipeline();
        this.failureDetector = new FailureDetector(stateManager);
        const bootVerification = new BootVerification(stateManager);

        this.lifecycleController = new KernelLifecycleController(
            stateManager,
            this.initializationPipeline,
            this.shutdownPipeline,
            this.failureDetector,
            bootVerification
        );

        this.registerProcessHandlers();
    }

    public static getInstance(): KernelEntryPoint {
        if (!KernelEntryPoint.instance) {
            KernelEntryPoint.instance = new KernelEntryPoint();
        }
        return KernelEntryPoint.instance;
    }

    public async boot(): Promise<void> {
        await this.lifecycleController.start();
    }

    public async shutdown(): Promise<void> {
        await this.lifecycleController.stop();
    }

    private registerProcessHandlers(): void {
        process.on('SIGINT', async () => {
            console.log('\n[KernelEntryPoint] Intercepted SIGINT. Initiating safe shutdown...');
            await this.shutdown();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            console.log('\n[KernelEntryPoint] Intercepted SIGTERM. Initiating safe shutdown...');
            await this.shutdown();
            process.exit(0);
        });

        process.on('uncaughtException', async (error: Error) => {
            await this.failureDetector.handleFailure(error);
        });
    }
}
