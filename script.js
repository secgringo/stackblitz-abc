// -----------------------------
// CART FUNCTIONALITY
// -----------------------------
let cart = [];

// Open and close modal
const cartModal = document.getElementById("cartModal");
const viewCartBtn = document.getElementById("viewCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const cartItemsList = document.getElementById("cartItems");

// ✅ Open cart modal
if (viewCartBtn) {
  viewCartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
    renderCart();
  });
}

// ✅ Close cart modal
if (closeCartBtn) {
  closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });
}

// ✅ Checkout button
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert("Proceeding to checkout!");
  });
}

// ✅ Clear cart button
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
  });
}

// ✅ Add to cart buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const itemName = button.dataset.item;
    cart.push(itemName);
    renderCart();
  });
});

// ✅ Render cart items
function renderCart() {
  cartItemsList.innerHTML = "";
  if (cart.length === 0) {
    cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });

    li.appendChild(removeBtn);
    cartItemsList.appendChild(li);
  });
}

// -----------------------------
// NEWSLETTER SUBSCRIPTION
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent actual form submission
      const emailInput = document.getElementById("newsletter");
      const userEmail = emailInput.value;

      // Simple confirmation popup
      alert(`Thank you for subscribing to our newsletter, ${userEmail}!`);

      // Clear the field
      emailInput.value = "";
    });
  }
});

