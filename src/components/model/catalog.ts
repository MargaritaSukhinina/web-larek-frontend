import { Model } from "./model";
import { IProduct, IProductList } from "../../types";
import { IEvents } from "../base/events";

export class Catalog extends Model<IProductList> {
    protected catalog: IProduct[];

    constructor(data: Partial<IProductList>, events: IEvents) {
        super(data, events);
    }

    set items(cards: IProduct[]) {
        this.catalog = cards;
        this.emitChanges('items:changed', this.catalog);
    }

    get items(): IProduct[] {
        return this.catalog;
    }

    getId(id: string): IProduct {
        return this.catalog.find((item) => item.id === id);
    }
}