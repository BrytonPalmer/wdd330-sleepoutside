// import { loadHeaderFooter } from './utils.mjs';
// import CheckoutProcess from './CheckoutProcess.mjs';

// const checkout = new CheckoutProcess("so-cart", ".order-summary");
// checkout.init();


// loadHeaderFooter();

// import { getLocalStorage } from "./utils.mjs";

// const cart = getLocalStorage("so-cart") || [];

// function calculateSubtotal(cart) {
//   return cart.reduce((sum, item) => {
//     return sum + item.FinalPrice * item.quantity;
//   }, 0);
// }
// function calculateTax(subtotal) {
//   return subtotal * 0.06;
// }
// function calculateShipping(cart) {
//   if (cart.length === 0) return 0;

//   const firstItemCost = 10;
//   const additionalItemCost = 2;

//   return firstItemCost + (cart.length - 1) * additionalItemCost;
// }

// function renderOrderSummary() {
//   const subtotal = calculateSubtotal(cart);
//   const tax = calculateTax(subtotal);
//   const shipping = calculateShipping(cart);
//   const total = subtotal + tax + shipping;

//   document.getElementById("order-subtotal").textContent = subtotal.toFixed(2);
//   document.getElementById("order-tax").textContent = tax.toFixed(2);
//   document.getElementById("order-shipping").textContent = shipping.toFixed(2);
//   document.getElementById("order-total").textContent = total.toFixed(2);
// }
// renderOrderSummary();

// document.getElementById("checkout-form").addEventListener("submit", (e) => {
//   if (!e.target.checkValidity()) {
//     e.preventDefault();
//     alert("Please fill out all required fields.");
//   }
// });

import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

// Initialize the checkout process
const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();   // calculates item subtotal on page load

loadHeaderFooter();

// Trigger order total calculation after ZIP code is entered
const zipInput = document.querySelector("#zip");
if (zipInput) {
  zipInput.addEventListener("blur", () => {
    checkout.calculateOrderTotal();
  });
}

// Form validation
document.getElementById("checkout-form").addEventListener("submit", (e) => {
  if (!e.target.checkValidity()) {
    e.preventDefault();
    alert("Please fill out all required fields.");
  }
});
