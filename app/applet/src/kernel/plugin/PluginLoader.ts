import { IPluginContext, IPluginDescriptor, IPluginLoader, IPluginRegistry } from './interfaces';
import { PluginState } from './PluginState';
import { ILogger } from '../logger/interfaces';
import { PluginDependencyValidator } from './PluginDependencyValidator';

export class PluginLoader implements IPluginLoader {
    constructor(
        private registry: IPluginRegistry,
        private validator: PluginDependencyValidator,
        private context: IPluginContext,
        private logger: ILogger
    ) {}

    public async loadPlugins(descriptors: IPluginDescriptor[]): Promise<void> {
        this.logger.info(`Starting plugin discovery and loading phase. Found ${descriptors.length} potential plugins.`);
        
        try {
            // Validate all potential plugins before registration
            this.validator.validate(descriptors);

            // Register valid plugins
            for (const descriptor of descriptors) {
                this.registry.register(descriptor);
                if (descriptor.enabled) {
                    this.registry.updateState(descriptor.manifest.id, PluginState.LOADED);
                    this.logger.info(`Loaded plugin: ${descriptor.manifest.id} (v${descriptor.manifest.version})`);
                } else {
                    this.logger.info(`Skipped disabled plugin: ${descriptor.manifest.id}`);
                }
            }
        } catch (error) {
            this.logger.fatal('Failed to load plugins due to validation error.', error as Error);
            throw error;
        }
    }

    public async initializePlugins(): Promise<void> {
        const plugins = this.getEnabledPluginsInOrder();
        
        for (const plugin of plugins) {
            if (plugin.instance.initialize) {
                try {
                    await plugin.instance.initialize(this.context);
                    this.registry.updateState(plugin.manifest.id, PluginState.INITIALIZED);
                } catch (error) {
                    this.handlePluginError(plugin, 'initialize', error as Error);
                }
            } else {
                this.registry.updateState(plugin.manifest.id, PluginState.INITIALIZED);
            }
        }
    }

    public async bootstrapPlugins(): Promise<void> {
        const plugins = this.getEnabledPluginsInOrder();

        for (const plugin of plugins) {
            if (plugin.state !== PluginState.INITIALIZED) continue;

            if (plugin.instance.bootstrap) {
                try {
                    await plugin.instance.bootstrap(this.context);
                    this.registry.updateState(plugin.manifest.id, PluginState.BOOTSTRAPPED);
                } catch (error) {
                    this.handlePluginError(plugin, 'bootstrap', error as Error);
                }
            } else {
                this.registry.updateState(plugin.manifest.id, PluginState.BOOTSTRAPPED);
            }
        }
    }

    public async readyPlugins(): Promise<void> {
        const plugins = this.getEnabledPluginsInOrder();

        for (const plugin of plugins) {
            if (plugin.state !== PluginState.BOOTSTRAPPED) continue;

            if (plugin.instance.ready) {
                try {
                    await plugin.instance.ready(this.context);
                    this.registry.updateState(plugin.manifest.id, PluginState.READY);
                } catch (error) {
                    this.handlePluginError(plugin, 'ready', error as Error);
                }
            } else {
                this.registry.updateState(plugin.manifest.id, PluginState.READY);
            }
        }
    }

    public async shutdownPlugins(): Promise<void> {
        // Shutdown in reverse order of initialization
        const plugins = this.getEnabledPluginsInOrder().reverse();

        for (const plugin of plugins) {
            if (plugin.state === PluginState.DISABLED || plugin.state === PluginState.FAILED) continue;

            if (plugin.instance.shutdown) {
                try {
                    await plugin.instance.shutdown(this.context);
                    // We don't update state to DISABLED here, just graceful shutdown.
                } catch (error) {
                    this.logger.error(`Plugin '${plugin.manifest.id}' encountered an error during shutdown.`, error as Error);
                }
            }
        }
    }

    /**
     * Helper to sort plugins topologically based on dependencies.
     * For brevity, this currently returns the plugins in registration order,
     * assuming that the descriptors were passed in a somewhat valid order.
     * In a fully complete system, this would construct a DAG and perform topological sort.
     */
    private getEnabledPluginsInOrder(): IPluginDescriptor[] {
        // Topo sort logic should be here. Returning filtered array for demonstration.
        return this.registry.getAllPlugins().filter(p => p.enabled);
    }

    private handlePluginError(plugin: IPluginDescriptor, phase: string, error: Error): void {
        this.registry.updateState(plugin.manifest.id, PluginState.FAILED);
        this.logger.fatal(`Plugin '${plugin.manifest.id}' failed during '${phase}' phase.`, error);
        throw new Error(`Plugin boot failure: ${plugin.manifest.id} at ${phase}.`);
    }
}
