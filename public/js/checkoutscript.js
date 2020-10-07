async function displayCheckoutList() {
    let url = `http://localhost:3000/api/shop/`;
    let productList = await fetch(url);
    productList = await productList.json();

    let cart = JSON.parse(localStorage.getItem('cart'));
    let cartAPI = cart.map(product => productList[productList.findIndex(object => object._id === product.id)]);

    let div;
    let checkoutList = document.getElementById('checkoutList');

    while (checkoutList.firstChild) {
        checkoutList.removeChild(checkoutList.firstChild);
    }

    for(let i=0; i<cartAPI.length; i++) {
        div = document.createElement("DIV");
        div.innerHTML = `
        <div class="media mb-2 border-bottom">
            <div class="media-body"> <a href="detail.html"> ${cartAPI[i].name}</a>
                <div class="small text-muted">Price: ${cartAPI[i].price/100} <span class="mx-2">|</span> Qty: ${cart[i].number} <span class="mx-2">|</span> Subtotal: ${((cartAPI[i].price/100)*cart[i].number).toFixed(2)}</div>
            </div>
        </div>
        `;
        checkoutList.appendChild(div);
    }

    let order = document.getElementById('order');
    order.value = localStorage.getItem('cart');
}

displayCheckoutList();