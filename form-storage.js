// form-storage.js
const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault ();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;

  }

// Store feedback in Local Storage
let feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
feedbackData.push([ name, email, message, date: new Date().toLocoaleString() });
localStorage.setItem("feedback", JSON.stringify(feedbackData));

alert("Thank you for your feedback!");

// Clear form
feedbackForm.reset();
});

