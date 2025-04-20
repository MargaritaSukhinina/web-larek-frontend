import {Component} from "../base/component";
import {IEvents} from "../base/events";
import {ensureElement} from "../../utils/utils";

interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends Component<IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;
    // protected _form: HTMLFormElement;
    // protected formName: string;
    // protected _handleSubmit: Function; 

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        //this._form = this.container.querySelector('.form');
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
       // this.formName = this._form.getAttribute('name');
    //     this._form.addEventListener('submit', (evt) => {
		// 	evt.preventDefault();
		// 	this.events.emit(`${this.formName}:submit`, {
		// 		submitCallback: this.handleSubmit,
		// 	});
		// });
      this.container.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        const field = target.name as keyof T;
        const value = target.value;

        this.container.addEventListener('submit', (e: Event) => {
          e.preventDefault();
          this.events.emit(`${this.container.name}:submit`);
        });

        this.inputChange(field, value);

      })
    }

    protected inputChange(field: keyof T, value: string) {
      this.events.emit(`${this.container.name}.${String(field)}:change`, {
        field,
        value});
    }

    set valid(value: boolean) {
      this._submit.disabled = !value;
    }

    set errors(value: string) {
      this.setText(this._errors, value);
    }

  //   set valid(isValid: boolean) {
	// 	this._submit.classList.toggle('button:disabled', !isValid);
	// 	this._submit.disabled = !isValid;
	// }

  //   get form() {
	// 	return this._form;
	// }

  //   set handleSubmit(submitFunction: Function) {
	// 	this._handleSubmit = submitFunction;
	// }
}