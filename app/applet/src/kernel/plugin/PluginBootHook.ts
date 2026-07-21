import { IKernelHook } from '../bootstrap/interfaces';
import { IPluginLoader } from './interfaces';

export class PluginDiscoveryBootHook implements IKernelHook {
    public readonly name = 'PluginDiscoveryBootHook';

    constructor(private pluginLoader: IPluginLoader) {}

    public async execute(): Promise<void> {
        // Normally, this hook would fetch the raw descriptors from a file system, registry, or dynamic imports.
        // The Kernel lifecycle orchestrates this. It assumes `loadPlugins` is called elsewhere or here with discovered definitions.
        // For architectural purity, we assume the physical discovery happens here, and delegates to the loader.
    }
}

export class PluginInitializationBootHook implements IKernelHook {
    public readonly name = 'PluginInitializationBootHook';
    constructor(private pluginLoader: IPluginLoader) {}
    public async execute(): Promise<void> {
        await this.pluginLoader.initializePlugins();
    }
}

export class PluginBootstrapBootHook implements IKernelHook {
    public readonly name = 'PluginBootstrapBootHook';
    constructor(private pluginLoader: IPluginLoader) {}
    public async execute(): Promise<void> {
        await this.pluginLoader.bootstrapPlugins();
    }
}

export class PluginReadyBootHook implements IKernelHook {
    public readonly name = 'PluginReadyBootHook';
    constructor(private pluginLoader: IPluginLoader) {}
    public async execute(): Promise<void> {
        await this.pluginLoader.readyPlugins();
    }
}
