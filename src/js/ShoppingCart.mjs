import {
  getLocalStorage,
  setLocalStorage,
  loadTemplate,
  renderListWithTemplate,
  updateCartCount
} from './utils.mjs';

export default class ShoppingCart {
  constructor(key, listSelector) {
    this.key = key;
    this.listElement = document.querySelector(listSelector);
  }

  async init() {
    this.items = getLocalStorage(this.key) || [];
    this.template = await loadTemplate('/partials/cartItem.html');

    this.renderCart();
    this.renderTotal();
    updateCartCount();
  }

  renderCart() {
    if (!this.items.length) {
      this.listElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    renderListWithTemplate(
      this.template,
      this.listElement,
      this.items,
      (item, element) => this.prepareItem(item, element)
    );
  }

  prepareItem(item, element) {
    const url = `/product_pages/index.html?product=${item.Id}`;

    // Image + link
    const imageLink = element.querySelector(".cart-card__image");
    const img = element.querySelector("img");
    imageLink.href = url;
    img.src = item.Image;
    img.alt = item.Name;

    // Name link
    const nameLink = element.querySelector(".cart-card__link");
    nameLink.href = url;
    element.querySelector(".card__name").textContent = item.Name;

    // Color
    element.querySelector(".cart-card__color").textContent =
      item.Colors?.[0]?.ColorName || "";

    // Price
    element.querySelector(".cart-card__price").textContent =
      `$${item.FinalPrice}`;

    // REMOVE BUTTON
    const removeBtn = element.querySelector(".remove-item");
    removeBtn.dataset.id = item.Id;
    removeBtn.addEventListener("click", () => this.removeItem(item.Id));
  }

  renderTotal() {
    const total = this.items.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector('.cart-total').textContent =
      `Total: $${total.toFixed(2)}`;
  }

  removeItem(id) {
  // remove the item
  this.items = this.items.filter(item => item.Id !== id);

  // save updated cart
  setLocalStorage(this.key, this.items);

  // re-render
  this.renderCart();
  this.renderTotal();
  updateCartCount();
}

}

