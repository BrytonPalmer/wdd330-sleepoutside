import ProductData from './ProductData.mjs';
import ShoppingCart from './ShoppingCart.mjs';

export default class CheckoutProcess {
  constructor(cartKey, outputSelector) {
    this.cart = new ShoppingCart(cartKey);
    this.outputSelector = outputSelector;
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;

    this.services = new ProductData();
  }

  // -----------------------------
  // 1. Calculate and display subtotal
  // -----------------------------
  calculateItemSummary() {
    const items = this.cart.getItems();

    this.subtotal = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    document.querySelector('#order-subtotal').textContent =
      this.subtotal.toFixed(2);
  }

  // -----------------------------
  // 2. Calculate tax, shipping, total
  // -----------------------------
  calculateOrderTotals() {
    const items = this.cart.getItems();
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    // Tax: 6% of subtotal
    this.tax = this.subtotal * 0.06;

    // Shipping: $10 for first item + $2 for each additional
    if (itemCount > 0) {
      this.shipping = 10 + (itemCount - 1) * 2;
    } else {
      this.shipping = 0;
    }

    this.orderTotal = this.subtotal + this.tax + this.shipping;

    // Update UI
    document.querySelector('#order-tax').textContent = this.tax.toFixed(2);
    document.querySelector('#order-shipping').textContent =
      this.shipping.toFixed(2);
    document.querySelector('#order-total').textContent =
      this.orderTotal.toFixed(2);
  }

  // -----------------------------
  // 3. Convert cart items to required format
  // -----------------------------
  packageItems(items) {
    return items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      };
    });
  }

  // -----------------------------
  // 4. Submit the order
  // -----------------------------
  async checkout(form) {
    const formData = new FormData(form);

    // Convert form data to JSON
    const order = Object.fromEntries(formData.entries());

    // Add required fields
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;

    // Add packaged items
    order.items = this.packageItems(this.cart.getItems());

    // Send to server
    const response = await this.services.checkout(order);

    // Clear cart on success
    this.cart.clearCart();

    // Redirect or handle response in next activity
    return response;
  }
}
