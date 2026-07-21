export interface IPermission {
    readonly resource: string;
    readonly action: string;
}

export interface IRole {
    readonly id: string;
    readonly name: string;
    readonly permissions: readonly IPermission[];
}

export interface IIdentity {
    readonly id: string;
    readonly tenantId?: string;
    readonly roles: readonly string[];
    readonly attributes: Readonly<Record<string, any>>;
}

export interface ISession {
    readonly id: string;
    readonly identityId: string;
    readonly expiresAt: Date;
    readonly metadata: Readonly<Record<string, any>>;
}

export interface ISecurityPolicy {
    readonly id: string;
    readonly effect: 'ALLOW' | 'DENY';
    readonly resource: string;
    readonly action: string;
    readonly conditions?: Readonly<Record<string, any>>;
}
