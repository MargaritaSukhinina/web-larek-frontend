import { Component} from "../base/component";
import { IEvents } from "../base/events";
import { createElement, ensureElement, formatNumber } from "../../utils/utils";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLUListElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._list = ensureElement<HTMLUListElement>('.basket__list');
        this._total = container.querySelector('.basket__price');
        this._button = container.querySelector('.basket__button');

        if(this._button) {
            this._button.addEventListener('click', () => {
                events.emit('payFill:open')
            })
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if(items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }))
        }
    }

    set selected(items: string[]) {
        if(items.length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    } 

    set total(total: number) {
        this.setText(this._total, formatNumber(total));
    }
}