let productsBasket = JSON.parse(localStorage.getItem("Product-Basket")) || [];
totalCartItemsCalculator();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const shoppingCartDiv = document.querySelector("#shoppingCartDiv");
const totalBillingDiv = document.querySelector("#totalBillingDiv");

function generateCheckoutProducts() {
    if(productsBasket.length !== 0) {
        shoppingCartDiv.innerHTML = productsBasket.map((items) => {
            const { productId, productCount } = items;
            const productSearch = productDetailsArray.find((item) => item.productId === productId);
            const { productName, productPrice, productImg } = productSearch;
            return `
                <div class="cartItem">
                    <div class="imgDiv"><figure><img src="${productImg}" alt="${productImg}"></figure></div>
                    <div class="details">
                        <div class="name-price-cross">
                            <h4>${productName}</h4>
                            <p class="productPrice">$ ${productPrice}</p>
                            <span><i onclick="removeProduct('${productId}')" class="bi bi-x-square-fill"></i></span>
                        </div>
                        <div class="buttons">
                            <span><i onclick="decrement('${productId}')" class="bi bi-dash-circle-fill"></i></span>
                            <span id="${productId}" class="productQuantity">${productCount}</span>
                            <span><i onclick="Increment('${productId}')" class="bi bi-plus-circle-fill"></i></span>
                        </div>
                        <h3 class="singleProductTotalAmount">$ ${productCount * productPrice}</h3>
                    </div>
                </div>
            `
        }).join("")
    }else {
        totalBillingDiv.innerHTML = 
        `<div class="emptyAmountDiv">
            <h3>Cart is Empty!</h3>
            <span><i class="bi bi-arrow-bar-left"></i><a href="index.html">Back to home</a></span>
        </div>`
        shoppingCartDiv.innerHTML = "";
    }
}

generateCheckoutProducts();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function Increment(id) {
    const productSearch = productsBasket.find((basketItem) => basketItem.productId === id);
    if(productSearch === undefined) {
        return;
    }else {
        productSearch.productCount += 1;
    }
    update(id);
    productsBasket = productsBasket.filter((basketItem) => {
        return basketItem.productCount !== 0;
    })
    generateCheckoutProducts();
    FinalBillAmount();
    localStorage.setItem("Product-Basket", JSON.stringify(productsBasket));
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function decrement(id) {
    const productSearch = productsBasket.find((basketItem) => basketItem.productId === id);
    if(productSearch === undefined || productSearch.productCount === 0) {
        return;
    }else {
        productSearch.productCount -= 1;
    }
    update(id);
    productsBasket = productsBasket.filter((basketItem) => {
        return basketItem.productCount !== 0;
    })
    generateCheckoutProducts();
    FinalBillAmount();
    localStorage.setItem("Product-Basket", JSON.stringify(productsBasket));
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function update(id){
    const productSearch = productsBasket.find((basketItem) => basketItem.productId === id);
    const { productCount } = productSearch;
    document.getElementById(id).innerHTML = productCount;
    totalCartItemsCalculator();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function totalCartItemsCalculator() {
    const cartItemsCount = document.querySelector("#cartItemsCount");
    const totalCartItems = productsBasket.map((basketItem) => {
        return basketItem.productCount
    }).reduce((x,y) => {
        return x+y
    },0)
    cartItemsCount.innerHTML = totalCartItems;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function removeProduct(id) {
    productsBasket = productsBasket.filter((basketItem) => {
        return basketItem.productId !== id;
    })
    localStorage.setItem("Product-Basket", JSON.stringify(productsBasket));
    totalCartItemsCalculator()
    generateCheckoutProducts();
    FinalBillAmount();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function FinalBillAmount() {
    if(productsBasket.length !== 0) {
        let FinalBillAmount = productsBasket.map((items) => {
            const { productId, productCount } = items;
            const productSearch = productDetailsArray.find((item) => item.productId === productId);
            const { productPrice } = productSearch;
            return productCount*productPrice
        }).reduce((x,y) => {
            return x+y;
        },0)
        totalBillingDiv.innerHTML = `
             <div class="nonEmptyAmountDiv">
                <h3>Total Bill : <span id="finalBillAmount">$ ${FinalBillAmount}</span></h3>
                <button onclick="clearCart()" id="clearCartBtn">Clear Cart</button>
            </div>
        `
    }else {
        return;
    }
}

FinalBillAmount();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function clearCart() {
    productsBasket = [];
    localStorage.setItem("Product-Basket", JSON.stringify(productsBasket));
    totalCartItemsCalculator()
    generateCheckoutProducts();
}
