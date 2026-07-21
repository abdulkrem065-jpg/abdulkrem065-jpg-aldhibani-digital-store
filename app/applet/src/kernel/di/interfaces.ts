export enum Lifetime {
    SINGLETON = 'SINGLETON',
    SCOPED = 'SCOPED',
    TRANSIENT = 'TRANSIENT'
}

export interface IServiceResolver {
    resolve<T>(identifier: string | symbol): T;
    resolveLazy<T>(identifier: string | symbol): () => T;
    createScope(): IServiceResolver;
}

export type Factory<T> = (resolver: IServiceResolver) => T;

export interface IServiceDescriptor<T = any> {
    identifier: string | symbol;
    lifetime: Lifetime;
    factory: Factory<T>;
}

export interface IServiceRegistry {
    register<T>(identifier: string | symbol, factory: Factory<T>, lifetime?: Lifetime): void;
    registerSingleton<T>(identifier: string | symbol, factory: Factory<T>): void;
    registerScoped<T>(identifier: string | symbol, factory: Factory<T>): void;
    registerTransient<T>(identifier: string | symbol, factory: Factory<T>): void;
    registerInstance<T>(identifier: string | symbol, instance: T): void;
    getDescriptor(identifier: string | symbol): IServiceDescriptor | undefined;
    freeze(): void;
}

export interface IServiceContainer extends IServiceResolver, IServiceRegistry {
    build(): void;
}
