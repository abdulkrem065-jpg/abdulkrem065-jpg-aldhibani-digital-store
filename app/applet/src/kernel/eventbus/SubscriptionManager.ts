import { ISubscription } from './interfaces';

export class SubscriptionManager {
    private subscriptions: ISubscription[] = [];

    public add(subscription: ISubscription): void {
        this.subscriptions.push(subscription);
    }

    public unsubscribeAll(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
        this.subscriptions = [];
    }
}
