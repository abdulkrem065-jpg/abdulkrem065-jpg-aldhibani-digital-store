import { Factory, IServiceDescriptor, IServiceRegistry, Lifetime } from './interfaces';

export class ServiceRegistry implements IServiceRegistry {
    private descriptors: Map<string | symbol, IServiceDescriptor> = new Map();
    private isFrozen: boolean = false;

    public register<T>(identifier: string | symbol, factory: Factory<T>, lifetime: Lifetime = Lifetime.TRANSIENT): void {
        if (this.isFrozen) {
            throw new Error(`Cannot register service '${String(identifier)}': Registry is frozen.`);
        }
        if (this.descriptors.has(identifier)) {
            throw new Error(`Service '${String(identifier)}' is already registered.`);
        }
        this.descriptors.set(identifier, { identifier, factory, lifetime });
    }

    public registerSingleton<T>(identifier: string | symbol, factory: Factory<T>): void {
        this.register(identifier, factory, Lifetime.SINGLETON);
    }

    public registerScoped<T>(identifier: string | symbol, factory: Factory<T>): void {
        this.register(identifier, factory, Lifetime.SCOPED);
    }

    public registerTransient<T>(identifier: string | symbol, factory: Factory<T>): void {
        this.register(identifier, factory, Lifetime.TRANSIENT);
    }

    public registerInstance<T>(identifier: string | symbol, instance: T): void {
        this.register(identifier, () => instance, Lifetime.SINGLETON);
    }

    public getDescriptor(identifier: string | symbol): IServiceDescriptor | undefined {
        return this.descriptors.get(identifier);
    }

    public freeze(): void {
        this.isFrozen = true;
    }
}
