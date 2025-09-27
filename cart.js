document.addEventListener("DOMContentLoaded", () => {
  const viewCartBtn = document.getElementById("viewCartBtn");
  const cartModal = document.getElementById("cartModal");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartItemsList = document.getElementById("cartItems");

  let cart = [];

  // Open modal
  if (viewCartBtn) {
    viewCartBtn.addEventListener("click", () => {
      cartModal.style.display = "flex";
      renderCart();
    });
  }

  // Close modal
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartModal.style.display = "none";
    });
  }

  // Close modal when clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.getAttribute("data-item");
      cart.push(item);
      alert(`${item} added to cart!`);
    });
  });

  // Render cart items
  function renderCart() {
    cartItemsList.innerHTML = "";
    if (cart.length === 0) {
      cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    } else {
      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;

        // Remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "x";
        removeBtn.classList.add("btn", "remove-btn");
        removeBtn.addEventListener("click", () => {
          cart.splice(index, 1);
          renderCart();
        });

        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);
      });
    }
  }

  // Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Proceeding to checkout...");
      cart = [];
      renderCart();
      cartModal.style.display = "none";
    });
  }
});
