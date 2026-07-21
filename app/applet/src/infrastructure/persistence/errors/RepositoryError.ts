export class RepositoryError extends Error {
    constructor(message: string, public readonly cause?: Error) {
        super(message);
        this.name = 'RepositoryError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
