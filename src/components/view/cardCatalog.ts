import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./card";

const category: Record<string, string> = {
    'софт-скил': 'card__category_soft',
	'другое': 'card__category_other',
    'хард-скил': 'card__category_hard',
	'дополнительное': 'card__category_additional',
	'кнопка': 'card__category_button',
};

export class CardCatalog<T> extends Card<T> {
    protected _category?: HTMLElement;
    protected _image?: HTMLImageElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._category = ensureElement<HTMLElement>(`.card__category`, container);
        this._image = ensureElement<HTMLImageElement>(`.card__image`, container);

        this.container.addEventListener('click', () => {
            this.events.emit('card:select', {id: this.id})
        })
    }

    set category(value: string) {
        this.toggleCategoryClass(value);
        this.setText(this._category, value);
    }

    get category(): string {
        return this._category.textContent;
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title);
    }

    toggleCategoryClass(value: string): void {
        if(value in category) {
            const categoryValue = category[value];
            this.toggleClass(this._category, categoryValue, true);
        }
    }
}