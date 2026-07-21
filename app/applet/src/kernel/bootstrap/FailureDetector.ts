import { KernelState } from './KernelState';
import { IFailureDetector, IKernelStateManager } from './interfaces';

export class FailureDetector implements IFailureDetector {
    constructor(private stateManager: IKernelStateManager) {}

    public async handleFailure(error: Error, state?: KernelState): Promise<void> {
        const currentState = state ?? this.stateManager.getCurrentState();
        
        console.error(`[KERNEL FAILURE DETECTED] at state ${currentState}:`);
        console.error(error);
        
        this.stateManager.transitionTo(KernelState.FAILED);
        
        // Enforce the "Fail-Closed" global strategy
        process.exit(1); 
    }
}
