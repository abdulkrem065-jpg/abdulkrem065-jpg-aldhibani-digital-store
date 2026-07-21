import { UseCaseResolver } from './UseCaseResolver';

export class ApiDependencyInjectionIntegration {
    private static resolver: UseCaseResolver = new UseCaseResolver();

    public static getResolver(): UseCaseResolver {
        return this.resolver;
    }

    public static configure(resolver: UseCaseResolver): void {
        this.resolver = resolver;
    }
}
