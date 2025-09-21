// cart.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Add to Cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.dataset.item;
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added.");
  });
});

// View Cart
document.getElementById("viewCartBtn").addEventListener("click", () =>{
  const cartModal = document.getElementById("cartModal");
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cart.forEach(item => {
      let li = document.createElement ("li");
      li.textContent = item;
      cartItems.appendChild(li);
    });
  }

  cartModal.style.display = "block";
});

// Clear Cart
document.getElementById("clearCartBtn").addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cartItems").innerHTML = "<li>Your cart is empty.</li>"
});

//Process Order
document.getElementById("processOrderBtn").addEventListener("click", ()  => {
  if (cart.length > 0) {
    alert("Thank you for your order.");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cartItems").innerHTML = "<li>Your cart is empty.</li>"
  } else {
    alert("Your cart is empty.");
  }
});

// Close modal by clicking outside
window.onclick = function(event) {
  const modal = document.getElementById("cartModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
