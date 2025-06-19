import { Component } from "./component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

interface ISuccess {
    total: number;
}

export class Success extends Component<ISuccess> {
    protected _button: HTMLButtonElement;
    protected description: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._button = ensureElement<HTMLButtonElement>('.order-success__close', container);
        this.description = ensureElement<HTMLElement>('.order-success__description', container);
        this.events = events;

        this._button.addEventListener('click', () => {
            this.events.emit('success:submit')
        })
    }

    set total(value: number) {
        const descr = `Списано ${value} синапсов`;
        this.setText(this.description, descr);
    }
}