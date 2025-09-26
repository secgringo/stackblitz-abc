// form-storage.js

document.addEventListener("DOMContentLoaded", () => {
  const fields = ["name", "email", "message"];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    // Load saved value
    const saved = localStorage.getItem(`form_${id}`);
    if (saved) el.value = saved;

    // Save on input
    el.addEventListener("input", () => {
      localStorage.setItem(`form_${id}`, el.value);
    });
  });

  // Optional: clear localStorage on form submit
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      // Example validation: check if fields are not empty
      let valid = true;
      fields.forEach(id => {
        const value = document.getElementById(id)?.value.trim();
        if (!value) {
          alert(`Please fill in your ${id}`);
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
        return;
      }

      fields.forEach(id => localStorage.removeItem(`form_${id}`));
    });
  }
});
