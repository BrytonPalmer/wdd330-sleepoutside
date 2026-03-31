// import { getLocalStorage, updateCartCount } from './utils.mjs';
// import { loadHeaderFooter } from './utils.mjs';

// function renderCartContents() {
//   const cartItems = getLocalStorage('so-cart');

//   // empty cart handler
//   if(!cartItems || cartItems.length === 0){
//     document.querySelector('.product-list').innerHTML = "<p>Your cart is empty.</p>";
//     document.querySelector('.cart-total').textContent = "";
//     return;
//   }
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector('.product-list').innerHTML = htmlItems.join('');

//   // update cart total
//   const total = calculateTotal(cartItems);
//   document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
// }

// // calculate cart total
// function calculateTotal(cartItems) {
//   return cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="../product_pages/?product=${item.Id}" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="../product_pages/?product=${item.Id}">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors?.[0]?.ColorName || ''}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }


// loadHeaderFooter();
// renderCartContents();
// updateCartCount();

import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

const cart = new ShoppingCart('so-cart', '.product-list');
cart.init();
