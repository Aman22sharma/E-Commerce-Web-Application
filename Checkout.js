/*<div class="container" id="checkout">
            <h1>Checkout</h1>
            <p id="total-items">Total items: </p>

            <div id="kindablock">
                <div id="left-check">
                </div>
                <div id="right-check">
                    <div id="total">
                        <h2>Total amount</h2>
                        <p class="desc">Total price: <span></span></p>
                        <a href="OrderConfirmatiion.html" onclick="localStorage.clear();"><button>Place Order</button></a>
                    </div>
                </div>
            </div>

        </div>   */




$(document).ready(function() {
    var headerHeight = $('header').css('height');
    headerHeight = Math.floor(headerHeight.substr(-headerHeight.length, headerHeight.length - 2));
    $('main').css('margin-top', headerHeight + 20 + "px");
    $("#top-menu a:first").click(function() {
        window.open("index.html", "_self");
        window.setTimeout(function() {
            $('html,body').animate({
                    scrollTop: $("#clothes-heading").offset().top - headerHeight
                },
                'slow');
        }, 1000);
    });
});



let checkout = document.getElementById("checkout");
var sum = 0;
var totalCount = 0;
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let obj = JSON.parse(localStorage.getItem(key));
    let left = document.getElementById("left-check");
    let item = document.createElement('div');
    item.className = "item";
    let img = document.createElement('img');
    img.src = obj.thumbnail;
    item.appendChild(img);
    let heading = document.createElement('h4');
    headingText = document.createTextNode(obj.title);
    heading.appendChild(headingText);
    item.appendChild(heading);
    let countText = "";
    let countPar = document.createElement('p');
    if (obj.count > 1) {
        countText = document.createTextNode("x" + obj.count);
        countPar.appendChild(countText);
        item.appendChild(countPar);
    }
    let par1 = document.createElement('p');
    par1.className = "desc";
    let par1Text = document.createTextNode('Amount: Rs ' + obj.amount);
    par1.appendChild(par1Text);
    item.appendChild(par1);
    left.appendChild(item);
    let total = document.querySelector('#total span');
    sum += obj.amount * obj.count;
    total.innerHTML = sum;
    totalCount += obj.count;
}


let topCounter = document.querySelector('#card span');
if (totalCount > 0) {
    topCounter.setAttribute('id', 'counter');
    topCounter.innerHTML = totalCount;
} else topCounter.removeAttribute('id');
let totalItems = document.getElementById('total-items');
if (totalCount > 0) {
    totalItems.innerHTML += totalCount;
}