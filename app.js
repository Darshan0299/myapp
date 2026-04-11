function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function add(name, price){
  let cart = getCart();
  cart.push({name, price});
  saveCart(cart);
  alert("Added to cart");
}

function showCart(){
  let cart = getCart();
  let list = document.getElementById("cartList");
  let total = 0;

  list.innerHTML = "";

  cart.forEach(item => {
    total += item.price;

    list.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}