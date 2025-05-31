//TODO Need to collect the ID of the product that was selected on the homepage.
// Get the full query string from the URL
const params = new URLSearchParams(window.location.search);

// Extract the value of "id"
const productId = params.get("id");

console.log(productId);

//TODO Insert the product and its details into the product page.
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    console.log(product);
  });

const item = document.getElementsByClassName("item__content");
console.log(item);