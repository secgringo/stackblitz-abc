// script.js

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

document.addEventListener("DOMContentLoaded", () => {
  // Load dark mode setting
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.body.classList.add("dark-mode");
  }

  // Optional: attach to a toggle button
  const toggleBtn = document.getElementById("dark-mode-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleDarkMode);
  }
});
