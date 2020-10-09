document.querySelectorAll(".cart").forEach((addBtn) => {
  let id = addBtn.getAttribute("id");
  addBtn.addEventListener("click", () => {
    addToCart(id);
    updateCartNbr();
  });
});

function addToCart(product) {
  let cart = [];
  let number = 1;
  if (!localStorage.getItem("cart")) {
    cart.push({
      id: product,
      number: number,
    });
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
    let index = cart.findIndex((object) => object.id === product);
    if (cart[index]) {
      cart[index].number++;
    } else {
      cart.push({
        id: product,
        number: number,
      });
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartNbr() {
  let nbrOfItems = 0;
  let cartNbr = document.getElementById("nbrOfItemsInCart");
  let cart = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < cart.length; i++) {
    nbrOfItems += cart[i].number;
  }
  if (nbrOfItems == 0) {
    cartNbr.innerHTML = "";
  } else {
    cartNbr.innerHTML = nbrOfItems;
  }
}

async function displayCartList() {
  let url = `https://webshop-exo.herokuapp.com/api/shop/`;
  let productList = await fetch(url);
  productList = await productList.json();

  let cart = JSON.parse(localStorage.getItem("cart"));
  let cartAPI = cart.map(
    (product) =>
      productList[productList.findIndex((object) => object._id === product.id)]
  );

  let tr;
  let table = document.getElementById("cartList");

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  for (let i = 0; i < cartAPI.length; i++) {
    tr = document.createElement("TR");
    tr.innerHTML = `
            <tr>
                <td class="thumbnail-img">
                    <a href="#">
                        <img class="img-fluid" src="/images/img-pro-01.jpg" alt="" />
                    </a>
                </td>
                <td class="name-pr">
                    <a href="#">
                    ${cartAPI[i].name}
                    </a>
                </td>
                <td class="price-pr">
                    <p>${cartAPI[i].price / 100}</p>
                </td>
                <td class="quantity-box"><input type="number" id="quantity${
                  cartAPI[i]._id
                }" size="4" value="${
      cart[i].number
    }" min="1" step="1" class="c-input-text qty text"></td>
                <td class="total-pr">
                    <p id="total${cartAPI[i]._id}">${(
      (cartAPI[i].price / 100) *
      cart[i].number
    ).toFixed(2)}</p>
                </td>
                <td class="remove-pr">
                    <a href="#">
                        <i class="fas fa-times removeFromCart" id="remove${
                          cartAPI[i]._id
                        }"></i>
                    </a>
                </td>
            </tr>
        `;
    table.appendChild(tr);

    let id = cartAPI[i]._id;
    let inputId = `quantity${id}`;
    let totalPriceId = `total${id}`;
    let input = document.getElementById(inputId);
    let price = document.getElementById(totalPriceId);

    function inputHandler(e) {
      price.innerHTML = (e.target.value * (cartAPI[i].price / 100)).toFixed(2);
      cart[i].number = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartNbr();
      updatePrice();
    }

    input.addEventListener("input", inputHandler);

    let nodeId = "remove" + id;
    let node = document.getElementById(nodeId);
    node.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      let index = cart.findIndex((object) => object.id === id);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      node.parentNode.parentNode.parentNode.remove();
      updateCartNbr();
      updatePrice();
    });
    updatePrice();
  }
}

async function updatePrice() {
  let url = `https://webshop-exo.herokuapp.com/api/shop/`;
  let productList = await fetch(url);
  productList = await productList.json();

  let cart = JSON.parse(localStorage.getItem("cart"));
  let cartAPI = cart.map(
    (product) =>
      productList[productList.findIndex((object) => object._id === product.id)]
  );

  let price = 0;

  for (let i = 0; i < cartAPI.length; i++) {
    price += cartAPI[i].price * cart[i].number;
  }

  document.getElementById("totalPrice").innerHTML = `$ ${(price / 100).toFixed(
    2
  )}`;
  document.getElementById("taxPrice").innerHTML = `$ ${(
    (price * 0.21) /
    100
  ).toFixed(2)}`;
  document.getElementById("grandTotalPrice").innerHTML = `$ ${(
    (price * 1.21) /
    100
  ).toFixed(2)}`;
}

updateCartNbr();

if (
  window.location.href === "https://webshop-exo.herokuapp.com/cart/" ||
  window.location.href === "https://webshop-exo.herokuapp.com/checkout/"
) {
  updatePrice();
}

if (window.location.href === "https://webshop-exo.herokuapp.com/cart/") {
  displayCartList();
}
