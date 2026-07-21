import { EntityId } from '../../shared/valueobjects/EntityId';

export class PermissionId extends EntityId {
    constructor(value: string) {
        super(value);
        Object.freeze(this);
    }
}
