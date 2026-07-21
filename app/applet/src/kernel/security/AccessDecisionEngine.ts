import { IAccessDecisionEngine, IAuthorizationProvider, IPolicyEngine, ISecurityContext } from './interfaces';
import { ILogger } from '../logger/interfaces';

export class AccessDecisionEngine implements IAccessDecisionEngine {
    constructor(
        private readonly policyEngine: IPolicyEngine,
        private readonly authorizationProviders: IAuthorizationProvider[],
        private readonly logger: ILogger
    ) {}

    public async isGranted(context: ISecurityContext, resource: string, action: string): Promise<boolean> {
        if (!context.isAuthenticated()) {
            this.logger.debug(`[AccessDecisionEngine] Access denied to unauthenticated context. Resource: ${resource}, Action: ${action}`);
            return false;
        }

        const identity = context.getIdentity()!;

        // 1. Evaluate explicit system policies via PolicyEngine
        // Note: PolicyEngine might enforce system-wide ALLOW/DENY boundaries independent of roles.
        // We will assume PolicyEngine is absolute. If a DENY policy hits, it denies.
        const policyResult = this.policyEngine.evaluate(context, resource, action);
        if (policyResult) {
            // If the policy engine explicitly allows it globally based on rules, it is granted.
            return true;
        }

        // 2. Evaluate Role-Based Permissions
        for (const provider of this.authorizationProviders) {
            try {
                // Fetch roles bound to this identity (assuming role names map to IDs or provider handles it)
                const roles = await provider.getIdentityRoles(identity.id);
                
                for (const role of roles) {
                    const permissions = await provider.getRolePermissions(role.id);
                    
                    for (const permission of permissions) {
                        if (this.matches(permission.resource, resource) && this.matches(permission.action, action)) {
                            return true;
                        }
                    }
                }
            } catch (error) {
                this.logger.error(`[AccessDecisionEngine] Authorization provider '${provider.name}' failed`, error as Error);
            }
        }

        this.logger.debug(`[AccessDecisionEngine] Access denied. Identity: ${identity.id}, Resource: ${resource}, Action: ${action}`);
        return false;
    }

    private matches(pattern: string, value: string): boolean {
        if (pattern === '*') return true;
        if (pattern.endsWith('*')) {
            const prefix = pattern.slice(0, -1);
            return value.startsWith(prefix);
        }
        return pattern === value;
    }
}
