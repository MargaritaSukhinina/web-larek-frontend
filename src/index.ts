import './scss/styles.scss';

import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppApi } from './components/model/appApi';
import { EventEmitter } from './components/base/events';
import { Page } from './components/view/page';
import { CardCatalog } from './components/view/cardCatalog';
import { Modal } from './components/view/Modal';
import { CardModal } from './components/view/cardModal';
import { Basket } from './components/view/Basket';
import { CardBasket } from './components/view/cardBasket';
import { Success } from './components/view/Success';
import { FormOrder } from './components/view/formOrder';
import { FormContact } from './components/view/formContact';
import { Catalog } from './components/model/catalog';
import { BasketState } from './components/model/basket';
import { OrderBuilder } from './components/model/orderBuilder';
import { IProduct, TCardMain, TProductId, IOrderList, IForm, IFormValid, Pay, IAddress, IContacts, TOrderData, IOrderResult } from './types';

const  events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

events.onAll(({eventName, data}) => {
    console.log(eventName, data);
});

// глобальные контейнеры
const page = new Page(ensureElement<HTMLElement>('.page'), events)
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const modalContainer = ensureElement<HTMLElement>('.modal__container')

// Модель данных приложения
const catalog = new Catalog({}, events);
const basketState = new BasketState({}, events);
const orderBuilder = new OrderBuilder({}, events);

// шаблоны
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success')


// Переиспользуемые части интерфейса
const cardPreview = new CardModal(cloneTemplate(cardPreviewTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new FormOrder(cloneTemplate(orderTemplate), events);
const contacts = new FormContact(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);
//const basketItem = new BasketModel(event)


//Выводим каталог с карточками

events.on('items:changed', (data: IProduct[]) => {
    const cardList = data.map((item) => {
        const card = new CardCatalog<TCardMain>(cloneTemplate(cardTemplate), events);
        return card.render(item);
    });
    page.render({ catalog: cardList })
});

// Открываем выбранную карточку

events.on('card:select', (data: TProductId) => {
    !modalContainer.classList.contains('modal-active') ? modal.open() : modal.close();

    const item = catalog.getId(data.id);
    if(item) {
        const preview = Object.assign(item, {
            valid: Boolean(item.price),
            state: !basketState.check(data.id)
        });
        modal.render({
            content: cardPreview.render(preview)
        })
    }
})

//Открываем корзину
events.on('basket:open', () => {
    modal.open()
    modal.render({
        content: basket.render({
            total: basketState.total,
            valid: basketState.lenght === 0
        })
    })
})

// Добавляем товар в корзину
events.on('add-card:submit', (data: TProductId) => {
    const cardBasket = catalog.getId(data.id);
    basketState.add(cardBasket);
})

// Удаляем товар из корзины

events.on('cardBasket:delete', (data: TProductId) => {
    basketState.remove(data.id);
})

//Изменился список товаров в корзине
events.on('basket-item:changed', (data: TProductId) => {
    page.render({ counter: basketState.lenght});

    const cardItems = basketState.items.map((item, index) => {
        const cardData = Object.assign(item, {index: index + 1});
        const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), events);
        return cardBasket.render(cardData);
    })

    basket.render({
        items: cardItems,
        valid: basketState.lenght === 0,
        total: basketState.total
    })
})

//Открываем модальное окно страницы оплаты
events.on('payFill:open', () => {
    const orderList: IOrderList = {
        total: basketState.total,
        items: basketState.getIdItems()
    };

    orderBuilder.orderList = orderList;

    modal.render({
        content: order.render({
            valid: order.valid
        })
    })
})

function validate(form: IForm) {
    const validity: IFormValid = { valid: form.valid};
    form.render(validity);
}

// Данные оплаты и адреса
events.on('order:input', () => {
    validate(order);
    const userData: IAddress = {
        payment: order.payment as Pay,
        address: order.address
    };
    orderBuilder.addressUser = userData;
})

events.on('order:submit', () => {
    modal.render({
        content: contacts.render({
            valid: contacts.valid
        })
    })
})

//Контактные данные
events.on('contacts:input', () => {
    validate(contacts);
    const contactsData: IContacts = {
        email: contacts.email,
        phone: contacts.phone
    };
    orderBuilder.contactsUser = contactsData;
})

//Отправка данных на сервер
events.on('contacts:submit', () => {
    const apiObj: TOrderData = orderBuilder.result.readyOrder();
    api
        .orderCards(apiObj)
        .then((data: IOrderResult) => {
            modal.render({
                content: success.render({
                    total: data.total
                })
            })
            order.clear();
            contacts.clear();
            basketState.clear();
        })
        .catch(console.error)
})

//Закрываем окно успешного завершения заказа
events.on('success:submite', () => {
    modal.close();
})


// Блокирруем или разблокируем прокрутку страницы при работе с модальным окном
events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});



//Получаем карточки с сервера
api.getCards()
    .then((res) => {
        catalog.items = res
    })
    .catch((err) => {
		console.error(err);
	});
