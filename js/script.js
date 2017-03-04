document.getElementById("cart-info").onclick = function () {
  var popup = document.getElementById("my-cart");
  toggleVisibility(popup);
};

function clickEvent(id) {
    return function () {
        addToCart(id);
    };
}

function populateProducts() {
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
}
populateProducts();

function filterProducts() {
  event.preventDefault();
  console.log(document.filterMe.filter.value);
}

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

function numberOfItems(array) {
  var items = 0;
  for (var i = 0; i < array.length; i++) {
    items += array[i].qty;
  }
  return items;
}

function updatedCart() {
  var number = document.querySelectorAll(".number-of-items-in-cart");
  /*I know they are exactly 2*/
  var items = numberOfItems(cart);
  number[0].innerHTML = items;
  number[1].innerHTML = items;
  var emptyMessage = document.getElementById("emptyMessage");
  emptyMessage.className = "hidden";
  
  var itemsMessage = document.getElementById("itemsMessage");
  itemsMessage.className = "";
  
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

function jumpingBadge() {
  var badge = document.getElementById("badge");
  badge.className = "fa-stack badge";
  badge.className += " bounce";

  var animationEvent = whichAnimationEvent();
  var bool = animationEvent && badge.addEventListener(animationEvent, function() {
    badge.className = "fa-stack badge";
  });
}
