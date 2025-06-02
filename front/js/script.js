// Get all products from the backend API
fetch('http://localhost:3000/api/products')
  .then(data => data.json())
  .then(products => insertProducts(products));

// Get the existing element on the page where to insert cards
const items = document.getElementById('items');

// Use dynamic info in the string for innerHTML via ${}
/**
 * Insert products into the homepage
 *
 * @param {[object]} products - an array of objects that have product info
 */
function insertProducts(products) {
  // Iterate over the products that came from the backend API
  for (let product of products) {
    // Insert product info into webpage using JS DOM manipulation (innerHtml/createElement)
    items.innerHTML += `
        <a href="./product.html?id=${product._id}">
          <article>
            <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
          </article>
        </a>`;
  }
}
