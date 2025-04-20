import { Api, ApiListResponse } from './base/api';
import {IProduct, ICardData, IOrder, IOrderResult, IAppState, FormErrors} from "../types/index";
import {Model} from "./base/model";
import { Card } from './card';

export interface ICardApi {
    getCards: () => Promise<IProduct[]>;
    getCard: (id: string) => Promise<IProduct>;
    orderCards: (order: IOrder) => Promise<IOrderResult>;
}

export class AppApi extends Api implements ICardApi {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    

    getCards(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    getCard(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    orderCards(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }
}

