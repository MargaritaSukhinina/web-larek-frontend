export interface IProduct  {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
}

export interface IProductList {
    items: IProduct[];
}

export type TProductId = Pick<IProduct, 'id'>;

export type Pay = 'Онлайн' | 'При получении';

export interface IOrderForm {
    payment: Pay;
    address: string;
    email: string;
    phone:  string;
}

export interface IOrderList {
    total: number;
    items: string[];
}

export interface IAddress {
    payment: Pay;
    address: string;
}

export interface IContacts {
    email: string;
    phone:  string;
}

export type TOrderData = IAddress & IContacts & IOrderList;

export interface IOrder extends TOrderData {
    readyOrder(): TOrderData;
}

export interface IOrderBailder {
    addressUser: IAddress;
    contactsUser: IContacts;
    orderList: IOrderList;
    result: TOrderData;
}

export interface IFormValid {
    valid: boolean;
}

export interface IForm extends IFormValid {
    render(data?: IFormValid): HTMLElement;
}

export type TCardMain = Pick<IProduct, 'title' | 'category' | 'image' | 'price'>;
export type TCardModal = Pick<IProduct, 'id' | 'title' | 'category' | 'image' | 'description' | 'price'>;
export type TBasketItem = Pick<IProduct, 'id' | 'title' | 'price'>;
export type TModalPay = Pick<IOrderForm, 'payment' | 'address'>;
export type TModalContacts = Pick<IOrderForm, 'email' | 'phone'>;

export interface IOrderResult {
    total: number;
    id: string;
}