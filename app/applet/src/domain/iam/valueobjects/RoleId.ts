import { EntityId } from '../../shared/valueobjects/EntityId';

export class RoleId extends EntityId {
    constructor(value: string) {
        super(value);
        Object.freeze(this);
    }
}
