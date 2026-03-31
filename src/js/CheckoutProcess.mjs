import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    // Assignment-required fields
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  // Called when the page loads
  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  // ----------------------------------------------------
  // 1. Calculate and display item subtotal
  // ----------------------------------------------------
  calculateItemSubTotal() {
    // Sum price * quantity
    this.itemTotal = this.list.reduce((sum, item) => {
      return sum + item.FinalPrice * item.quantity;
    }, 0);

    // Display subtotal
    const subtotalElement = document.querySelector(
      `${this.outputSelector} #order-subtotal`
    );
    subtotalElement.textContent = this.itemTotal.toFixed(2);
  }

  // ----------------------------------------------------
  // 2. Calculate tax, shipping, and total
  // Called after ZIP code is entered
  // ----------------------------------------------------
  calculateOrderTotal() {
    // Tax: 6%
    this.tax = this.itemTotal * 0.06;

    // Shipping: $10 for first item + $2 for each additional
    const itemCount = this.list.reduce(
      (count, item) => count + item.quantity,
      0
    );

    if (itemCount > 0) {
      this.shipping = 10 + (itemCount - 1) * 2;
    } else {
      this.shipping = 0;
    }

    // Total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Display totals
    this.displayOrderTotals();
  }

  // ----------------------------------------------------
  // 3. Display totals in the UI
  // ----------------------------------------------------
  displayOrderTotals() {
    const tax = document.querySelector(
      `${this.outputSelector} #order-tax`
    );
    const shipping = document.querySelector(
      `${this.outputSelector} #order-shipping`
    );
    const total = document.querySelector(
      `${this.outputSelector} #order-total`
    );

    tax.textContent = this.tax.toFixed(2);
    shipping.textContent = this.shipping.toFixed(2);
    total.textContent = this.orderTotal.toFixed(2);
  }
}
