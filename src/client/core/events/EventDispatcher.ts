import { Nitro } from '../../nitro/Nitro';
import { Disposable } from '../common/disposable/Disposable';
import { IDisposable } from '../common/disposable/IDisposable';
import { NitroLogger } from '../common/logger/NitroLogger';
import { IEventDispatcher } from './IEventDispatcher';

export class EventDispatcher extends Disposable implements IEventDispatcher, IDisposable
{
    private _listeners: Map<string, Function[]>;

    constructor()
    {
        super();

        this._listeners = new Map();
    }

    protected onDispose(): void
    {
        this.removeAllListeners();

        super.onDispose();
    }

    public addEventListener(type: string, callback: Function): void
    {
        if(!type || !callback) return;

        const existing = this._listeners.get(type);

        if(existing === undefined)
        {
            this._listeners.set(type, [ callback ]);

            return;
        }

        existing.push(callback);
    }

    public removeEventListener(type: string, callback: any): void
    {
        if(!type || !callback) return;

        const existing = this._listeners.get(type);

        if(!existing || !existing.length) return;

        for(const [ index, existingCallback ] of existing.entries())
        {
            if(!existingCallback || (existingCallback !== callback)) continue;

            existing.splice(index, 1);

            if(existing.length === 0) this._listeners.delete(type);

            return;
        }
    }

    public dispatchEvent(event: Event): boolean
    {
        if(!event) return false;

        if(Nitro.instance.getConfiguration<boolean>('system.dispatcher.log')) NitroLogger.log(`DISPATCHED: ${ event.type }`, 'Event Dispatcher');

        this.processEvent(event);

        return true;
    }

    private processEvent(event: Event): void
    {
        const existing = this._listeners.get(event.type);

        if(!existing || !existing.length) return;

        const callbacks = [];

        for(const callback of existing)
        {
            if(!callback) continue;

            callbacks.push(callback);
        }

        while(callbacks.length)
        {
            try
            {
                const callback = callbacks.shift();

                callback(event);
            }

            catch (err)
            {
                NitroLogger.log(err);

                return;
            }
        }
    }

    public removeAllListeners(): void
    {
        if(!this._listeners || !this._listeners.size) return;

        for(const [ type, callbacks ] of this._listeners.entries())
        {
            if(!type || !callbacks.length) continue;

            for(const callback of callbacks)
            {
                if(!callback) continue;

                this.removeEventListener(type, callback);
            }
        }
    }
}