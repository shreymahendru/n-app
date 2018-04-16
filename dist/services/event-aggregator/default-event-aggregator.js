"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class DefaultEventAggregator {
    constructor() {
        this._subscriptions = {};
    }
    subscribe(event, handler) {
        n_defensive_1.given(event, "event").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(handler, "handler").ensureHasValue();
        event = event.trim();
        if (!this._subscriptions[event])
            this._subscriptions[event] = new Array();
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
    publish(event, ...eventArgs) {
        n_defensive_1.given(event, "event").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        event = event.trim();
        if (!this._subscriptions[event])
            return;
        this._subscriptions[event].forEach(t => t.handler(...eventArgs));
    }
    // Called dynamically by EventSubscription class (internal)
    unsubscribe(event, subscription) {
        n_defensive_1.given(event, "event").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        event = event.trim();
        if (!this._subscriptions[event])
            return;
        this._subscriptions[event].remove(subscription);
    }
}
exports.DefaultEventAggregator = DefaultEventAggregator;
class DefaultEventSubscription {
    constructor(event, eventManager, subscription) {
        this._isUnsubscribed = false;
        this._event = event;
        this._eventManager = eventManager;
        this._subscription = subscription;
    }
    get event() { return this._event; }
    unsubscribe() {
        if (this._isUnsubscribed)
            return;
        this._eventManager.unsubscribe(this._event, this._subscription);
        this._isUnsubscribed = true;
    }
}
class DefaultEventSubscriptionInternal {
}
//# sourceMappingURL=default-event-aggregator.js.map