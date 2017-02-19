var products = [
  {
    "name": "Reversible Plaid",
    "price": 26.99,
    "description": "Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.",
    "imageTitle": "reversible-plaid.jpg"
  },
  {
    "name": "Wool Cable Knit",
    "price": 49.99,
    "description": "Warm yourself with this women's natural cable knit scarf, crafted from 100% Merino wool. Imported.",
    "imageTitle": "wool-cable.jpeg"
  },
  {
    "name": "Northern Lights",
    "price": 29.99,
    "description": "Handmade by women in Agra, sales provide medical and educational support in this remote area of India. Crinkly 100% cotton.",
    "imageTitle": "northern-lights.jpg"
  },
  {
    "name": "Ombre Infinity",
    "price": 11.99,
    "description": "A dip-dye effect adds color and dimension to a cozy infinity scarf featuring a soft, chunky knit. 100% acrylic.",
    "imageTitle": "ombre-infinity.jpg"
  },
  {
    "name": "Fringed Plaid",
    "price": 18.99,
    "description": "Generously sized, extra soft and featuring a dazzling fringe, this scarf is rendered in a versatile gray, black and white plaid. Expertly beat the cold with style. 100% acrylic.",
    "imageTitle": "fringed-plaid.jpeg"
  },
  {
    "name": "Multi Color",
    "price": 22.99,
    "description": "The Who What Wear Oversize Color-Block Square Scarf is big, bold, and designed to twist and wrap any way you wish. All the colors of the season are harmonized in this oversize accent, so you can adjust to contrast or match your outfit; soft and lush, it’s your stylish standoff against cold AC and unexpected fall breezes. 100% acrylic",
    "imageTitle": "multi-color.jpeg"
  },
  {
    "name": "Etro Paisley-Print Silk",
    "price": 249.99,
    "description": "Luxurious silk scarf with subtle paisley pattern. 100% silk",
    "imageTitle": "etro.png"
  },
  {
    "name": "Ashby Twill",
    "price": 70.99,
    "description": "Faribault brings you the Ashby Twill Scarf in Natural. Woven with a 'broken' twill technique, the Ashby Twill Scarf has a slight zigzag texture. Made in USA, this timeless scarf is crafted with luxurious merino wool and finished with heather gray fringe. 100% Merino wool",
    "imageTitle": "twill.jpg"
  }
];

var container = document.getElementById("item-container");
for (var i = 0; i < products.length; i++) {
  var item = document.createElement("div");
  item.className = "item";
  item.innerHTML = "<h4>" + products[i].name + "</h4>";
  item.innerHTML += "<img src='images/" + products[i].imageTitle + "' alt='" + products[i].name + " image'>";
  item.innerHTML += "<p>" + products[i].description + "</p>";
  item.innerHTML += "<p>$" + products[i].price + "</p>";
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

function toggleVisibility(element) {
  var visibility = element.style.visibility;
  if (visibility == 'visible') {
    element.style.visibility = 'hidden';
  } else {
    element.style.visibility = 'visible';
  }
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

/*Later this should make the badge jump on update*/
function jumpingBadge() {
  var badge = document.getElementById("badge");
  badge.onmouseover = function () {
  badge.className += " bounce";
  };

  var animationEvent = whichAnimationEvent();
  var bool = animationEvent && badge.addEventListener(animationEvent, function() {
    badge.className = "fa-stack badge";
  });
}

jumpingBadge();


var cart = [
  {
    "name": "Wool Cable Knit",
    "price": 49.99,
    "description": "Warm yourself with this women's natural cable knit scarf, crafted from 100% Merino wool. Imported.",
    "imageTitle": "wool-cable.jpeg"
  },
  {
    "name": "Northern Lights",
    "price": 29.99,
    "description": "Handmade by women in Agra, sales provide medical and educational support in this remote area of India. Crinkly 100% cotton.",
    "imageTitle": "northern-lights.jpg"
  }
];

function updatedCart() {
  var number = document.querySelectorAll(".number-of-items-in-cart");
  /*I know they are exactly 2*/
  number[0].innerHTML = cart.length;
  number[1].innerHTML = cart.length;

  var cartList = document.getElementById("cart-items-list");
  var total = 0;
  for (var i = 0; i < cart.length; i ++) {
    var item = document.createElement("li");
    item.className = "item-in-cart";
    item.innerHTML = "<div class='name'>" + cart[i].name + "</div>";
    item.innerHTML += "<div class='price'>" + cart[i].price + "</div>";
    total += cart[i].price;
    cartList.appendChild(item);
  }

  document.getElementById("cart-total").innerHTML += total;
}

updatedCart();