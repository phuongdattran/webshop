function getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

async function displayOrderDetails() {
    let url = `http://localhost:3000/api/shop/`;
    const token = getCookieValue('token');
    
    myInit = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    let productList = await fetch(url, myInit);
    productList = await productList.json();

    let cart = JSON.parse(document.getElementById('orderDetails').innerHTML);
    let cartAPI = cart.map(product => productList[productList.findIndex(object => object._id === product.id)]);

    let div;
    let orderDetails = document.getElementById('orderDetails');

    while (orderDetails.firstChild) {
        orderDetails.removeChild(orderDetails.firstChild);
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
        orderDetails.appendChild(div);
    }

    let price = 0;

    for(let i=0; i<cartAPI.length; i++) {
        price += cartAPI[i].price*cart[i].number;
    }

    document.getElementById("totalPrice").innerHTML = `$ ${(price/100).toFixed(2)}`;
    document.getElementById("taxPrice").innerHTML = `$ ${(price*0.21/100).toFixed(2)}`;
    document.getElementById("grandTotalPrice").innerHTML = `$ ${(price*1.21/100).toFixed(2)}`;
}

displayOrderDetails();