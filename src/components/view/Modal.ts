import { Component } from "./component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

export interface IModalView {
    content: HTMLElement;
}

export class Modal extends Component<IModalView> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this.events = events;

        this._closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.toggleClass(this.container, 'modal_active', true);
        this.events.emit('modal:open');
    }

    close() {
        this.toggleClass(this.container, 'modal_active', false);
        this.events.emit('modal:close');
    }

    // render(data: IModalView): HTMLElement {
    //     super.render(data);
    //     this.open();
    //     return this.container;
    // }

    // disabled() {
    //     this.setDisabled(this.container, true)
    // }
}