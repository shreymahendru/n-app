import { EventAggregator, EventSubscription } from "./event-aggregator";
import { given } from "@nivinjoseph/n-defensive";


export class DefaultEventAggregator implements EventAggregator
{
    private _subscriptions: { [index: string]: Array<DefaultEventSubscriptionInternal> } = {};


    public subscribe(event: string, handler: (...eventArgs: any[]) => void): EventSubscription
    {
        given(event, "event").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        given(handler, "handler").ensureHasValue();
        
        event = event.trim();
        
        if (!this._subscriptions[event])
            this._subscriptions[event] = new Array<DefaultEventSubscriptionInternal>();

        let eventSubscriptions = this._subscriptions[event];

        let existingRegistration = eventSubscriptions.find(t => t.handler === handler);
        if (existingRegistration)
            return existingRegistration.subscription;

        let eventSubscriptionInternal = new DefaultEventSubscriptionInternal();
        eventSubscriptionInternal.handler = handler;
        eventSubscriptionInternal.subscription = new DefaultEventSubscription(event, this, eventSubscriptionInternal);
        eventSubscriptions.push(eventSubscriptionInternal);

        return eventSubscriptionInternal.subscription;
    }

    public publish(event: string, ...eventArgs: any[]): void
    {
        given(event, "event").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        
        event = event.trim();
        
        if (!this._subscriptions[event])
            return;

        this._subscriptions[event].forEach(t => t.handler(...eventArgs));
    }

    
    // Called dynamically by EventSubscription class (internal)
    // @ts-ignore
    private unsubscribe(event: string, subscription: any): void
    {
        given(event, "event").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());

        event = event.trim();
        
        if (!this._subscriptions[event])
            return;

        this._subscriptions[event].remove(subscription);
    }
}

class DefaultEventSubscription implements EventSubscription
{
    private _event: string;
    private _eventManager: any;
    private _subscription: Object;
    private _isUnsubscribed = false;


    public get event(): string { return this._event; }


    constructor(event: string, eventManager: any, subscription: Object)
    {
        this._event = event;
        this._eventManager = eventManager;
        this._subscription = subscription;
    }


    public unsubscribe(): void
    {
        if (this._isUnsubscribed) return;

        this._eventManager.unsubscribe(this._event, this._subscription);
        this._isUnsubscribed = true;
    }
}

class DefaultEventSubscriptionInternal
{
    public handler: (...eventArgs: any[]) => void;
    public subscription: EventSubscription;
}