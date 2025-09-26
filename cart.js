// cart.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Display items in modal
function displayCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (x${item.quantity})`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.classList.add("btn");
    removeBtn.style.marginLeft = "0.5rem";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      saveCart();
      displayCart();
    };

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
}

// Add item to cart
function addToCart(itemName) {
  const existing = cart.find(i => i.name === itemName);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name: itemName, quantity: 1 });
  }
  saveCart();
  displayCart();

  // ✅ Confirmation message
  alert(`${itemName} has been added to your cart!`);
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
  displayCart();
}

// Process order
function processOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order!");
  clearCart();
}

// Attach events on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // Wire up Add to Cart buttons
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.getAttribute("data-item");
      addToCart(item);
    });
  });

  // View Cart modal
  const viewCartBtn = document.getElementById("viewCartBtn");
  const cartModal = document.getElementById("cartModal");

  if (viewCartBtn && cartModal) {
    viewCartBtn.addEventListener("click", () => {
      cartModal.style.display = "flex";
      displayCart();
    });
  }

  // Clear cart button
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);

  // Process order button
  const processOrderBtn = document.getElementById("processOrderBtn");
  if (processOrderBtn) processOrderBtn.addEventListener("click", processOrder);

  // Close modal when clicking outside
  if (cartModal) {
    cartModal.addEventListener("click", e => {
      if (e.target === cartModal) {
        cartModal.style.display = "none";
      }
    });
  }
});

