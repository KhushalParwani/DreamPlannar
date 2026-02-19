document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const categoryCards = document.querySelectorAll('.category-card');
  const entCards = document.querySelectorAll('.ent-card');
  const bookButtons = document.querySelectorAll('.book-now');
  const bookEventBtn = document.querySelector('.book-event');

  // Category filtering
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;

      // Remove active class from all categories
      categoryCards.forEach(c => c.classList.remove('active'));
      // Add active class to clicked category
      card.classList.add('active');

      // Filter entertainment cards
      entCards.forEach(entCard => {
        if (entCard.dataset.category === category) {
          entCard.style.display = 'block';
        } else {
          entCard.style.display = 'none';
        }
      });

      // Scroll to entertainment grid
      document.querySelector('.ent-grid').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Add active class styling for categories
  const style = document.createElement('style');
  style.textContent = `
    .category-card.active {
      border: 3px solid #ff6b6b;
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);

  // Booking functionality for entertainment cards
  bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = e.target.closest('.ent-card');
      const eventName = card.querySelector('h3').textContent;
      const price = card.querySelector('.price').textContent;

      showBookingModal(eventName, price);
    });
  });

  // Featured event booking
  if (bookEventBtn) {
    bookEventBtn.addEventListener('click', () => {
      const eventName = 'Summer Music Festival';
      const price = 'From ₹2,499';
      showBookingModal(eventName, price);
    });
  }

  // Card click functionality
  entCards.forEach(card => {
    card.addEventListener('click', () => {
      const eventName = card.querySelector('h3').textContent;
      // Add some visual feedback
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = '';
        alert(`More details about "${eventName}" coming soon!`);
      }, 150);
    });
  });

  // Booking modal functionality
  function showBookingModal(eventName, price) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('booking-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'booking-modal';
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Book Your Experience</h2>
          <div class="booking-details">
            <p><strong>Event:</strong> ${eventName}</p>
            <p><strong>Price:</strong> ${price}</p>
          </div>
          <form id="booking-form">
            <div class="form-group">
              <label for="attendee-name">Full Name:</label>
              <input type="text" id="attendee-name" required>
            </div>
            <div class="form-group">
              <label for="attendee-email">Email:</label>
              <input type="email" id="attendee-email" required>
            </div>
            <div class="form-group">
              <label for="attendee-phone">Phone:</label>
              <input type="tel" id="attendee-phone" required>
            </div>
            <div class="form-group">
              <label for="event-date">Preferred Date:</label>
              <input type="date" id="event-date" required>
            </div>
            <div class="form-group">
              <label for="num-tickets">Number of Tickets:</label>
              <select id="num-tickets" required>
                <option value="1">1</option>
                <option value="2" selected>2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div class="form-group">
              <label for="special-requests">Special Requests:</label>
              <textarea id="special-requests" rows="3" placeholder="Any special requirements or preferences..."></textarea>
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
          background: linear-gradient(45deg, #ff6b6b, #ffa500);
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
      const name = document.getElementById('attendee-name').value;
      alert(`Thank you, ${name}! Your booking for "${eventName}" has been confirmed. We'll send you the confirmation details via email.`);
      modal.style.display = 'none';
      form.reset();
    };
  }

  // Add loading animations
  function addLoadingAnimation() {
    const cards = document.querySelectorAll('.ent-card');
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
      card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('active')) {
        card.style.transform = 'translateY(0)';
      }
    });
  });
});
