// TODO Get all products from the backend API
fetch("http://localhost:3000/api/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  })
  .then((products) => {
    insertProducts(products);
  });

// TODO Get the existing element on the page where I can insert cards.
let items = document.getElementById("items");

// TODO use dynamic info in the string for innerHtml via ${}
/**
 * Insert products into the homepage
 *
 * @param {[object]} products - an array of objects that have product info
 */
function insertProducts(products) {
  // TODO Iterate over the products that came from the backend API
  for (let product of products) {
    // TODO insert product info into webpage using js dom manipulation (innerHtml/createElement)
    console.log(product);
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
