var products = [
  {
    "name": "Reversible Plaid",
    "price": 26.99,
    "description": "Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.",
    "imageTitle": "images/reversible-plaid.jpg",
    "imageSrcSet": "images/reversible-plaid.jpg 380w, images/reversible-plaid240.jpg 240w",
    "imageSizes": "(max-width: 1006px) 240px, (min-width: 1280px) 380px"
  },
  {
    "name": "Wool Cable Knit",
    "price": 49.99,
    "description": "Warm yourself with this women's natural cable knit scarf, crafted from 100% Merino wool. Imported.",
    "imageTitle": "images/wool-cable.jpeg",
    "imageSrcSet": "images/wool-cable.jpeg 300w, images/wool-cable240.jpeg 240w",
    "imageSizes": "(max-width: 1006px) 240px, (min-width: 1280px) 300px"
  },
  {
    "name": "Northern Lights",
    "price": 29.99,
    "description": "Handmade by women in Agra, sales provide medical and educational support in this remote area of India. Crinkly 100% cotton.",
    "imageTitle": "images/northern-lights310.jpg",
    "imageSrcSet": "images/northern-lights410.jpg 410w, images/northern-lights310.jpg 310w, images/northern-lights240.jpg 240w",
    "imageSizes": "(max-width: 1006px) 240px, (max-width: 1280px) 310px, (min-width: 1280px) 410px"
  },
  {
    "name": "Ombre Infinity",
    "price": 11.99,
    "description": "A dip-dye effect adds color and dimension to a cozy infinity scarf featuring a soft, chunky knit. 100% acrylic.",
    "imageTitle": "images/ombre-infinity310.jpg",
    "imageSrcSet": "images/ombre-infinity410.jpg 410w, images/ombre-infinity310.jpg 310w, images/ombre-infinity240.jpg 240w",
    "imageSizes": "(max-width: 1006px) 240px, (max-width: 1280px) 310px, (min-width: 1280px) 410px"
  },
  {
    "name": "Fringed Plaid",
    "price": 18.99,
    "description": "Generously sized, extra soft and featuring a dazzling fringe, this scarf is rendered in a versatile gray, black and white plaid. Expertly beat the cold with style. 100% acrylic.",
    "imageTitle": "images/fringed-plaid310.jpeg",
    "imageSrcSet": "images/fringed-plaid410.jpeg 410w, images/fringed-plaid310.jpeg 310w, images/fringed-plaid240.jpeg 240w",
    "imageSizes": "(max-width: 1006px) 240px, (max-width: 1280px) 310px, (min-width: 1280px) 410px"
  },
  {
    "name": "Multi Color",
    "price": 22.99,
    "description": "The Who What Wear Oversize Color-Block Square Scarf is big, bold, and designed to twist and wrap any way you wish. All the colors of the season are harmonized in this oversize accent, so you can adjust to contrast or match your outfit; soft and lush, it’s your stylish standoff against cold AC and unexpected fall breezes. 100% acrylic",
    "imageTitle": "images/multi-color310.jpeg",
    "imageSrcSet": "images/multi-color410.jpeg 410w, images/multi-color310.jpeg 310w, images/multi-color240.jpeg 240w",
    "imageSizes": "(max-width: 1006px) 240px, (max-width: 1280px) 310px, (min-width: 1280px) 410px"
  },
  {
    "name": "Etro Paisley-Print Silk",
    "price": 249.99,
    "description": "Luxurious silk scarf with subtle paisley pattern. 100% silk",
    "imageTitle": "images/etro310.png",
    "imageSrcSet": "images/etro.png 492w, images/etro310.png 310w, images/etro240.png 240w",
    "imageSizes": "(max-width: 1006px) 240px, (max-width: 1280px) 310px, (min-width: 1280px) 492px"
  },
  {
    "name": "Ashby Twill",
    "price": 70.99,
    "description": "Faribault brings you the Ashby Twill Scarf in Natural. Woven with a 'broken' twill technique, the Ashby Twill Scarf has a slight zigzag texture. Made in USA, this timeless scarf is crafted with luxurious merino wool and finished with heather gray fringe. 100% Merino wool",
    "imageTitle": "images/twill310.jpg",
    "imageSrcSet": "images/twill410.jpg 410w, images/twill310.jpg 310w, images/twill240.jpg 240w",
    "imageSizes": "(max-width: 1006px) 240px, (max-width: 1280px) 310px, (min-width: 1280px) 410px"
  }
];


