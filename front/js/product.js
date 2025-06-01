//Collect the ID of the product that was selected on the homepage.
const params = new URLSearchParams(window.location.search); // Get the full query string from the URL
const productId = params.get('id'); // Extract the value of 'id'

//Insert the product and its details into the product page.
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    insertProduct(product);
  });

// Get the existing elements on the page where to insert its product info
const itemImage = document.querySelector('.item__img');
const itemTitle = document.getElementById('title');
const itemPrice = document.getElementById('price');
const itemDescription = document.getElementById('description');
const itemColors = document.getElementById('colors');
const itemQuant = document.getElementById('quantity');
const addToCart = document.getElementById('addToCart');

// Use dynamic info in the string for innerHTML via ${}
/**
 * Insert the clicked product into its corresponding product page
 * 
 * @param {object} product - an object that has product info
 */
function insertProduct(product) {
  itemImage.innerHTML = `<img src='${product.imageUrl}' alt='Photo of a sofa'>`;
  itemTitle.innerHTML = `${product.name}`;
  itemPrice.innerHTML = `${product.price}`;
  itemDescription.innerHTML = `${product.description}`;
  product.colors.forEach((color) => {
    itemColors.innerHTML += `<option value='${color}'>${color}</option>`;
  });
}

// itemColors.addEventListener('change', () => {
// });

// itemQuant.addEventListener('input', () => {
// });

addToCart.addEventListener('click', () => {
  const product = {
    id: productId,
    // imageUrl: document.querySelector('.item__img img').getAttribute('src'),
    // title: itemTitle.textContent,
    // price: itemPrice.textContent,
    color: itemColors.value,
    quantity: parseInt(itemQuant.value)
  };

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex((item) => {return item.id === product.id && item.color === product.color});
  if (index !== -1) {
    cart[index].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  alert('Product added to cart!');
});