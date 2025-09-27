document.addEventListener("DOMContentLoaded", () => {
  const viewCartBtn = document.getElementById("viewCartBtn");
  const cartModal = document.getElementById("cartModal");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartItemsList = document.getElementById("cartItems");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
      saveCart();
      renderCart();
      showToast(`${item} added to cart!`);
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
        saveCart();
        renderCart();
      });

      li.appendChild(removeBtn);
      cartItemsList.appendChild(li);
    });
  }

  // ✅ Checkout
  checkoutBtn?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!");
      return;
    }
    showToast("Proceeding to checkout...");
    cart = [];
    saveCart();
    renderCart();
    cartModal.style.display = "none";
  });

  // ✅ Save to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ✅ Toast notification (replaces alerts)
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ✅ Initial render
  renderCart();
});
