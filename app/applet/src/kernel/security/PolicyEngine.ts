import { ISecurityPolicy } from './models';
import { IPolicyEngine, ISecurityContext } from './interfaces';
import { ILogger } from '../logger/interfaces';

export class PolicyEngine implements IPolicyEngine {
    private policies: ISecurityPolicy[] = [];
    private isFrozen: boolean = false;

    constructor(private readonly logger: ILogger) {}

    public registerPolicies(policies: ISecurityPolicy[]): void {
        if (this.isFrozen) {
            throw new Error('Cannot register policies: PolicyEngine is frozen.');
        }

        const immutablePolicies = policies.map(p => this.deepFreeze(p));
        this.policies.push(...immutablePolicies);
    }

    public freeze(): void {
        this.isFrozen = true;
        this.logger.debug('[PolicyEngine] Policies frozen.');
    }

    public evaluate(context: ISecurityContext, resource: string, action: string): boolean {
        // Find policies that match the resource and action.
        // We evaluate explicit DENY first. If any DENY matches, return false.
        // If no DENY matches, and at least one ALLOW matches, return true.
        // Default is DENY.
        
        let isAllowed = false;

        for (const policy of this.policies) {
            if (this.matches(policy.resource, resource) && this.matches(policy.action, action)) {
                if (policy.effect === 'DENY') {
                    return false;
                }
                if (policy.effect === 'ALLOW') {
                    isAllowed = true;
                }
            }
        }

        return isAllowed;
    }

    private matches(pattern: string, value: string): boolean {
        if (pattern === '*') return true;
        
        // Simple wildcard prefix matching (e.g., 'user:*' matches 'user:read')
        if (pattern.endsWith('*')) {
            const prefix = pattern.slice(0, -1);
            return value.startsWith(prefix);
        }

        return pattern === value;
    }

    private deepFreeze<T>(obj: T): T {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        Object.keys(obj as object).forEach(prop => {
            const val = (obj as any)[prop];
            if (typeof val === 'object' && val !== null) {
                this.deepFreeze(val);
            }
        });

        return Object.freeze(obj);
    }
}
