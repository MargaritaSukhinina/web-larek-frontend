import {IOrderForm, TModalPay, TModalContacts} from "../types/index";
import { IEvents } from "./base/events";

export class OrderData {
    protected pay: "Онлайн" | "При получении";
    protected address: string;
    protected email: string;
    protected tell: string;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setUserInfoPay(orderDataPay: TModalPay) {
        this.pay = orderDataPay.pay;
        this.address = orderDataPay.address
    }

    setUserInfoContact(orderDataContacts: TModalContacts) {
        this.email = orderDataContacts.email;
        this.tell = orderDataContacts.tell;
    }
}