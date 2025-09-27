document.addEventListener("DOMContentLoaded", () => {
  const viewCartBtn = document.getElementById("viewCartBtn");
  const cartModal = document.getElementById("cartModal");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const cartItemsList = document.getElementById("cartItems");

  let cart = [];

  // ✅ Open modal
  viewCartBtn?.addEventListener("click", () => {
    cartModal.style.display = "flex";
    renderCart();
  });

  // ✅ Close modal
  closeCartBtn?.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  // ✅ Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  // ✅ Add to cart
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.getAttribute("data-item");
      cart.push(item);
      renderCart();
      alert(`${item} added to cart!`);
    });
  });

  // ✅ Render cart
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
      removeBtn.classList.add("btn", "remove-btn");
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        renderCart();
      });

      li.appendChild(removeBtn);
      cartItemsList.appendChild(li);
    });
  }

  // ✅ Checkout
  checkoutBtn?.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Proceeding to checkout...");
    cart = [];
    renderCart();
    cartModal.style.display = "none";
  });

  // ✅ Clear Cart
  clearCartBtn?.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is already empty!");
      return;
    }
    if (confirm("Are you sure you want to clear the entire cart?")) {
      cart = [];
      renderCart();
    }
  });

  // ✅ Initial render
  renderCart();
});
