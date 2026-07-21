import { IIdentity, ISession } from './models';
import { ISecurityContext } from './interfaces';

export class SecurityContext implements ISecurityContext {
    public readonly id: string;

    constructor(
        private readonly identity: IIdentity | null = null,
        private readonly session: ISession | null = null
    ) {
        this.id = this.generateId();
        Object.freeze(this);
    }

    public getIdentity(): IIdentity | null {
        return this.identity;
    }

    public getSession(): ISession | null {
        return this.session;
    }

    public isAuthenticated(): boolean {
        if (!this.session || !this.identity) return false;
        return this.session.expiresAt > new Date();
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
