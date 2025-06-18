const cart = JSON.parse(localStorage.getItem("cart") || []);
const productCache = [];

// Get the existing element on the page where to insert cart items
const cartItems = document.getElementById("cart__items");
const totalQuant = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const form = document.querySelector(".cart__order__form");
const firstNameInput = document.getElementById("firstName");
const firstNameErrMsg = document.getElementById("firstNameErrorMsg");
const lastNameInput = document.getElementById("lastName");
const lastNameErrMsg = document.getElementById("lastNameErrorMsg");

init();

async function init() {
  await insertCartItems();
  changeQuant();
  deleteItem();
  insertTotalQuant();
  insertTotalPrice();
}

/**
 * Insert cart items into cart page. Use dynamic info in the string for innerHTML via ${}
 */
async function insertCartItems() {
  cartItems.innerHTML = "";

  const fetchPromises = cart.map(async (cartItem) => {
    //Check cache to see if product id already exists; if not, fetch.
    let product = productCache.find((p) => p._id === cartItem.id);
    if (!product) {
      const data = await fetch(
        `http://localhost:3000/api/products/${cartItem.id}`
      );
      product = await data.json();
      productCache.push(product);
    }

    // Insert cart item info into webpage using JS DOM manipulation
    cartItems.innerHTML += `
          <article class="cart__item" data-id="${cartItem.id}" data-color="${cartItem.color}">
              <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
              </div>
              <div class="cart__item__content">
                  <div class="cart__item__content__description">
                      <h2>${product.name}</h2>
                      <p>${cartItem.color}</p>
                      <p>${product.price}</p>
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

  await Promise.all(fetchPromises);
}

function changeQuant() {
  const itemQuant = document.querySelectorAll(".itemQuantity");

  itemQuant.forEach((input, index) => {
    input.addEventListener("change", ($event) => {
      const quantity = parseInt($event.target.value);
      if (quantity !== cart[index].quantity) {
        cart[index].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        insertTotalQuant();
        insertTotalPrice();
      }
    });
  });
}

function deleteItem() {
  const deleteBtn = document.querySelectorAll(".deleteItem");

  deleteBtn.forEach((select) => {
    select.addEventListener("click", ($event) => {
      const item = $event.target.closest("article");
      const id = item.dataset.id;
      const color = item.dataset.color;

      // Update DOM & local storage
      const index = cart.findIndex((p) => p.id === id && p.color === color);
      if (index != -1) {
        cart.splice(index, 1);
        item.remove();
        localStorage.setItem("cart", JSON.stringify(cart));
        insertTotalQuant();
        insertTotalPrice();
      }
    });
  });
}

/**
 * Calculate total quantity of all products in the cart.
 * @returns a number that indicates quantity sum
 */
function calcTotalQuant() {
  let sumQuant = 0;
  cart.forEach((cartItem) => {
    sumQuant += cartItem.quantity;
  });

  return sumQuant;
}

/**
 * Insert total quantity into cart page for innerHTML via calcTotalQuant().
 */
function insertTotalQuant() {
  let total = calcTotalQuant();
  totalQuant.innerHTML = total;
}

/**
 * Calculate total price of all products in the cart.
 * @returns a number that indicates price sum
 */
async function calcTotalPrice() {
  let sumPrice = 0;
  const productPromises = cart.map((cartItem) =>
    fetch(`http://localhost:3000/api/products/${cartItem.id}`)
      .then((data) => data.json())
      .then((product) => product.price * cartItem.quantity)
  );

  // Use Promise.all to wait for all fetch requests to complete.
  const prices = await Promise.all(productPromises);
  prices.forEach((price) => {
    sumPrice += price;
  });

  return sumPrice;
}

/**
 * Insert total price into cart page for innerHTML via calcTotalPrice().
 */
async function insertTotalPrice() {
  const total = await calcTotalPrice();
  totalPrice.innerHTML = total;
}

form.addEventListener("change", () => {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  nameCheck(firstName, firstNameErrMsg);
  nameCheck(lastName, lastNameErrMsg);
});

/**
 * Tests if the first/last name that users enter validates.
 * @param {*} input The name that users enter
 * @param {*} errMsg The message that shows validation check result
 */
function nameCheck(input, errMsg) {
  const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(input)) {
    errMsg.textContent = "Invalid";
  } else {
    errMsg.textContent = "";
  }
}
