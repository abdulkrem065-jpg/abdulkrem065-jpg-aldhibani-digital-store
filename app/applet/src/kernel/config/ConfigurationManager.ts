import { IConfiguration, IConfigurationSource, IConfigurationValidator } from './interfaces';

export class ConfigurationManager implements IConfiguration {
    private config: Record<string, any> = {};
    private isFrozen = false;

    public async load(sources: IConfigurationSource[]): Promise<void> {
        if (this.isFrozen) {
            throw new Error("Configuration is frozen and cannot be modified.");
        }

        let mergedConfig = {};
        for (const source of sources) {
            const sourceConfig = await source.load();
            mergedConfig = this.deepMerge(mergedConfig, sourceConfig);
        }
        
        this.config = mergedConfig;
    }

    public validate(validator: IConfigurationValidator): void {
        validator.validate(this.config);
    }

    public freeze(): void {
        this.config = this.deepFreeze(this.config);
        this.isFrozen = true;
    }

    public get<T>(key: string, defaultValue?: T): T {
        const keys = key.split('.');
        let current = this.config;
        for (const k of keys) {
            if (current === undefined || current === null) {
                if (defaultValue !== undefined) {
                    return defaultValue;
                }
                return undefined as any;
            }
            current = current[k];
        }
        if (current === undefined && defaultValue !== undefined) {
            return defaultValue;
        }
        return current as any as T;
    }

    public has(key: string): boolean {
        return this.get<any>(key) !== undefined;
    }

    public getAll(): Record<string, any> {
        return this.config;
    }

    public async reload(): Promise<void> {
        throw new Error("Hot reload is explicitly forbidden by QEOS Core Kernel specification.");
    }

    private deepMerge(target: any, source: any): any {
        if (typeof target !== 'object' || target === null) return source;
        if (typeof source !== 'object' || source === null) return source;

        const output = { ...target };
        Object.keys(source).forEach(key => {
            if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = this.deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
        return output;
    }

    private deepFreeze(object: any): any {
        const propNames = Object.getOwnPropertyNames(object);
        for (const name of propNames) {
            const value = object[name];
            if (value && typeof value === "object") {
                this.deepFreeze(value);
            }
        }
        return Object.freeze(object);
    }
}
