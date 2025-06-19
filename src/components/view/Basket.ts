import { Component} from "./component";
import { IEvents } from "../base/events";
import { ensureElement, formatNumber } from "../../utils/utils";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    valid: boolean
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._list = ensureElement<HTMLUListElement>('.basket__list', container);
        this._total = ensureElement<HTMLElement>('.basket__price', container);
        this._button =  ensureElement<HTMLButtonElement>('.basket__button', container);

        this.events = events;

        this._button.addEventListener('click', () => {
            events.emit('payFill:open')
        })
    }

    set items(items: HTMLElement[]) { 
        this._list.replaceChildren(...items);
    }

    set valid(state: boolean) {
        this.setDisabled(this._button, state);
    }

    set total(total: number) {
        this.setText(this._total, `${formatNumber(total)} синапсов`);   
    }
}