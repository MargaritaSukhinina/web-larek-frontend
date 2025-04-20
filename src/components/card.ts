import { Component } from "./base/component";
import { IProduct, TCardModal, TBasketItem } from "../types/index";
import {IEvents} from "./base/events";
import { ensureElement, formatNumber } from "../utils/utils";
import { extend } from "lodash";

interface ICardAction {
    onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
    title: string;
    category: string;
    image: string;
    price: number | null;
}

export class Card<T> extends Component<ICard<T>> {
    protected events: IEvents;
    protected _title: HTMLElement;
    protected _category?: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _price: HTMLElement;
    protected cardId: string;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardAction) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);

        if (actions?.onClick) {
            container.addEventListener('click', actions.onClick);
        }
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

    set category(value: string) {
        this.setText(this._category, value);
    }

    // get category() {
    //     return this._category.textContent || '';
    // }

    set image(value: string) {
        this.setImage(this._image, value, this.title);
    }

    set price(value: number | null) {
            if(value != null) {
                this.setText(this._price, `${formatNumber(value)} синапсов`)
            } else {
                this.setText(this._price, 'Бесценно')
            };
    } 
}

export class CardModal extends Component<TCardModal> {
    protected _title: HTMLElement;
    protected _category?: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _price: HTMLElement;
    protected _description?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _id: string;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._category = ensureElement<HTMLElement>(`.card__category`, container);
        this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
        this._price = ensureElement<HTMLElement>('.card__price', container);
        this._description = ensureElement<HTMLElement>(`.card__text`, container);
        this._button = ensureElement<HTMLButtonElement>(`.card__button`, container);
        

        this._button.addEventListener('click', () => {
            this.events.emit('add-card:submit', {id: this.id});
            this._button.textContent = 'Добавлено в корзину'
        })
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id() {
        return this.container.dataset.id || '';
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    get description() {
        return this._description.textContent;
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

    set image(value: string) {
        this.setImage(this._image, value, this.title);
    }

    set category(value: string) {
        this.setText(this._category, value);
    }
}

export class CardBasket extends Component<TBasketItem> {
    protected _button: HTMLButtonElement;
    protected index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _id: string
    
    constructor(container: HTMLElement, actions?: ICardAction) {
        super(container)

        this._button = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
        this.index = ensureElement<HTMLElement>('.basket__item-index', container);
        this._title = ensureElement<HTMLElement>(`.card__title`, container);
        this._price = ensureElement<HTMLElement>(`.card__price`, container);
        

        if (actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }
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

