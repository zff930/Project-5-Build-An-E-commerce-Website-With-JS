// fetch('http://localhost:3000/api/products/order', {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({firstName, lastName})
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// Get the existing element on the page where to insert cart items
const cartItems = document.getElementById("cart__items");

const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

// Use dynamic info in the string for innerHTML via ${}
/**
 * Insert cart items into cart page
 */
function insertCartItems() {
  cart.forEach((cartItem) => {
    // Insert cart item info into webpage using JS DOM manipulation
    cartItems.innerHTML += `
          <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
              <div class="cart__item__img">
                  <img src="${cartItem.imageUrl}" alt="Photo of a sofa">
              </div>
              <div class="cart__item__content">
                  <div class="cart__item__content__description">
                      <h2>${cartItem.title}</h2>
                      <p>${cartItem.color}</p>
                      <p>${cartItem.price}</p>
                  </div>                  
                  <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                          <p>Quantity : </p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Delete</p>
                      </div>
                  </div>
              </div>
          </article>`;
  });
}
