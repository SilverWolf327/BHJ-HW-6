const products = document.querySelector('.products');
const productAdd = products.querySelectorAll('.product__add');
const quantityControlInc = products.querySelectorAll('.product__quantity-control_inc');
const quantityControlDec = products.querySelectorAll('.product__quantity-control_dec');

const product = document.querySelectorAll('.product');
const cart = document.querySelector('.cart');
let cartProducts;



function productsCartOperate(event) {
    
    elem = event.target;
    
    for (let i = 0; i < productAdd.length; i++) {  
    
        if (
            (elem === productAdd[i]) && 
            (Number(productAdd[i].previousElementSibling.children[1].
            textContent) > 0)
            ) {
               
                let productId = product[i].dataset.id;
                let productImg = product[i].querySelector('img').
                getAttribute('src');
                let productCount = quantityControlInc[i].previousElementSibling.textContent;
                addProduct(productId, productImg, productCount);
                productAdd[i].previousElementSibling.children[1].
                    textContent = 1;
        };

        if (elem === quantityControlInc[i]) {
            
            quantityControlInc[i].previousElementSibling.textContent = 
                Number(quantityControlInc[i].previousElementSibling.textContent) +1;
        };

        if (elem === quantityControlDec[i]) {

            let decValue = Number(quantityControlDec[i].nextElementSibling.textContent);
            if (decValue > 0) {
                quantityControlDec[i].nextElementSibling.textContent = decValue -1;
            };
        };
    };

    cartProducts = cart.querySelectorAll('.cart__products');

    if (cartProducts !== null){
        for (let d = 0; d < cartProducts.length; d++ ) {
     
            if (elem === cartProducts[d].querySelector('.prod__remove')) { 
                elem.parentElement.parentElement.remove();

                if (cartProducts.length === 1) cart.classList.remove('cart_not_empty');
            };
                    
        };
    };
};

function addProduct(productId, productImg, productCount) {
    
    cartProducts = cart.querySelectorAll('.cart__products'); 
    let currentNamesProductsCount = cartProducts.length;
    let productIn = false; 
    
    for (let m = 0; m < currentNamesProductsCount; m++) {
    
        if (currentNamesProductsCount > 0) {
            if (cartProducts[m].querySelector('.cart__product').dataset.id === productId) {
                cartProducts[m].querySelector('.cart__product-count').textContent = 
                     Number(cartProducts[m].querySelector('.cart__product-count').textContent) + Number(productCount);
                     productIn = true;
            };
        };
    };    
        
    if (!productIn) {
            cart.insertAdjacentHTML('beforeend', `
                        <div class="cart__products">
                            <div class="cart__product" data-id="${productId}">
                                <img class="cart__product-image" src="${productImg}">
                                <div class="cart__product-count">${productCount}</div>
                                <a href="#" class="prod__remove">&times;</a>
                            </div>
                        </div>`);
    };

    if (currentNamesProductsCount === 0) cart.classList.add('cart_not_empty');
    
};


document.addEventListener('click', productsCartOperate)