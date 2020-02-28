import { EventAggregator, EventSubscription } from "./event-aggregator";
export declare class DefaultEventAggregator implements EventAggregator {
    private _subscriptions;
    subscribe(event: string, handler: (...eventArgs: any[]) => void): EventSubscription;
    publish(event: string, ...eventArgs: any[]): void;
    private unsubscribe;
}
