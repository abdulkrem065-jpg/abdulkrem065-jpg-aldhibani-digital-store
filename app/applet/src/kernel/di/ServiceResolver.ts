import { IServiceRegistry, IServiceResolver, Lifetime } from './interfaces';

export class ServiceResolver implements IServiceResolver {
    private singletons: Map<string | symbol, any>;
    private scopedInstances: Map<string | symbol, any>;
    private resolutionStack: Set<string | symbol> = new Set();

    constructor(
        private registry: IServiceRegistry,
        private isRoot: boolean = true,
        singletons?: Map<string | symbol, any>
    ) {
        this.singletons = singletons || new Map();
        this.scopedInstances = new Map();
    }

    public resolve<T>(identifier: string | symbol): T {
        const descriptor = this.registry.getDescriptor(identifier);
        
        if (!descriptor) {
            throw new Error(`Cannot resolve service '${String(identifier)}': Not registered.`);
        }

        if (this.resolutionStack.has(identifier)) {
            const path = Array.from(this.resolutionStack).map(String).join(' -> ');
            throw new Error(`Circular dependency detected: ${path} -> ${String(identifier)}`);
        }

        if (descriptor.lifetime === Lifetime.SINGLETON) {
            if (this.singletons.has(identifier)) {
                return this.singletons.get(identifier);
            }
        } else if (descriptor.lifetime === Lifetime.SCOPED) {
            if (this.isRoot) {
                throw new Error(`Cannot resolve scoped service '${String(identifier)}' from the root container. Create a scope first.`);
            }
            if (this.scopedInstances.has(identifier)) {
                return this.scopedInstances.get(identifier);
            }
        }

        this.resolutionStack.add(identifier);

        try {
            const instance = descriptor.factory(this);
            
            if (descriptor.lifetime === Lifetime.SINGLETON) {
                this.singletons.set(identifier, instance);
            } else if (descriptor.lifetime === Lifetime.SCOPED) {
                this.scopedInstances.set(identifier, instance);
            }

            return instance;
        } finally {
            this.resolutionStack.delete(identifier);
        }
    }

    public resolveLazy<T>(identifier: string | symbol): () => T {
        return () => this.resolve<T>(identifier);
    }

    public createScope(): IServiceResolver {
        return new ServiceResolver(this.registry, false, this.singletons);
    }
}
