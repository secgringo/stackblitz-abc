// form-storage.js
// Stores feedback in localStorage under key "feedbackEntries" and provides clear functionality.

(function () {
  // Simple HTML-escape to avoid injecting raw HTML
  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const messageBox = document.getElementById('formMessage');
    const feedbackList = document.getElementById('feedbackList');
    const clearBtn = document.getElementById('clearFeedback');

    // Safe guard: if form isn't found, stop and print a console warning
    if (!form) {
      console.warn('feedbackForm not found on this page. form-storage.js will not attach.');
      return;
    }

    // Load and render stored feedback entries
    function loadFeedback() {
      if (!feedbackList) return;
      feedbackList.innerHTML = '';
      const stored = JSON.parse(localStorage.getItem('feedbackEntries')) || [];

      if (stored.length === 0) {
        feedbackList.innerHTML = '<li>No submissions yet.</li>';
        if (clearBtn) clearBtn.disabled = true;
        return;
      }

      // render newest first
      stored.slice().reverse().forEach((entry, idx) => {
        const li = document.createElement('li');
        li.style.marginBottom = '12px';
        li.style.paddingBottom = '8px';
        li.style.borderBottom = '1px solid rgba(0,0,0,0.06)';
        li.innerHTML = `<strong>${escapeHtml(entry.name || '—')}</strong> <small style="color:#666;margin-left:8px;">${escapeHtml(entry.timestamp || '')}</small>
                        <div style="margin-top:6px;">${escapeHtml(entry.feedback || '')}</div>
                        <div style="margin-top:6px;color:#444;font-size:0.9em;"><em>${escapeHtml(entry.email || '')}</em></div>`;
        feedbackList.appendChild(li);
      });

      if (clearBtn) clearBtn.disabled = false;
    }

    // Handle form submit
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = (document.getElementById('name') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const feedback = (document.getElementById('message') || {}).value || '';

      if (!name.trim() || !email.trim() || !feedback.trim()) {
        if (messageBox) {
          messageBox.style.color = 'crimson';
          messageBox.textContent = 'Please fill in all fields.';
        } else {
          alert('Please fill in all fields.');
        }
        return;
      }

      const entry = {
        name: name.trim(),
        email: email.trim(),
        feedback: feedback.trim(),
        timestamp: new Date().toLocaleString()
      };

      const stored = JSON.parse(localStorage.getItem('feedbackEntries')) || [];
      stored.push(entry);
      localStorage.setItem('feedbackEntries', JSON.stringify(stored));

      // UX: confirm and clear form
      if (messageBox) {
        messageBox.style.color = 'green';
        messageBox.textContent = '✅ Thank you! Your feedback has been saved.';
      } else {
        alert('Thank you! Your feedback has been saved.');
      }
      form.reset();
      loadFeedback();
    });

    // Handle clear button (if present)
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const ok = confirm('Clear all submissions? This cannot be undone.');
        if (!ok) return;
        localStorage.removeItem('feedbackEntries');
        loadFeedback();
        if (messageBox) {
          messageBox.style.color = 'black';
          messageBox.textContent = '🗑️ All submissions cleared.';
        }
        // disable the button after clearing
        clearBtn.disabled = true;
      });
    }

    // Initial render
    loadFeedback();
  });
})();
