import { IProduct, IProductList } from "../../types";
import { Model } from "./model";
import { IEvents } from "../base/events";

export class BasketState extends Model<IProductList> {
    protected _items: IProduct[];

    constructor(data: Partial<IProductList>, events: IEvents) {
        super(data, events);

        this._items = [];
    }

    get items(): IProduct[] {
        return this._items;
    }

    get total(): number {
        return this._items.reduce((sum, item) => {
            return item.price + sum
        }, 0)
    }

    get lenght(): number {
        return this._items.length
    }

    add(item: IProduct): void {
        const cardItem = this._items.find((card) => card.id === item.id);
        if(!cardItem) {
            this._items.push(item);
            this.emitChanges('basket-item:changed', { id: item.id});
        }
    }

    remove(id: string): void {
        this._items = this._items.filter((item) => item.id !== id);
        this.emitChanges('basket-item:changed', { id: id});
    }

    check(id: string): boolean {
        const item = this._items.find((item) => item.id === id);
        return Boolean(item);
    }

    clear(): void {
        this._items = [];
        this.emitChanges('basket-item:changed');
    }

    getIdItems(): string[] {
        return this._items.map((item) => item.id); 
    }
}