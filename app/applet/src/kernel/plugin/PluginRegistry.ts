import { IPluginDescriptor, IPluginRegistry } from './interfaces';
import { PluginState } from './PluginState';

export class PluginRegistry implements IPluginRegistry {
    private plugins: Map<string, IPluginDescriptor> = new Map();

    public register(descriptor: IPluginDescriptor): void {
        if (this.plugins.has(descriptor.manifest.id)) {
            throw new Error(`Plugin with ID '${descriptor.manifest.id}' is already registered.`);
        }
        
        // Default to enabled if not explicitly disabled
        descriptor.enabled = descriptor.enabled !== false;
        if (!descriptor.enabled) {
            descriptor.state = PluginState.DISABLED;
        }

        this.plugins.set(descriptor.manifest.id, descriptor);
    }

    public getPlugin(id: string): IPluginDescriptor | undefined {
        return this.plugins.get(id);
    }

    public getAllPlugins(): IPluginDescriptor[] {
        return Array.from(this.plugins.values());
    }

    public enablePlugin(id: string): void {
        const plugin = this.plugins.get(id);
        if (!plugin) {
            throw new Error(`Cannot enable plugin '${id}': Plugin not found.`);
        }
        plugin.enabled = true;
        if (plugin.state === PluginState.DISABLED) {
            plugin.state = PluginState.DISCOVERED;
        }
    }

    public disablePlugin(id: string): void {
        const plugin = this.plugins.get(id);
        if (!plugin) {
            throw new Error(`Cannot disable plugin '${id}': Plugin not found.`);
        }
        plugin.enabled = false;
        plugin.state = PluginState.DISABLED;
    }

    public updateState(id: string, state: PluginState): void {
        const plugin = this.plugins.get(id);
        if (!plugin) {
            throw new Error(`Cannot update state for plugin '${id}': Plugin not found.`);
        }
        plugin.state = state;
    }
}
