
// import ExternalServices from './ExternalServices.mjs';
// import ProductDetails from './ProductDetails.mjs';
// import { loadHeaderFooter, getParam } from './utils.mjs';

// loadHeaderFooter();

// const productId = getParam('product');
// const dataSource = new ExternalServices();
// const product = new ProductDetails(productId, dataSource);
// product.init();


import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';
import { setBreadcrumb } from './breadcrumb.js';

// Load header/footer
loadHeaderFooter();

// -----------------------------
// BREADCRUMB HELPER
// -----------------------------
function updateBreadcrumb(category) {
  if (!category) {
    setBreadcrumb('');
    return;
  }

  const formatted = category.replace('-', ' ');
  const title = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  setBreadcrumb(title);
}

// -----------------------------
// PAGE INITIALIZATION
// -----------------------------
const params = new URLSearchParams(window.location.search);
const productId = params.get('product');

const dataSource = new ExternalServices();
const product = new ProductDetails(productId, dataSource);

product.init().then(() => {
  updateBreadcrumb(product.product.Category);
});
