// import ExternalServices from './ExternalServices.mjs';
import ProductData from './ProductData.mjs';

import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Load header and footer
loadHeaderFooter();

// Get the category from the URL (?category=tents)
const category = getParam('category');
console.log("CATEGORY PARAM:", category);

// Create the data source (now ExternalServices)
// const dataSource = new ExternalServices();
const dataSource = new ProductData();

// Find the element where products will be rendered
const listElement = document.querySelector('.product-list');

// Create the product list controller
const myList = new ProductList(category, dataSource, listElement);

// Render the products
myList.init();
