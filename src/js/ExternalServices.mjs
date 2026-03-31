const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    // No category, no path — API handles everything now
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result; // API returns { Result: [...] }
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result; // API returns { Result: {...} }
  }
async checkout(order) {
  const url = "https://wdd330-backend.onrender.com/checkout";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  };

  const response = await fetch(url, options);
  return await response.json();
}


}
// const baseURL = "http://wdd330-backend.onrender.com";

// export default class ExternalServices {
//   constructor(category) {
//     this.category = category;
//   }

//   async getData() {
//     const response = await fetch(`${baseURL}/products/${this.category}`);
//     return await response.json();
//   }

//   async findProductById(id) {
//     const response = await fetch(`${baseURL}/product/${id}`);
//     return await response.json();
//   }

//   async checkout(order) {
//     const response = await fetch(`${baseURL}/checkout`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(order)
//     });

//     return await response.json();
//   }
// }
