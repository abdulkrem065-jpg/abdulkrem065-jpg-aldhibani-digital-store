import { IKernelHook } from '../bootstrap/interfaces';
import { IServiceContainer } from '../di/interfaces';
import { ILogger } from '../logger/interfaces';
import { IEventBus } from '../eventbus/interfaces';
import { 
    ISecurityManager, 
    IPolicyEngine, 
    IAccessDecisionEngine, 
    IAuthenticationProvider, 
    IAuthorizationProvider 
} from './interfaces';
import { PolicyEngine } from './PolicyEngine';
import { AccessDecisionEngine } from './AccessDecisionEngine';
import { SecurityManager } from './SecurityManager';

export class SecurityBootHook implements IKernelHook {
    public readonly name = 'SecurityBootHook';

    constructor(
        private readonly container: IServiceContainer,
        private readonly logger: ILogger,
        private readonly eventBus: IEventBus,
        private readonly initialPolicies: any[] = [],
        private readonly authProviders: IAuthenticationProvider[] = [],
        private readonly authzProviders: IAuthorizationProvider[] = []
    ) {}

    public async execute(): Promise<void> {
        // 1. Initialize Policy Engine
        const policyEngine = new PolicyEngine(this.logger);
        if (this.initialPolicies.length > 0) {
            policyEngine.registerPolicies(this.initialPolicies);
        }
        policyEngine.freeze(); // Enforce immutable security policies

        // 2. Initialize Access Decision Engine
        const decisionEngine = new AccessDecisionEngine(policyEngine, this.authzProviders, this.logger);

        // 3. Initialize Security Manager
        const securityManager = new SecurityManager(decisionEngine, this.eventBus, this.logger);
        
        for (const provider of this.authProviders) {
            securityManager.registerAuthenticationProvider(provider);
        }

        // 4. Register into DI Container
        this.container.registerInstance<IPolicyEngine>('IPolicyEngine', policyEngine);
        this.container.registerInstance<IAccessDecisionEngine>('IAccessDecisionEngine', decisionEngine);
        this.container.registerInstance<ISecurityManager>('ISecurityManager', securityManager);

        this.logger.info('[SecurityBootHook] Security Engine subsystem initialized successfully.');
    }
}
