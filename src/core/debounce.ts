import { given } from "@nivinjoseph/n-defensive";
import { Delay } from "@nivinjoseph/n-util";

// public
export function debounce(delayMs: number): Function;
export function debounce(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
export function debounce(delayMsOrTarget?: any, propertyKey?: string, descriptor?: PropertyDescriptor): any
{
    given(delayMsOrTarget, "delayMsOrTarget").ensureHasValue();
    if (typeof delayMsOrTarget === "number")
    {
        const delay = delayMsOrTarget;

        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor)
        {
            given(target, "target").ensureHasValue().ensureIsObject();
            given(propertyKey, "propertyKey").ensureHasValue().ensureIsString();
            given(descriptor, "descriptor").ensureHasValue().ensureIsObject();

            const original = descriptor.value;

            descriptor.value = async function (...params: any[])
            {
                const activeKey = `_$_${propertyKey}_isActive`;

                if (!this[activeKey])
                {
                    this[activeKey] = true;

                    try
                    {
                        return await (original as Function).call(this, ...params);
                    }
                    finally
                    {
                        await Delay.milliseconds(delay);
                        this[activeKey] = false;
                    }

                }
            };
        };
    }
    else
    {
        given(delayMsOrTarget, "delayMsOrTarget").ensureIsObject();
        given(propertyKey, "propertyKey").ensureHasValue().ensureIsString();
        given(descriptor, "descriptor").ensureHasValue().ensureIsObject();

        const original = descriptor.value;

        descriptor.value = async function (...params: any[])
        {
            const activeKey = `_$_${propertyKey}_isActive`;

            if (!this[activeKey])
            {
                this[activeKey] = true;

                try
                {
                    return await (original as Function).call(this, ...params);
                }
                finally
                {
                    this[activeKey] = false;
                }
            }
        };
    }
}