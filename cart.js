// cart.js

// Retrieve cart from localStorage safely
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  displayCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  displayCart();
}

function changeQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
    displayCart();
  }
}

function displayCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price} x ${item.quantity}</span>
      <button onclick="changeQuantity(${item.id}, 1)">+</button>
      <button onclick="changeQuantity(${item.id}, -1)">-</button>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayCart();
});
