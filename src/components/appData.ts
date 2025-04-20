
import { Card } from "./card";
import { Model } from "./base/model";
import { IEvents } from "./base/events";
import { IAppState, IProduct, ICardData, IOrder, TBasketItem, TCardModal } from "../types";

export type CatalogChangeEvent = {
    catalog: IProduct[];
};

export class CardData implements ICardData {
    protected _cards: IProduct[];
    protected _preview: string | null;
    protected event: IEvents;

    constructor(event: IEvents) {
        this.event = event;
    }
    
    set cards(cards: IProduct[]) {
        this._cards = cards;
        this.event.emit('cards:changed');
    }

    get cards () {
        return this._cards;
    }

    getCard(cardId: string) {
        return this._cards.find((item) => item.id === cardId)
    }

    set preview(cardId: string | null) {
        if (!cardId) {
            this._preview = null;
            return;
        }
        const selectedCard = this.getCard(cardId);
        if (selectedCard) {
            this._preview = cardId;
            this.event.emit('card:select')
        }
    }

    get preview () {
        return this._preview;
    }

    setPreview(item: Card<TCardModal>) {
        this.preview = item.id;
        this.event.emit('card:select', item);
    }

    deleteCard(cardId: string, payload: Function | null = null): void {
        this._cards = this._cards.filter(card => card.id !== cardId);

        if(payload) {
            payload();
        } else {
            this.event.emit('cardBasket:delete')
        }
    }
}

interface IBasketModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

export class BasketModel implements IBasketModel {
    protected event: IEvents;

    constructor(event: IEvents) {
        this.event = event;
    }
    
    items: Map<string, number> = new Map;

    add(id: string): void {
        if(!this.items.has(id)) this.items.set(id, 0);
        this.items.set(id, this.items.get(id)! + 1);
    }

    remove(id: string): void {
       if(!this.items.has(id)) return;
       if(this.items.get(id)! > 0) {
        this.items.set(id, this.items.get(id)! - 1);
        if(this.items.get(id) === 0) this.items.delete(id);
        }
    }
}