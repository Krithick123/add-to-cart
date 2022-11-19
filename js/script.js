const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

// AFTER CONTENT LOADED
document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
}

function loadContent(){
    // REMOVE FOOD ITEM
let btnRemove=document.querySelectorAll('.cart-remove');
btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
});

    // product items CHANGE QUANTITY
let qtyElements=document.querySelectorAll('.cart-quantity');
qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
    
});



    //ADD TO CART 
let addCartElements=document.querySelectorAll('.add-cart');
addCartElements.forEach((btn)=>{
    btn.addEventListener('click',addCart);

});

//UPDATE TOTAL

updateTotal();

}

// REMOVE ITEM 
function removeItem(){
    if(confirm('Are You Sure to Delete')){
        let title=this.parentElement.querySelector('.cart-food-title').innerHTML;

        itemList=itemList.filter(el=>el.title!=title);
        this.parentElement.remove();

        loadContent();
    }
   
}

function changeQty(){
    if(isNaN(this.value) || this.value<1)
    {
        this.value=1;
    }
    loadContent();
}

let itemList=[];


function addCart(){
    let food=this.parentElement;

    let title=food.querySelector('.food-title').innerHTML;
    let price=food.querySelector('.food-price').innerHTML;
    let imgSrc=food.querySelector('.food-img').src;


    let newProduct={title,price,imgSrc};
    
    if(itemList.find((el)=>el.title==newProduct.title))
    {
        alert("Product Already added in cart");
        return;
    }
    else{
        itemList.push(newProduct);
    }
    
    let newProductElement=createCartProduct(title,price,imgSrc);
    let element=document.createElement('div');
    element.innerHTML=newProductElement;
    cartBasket=document.querySelector('.cart-content');
    cartBasket.prepend(element);
    
    loadContent();
}

function createCartProduct(title,price,imgSrc)
{
    return `
    <div class="cart-box">
                        <img src="${imgSrc}"  class="cart-img" alt="">
                        <div class="detail-box">
                            <div class="cart-food-title">${title}</div>
                            <div class="price-box">
                                <div class="cart-price">${price}</div>
                                <div class="cart-amt">${price}</div>
                            </div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <ion-icon name="trash" class="cart-remove"></ion-icon>
                    </div>
    
    `;
}



function updateTotal(){
    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');

    let total=0;

    cartItems.forEach((product)=>{
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace('Rs.',""));

        let qty=product.querySelector('.cart-quantity').value;

        total+=(price*qty);

        product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
    });

    totalValue.innerHTML='Rs.'+total;

    // ADD PRODUCT COUNT IN CART ICON

    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;

    if(count==0){
        cartCount.style.display='none';
    }
    else{
        cartCount.style.display='block';
    }
}


