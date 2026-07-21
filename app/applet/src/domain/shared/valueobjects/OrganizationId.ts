import { EntityId } from './EntityId';

export class OrganizationId extends EntityId {
    constructor(value: string) {
        super(value);
        Object.freeze(this);
    }
}
