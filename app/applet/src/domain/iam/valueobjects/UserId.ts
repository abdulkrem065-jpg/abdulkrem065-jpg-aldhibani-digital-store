import { EntityId } from '../../shared/valueobjects/EntityId';

export class UserId extends EntityId {
    constructor(value: string) {
        super(value);
        Object.freeze(this);
    }
}