function clickEvent(id) {
    return function () {
        addToCart(id);
    };
}

var container = document.getElementById("item-container");
for (var i = 0; i < products.length; i++) {
  var item = document.createElement("div");
  item.className = "item";
  item.innerHTML = "<h4>" + products[i].name + "</h4>";
  item.innerHTML += "<img srcset='" + products[i].imageSrcSet + "' " +
                          "sizes='" + products[i].imageSizes + "' " +
                          "src='" + products[i].imageTitle + "' alt='" + products[i].name + " image'>";
  item.innerHTML += "<p>" + products[i].description + "</p>";
  item.innerHTML += "<p>$" + products[i].price + "</p>";
  var button = document.createElement("button");
  button.className = "hidden";
  button.addEventListener('click', clickEvent(i));
  button.textContent = "Add to my cart";
  item.appendChild(button);
  container.appendChild(item);
}

function filterProducts() {
  event.preventDefault();
  console.log(document.filterMe.filter.value);
}

document.getElementById("cart-info").onclick = function () {
  var popup = document.getElementById("my-cart");
  toggleVisibility(popup);
};

var cart = [];

function checkName(product) {
  return function(item) {
    return item.name == product.name;
  };
}

function findProductIndex(product, array) {
  return array.findIndex(checkName(product));
}


function addToCart(i) {
  var index = findProductIndex(products[i], cart);
  if( index != -1) {
    cart[index].qty ++; 
  }
  else {
    cart.push({"name": products[i].name,
             "qty": 1,
             "price":products[i].price
              });
  }
  
  updatedCart();
}

function jumpingBadge() {
  var badge = document.getElementById("badge");
  badge.className += " bounce";

  var animationEvent = whichAnimationEvent();
  var bool = animationEvent && badge.addEventListener(animationEvent, function() {
    badge.className = "fa-stack badge";
  });
}

function numberOfItems(array) {
  var items = 0;
  for (var i = 0; i < array.length; i++) {
    items += array[i].qty;
  }
  return items;
}

function cleanElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function updatedCart() {
  var number = document.querySelectorAll(".number-of-items-in-cart");
  /*I know they are exactly 2*/
  var items = numberOfItems(cart);
  number[0].innerHTML = items;
  number[1].innerHTML = items;

  var cartList = document.getElementById("cart-items-list");
  
  cleanElement(cartList);
  
  
  var total = 0;
  for (var i = 0; i < cart.length; i ++) {
    var item = document.createElement("li");
    item.className = "item-in-cart";
    item.innerHTML = "<div class='name'>" + cart[i].name + "</div>";
    item.innerHTML += "<div class='qty'>" + cart[i].qty + " x </div>";
    item.innerHTML += "<div class='price'>$" + cart[i].price + "</div>";
    total += cart[i].price * cart[i].qty;
    cartList.appendChild(item);
  }

  document.getElementById("cart-total").innerHTML = "Total: $" + total.toFixed(2);
  jumpingBadge();
}

function whichAnimationEvent(){
    var t; 
    var animations = {
      'animation':'animationend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd'
    };

    for(t in animations){
        if(badge.style[t] !== undefined ){
            return animations[t];
        }
    }
}

function toggleVisibility(element) {
  var visibility = element.style.visibility;
  if (visibility == 'visible') {
    element.style.visibility = 'hidden';
  } else {
    element.style.visibility = 'visible';
  }
}
