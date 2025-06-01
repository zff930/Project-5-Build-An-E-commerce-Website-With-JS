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

const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

const cartItems = document.getElementById("cart__items");

cart.forEach((item) => {
  cartItems.innerHTML += `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
            <img src="${item.imageUrl}" alt="Photo of a sofa">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${item.title}</h2>
                <p>${item.color}</p>
                <p>${item.price}</p>
            </div>                  
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Quantity : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Delete</p>
                </div>
            </div>
        </div>
    </article>
  `;
});

// console.log(cartItems.getAttribute('data-id'));
