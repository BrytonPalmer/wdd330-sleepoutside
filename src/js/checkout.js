import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

// Create the checkout process instance
const checkout = new CheckoutProcess('so-cart', '.order-summary');

// Calculate subtotal on page load
checkout.calculateItemSummary();

// When the user enters ZIP, calculate tax + shipping + total
document.querySelector('#zip').addEventListener('blur', () => {
  checkout.calculateOrderTotals();
});

// Handle form submission
document.querySelector('#checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  checkout.checkout(document.forms['checkout-form']);
});

