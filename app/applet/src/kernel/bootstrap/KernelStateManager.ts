import { KernelState } from './KernelState';
import { IKernelStateManager } from './interfaces';

export class KernelStateManager implements IKernelStateManager {
    private currentState: KernelState = KernelState.PRE_BOOT;
    private listeners: ((state: KernelState) => void)[] = [];

    public getCurrentState(): KernelState {
        return this.currentState;
    }

    public transitionTo(state: KernelState): void {
        this.currentState = state;
        this.notifyListeners();
    }

    public subscribe(listener: (state: KernelState) => void): void {
        this.listeners.push(listener);
    }

    private notifyListeners(): void {
        for (const listener of this.listeners) {
            try {
                listener(this.currentState);
            } catch (error) {
                // Fail-safe notification to prevent cascaded failures from listeners
                console.error(`[KernelStateManager] Error in state listener:`, error);
            }
        }
    }
}
