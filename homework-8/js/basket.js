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
    basketTotalValue.textContent = sumBasketPrice().toFixed(2);
    addProductInBasket(id);
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

function productInBasket(id) {
    const product = `
    <div class="basketRow" data-productId="${id}">
        <div>${basketObj[id].name}</div>
        <div>
            <span class="productCount">${basketObj[id].count}</span> шт.
        </div>
        <div>$${basketObj[id].price.toFixed(2)}</div>
        <div>
            $<span class="productTotalCount">${(basketObj[id].price *
            basketObj[id].count).toFixed(2)}</span>
        </div>
    </div>
    `;
    basketTotal.insertAdjacentHTML('beforebegin', product);
}

function addProductInBasket(id) {
    const basketProduct = document
        .querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketProduct) {
        productInBasket(id);
        return;
    }

    basketProduct.querySelector('.productCount')
        .textContent = basketObj[id].count;
    basketProduct.querySelector('.productTotalCount')
        .textContent = (basketObj[id].price * basketObj[id].count).toFixed(2);
}
