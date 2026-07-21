export interface IApiLifecycleHook {
    onStarting(): Promise<void>;
    onStarted(): Promise<void>;
    onStopping(): Promise<void>;
    onStopped(): Promise<void>;
}

export class ApiLifecycleHookManager {
    private hooks: IApiLifecycleHook[] = [];

    public register(hook: IApiLifecycleHook): void {
        this.hooks.push(hook);
    }

    public async triggerStarting(): Promise<void> {
        for (const hook of this.hooks) await hook.onStarting();
    }

    public async triggerStarted(): Promise<void> {
        for (const hook of this.hooks) await hook.onStarted();
    }
    
    public async triggerStopping(): Promise<void> {
        for (const hook of this.hooks) await hook.onStopping();
    }

    public async triggerStopped(): Promise<void> {
        for (const hook of this.hooks) await hook.onStopped();
    }
}
