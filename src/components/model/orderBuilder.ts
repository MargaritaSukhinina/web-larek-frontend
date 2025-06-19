import { IOrder, IOrderBailder, IOrderList, IAddress, IContacts } from "../../types";
import { Order } from "./order";
import { Model } from "./model";
import { IEvents } from "../base/events";

export class OrderBuilder extends Model<IOrderBailder> {
    protected order: IOrder;

    constructor(data: Partial<IOrderBailder>, events: IEvents) {
        super(data, events);

        this.order = new Order();
    }

    set addressUser(addressUser: IAddress) {
        this.order.payment = addressUser.payment;
        this.order.address = addressUser.address;
    }

    set contactsUser(contactsUser: IContacts) {
        this.order.email = contactsUser.email;
        this.order.phone = contactsUser.phone;
    }

    set orderList(orderList: IOrderList) {
        this.order.total = orderList.total;
        this.order.items = orderList.items;
    }

    get result(): IOrder {
        return this.order;
    }
}