import { Component } from "./component";
import { IProduct, TCardModal, TBasketItem } from "../../types/index";
import {IEvents} from "../base/events";
import { ensureElement, formatNumber } from "../../utils/utils";

// interface ICardAction {
//     onClick: (event: MouseEvent) => void;
// }

export interface ICard {
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
}

export class Card<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected cardId: string;
    protected events: IEvents

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.card__title`, container);
        this._price = ensureElement<HTMLElement>(`.card__price`, container);
        this.events = events;
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id() {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title() {
        return this._title.textContent || '';
    }

    set price(value: number | null) {
            if(value != null) {
                this.setText(this._price, `${formatNumber(value)} синапсов`)
            } else {
                this.setText(this._price, 'Бесценно')
            };
    } 
}

