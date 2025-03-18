export interface ICard  {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    prise: string | null;
}

export interface ICardData {
    cards: ICard[];
    preview: string | null;
    getCard(cardId: string): ICard;
}

export interface IOrderForm {
    pay: 'Онлайн' | 'При получении';
    address: string;
    email: string;
    tell:  string;
}

export interface IOrderDataPay {
	setUserInfo(orderDataPay: TModalPay): void;
	checkFormPayValidation(data: Record<keyof TModalPay, string>): boolean;
}

export interface IOrderDataContacts {
	setUserInfo(orderDataContacts: TModalContacts): void;
	checkFormContactsValidation(data: Record<keyof TModalContacts, string>): boolean;
}

export type TCardMain = Pick<ICard, 'name' | 'category' | 'image' | 'prise'>;
export type TCardModal = Pick<ICard, 'name' | 'category' | 'image' | 'description' | 'prise'>;
export type TBasketItem = Pick<ICard, 'name' | 'prise'>;
export type TModalPay = Pick<IOrderForm, 'pay' | 'address'>;
export type TModalContacts = Pick<IOrderForm, 'email' | 'tell'>;