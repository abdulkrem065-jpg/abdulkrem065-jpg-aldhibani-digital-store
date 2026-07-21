export interface IConfiguration {
    get<T>(key: string, defaultValue?: T): T;
    has(key: string): boolean;
    getAll(): Record<string, any>;
    reload(): Promise<void>;
}

export interface IConfigurationSource {
    name: string;
    load(): Promise<Record<string, any>>;
}

export interface IConfigurationValidator {
    validate(config: Record<string, any>): void;
}
