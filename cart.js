// cart.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
    removeBtn.textContent = "×"; // neutral glyph
    removeBtn.classList.add("btn", "remove-btn");
    removeBtn.setAttribute("aria-label", `Remove ${item.name} from cart`);
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      saveCart();
      displayCart();
    };

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
}

function addToCart(itemName) {
  const existing = cart.find(i => i.name === itemName);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name: itemName, quantity: 1 });
  }
  saveCart();
  displayCart();
  alert(`${itemName} has been added to your cart!`);
}

function clearCart() {
  cart = [];
  saveCart();
  displayCart();
}

function processOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order!");
  clearCart();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.getAttribute("data-item");
      addToCart(item);
    });
  });

  const viewCartBtn = document.getElementById("viewCartBtn");
  const cartModal = document.getElementById("cartModal");

  if (viewCartBtn && cartModal) {
    viewCartBtn.addEventListener("click", () => {
      cartModal.style.display = "flex";
      displayCart();
    });
  }

  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);

  const processOrderBtn = document.getElementById("processOrderBtn");
  if (processOrderBtn) processOrderBtn.addEventListener("click", processOrder);

  if (cartModal) {
    cartModal.addEventListener("click", e => {
      if (e.target === cartModal) {
        cartModal.style.display = "none";
      }
    });
  }
});
