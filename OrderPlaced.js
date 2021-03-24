console.clear();
if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.clear();
    document.getElementById("cart-badge").innerHTML = counter
}
