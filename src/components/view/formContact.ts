import { Form } from "./Form";
import { TModalContacts } from "../../types";
import { IEvents } from "../base/events";

export class FormContact extends Form<TModalContacts> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._email = this.container.elements.namedItem('email') as HTMLInputElement;
        this._phone = this.container.elements.namedItem('phone') as HTMLInputElement;
    }

    get email(): string {
        return this._email.value;
    }

    get phone(): string {
        return this._phone.value;
    }
}