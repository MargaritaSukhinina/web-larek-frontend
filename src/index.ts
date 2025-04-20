import './scss/styles.scss';

import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/appApi';
import { EventEmitter } from './components/base/events';
import { Card, CardModal, CardBasket } from './components/card';
import { Page } from './components/page';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { CardData, CatalogChangeEvent, BasketModel } from './components/appData';
import { Modal } from './components/common/Modal';
import { IProduct, TCardModal, TBasketItem, ICardData } from './types';
import { Basket } from './components/common/Basket';

const  event = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

event.onAll(({eventName, data}) => {
    console.log(eventName, data);
});

// Модель данных приложения
const cardData = new CardData(event);

// шаблоны
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
// глобальные контейнеры
const page = new Page(document.body, event);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), event);

// Переиспользуемые части интерфейса
const preview = new CardModal(cloneTemplate(cardPreviewTemplate), event);
const basket = new Basket(cloneTemplate(basketTemplate), event);
const basketItem = new BasketModel(event)
const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate));



// Получить карточки
api.getCards()
    .then((items) => {
        cardData.cards = items;
        event.emit('initialData:loaded')
    })
    .catch((err) => {
		console.error(err);
	});

// Вывести каталог с карточками
event.on<CatalogChangeEvent>('initialData:loaded', () => {
    page.catalog = cardData.cards.map(item => {
        const card = new Card('card', cloneTemplate(cardTemplate), {
            onClick: () => event.emit('card:select', item)
        });
        return card.render({
            title: item.title,
            category: item.category,
            image: item.image,
            price: item.price 
        });
    });
});

// Открыть карточку

event.on('card:select', (data: CardModal) => {
    modal.render({
        content: preview.render({
            title: data.title,
            category: data.category,
            image: data.image,
            description: data.description,
            price: data.price
        })
    }) 
})



// Блокирровать и разблокировать прокрутку страницы если открыта модалка
event.on('modal:open', () => {
    page.locked = true;
});

event.on('modal:close', () => {
    page.locked = false;
});

// открыть корзину

event.on('basket:open', () => {
    modal.render({
        content: basket.render({
            total: 0,
            items: [],
            selected: []
        })
    })
})

event.on('add-card:submit', (data: CardModal) => {
    basketItem.add(data.id);
    

    cardBasket.render({
            title: data.title,
            price: data.price
    })
    return cardBasket  
}) 
