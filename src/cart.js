const totalAmountDiv = document.querySelector("#totalAmountDiv");
const shoppingCartDiv = document.querySelector("#shoppingCartDiv");

let productsBasket = JSON.parse(localStorage.getItem("Products-Basket")) || [];

/*
Product Count Calculator Function
*/

function productCountCalculator() {
    let cartQuantity = document.querySelector("#cartQuantity");
    let totalProductsCount = productsBasket.map((item) => {
        return item.productCount
    }).reduce((a,b) => {
        return a + b;
    },0)
    cartQuantity.innerHTML = totalProductsCount;
}

productCountCalculator();


/*
Generate Products Function
*/

function generateProducts() {
    if(productsBasket.length !== 0) {

    }else {
        totalAmountDiv.innerHTML = 
        `<div class="emptyCartDiv">
            <h3>Cart is empty</h3>
            <p><a href="index.html">Back to home</a></p>
        </div>`
        shoppingCartDiv.innerHTML = "";
    }
}

generateProducts();