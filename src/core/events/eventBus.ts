import {EventEmitter} from 'node:events';
import {AppEvents} from './events.type';

type Handler<K extends keyof AppEvents> = (payload: AppEvents[K]) => void | Promise<void>;

const emitter = new EventEmitter();

export const emit = <K extends keyof AppEvents>(event: K, payload: AppEvents[K]): void => {
    emitter.emit(event, payload);
}

export const on = <K extends keyof AppEvents>(event: K, handler: Handler<K>): void => {
    emitter.on(event, async (payload: AppEvents[K]) => {
        try {
            await handler(payload);
        } catch (e) {
            console.error(`[event:${String(event)}]`, e);
        }
    });
}
