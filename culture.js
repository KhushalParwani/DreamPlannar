document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const categoryCards = document.querySelectorAll('.category-card');
  const cultureCards = document.querySelectorAll('.culture-card');
  const bookButtons = document.querySelectorAll('.book-now');
  const bookExperienceBtn = document.querySelector('.book-experience');

  // Category filtering
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;

      // Remove active class from all categories
      categoryCards.forEach(c => c.classList.remove('active'));
      // Add active class to clicked category
      card.classList.add('active');

      // Filter culture cards
      cultureCards.forEach(cultureCard => {
        if (cultureCard.dataset.category === category) {
          cultureCard.style.display = 'block';
        } else {
          cultureCard.style.display = 'none';
        }
      });

      // Scroll to culture grid
      document.querySelector('.culture-grid').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Add active class styling for categories
  const style = document.createElement('style');
  style.textContent = `
    .category-card.active {
      border: 3px solid #D2691E;
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);

  // Booking functionality for culture cards
  bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = e.target.closest('.culture-card');
      const experienceName = card.querySelector('h3').textContent;
      const price = card.querySelector('.price').textContent;

      showBookingModal(experienceName, price);
    });
  });

  // Featured experience booking
  if (bookExperienceBtn) {
    bookExperienceBtn.addEventListener('click', () => {
      const experienceName = 'Hyderabadi Cultural Immersion';
      const price = 'From ₹8,999';
      showBookingModal(experienceName, price);
    });
  }

  // Card click functionality
  cultureCards.forEach(card => {
    card.addEventListener('click', () => {
      const experienceName = card.querySelector('h3').textContent;
      // Add some visual feedback
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = '';
        alert(`More details about "${experienceName}" coming soon! Learn about the history, what to expect, and meet the artisans.`);
      }, 150);
    });
  });

  // Booking modal functionality
  function showBookingModal(experienceName, price) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('booking-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'booking-modal';
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Book Your Cultural Experience</h2>
          <div class="booking-details">
            <p><strong>Experience:</strong> ${experienceName}</p>
            <p><strong>Price:</strong> ${price}</p>
          </div>
          <form id="booking-form">
            <div class="form-group">
              <label for="participant-name">Full Name:</label>
              <input type="text" id="participant-name" required>
            </div>
            <div class="form-group">
              <label for="participant-email">Email:</label>
              <input type="email" id="participant-email" required>
            </div>
            <div class="form-group">
              <label for="participant-phone">Phone:</label>
              <input type="tel" id="participant-phone" required>
            </div>
            <div class="form-group">
              <label for="experience-date">Preferred Date:</label>
              <input type="date" id="experience-date" required>
            </div>
            <div class="form-group">
              <label for="num-participants">Number of Participants:</label>
              <select id="num-participants" required>
                <option value="1">1 Person</option>
                <option value="2" selected>2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5+ People</option>
              </select>
            </div>
            <div class="form-group">
              <label for="experience-language">Preferred Language:</label>
              <select id="experience-language" required>
                <option value="english" selected>English</option>
                <option value="hindi">Hindi</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
            </div>
            <div class="form-group">
              <label for="special-requirements">Special Requirements:</label>
              <textarea id="special-requirements" rows="3" placeholder="Any dietary restrictions, accessibility needs, or special requests..."></textarea>
            </div>
            <button type="submit" class="submit-btn">Confirm Booking</button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      // Modal styles
      const modalStyle = document.createElement('style');
      modalStyle.textContent = `
        .modal {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5);
          animation: fadeIn 0.3s ease;
        }
        .modal-content {
          background-color: white;
          margin: 5% auto;
          padding: 20px;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          animation: slideIn 0.3s ease;
          max-height: 80vh;
          overflow-y: auto;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }
        .close:hover { color: black; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .submit-btn {
          background: linear-gradient(45deg, #D2691E, #8B4513);
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
          font-weight: bold;
        }
        .submit-btn:hover { opacity: 0.9; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `;
      document.head.appendChild(modalStyle);
    }

    modal.style.display = 'block';

    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // Form submission
    const form = modal.querySelector('#booking-form');
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('participant-name').value;
      alert(`Thank you, ${name}! Your booking for "${experienceName}" has been confirmed. You'll receive a detailed itinerary and preparation guide via email.`);
      modal.style.display = 'none';
      form.reset();
    };
  }

  // Add loading animations
  function addLoadingAnimation() {
    const cards = document.querySelectorAll('.culture-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });

    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  // Initialize animations
  addLoadingAnimation();

  // Add hover effects for category cards
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('active')) {
        card.style.transform = 'translateY(-5px)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('active')) {
        card.style.transform = 'translateY(0)';
      }
    });
  });

  // Add date validation for experience booking
  const experienceDateInput = document.getElementById('experience-date');
  if (experienceDateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 7); // Minimum 1 week advance booking
    experienceDateInput.min = today.toISOString().split('T')[0];
  }
});
