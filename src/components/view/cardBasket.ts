import { TBasketItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./card";

export class CardBasket extends Card<TBasketItem> {
    protected _button: HTMLButtonElement;
    protected _index: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._index = ensureElement<HTMLElement>('.basket__item-index', container);
        this._button = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this._button.addEventListener('click', () => {
            this.events.emit('cardBasket:delete', {id: this.id});
        })
    }

    set index(value: number) {
        this.setText(this._index, value);
    }
}