import { KernelState } from './KernelState';
import { IKernelHook, IKernelPipeline } from './interfaces';

export class ShutdownPipeline implements IKernelPipeline {
    private hooks: Map<KernelState, IKernelHook[]> = new Map();

    public registerHook(state: KernelState, hook: IKernelHook): void {
        if (!this.hooks.has(state)) {
            this.hooks.set(state, []);
        }
        this.hooks.get(state)!.push(hook);
    }

    public async executePhase(state: KernelState): Promise<void> {
        const phaseHooks = this.hooks.get(state) || [];
        // Execute shutdown hooks sequentially.
        for (const hook of phaseHooks) {
            try {
                await hook.execute();
            } catch (error) {
                console.error(`[ShutdownPipeline] Error during shutdown hook ${hook.name}:`, error);
                // Continue shutdown despite errors to ensure maximal graceful termination
            }
        }
    }
}
