import { KernelState } from './KernelState';

export interface IKernelHook {
    name: string;
    execute(): Promise<void>;
}

export interface IKernelPipeline {
    registerHook(state: KernelState, hook: IKernelHook): void;
    executePhase(state: KernelState): Promise<void>;
}

export interface IKernelStateManager {
    getCurrentState(): KernelState;
    transitionTo(state: KernelState): void;
    subscribe(listener: (state: KernelState) => void): void;
}

export interface IBootVerification {
    verifyState(state: KernelState): void;
}

export interface IFailureDetector {
    handleFailure(error: Error, state?: KernelState): Promise<void>;
}
