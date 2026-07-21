export class UseCaseResolver {
    private useCases: Map<string, any> = new Map();

    public register(name: string, useCase: any): void {
        this.useCases.set(name, useCase);
    }

    public resolve<T>(name: string): T {
        const useCase = this.useCases.get(name);
        if (!useCase) {
            throw new Error(`UseCase ${name} not found in DI container.`);
        }
        return useCase as T;
    }
}
