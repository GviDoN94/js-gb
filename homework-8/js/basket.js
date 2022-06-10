'use strict';

const iconBasket = document.querySelector('.cartIcon');
const basketCount = document.querySelector('.basketCount');
const basket = document.querySelector('.basket');
const basketTotalValue = document.querySelector('.basketTotalValue');
const basketTotal = document.querySelector('.basketTotal');
const productCard = document.querySelectorAll('.featuredItem');
const basketObj = {};

iconBasket.addEventListener('click', () => {
    basket.classList.toggle('hidden');
});

productCard.forEach(el => el.addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const id = +el.dataset.id;
    const name = el.dataset.name;
    const price = +el.dataset.price;

    addToCart(id, name, price);
}));

function addToCart(id, name, price) {
    if (!(id in basketObj)) {
        basketObj[id] = {id, name, price, count: 0};
    }
    basketObj[id].count++;
    basketCount.textContent = sumBasketCount();
    basketTotalValue.textContent = sumBasketPrice();
}

function sumBasketCount() {
    let sum = 0;
    for (const product of Object.values(basketObj)) {
        sum += product.count;
    }
   return sum;
}

function sumBasketPrice() {
    let sum = 0;
    for (const product of Object.values(basketObj)) {
        sum += product.price * product.count;
    }
   return sum;
}