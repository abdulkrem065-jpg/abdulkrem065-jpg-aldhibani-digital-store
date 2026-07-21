import { IIdentity, IPermission, IRole, ISession, ISecurityPolicy } from './models';

export interface ISecurityContext {
    readonly id: string;
    getIdentity(): IIdentity | null;
    getSession(): ISession | null;
    isAuthenticated(): boolean;
}

export interface IAuthenticationProvider {
    readonly name: string;
    authenticate(credentials: any): Promise<{ identity: IIdentity; session: ISession }>;
    validateSession(sessionId: string): Promise<{ identity: IIdentity; session: ISession } | null>;
    revokeSession(sessionId: string): Promise<void>;
}

export interface IAuthorizationProvider {
    readonly name: string;
    getIdentityRoles(identityId: string): Promise<IRole[]>;
    getRolePermissions(roleId: string): Promise<IPermission[]>;
}

export interface IPolicyEngine {
    registerPolicies(policies: ISecurityPolicy[]): void;
    evaluate(context: ISecurityContext, resource: string, action: string): boolean;
}

export interface IAccessDecisionEngine {
    isGranted(context: ISecurityContext, resource: string, action: string): Promise<boolean>;
}

export interface ISecurityManager {
    authenticate(providerName: string, credentials: any): Promise<ISecurityContext>;
    validateContext(sessionId: string): Promise<ISecurityContext | null>;
    logout(context: ISecurityContext): Promise<void>;
    authorize(context: ISecurityContext, resource: string, action: string): Promise<void>;
}
