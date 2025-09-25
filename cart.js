let cart = {};

// Add event listener to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const item = this.getAttribute('data-item');
    
    // Track quantity
    if (cart[item]) {
      cart[item]++;
    } else {
      cart[item] = 1;
    }

    updateCartUI();
    showAddMessage(item);
  });
});

// Show the modal and update cart display
document.getElementById('viewCartBtn').addEventListener('click', function () {
  document.getElementById('cartModal').style.display = 'block';
  updateCartUI();
});

// Close cart modal
function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

// Update the cart display
function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  const items = Object.keys(cart);
  if (items.length === 0) {
    cartItems.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item} (x${cart[item]})`;
    cartItems.appendChild(li);
  });
}

// Show "Item Added" Message
function showAddMessage(itemName) {
  // Create or reuse the message element
  let message = document.getElementById('item-added-message');
  if (!message) {
    message = document.createElement('div');
    message.id = 'item-added-message';
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.backgroundColor = '#b3ffc7';
    message.style.color = '#000';
    message.style.padding = '10px 20px';
    message.style.borderRadius = '5px';
    message.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    message.style.fontWeight = 'bold';
    document.body.appendChild(message);
  }

  message.textContent = `✅ ${itemName} added to cart!`;
  message.style.display = 'block';

  // Hide message after 2.5 seconds
  setTimeout(() => {
    message.style.display = 'none';
  }, 2500);
}


