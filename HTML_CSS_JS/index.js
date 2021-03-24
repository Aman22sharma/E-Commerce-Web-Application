/*<section id="clothing-section">
            <h1>Clothings For Mens and Womens</h1>
            <div id="clothing-card">
                <!--<h1>Clothings For Mens and Womens</h1>
            <!--<div class="card">
                    <a href="/Home.html">
                        <div class="thumbnail-wrapper">
                            <img class="thumbnail" src="https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-600w-789676552.jpg">
                        </div>
                        <div class="card-title">
                            <h2>Tailored Jeans</h2>
                            <p>Some text about the jeans..</p>
                            <p class="price">$19.99</p>
                        </div>
                    </a>
                </div>-->
            </div>
        </section>

        <!-----------------------------Accessories Section------------------------------------>

        <section id="accessories--section">
            <h1>Accesories For Mens and Womens</h1>
            <div id="accessories-card">
                <!--<h1>Clothings For Mens and Womens</h1>
            <!--<div class="card">
                    <a href="/Home.html">
                        <div class="thumbnail-wrapper">
                            <img class="thumbnail" src="https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-600w-789676552.jpg">
                        </div>
                        <div class="card-title">
                            <h2>Tailored Jeans</h2>
                            <p>Some text about the jeans..</p>
                            <p class="price">$19.99</p>
                        </div>
                    </a>
                </div>-->
            </div>
        </section>
*/



let  contentTitle;
console.log(document.cookie);

function createClothingCardsDynamically(clothingCardObj) {
    console.log(clothingCardObj);

    //parent card start
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    var cardLink = document.createElement('a');
    cardDiv.appendChild(cardLink);
    cardLink.href = '/ProductDetails.html?' + clothingCardObj.id;
    //parent card end

    //Thubnail-wrapper-section start
    var thumbnailWrapper = document.createElement('div');
    thumbnailWrapper.className = 'thumbnail-Wrapper';

    var thumbnail = document.createElement('img');
    thumbnail.className = 'thumbnail';
    thumbnail.src = clothingCardObj.preview;
    thumbnail.style = 'width:100%';


    thumbnailWrapper.appendChild(thumbnail);

    cardLink.appendChild(thumbnailWrapper);
    //Thubnail-wrapper-section End


    //cardtitle start
    var cardTitle = document.createElement('div');
    cardTitle.className = 'card-title';

    var title = document.createElement('h2');
    var titleText = document.createTextNode(clothingCardObj.name);
    title.appendChild(titleText);

    cardTitle.appendChild(title)

    var subTitle = document.createElement('P');
    var subTitleText = document.createTextNode(clothingCardObj.brand);
    subTitle.appendChild(subTitleText);

    cardTitle.appendChild(subTitle);
    cardTitle.appendChild(subTitle);


    var sub1Title = document.createElement('P');
    sub1Title.className = 'price';
    var sub1TitleText = document.createTextNode(clothingCardObj.price);
    sub1Title.appendChild(sub1TitleText);

    cardTitle.appendChild(sub1Title);
    cardTitle.appendChild(sub1Title);


    cardLink.appendChild(cardTitle);


    return cardDiv;
}


var clothingCard = document.getElementById('clothing-card');
var accessoriesCard = document.getElementById('accessories-card');


var httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (this.status == 200) {
            console.log('call was succesfull');
            contentTitle = JSON.parse(this.responseText);
                if (document.cookie.indexOf(",counter=") >= 0) {
                    var counter = document.cookie.split(",")[1].split("=")[1];
                    document.getElementById("badge").innerHTML = counter;
                }
            for (i = 0; i <  contentTitle.length; i++) {
                console.log( contentTitle[i].isAccessory);
                if (! contentTitle[i].isAccessory) {
                    clothingCard.appendChild(createClothingCardsDynamically( contentTitle[i]));
                } else {
                    accessoriesCard.appendChild(createClothingCardsDynamically( contentTitle[i]));
                }
            }
        }else console.log('Error in Api call');
    }
}



httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', 'true');
httpRequest.send();