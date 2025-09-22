// Save form submission to localStorage
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const messageBox = document.getElementById("formMessage");
  const feedbackList = document.getElementById("feedbackList");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Grab values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const feedback = document.getElementById("message").value.trim();

    const entry = {
      name,
      email,
      feedback,
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    let stored = JSON.parse(localStorage.getItem("feedbackEntries")) || [];
    stored.push(entry);
    localStorage.setItem("feedbackEntries", JSON.stringify(stored));

    // Reset form + confirm
    form.reset();
    messageBox.textContent = "✅ Thank you! Your feedback has been saved.";

    // Refresh displayed list
    loadFeedback();
  });

  function loadFeedback() {
    if (!feedbackList) return;
    feedbackList.innerHTML = "";
    let stored = JSON.parse(localStorage.getItem("feedbackEntries")) || [];
    stored.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.timestamp} - ${entry.name}: ${entry.feedback}`;
      feedbackList.appendChild(li);
    });
  }

  // Load on page start
  loadFeedback();
});
