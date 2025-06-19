import { Component } from "./component";
import { IEvents } from "../base/events";
import { ensureElement, ensureAllElements } from "../../utils/utils";

interface IFormState {
    valid: boolean;
}

export class Form<T> extends Component<IFormState> {
    protected container: HTMLFormElement;
    protected _input: HTMLInputElement[];
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container);


        this._input = ensureAllElements<HTMLInputElement>('form__input', container);
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', container);
        this._errors = this.container.querySelector('.form__errors');
        this.events = events;


        this.container.addEventListener('input', () => {
          this.emitInput();
        });

        this.container.addEventListener('submit', (e: Event) => {
          e.preventDefault();
          this.events.emit(`${this.container.name}:submit`);
        });
    }

    set valid(value: boolean) {
      this.setDisabled(this._submit, !value);
    }

    get valid(): boolean {
      return this._input.every((item) => item.value.length > 1);
    }

    set error(value: string) {
      this.setText(this._errors, value);
    }

    clear(): void {
      this.container.reset();
    }

    emitInput(): void {
      this.events.emit(`${this.container.name}:input`);
    }

    render(data?: Partial<IFormState>): HTMLElement {
      const { valid, ...inputs } = data;
      super.render({ valid });
      Object.assign(this, inputs);
      return this.container;
    }
}