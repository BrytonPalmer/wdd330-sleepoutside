// // import ExternalServices from './ExternalServices.mjs';
// import ExternalServices from './ExternalServices.mjs';

// import ProductList from './ProductList.mjs';
// import { import ExternalServices from "./ExternalServices.mjs";

// // Load header and footer
// loadHeaderFooter();

// // Get the category from the URL (?category=tents)
// const category = getParam('category');
// console.log("CATEGORY PARAM:", category);

// // Create the data source (now ExternalServices)
// // const dataSource = new ExternalServices();
// const dataSource = new ExternalServices();

// // Find the element where products will be rendered
// const listElement = document.querySelector('.product-list');

// // Create the product list controller
// const myList = new ProductList(category, dataSource, listElement);

// // Render the products
// myList.init();

// // breadcrumbs
// import { setBreadcrumb } from "../js/breadcrumb.js";

// function updateBreadcrumb(category, count) {
//   const formatted = category.replace("-", " ");
//   const title = formatted.charAt(0).toUpperCase() + formatted.slice(1);
//   setBreadcrumb(`${title} → (${count} items)`);
// }

// async function loadProducts() {
//   const category = getParam("category");
//   const products = await dataSource.getData(category);

//   renderProductList(products);
//   updateBreadcrumb(category, products.length);
// }

// loadProducts();

import ExternalServices from "./ExternalServices.mjs";
import { setBreadcrumb } from "./breadcrumb.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
// -----------------------------
// BREADCRUMB HELPER
// -----------------------------
function updateBreadcrumb(category, count) {
  const formatted = category.replace("-", " ");
  const title = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  setBreadcrumb(`${title} → (${count} items)`);
}

// -----------------------------
// TEMPLATE
// -----------------------------
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimarySmall}" alt="${product.Name}">
        <h3>${product.Name}</h3>
        <p>$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

// -----------------------------
// RENDER FUNCTION
// -----------------------------
function renderProductList(products) {
  const listElement = document.querySelector(".product-list");
  listElement.innerHTML = products.map(productCardTemplate).join("");
}

// -----------------------------
// PAGE INITIALIZATION
// -----------------------------
async function loadProducts() {
  const category = getParam("category");
  const dataSource = new ExternalServices();

  const products = await dataSource.getData(category);

  renderProductList(products);
  updateBreadcrumb(category, products.length);
}

loadProducts();
