document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');

  // Load saved values on page load
  const saved = JSON.parse(localStorage.getItem('feedbackFormData'));
  if (saved) {
    form.name.value = saved.name || '';
    form.email.value = saved.email || '';
    form.phone.value = saved.phone || '';
    form.message.value = saved.message || '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim()
    };
    localStorage.setItem('feedbackFormData', JSON.stringify(formData));
    alert("Thanks for your feedback!");
    form.reset();
  });
});

function clearFormData() {
  localStorage.removeItem('feedbackFormData');
  document.getElementById('feedback-form').reset();
  alert("Stored form data cleared.");
}
