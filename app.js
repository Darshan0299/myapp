function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function add(name, price, image){
  let cart = getCart();
  // if item exists, increase qty
  const existing = cart.find(i => i.name === name && i.price === price);
  if(existing){ existing.qty = (existing.qty || 1) + 1; }
  else { cart.push({name, price, image, qty:1}); }
  saveCart(cart);
  alert("Added to cart");
}

function showCart(){
  let cart = getCart();
  let list = document.getElementById("cartList");
  let total = 0;

  list.innerHTML = "";

  cart.forEach((item, idx) => {
    total += item.price * (item.qty || 1);
    const img = item.image ? `<img class="cart-item-img" src="${item.image}" alt="${item.name}">` : '';
    const qty = item.qty || 1;

    list.innerHTML += `
      <div class="card" style="flex-direction:row; align-items:center; gap:12px; padding:12px;">
        ${img}
        <div style="flex:1">
          <h3 style="margin:0">${item.name}</h3>
          <p style="margin:4px 0">₹${item.price} x ${qty} = ₹${item.price * qty}</p>
        </div>
        <div style="display:flex; gap:8px; align-items:center">
          <button onclick="updateQty(${idx}, ${qty - 1})">-</button>
          <span>${qty}</span>
          <button onclick="updateQty(${idx}, ${qty + 1})">+</button>
          <button onclick="removeItem(${idx})">Remove</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function updateQty(index, newQty){
  let cart = getCart();
  if(newQty <= 0){ cart.splice(index,1); }
  else { cart[index].qty = newQty; }
  saveCart(cart);
  showCart();
}

function removeItem(index){
  let cart = getCart();
  cart.splice(index,1);
  saveCart(cart);
  showCart();
}

// Category filter setup for product listing pages
function setupCategoryFilters(){
  const bar = document.querySelector('.category-bar');
  if(!bar) return;
  const buttons = bar.querySelectorAll('button');
  const cards = document.querySelectorAll('.product-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      cards.forEach(c => {
        if(cat === 'all' || c.dataset.category === cat) c.style.display = '';
        else c.style.display = 'none';
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupCategoryFilters();
});