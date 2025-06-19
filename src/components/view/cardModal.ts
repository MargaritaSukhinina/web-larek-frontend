import { CardCatalog } from "./cardCatalog";
import { TCardModal } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class CardModal extends CardCatalog<TCardModal> {
    protected _description?: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._description = ensureElement<HTMLElement>(`.card__text`, container);
        this._button = ensureElement<HTMLButtonElement>('.card__button', container);

        this._button.addEventListener('click', () => {
            this.events.emit('add-card:submit', {id: this.id});
        })
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set valid(state: boolean) {
        this.setDisabled(this._button, !state);
    }

    get valid(): boolean {
        return !this._button.disabled;
    }

    set state(state: boolean) {
        if(this.valid) {
            this.setDisabled(this._button, !state);
        }
    }
}