import { 
    ISecurityManager, 
    ISecurityContext, 
    IAuthenticationProvider, 
    IAuthorizationProvider, 
    IAccessDecisionEngine,
    IPolicyEngine
} from './interfaces';
import { SecurityContext } from './SecurityContext';
import { ILogger } from '../logger/interfaces';
import { IEventBus } from '../eventbus/interfaces';
import { BaseEvent } from '../eventbus/BaseEvent';

export class AuthenticationSuccessEvent extends BaseEvent<{ identityId: string, sessionId: string }> {
    constructor(identityId: string, sessionId: string) {
        super('security.authentication.success', { identityId, sessionId });
    }
}

export class AuthenticationFailureEvent extends BaseEvent<{ provider: string, reason: string }> {
    constructor(provider: string, reason: string) {
        super('security.authentication.failure', { provider, reason });
    }
}

export class AccessDeniedEvent extends BaseEvent<{ identityId?: string, resource: string, action: string }> {
    constructor(resource: string, action: string, identityId?: string) {
        super('security.access.denied', { identityId, resource, action });
    }
}

export class SecurityManager implements ISecurityManager {
    private authProviders: Map<string, IAuthenticationProvider> = new Map();

    constructor(
        private readonly decisionEngine: IAccessDecisionEngine,
        private readonly eventBus: IEventBus,
        private readonly logger: ILogger
    ) {}

    public registerAuthenticationProvider(provider: IAuthenticationProvider): void {
        if (this.authProviders.has(provider.name)) {
            throw new Error(`Authentication provider '${provider.name}' is already registered.`);
        }
        this.authProviders.set(provider.name, provider);
        this.logger.debug(`[SecurityManager] Registered authentication provider: ${provider.name}`);
    }

    public async authenticate(providerName: string, credentials: any): Promise<ISecurityContext> {
        const provider = this.authProviders.get(providerName);
        if (!provider) {
            throw new Error(`Authentication provider '${providerName}' not found.`);
        }

        try {
            const { identity, session } = await provider.authenticate(credentials);
            const context = new SecurityContext(identity, session);
            
            this.eventBus.dispatchAsync(new AuthenticationSuccessEvent(identity.id, session.id));
            this.logger.info(`[SecurityManager] Authentication successful for identity: ${identity.id}`);
            
            return context;
        } catch (error) {
            this.eventBus.dispatchAsync(new AuthenticationFailureEvent(providerName, (error as Error).message));
            this.logger.warn(`[SecurityManager] Authentication failed using provider '${providerName}'`, error as Error);
            throw new Error('Authentication failed.');
        }
    }

    public async validateContext(sessionId: string): Promise<ISecurityContext | null> {
        for (const provider of this.authProviders.values()) {
            try {
                const result = await provider.validateSession(sessionId);
                if (result) {
                    return new SecurityContext(result.identity, result.session);
                }
            } catch (error) {
                this.logger.error(`[SecurityManager] Session validation failed for provider '${provider.name}'`, error as Error);
            }
        }
        return null;
    }

    public async logout(context: ISecurityContext): Promise<void> {
        const session = context.getSession();
        if (session) {
            for (const provider of this.authProviders.values()) {
                try {
                    await provider.revokeSession(session.id);
                } catch (error) {
                    this.logger.warn(`[SecurityManager] Error revoking session from provider '${provider.name}'`, error as Error);
                }
            }
            this.logger.info(`[SecurityManager] Session revoked: ${session.id}`);
        }
    }

    public async authorize(context: ISecurityContext, resource: string, action: string): Promise<void> {
        const isGranted = await this.decisionEngine.isGranted(context, resource, action);
        if (!isGranted) {
            const identityId = context.getIdentity()?.id;
            this.eventBus.dispatchAsync(new AccessDeniedEvent(resource, action, identityId));
            throw new Error(`Access denied. Action '${action}' on resource '${resource}' is not permitted.`);
        }
    }
}
