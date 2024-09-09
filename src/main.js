let productsBasket = JSON.parse(localStorage.getItem("Products-Basket")) || [];

productCountCalculator();

/*
::Why we used map::
- We didn't use forEach because forEach doesn't return anything, and 
we needed to return the entire item so that an array could be created, 
and then we could join it to generate the HTML for the products.
*/

/*
Generate Products Function
*/

const products = document.querySelector("#products");
function generateProducts() {
    return products.innerHTML = (productsArray.map((item) => {
        let { productID, productName , productDesc , productPrice , productImg } = item;
        let productSearch = productsBasket.find((basketItem) => basketItem.productID === productID) || [];
        let finalProductCount = productSearch.productCount === undefined ? 0 : productSearch.productCount;

        return `<div id="productID-${productID}" class="item">
                    <img src="${productImg}" alt="${productImg} Details">
                    <div class="details">
                        <h2>${productName}</h2>
                        <p>${productDesc}</p>
                        <div class="price_counter_div">
                            <h2 class="price">$ ${productPrice}</h2>
                            <div class="buttons">
                                <i onclick="decrement('${productID}')" class="bi bi-dash-lg"></i>
                                <div id="${productID}" class="quantity">${finalProductCount}</div>
                                <i onclick="increment('${productID}')" class="bi bi-plus-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>`
    })).join("")
}

generateProducts();


/*
Increment Function
*/

function increment(id) {
    const productSearch = productsBasket.find((item) => item.productID === id);
    if(productSearch === undefined) {
        productsBasket.push({productID : id , productCount:1})
    }else {
        productSearch.productCount += 1;
    }

    update(id);
    localStorage.setItem("Products-Basket" , JSON.stringify(productsBasket));
}

/*
Decrement Function
*/

function decrement(id) {
    const productSearch = productsBasket.find((item) => item.productID === id);
    console.log(productSearch);
    if(productSearch === undefined) {
        return;
    }else if (productSearch.productCount === 0) {
        return;
    }
    
    else {
        productSearch.productCount -= 1;
    }

    update(id);

    productsBasket = productsBasket.filter((basketItems) => {
        return basketItems.productCount !== 0;
    })

    localStorage.setItem("Products-Basket" , JSON.stringify(productsBasket));
} 

/*
Update Function
*/

function update(id) {
    const productSearch = productsBasket.find((item) => item.productID === id);
    document.getElementById(id).innerHTML = productSearch.productCount;
    productCountCalculator();
}


/*
Product Count Calculation Function
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


