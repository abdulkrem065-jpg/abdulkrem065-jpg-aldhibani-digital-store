import { EntityId } from './EntityId';

export class BranchId extends EntityId {
    constructor(value: string) {
        super(value);
        Object.freeze(this);
    }
}
