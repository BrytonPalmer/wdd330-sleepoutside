// import { getParam } from './utils.mjs';
// import ProductData from './ProductData.mjs';
// import ProductDetails from './ProductDetails.mjs';
// import { loadHeaderFooter } from './utils.mjs';
// // import ProductData from './ProductData.mjs';

// const productId = getParam('product');
// const dataSource = new ProductData('tents');

// const product = new ProductDetails(productId, dataSource);
// product.init();


// loadHeaderFooter();
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const productId = getParam('product');
const dataSource = new ExternalServices();
const product = new ProductDetails(productId, dataSource);
product.init();
