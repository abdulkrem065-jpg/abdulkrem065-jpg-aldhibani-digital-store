import { IPluginDescriptor, IPluginRegistry } from './interfaces';

export class PluginDependencyValidator {
    constructor(
        private registry: IPluginRegistry,
        private currentCoreVersion: string
    ) {}

    public validate(descriptors: IPluginDescriptor[]): void {
        const availablePluginIds = new Set(descriptors.map(d => d.manifest.id));

        for (const descriptor of descriptors) {
            if (!descriptor.enabled) continue;

            const manifest = descriptor.manifest;

            // Validate Core Version compatibility
            if (!this.isCompatible(this.currentCoreVersion, manifest.coreVersion)) {
                throw new Error(`Plugin '${manifest.id}' requires core version '${manifest.coreVersion}' but current core version is '${this.currentCoreVersion}'.`);
            }

            // Validate Plugin Dependencies
            if (manifest.dependencies) {
                for (const [depId, depVersion] of Object.entries(manifest.dependencies)) {
                    const dependency = this.registry.getPlugin(depId) || descriptors.find(d => d.manifest.id === depId);
                    
                    if (!dependency) {
                        throw new Error(`Plugin '${manifest.id}' requires missing dependency '${depId}'.`);
                    }

                    if (!dependency.enabled) {
                        throw new Error(`Plugin '${manifest.id}' requires dependency '${depId}' which is currently disabled.`);
                    }

                    if (!this.isCompatible(dependency.manifest.version, depVersion)) {
                        throw new Error(`Plugin '${manifest.id}' requires dependency '${depId}' version '${depVersion}' but version '${dependency.manifest.version}' is available.`);
                    }
                }
            }
        }
    }

    /**
     * A highly simplified version check.
     * In a full implementation, this should parse semantic versioning ranges (e.g. ^1.0.0).
     */
    private isCompatible(availableVersion: string, requiredVersion: string): boolean {
        // Simplified exact matching or prefix matching for demonstration
        if (requiredVersion === '*') return true;
        if (availableVersion === requiredVersion) return true;
        
        // Simple major version compatibility (e.g., ^1.0.0 -> matches 1.x.x)
        if (requiredVersion.startsWith('^')) {
            const reqMajor = requiredVersion.slice(1).split('.')[0];
            const availMajor = availableVersion.split('.')[0];
            return reqMajor === availMajor;
        }

        return false;
    }
}
