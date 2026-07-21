import { KernelState } from './KernelState';
import { IKernelHook, IKernelPipeline } from './interfaces';

export class InitializationPipeline implements IKernelPipeline {
    private hooks: Map<KernelState, IKernelHook[]> = new Map();

    public registerHook(state: KernelState, hook: IKernelHook): void {
        if (!this.hooks.has(state)) {
            this.hooks.set(state, []);
        }
        this.hooks.get(state)!.push(hook);
    }

    public async executePhase(state: KernelState): Promise<void> {
        const phaseHooks = this.hooks.get(state) || [];
        for (const hook of phaseHooks) {
            await hook.execute();
        }
    }
}
