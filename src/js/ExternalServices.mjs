// function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }

// export default class ProductData {
//   constructor(category) {
//     this.category = category;
//     this.path = `../json/${this.category}.json`;
//   }
//   getData() {
//     return fetch(this.path)
//       .then(convertToJson)
//       .then((data) => data);
//   }
//   async findProductById(id) {
//     const products = await this.getData();
//     return products.find((item) => item.Id === id);
//   }
// }
export default class ExternalServices {
  constructor() {
    this.baseURL = 'http://wdd330-backend.onrender.com:3000';
  }

  // -----------------------------
  // Fetch product list
  // -----------------------------
  async getData(category) {
    const response = await fetch(`${this.baseURL}/products/search/${category}`);
    const data = await response.json();
    return data;
  }

  // -----------------------------
  // Fetch a single product by ID
  // -----------------------------
  async findProductById(id) {
    const response = await fetch(`${this.baseURL}/product/${id}`);
    const data = await response.json();
    return data;
  }

  // -----------------------------
  // Submit checkout order (POST)
  // -----------------------------
  async checkout(order) {
    const url = `${this.baseURL}/checkout`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };

    const response = await fetch(url, options);

    // Server returns JSON whether success or failure
    const data = await response.json();
    return data;
  }
}
