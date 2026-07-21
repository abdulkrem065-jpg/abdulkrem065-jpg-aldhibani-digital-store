import { Factory, IServiceContainer, IServiceDescriptor, IServiceResolver, Lifetime } from './interfaces';
import { ServiceRegistry } from './ServiceRegistry';
import { ServiceResolver } from './ServiceResolver';

export class ServiceContainer implements IServiceContainer {
    private registry: ServiceRegistry;
    private resolver: ServiceResolver | null = null;

    constructor() {
        this.registry = new ServiceRegistry();
    }

    public register<T>(identifier: string | symbol, factory: Factory<T>, lifetime?: Lifetime): void {
        this.registry.register(identifier, factory, lifetime);
    }

    public registerSingleton<T>(identifier: string | symbol, factory: Factory<T>): void {
        this.registry.registerSingleton(identifier, factory);
    }

    public registerScoped<T>(identifier: string | symbol, factory: Factory<T>): void {
        this.registry.registerScoped(identifier, factory);
    }

    public registerTransient<T>(identifier: string | symbol, factory: Factory<T>): void {
        this.registry.registerTransient(identifier, factory);
    }

    public registerInstance<T>(identifier: string | symbol, instance: T): void {
        this.registry.registerInstance(identifier, instance);
    }

    public getDescriptor(identifier: string | symbol): IServiceDescriptor | undefined {
        return this.registry.getDescriptor(identifier);
    }

    public freeze(): void {
        this.registry.freeze();
    }

    public build(): void {
        this.freeze();
        this.resolver = new ServiceResolver(this.registry, true);
    }

    private getResolver(): IServiceResolver {
        if (!this.resolver) {
            throw new Error("Container is not built. Call build() first.");
        }
        return this.resolver;
    }

    public resolve<T>(identifier: string | symbol): T {
        return this.getResolver().resolve<T>(identifier);
    }

    public resolveLazy<T>(identifier: string | symbol): () => T {
        return this.getResolver().resolveLazy<T>(identifier);
    }

    public createScope(): IServiceResolver {
        return this.getResolver().createScope();
    }
}
