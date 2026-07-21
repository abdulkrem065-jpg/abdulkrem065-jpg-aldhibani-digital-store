import { KernelState } from './KernelState';
import { IBootVerification, IKernelStateManager } from './interfaces';

export class BootVerification implements IBootVerification {
    constructor(private stateManager: IKernelStateManager) {}

    public verifyState(expectedState: KernelState): void {
        const currentState = this.stateManager.getCurrentState();
        if (currentState !== expectedState) {
            throw new Error(`Boot verification failed. Expected state: ${expectedState}, but was: ${currentState}`);
        }
    }
}
