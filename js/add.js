let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Nike Air Force 1 LV8',
        tag: 'men1',
        price: 119.9,
        inCart: 0
    },
    {
        name: 'Jordan ADG 2',
        tag: 'men3',
        price: 164.9,
        inCart: 0
    },
    {
        name: "Nike Blazer Mid '77 Suede",
        tag: 'men5',
        price: 109.9,
        inCart: 0
    },
    {
        name: 'Nike Air Max 200',
        tag: 'men7',
        price: 129.9,
        inCart: 0
    },
    {
        name: 'Nike Air Force 1 LV8 Utility',
        tag: 'men9',
        price: 119.9,
        inCart: 0
    },
    {
        name: 'LeBron Witness 4',
        tag: 'men11',
        price: 109.9,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadcartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);

    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = ``;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="../img/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                €${item.inCart * item.price},00
            </div>
            `
        });
        productContainer.innerHTML += `
            <div class="basket">
                <h4> Total</h4>
                <h4>€${cartCost},00</h4>
            </div>
        `
    }
}

onLoadcartNumbers();
displayCart();