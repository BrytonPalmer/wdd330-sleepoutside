import { setLocalStorage, getLocalStorage } from '../js/utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  if (!product) {
    console.warn('addProductToCart called with undefined product');
    return;
  }
  let cart = getLocalStorage('so-cart') || [];
  if (!Array.isArray(cart)) cart = [];

  cart.push(product);
  setLocalStorage('so-cart', cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const id = e.target?.dataset?.id;
  const product = await dataSource.findProductById(id);
  // const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
