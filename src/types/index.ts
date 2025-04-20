export interface IProduct  {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
}

export interface ICardData {
    cards: IProduct[];
    preview: string | null;
    getCard(cardId: string): IProduct;
    //addCard(card: IProduct): void;
    deleteCard(cardId: string, payload: Function | null): void;
}

export interface IOrderForm {
    pay: 'Онлайн' | 'При получении';
    address: string;
    email: string;
    tell:  string;
}

export interface IOrder extends IOrderForm {
    items: string[];
}

export interface IOrderDataPay {
	setUserInfo(orderDataPay: TModalPay): void;
	checkFormPayValidation(data: Record<keyof TModalPay, string>): boolean;
}

export interface IOrderDataContacts {
	setUserInfo(orderDataContacts: TModalContacts): void;
	checkFormContactsValidation(data: Record<keyof TModalContacts, string>): boolean;
}

export type TCardMain = Pick<IProduct, 'title' | 'category' | 'image' | 'price'>;
export type TCardModal = Pick<IProduct, 'title' | 'category' | 'image' | 'description' | 'price'>;
export type TBasketItem = Pick<IProduct, 'title' | 'price'>;
export type TModalPay = Pick<IOrderForm, 'pay' | 'address'>;
export type TModalContacts = Pick<IOrderForm, 'email' | 'tell'>;

export interface IOrderResult {
    id: string;
}

export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
    loading: boolean;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;