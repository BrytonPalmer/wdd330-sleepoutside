import { setLocalStorage, getLocalStorage, updateCartCount } from './utils.mjs';
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    console.log("Prduct ID from URL:", this.productId);
    // 1. Load the product from the JSON file
    this.product = await this.dataSource.findProductById(this.productId);

    console.log("Product found:", this.product);

    // 2. Render the product details into the page
    this.renderProductDetails();

    // 3. Attach the Add to Cart button listener
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }


 addProductToCart() {
  // 1. Load existing cart or create a new one
  let cart = getLocalStorage('so-cart') || [];

  // clone product and add quantity
  const productToAdd = { 
    ...this.product, 
    quantity: 1, 
    Image: this.product.Images.PrimaryLarge
  };

  // 2. Add the new product
  cart.push(productToAdd);

  // 3. Save it back to localStorage
  setLocalStorage('so-cart', cart);
  updateCartCount();
  animateCartIcon();   // <-- CALL IT HERE

  // Animation function
  function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon) return;

    cartIcon.classList.add('cart-animate');

    cartIcon.addEventListener('animationend', () => {
      cartIcon.classList.remove('cart-animate');
    }, { once: true });
  }
}




  renderProductDetails() {
    const element = document.querySelector('.product-detail');

    element.innerHTML = `
      <h2 class="product__name">${this.product.Name}</h2>

      <img 
        class="product__image"
        src="${this.product.Images.PrimaryLarge}" 
        alt="${this.product.Name}"
      />

      <p class="product__brand">${this.product.Brand?.Name ?? ''}</p>

      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>

      <p class="product__price">$${this.product.FinalPrice}</p>
    `;
  }
}
