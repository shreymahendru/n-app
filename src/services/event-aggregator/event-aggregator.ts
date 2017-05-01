// public
export interface EventAggregator
{
    subscribe(event: string, handler: (...eventArgs: any[]) => void): EventSubscription;
    publish(event: string, ...eventArgs: any[]): void;
} 

// public
export interface EventSubscription
{
    event: string;
    unsubscribe(): void;
}