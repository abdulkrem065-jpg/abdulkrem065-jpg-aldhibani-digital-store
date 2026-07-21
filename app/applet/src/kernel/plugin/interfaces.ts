import { IServiceContainer, IServiceResolver } from '../di/interfaces';
import { IEventBus } from '../eventbus/interfaces';
import { ILogger } from '../logger/interfaces';
import { PluginState } from './PluginState';

export interface IPluginManifest {
    id: string;
    name: string;
    version: string;
    coreVersion: string;
    dependencies?: Record<string, string>;
}

export interface IPluginContext {
    container: IServiceContainer; // Available during initialization for registration
    resolver: IServiceResolver; // Available for resolving dependencies
    eventBus: IEventBus;
    logger: ILogger;
}

export interface IPlugin {
    initialize?(context: IPluginContext): Promise<void>;
    bootstrap?(context: IPluginContext): Promise<void>;
    ready?(context: IPluginContext): Promise<void>;
    shutdown?(context: IPluginContext): Promise<void>;
}

export interface IPluginDescriptor {
    manifest: IPluginManifest;
    instance: IPlugin;
    state: PluginState;
    enabled: boolean;
}

export interface IPluginRegistry {
    register(descriptor: IPluginDescriptor): void;
    getPlugin(id: string): IPluginDescriptor | undefined;
    getAllPlugins(): IPluginDescriptor[];
    enablePlugin(id: string): void;
    disablePlugin(id: string): void;
    updateState(id: string, state: PluginState): void;
}

export interface IPluginLoader {
    loadPlugins(descriptors: IPluginDescriptor[]): Promise<void>;
    initializePlugins(): Promise<void>;
    bootstrapPlugins(): Promise<void>;
    readyPlugins(): Promise<void>;
    shutdownPlugins(): Promise<void>;
}
