import { IOrder, TOrderData, Pay } from "../../types";

export class Order implements IOrder {
    protected _payment: Pay;
    protected _address: string;
    protected _email: string;
    protected _phone: string;
    protected _total: number;
    protected _items: string[];

    set payment(value: Pay) {
        this._payment = value;
    }

    set address(value: string) {
        this._address = value;
    }

    set email(value: string) {
        this._email = value;
    }

    set phone(value: string) {
        this._phone = value;
    }

    set total(value: number) {
        this._total = value;
    }

    set items(value: string[]) {
        this._items = value;
    }

    readyOrder(): TOrderData {
        return {
            payment: this._payment,
            address: this._address,
            email: this._email,
            phone: this._phone,
            total: this._total,
            items: this._items
        }
    }
}