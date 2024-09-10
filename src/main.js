const productsBasket = [];

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
const productDetailsDiv = document.querySelector("#productDetailsDiv");
function generateProductItems() {
    return productDetailsDiv.innerHTML = productDetailsArray.map((productObj) => {
        const { productId , productName, productPrice, productDesc, productImg } = productObj;
        return `
            <div class="productCard">
                <figure><img src="${productImg}" alt="${productImg}"></figure>
                <div class="details">
                    <div class="productName-productPrice">
                        <h2>${productName}</h2>
                        <p class="productPrice">$ ${productPrice}</p>
                    </div>
                    <p>${productDesc}</p>
                    <div class="buttons">
                        <span><i onclick="decrement('${productId}')" class="bi bi-dash-circle-fill"></i></span>
                        <span id="${productId}" class="productQuantity">0</span>
                        <span><i onclick="Increment('${productId}')" class="bi bi-plus-circle-fill"></i></span>
                    </div>
                </div>
            </div>
        `
    }).join("")
}

generateProductItems();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function Increment(id) {
    const productSearch = productsBasket.find((basketItem) => basketItem.productId === id);
    if(productSearch === undefined) {
        productsBasket.push({productId : id , productCount:1})
    }else {
        productSearch.productCount += 1;
    }
    console.log(productsBasket);
    update(id);
    

}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function decrement(id) {
    const productSearch = productsBasket.find((basketItem) => basketItem.productId === id);
    if(productSearch === undefined || productSearch.productCount === 0) {
        return;
    }else {
        productSearch.productCount -= 1;
    }
    console.log(productsBasket);
    update(id);
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