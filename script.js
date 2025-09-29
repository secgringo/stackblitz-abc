// -----------------------------
// CART FUNCTIONALITY
// -----------------------------
let cart = [];

// Open and close modal
const viewCartBtn = document.getElementById("viewCartBtn");
const cartModal = document.getElementById("cartModal");
const closeCartBtn = document.getElementById("closeCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const cartItemsList = document.getElementById("cartItems");

if (viewCartBtn && cartModal) {
  viewCartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
    renderCart();
  });
}

if (closeCartBtn) {
  closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert("Thank you for your purchase!");
    cart = [];
    renderCart();
    cartModal.style.display = "none";
  });
}

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
  });
}

// Add to Cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.getAttribute("data-item");
    cart.push(item);
    renderCart();
  });
});

// Render cart items
function renderCart() {
  if (!cartItemsList) return;
  cartItemsList.innerHTML = "";
  if (cart.length === 0) {
    cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "x";
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
// CHECKOUT CONFIRMATION MODAL
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const closeCheckoutModal = document.getElementById("closeCheckoutModal");
  const cartModal = document.getElementById("cartModal");

  if (checkoutBtn && checkoutModal) {
    checkoutBtn.addEventListener("click", () => {
      // Close the cart modal first
      cartModal.style.display = "none";
      // Show checkout confirmation
      checkoutModal.style.display = "flex";
      // Optionally clear the cart here if you want
      // cart = []; updateCartUI();
    });
  }

  if (closeCheckoutModal) {
    closeCheckoutModal.addEventListener("click", () => {
      checkoutModal.style.display = "none";
    });
  }
});


// -----------------------------
// FEEDBACK FORM CONFIRMATION
// -----------------------------
const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    alert(`Thank you for your feedback, ${name}!`);
    feedbackForm.reset();
  });
}

// -----------------------------
// NEWSLETTER SUBSCRIPTION
// -----------------------------
const newsletterForm = document.getElementById("newsletterForm");
const newsletterInput = document.getElementById("newsletter");

if (newsletterForm && newsletterInput) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const userEmail = newsletterInput.value;
    alert(`Thank you for subscribing to our newsletter, ${userEmail}!`);
    newsletterInput.value = ""; // clear field
  });
}

