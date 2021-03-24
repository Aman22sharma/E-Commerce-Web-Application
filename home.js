{/* <div class="card">
        <a href="/Home.html">
          <img class="card-img" src="https://imgur.com/KtGxwnN.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </a>
</div> */}

/*jQuery(document).ready(function($) {

	var feedbackSlider = $('.feedback-slider');
	feedbackSlider.owlCarousel({
		items: 1,
		nav: true,
		dots: true,
		autoplay: true,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
		responsive:{

			// breakpoint from 767 up
			767:{
				nav: true,
				dots: false
			}
		}
	});

	feedbackSlider.on("translate.owl.carousel", function(){
		$(".feedback-slider-item h3").removeClass("animated fadeIn").css("opacity", "0");
		$(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating").removeClass("animated zoomIn").css("opacity", "0");
	});

	feedbackSlider.on("translated.owl.carousel", function(){
		$(".feedback-slider-item h3").addClass("animated fadeIn").css("opacity", "1");
		$(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating").addClass("animated zoomIn").css("opacity", "1");
	});
	feedbackSlider.on('changed.owl.carousel', function(property) {
		var current = property.item.index;
		var prevThumb = $(property.target).find(".owl-item").eq(current).prev().find("img").attr('src');
		var nextThumb = $(property.target).find(".owl-item").eq(current).next().find("img").attr('src');
		var prevRating = $(property.target).find(".owl-item").eq(current).prev().find('span').attr('data-rating');
		var nextRating = $(property.target).find(".owl-item").eq(current).next().find('span').attr('data-rating');
		$('.thumb-prev').find('img').attr('src', prevThumb);
		$('.thumb-next').find('img').attr('src', nextThumb);
		$('.thumb-prev').find('span').next().html(prevRating + '<i class="fa fa-star"></i>');
		$('.thumb-next').find('span').next().html(nextRating + '<i class="fa fa-star"></i>');
	});
	$('.thumb-next').on('click', function() {
		feedbackSlider.trigger('next.owl.carousel', [300]);
		return false;
	});
	$('.thumb-prev').on('click', function() {
		feedbackSlider.trigger('prev.owl.carousel', [300]);
		return false;
	});
	
}); */


let  apiData;
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
    // var thumbnailWrapper = document.createElement('div');
    // thumbnailWrapper.className = 'thumbnail-Wrapper';

    var thumbnail = document.createElement('img');
    thumbnail.className = 'card-img';
    thumbnail.src = clothingCardObj.preview;
    thumbnail.style = 'width:100%';

    cardDiv.appendChild(thumbnail);
    cardLink.appendChild(thumbnail);
    //Thubnail-wrapper-section End


    //cardtitle start
    var cardTitle = document.createElement('div');
    cardTitle.className = 'card-body';

    var title = document.createElement('h5');
    title.className = 'card-title';
    title.id = 'card-product-title';
    var titleText = document.createTextNode(clothingCardObj.name);
    title.appendChild(titleText);

    cardTitle.appendChild(title)

    var subTitle = document.createElement('P');
    subTitle.className = 'card-text';
    subTitle.id = 'card-brand';
    var subTitleText = document.createTextNode(clothingCardObj.brand);
    subTitle.appendChild(subTitleText);

    cardTitle.appendChild(subTitle);
    cardTitle.appendChild(subTitle);


    var sub1Title = document.createElement('p');
    sub1Title.className = 'card-text';
    sub1Title.id = 'card-price';
    var sub1TitleText = document.createTextNode('INR' +' '+ clothingCardObj.price);
    sub1Title.appendChild(sub1TitleText);

    cardTitle.appendChild(sub1Title);
    cardTitle.appendChild(sub1Title);
    cardLink.appendChild(cardTitle);

    return cardDiv;
}


function searchProduct(ev) {
    let val = ev.target.value;
    
    if (val && val.trim() != '') {
        apiData.filter((item) => {
        if (item.brand.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return (item.brand.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
    console.log("no data is comming")
}

//-----------------Appending Clothing section product card------------------// 
var clothingCard = document.getElementById('clothing-container');

//-----------------Appending Accessories section product card------------------// 
var accessoriesCard = document.getElementById('accessories-container');

//-------------------------------API Call--------------------------------------//
var httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (this.status == 200) {
            apiData = JSON.parse(this.responseText);
            console.log('call was succesfull',apiData);
                if (document.cookie.indexOf(",counter=") >= 0) {
                    var counter = document.cookie.split(",")[1].split("=")[1];
                    document.getElementById("cart-badge").innerHTML = counter;
                }
            for (i = 0; i <  apiData.length; i++) {
                console.log( apiData[i].isAccessory);
                if (! apiData[i].isAccessory) {
                    clothingCard.appendChild(createClothingCardsDynamically( apiData[i]));
                } else {
                    accessoriesCard.appendChild(createClothingCardsDynamically( apiData[i]));
                }
            }
        }else console.log('Error in Api call');
    }
}

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', 'true');
httpRequest.send();

  