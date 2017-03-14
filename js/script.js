document.getElementById("cart-info").onclick = function () {
  var popup = document.getElementById("my-cart");
  toggleVisibility(popup);
};

function clickEvent(name, price) {
    return function () {
        addToCart(name, price);
    };
}

function populateProducts(myArray) {
  myArray = (typeof myArray === 'undefined') ? products : myArray;
  var container = document.getElementById("item-container");
  for (var i = 0; i < myArray.length; i++) {
    var item = document.createElement("div");
    item.className = "item";
    item.innerHTML = "<h4>" + myArray[i].name + "</h4>";
    item.innerHTML += "<img srcset='" + myArray[i].imageSrcSet + "' " +
                            "sizes='" + myArray[i].imageSizes + "' " +
                            "src='" + myArray[i].imageTitle + "' alt='" + myArray[i].name + " image'>";
    item.innerHTML += "<p>" + myArray[i].description + "</p>";
    item.innerHTML += "<p>$" + myArray[i].price + "</p>";
    var button = document.createElement("button");
    button.className = "hidden";
    button.addEventListener('click', clickEvent(myArray[i].name, myArray[i].price));
    button.textContent = "Add to my cart";
    item.appendChild(button);
    container.appendChild(item);
  }
}
populateProducts();

function sortProducts(event) {
  event.preventDefault();
  var container = document.getElementById("item-container");
  var sortBy = document.sortMe.sort.value;
  if(sortBy == "name") {
    sortByName();
    cleanElement(container);
    populateProducts();
  }
  else if(sortBy == "price"){
    sortByPrice();
    cleanElement(container);
    populateProducts();
  }
  
  
}

function sortByName() {
  products.sort(function(a, b) {
    return a.name.toLowerCase() > b.name.toLowerCase();
  });
}

function sortByPrice() {
  products.sort(function(a, b) {
    return a.price - b.price;
  });
}

function filterProducts(event) {
  event.preventDefault();
  var min = document.filterMe.min.value;
  var max = document.filterMe.max.value;
  var filteredProducts = products.filter(betweenPrices(min, max));
  var container = document.getElementById("item-container");
  
  cleanElement(container);
  populateProducts(filteredProducts);
}

function betweenPrices(min, max, product){
  return function (product) {
    return ((!min || product.price) >= min && (!max || product.price <= max));
  };
}

var cart = [];

function checkName(name) {
  return function(item) {
    return item.name == name;
  };
}

function findProductIndex(name, array) {
  return array.findIndex(checkName(name));
}


function addToCart(name, price) {
  var index = findProductIndex(name, cart);
  if(index != -1) {
    cart[index].qty ++; 
  }
  else {
    cart.push({"name": name,
             "qty": 1,
             "price": price
              });
  }
  
  updatedCart();
}

function removeFromCart(name) {
  var index = findProductIndex(name, cart);
  if(index != -1) {
    var quantity = cart[index].qty;
    if(quantity > 1) {
      cart[index].qty --; 
    }
    else {
      cart.splice(index, 1);
    }
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

function removeEvent(name) {
  return function() {
    removeFromCart(name);
  };
}

function updatedCart() {
  var number = document.querySelectorAll(".number-of-items-in-cart");
  /*I know they are exactly 2*/
  var items = numberOfItems(cart);
  number[0].innerHTML = items;
  number[1].innerHTML = items;
  
  var emptyMessage = document.getElementById("emptyMessage");
  var itemsMessage = document.getElementById("itemsMessage");
  
  var cartList = document.getElementById("cart-items-list");
  cleanElement(cartList);
  var total = 0;
  
  if(cart.length > 0) {
    emptyMessage.className = "hidden";
    itemsMessage.className = "";
    
    for (var i = 0; i < cart.length; i ++) {
      var item = document.createElement("li");
      item.className = "item-in-cart";
      item.innerHTML = "<div class='name'>" + cart[i].name + "</div>";
      item.innerHTML += "<div class='qty'>" + cart[i].qty + " x </div>";
      item.innerHTML += "<div class='price'>$" + cart[i].price + "</div>";
      var remove = document.createElement("a");
      remove.textContent = "Remove";
      remove.href = "#";
      remove.addEventListener('click', removeEvent(cart[i].name));
      item.appendChild(remove);

      total += cart[i].price * cart[i].qty;
      cartList.appendChild(item);
    }
  }
  else {
    emptyMessage.className = "";
    itemsMessage.className = "hidden";
  }
  document.getElementById("cart-total").innerHTML = "Total: $" + total.toFixed(2);
  jumpingBadge();
}

function jumpingBadge() {
  var badge = document.getElementById("badge");
  if(cart.length > 0) {
    badge.className = "fa-stack badge";
    badge.className += " bounce";

    var animationEvent = whichAnimationEvent();
    var bool = animationEvent && badge.addEventListener(animationEvent, function() {
      badge.className = "fa-stack badge";
    });
  }
  else {
    badge.className = "hidden";
  }
  
}
