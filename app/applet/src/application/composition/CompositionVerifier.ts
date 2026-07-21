export class CompositionVerifier {
    public static verify(state: any): void {
        if (!state.supabase) {
            throw new Error('Composition Verification Failed: Infrastructure (Supabase) not registered.');
        }
        if (!state.repositories || Object.keys(state.repositories).length === 0) {
            throw new Error('Composition Verification Failed: Repositories not registered.');
        }
        if (!state.useCases || Object.keys(state.useCases).length === 0) {
            throw new Error('Composition Verification Failed: Use Cases not registered.');
        }
        if (!state.api) {
            throw new Error('Composition Verification Failed: API Foundation not registered.');
        }
        console.log('[CompositionVerifier] Dependency graph verified. No circular dependencies detected.');
    }
}
