import { IEvents } from "../base/events";

export const isModel = (object: unknown): object is Model<any> => {
    return object instanceof Model;
}

export abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    emitChanges(event: string, payload?: Object) {
        this.events.emit(event, payload ?? {});
    }
}