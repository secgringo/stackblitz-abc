// cart.js
let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const item = this.getAttribute('data-item');
    cart.push(item);
    updateCartUI();
  });
});

document.getElementById('view-cart-btn').addEventListener('click', function () {
  document.getElementById('cart-modal').style.display = 'block';
});

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    cartItems.appendChild(li);
  });
}
