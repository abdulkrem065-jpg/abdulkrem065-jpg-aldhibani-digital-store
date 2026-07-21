import { KernelState } from './KernelState';
import { IKernelPipeline, IKernelStateManager, IFailureDetector, IBootVerification } from './interfaces';

export class KernelLifecycleController {
    private readonly bootSequence = [
        KernelState.PRE_BOOT,
        KernelState.CORE_BOOT,
        KernelState.CONTAINER_SETUP,
        KernelState.MODULE_DISCOVERY,
        KernelState.REGISTRATION,
        KernelState.RESOLUTION,
        KernelState.POST_BOOT,
        KernelState.ACTIVE
    ];

    constructor(
        private stateManager: IKernelStateManager,
        private initPipeline: IKernelPipeline,
        private shutdownPipeline: IKernelPipeline,
        private failureDetector: IFailureDetector,
        private bootVerification: IBootVerification
    ) {}

    public async start(): Promise<void> {
        try {
            for (const state of this.bootSequence) {
                this.stateManager.transitionTo(state);
                await this.initPipeline.executePhase(state);
                this.bootVerification.verifyState(state);
            }
        } catch (error) {
            await this.failureDetector.handleFailure(error as Error, this.stateManager.getCurrentState());
        }
    }

    public async stop(): Promise<void> {
        try {
            this.stateManager.transitionTo(KernelState.SHUTTING_DOWN);
            await this.shutdownPipeline.executePhase(KernelState.SHUTTING_DOWN);
            this.stateManager.transitionTo(KernelState.TERMINATED);
        } catch (error) {
            await this.failureDetector.handleFailure(error as Error, this.stateManager.getCurrentState());
        }
    }
}
