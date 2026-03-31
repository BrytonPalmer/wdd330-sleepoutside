// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// URL parameters
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// uppdates cart count
export function updateCartCount() {
  const cart = getLocalStorage('so-cart') || [];
  const countElement = document.querySelector('.cart-count');

  if (countElement) {
    countElement.textContent = cart.length > 0 ? cart.length : '';
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  return html;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate('/partials/header.html');
  const footer = await loadTemplate('/partials/footer.html');

  const headerElement = document.getElementById('main-header');
  const footerElement = document.getElementById('main-footer');

  renderWithTemplate(header, headerElement, null, updateCartCount);
  renderWithTemplate(footer, footerElement);
}

// render a list using a template
export function renderListWithTemplate(template, parentElement, list, callback) {
  const templateElement = document.createElement('template');
  templateElement.innerHTML = template;

  list.forEach(item => {
    const clone = templateElement.content.cloneNode(true);
    callback(item, clone);
    parentElement.appendChild(clone);
  });
}
