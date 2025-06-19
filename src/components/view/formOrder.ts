import { Form } from "./Form";
import { TModalPay } from "../../types";
import { ensureElement, ensureAllElements } from "../../utils/utils";
import { IEvents } from "../base/events";

export class FormOrder extends Form<TModalPay> {
    protected buttonContainer: HTMLElement;
    protected online: HTMLButtonElement;
    protected cash: HTMLButtonElement;
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.buttonContainer = ensureElement<HTMLElement>('.order__buttons', container);
        [this.online, this.cash] = ensureAllElements<HTMLButtonElement>('.button_alt', container);
        this._address = this.container.elements.namedItem('address') as HTMLInputElement;

        this.buttonContainer.addEventListener('click', (evt) => {
            if(evt.target === this.online || evt.target === this.cash) {
                const button = evt.target as HTMLButtonElement;
                this.reset();
                this.toggleClass(button, 'button_alt-active', true);
            }
        })
    }

    toggelOnline(state = true): void {
        this.toggleClass(this.online, 'button_alt-active', state);
    }

    toggelCash(state = true): void {
        this.toggleClass(this.cash, 'button_alt-active', state);
    }

    reset(): void {
        this.toggelOnline(false);
        this.toggelCash(false);
    }

    getActive(): HTMLButtonElement | null {
        if(this.online.classList.contains('button_alt-active')) {
            return this.online;
        } else if(this.cash.classList.contains('button_alt-active')) {
            return this.cash;
        } else {
            return null;
        }
    }

    clear(): void {
        super.clear();
        this.reset();
    }

    get payment(): string {
        const buttonActive = this.getActive();
        const result = buttonActive ? buttonActive.name: '';
        return result;
    }

    get address(): string {
        return this._address.value;
    }

    set valid(value: boolean) {
        super.valid = value;
    }

    get valid(): boolean {
        const isValid = super.valid;
        return isValid && this.payment !== '';
    }
}