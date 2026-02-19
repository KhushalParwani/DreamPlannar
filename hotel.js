document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchInput = document.querySelector('#hotel-search');
  const searchBtn = document.querySelector('.hotel-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const hotelCards = document.querySelectorAll('.hotel-card');
  const bookButtons = document.querySelectorAll('.book-btn');

  // Search functionality
  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    hotelCards.forEach(card => {
      const name = card.querySelector('.hotel-name').textContent.toLowerCase();
      const desc = card.querySelector('.hotel-desc').textContent.toLowerCase();
      const amenities = Array.from(card.querySelectorAll('.amenity')).map(a => a.textContent.toLowerCase()).join(' ');
      const isVisible = name.includes(query) || desc.includes(query) || amenities.includes(query) || query === '';
      card.style.display = isVisible ? 'block' : 'none';
    });
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener('input', performSearch);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      performSearch();
    });
  }

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      hotelCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Booking functionality
  bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = e.target.closest('.hotel-card');
      const hotelName = card.querySelector('.hotel-name').textContent;
      const price = card.querySelector('.price').textContent;

      showBookingModal(hotelName, price);
    });
  });

  // Card click functionality
  hotelCards.forEach(card => {
    card.addEventListener('click', () => {
      const hotelName = card.querySelector('.hotel-name').textContent;
      // Add some visual feedback
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
        alert(`More details about "${hotelName}" coming soon! Check amenities, photos, and reviews.`);
      }, 150);
    });
  });

  // Booking modal functionality
  function showBookingModal(hotelName, price) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('booking-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'booking-modal';
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Book Your Stay</h2>
          <div class="booking-details">
            <p><strong>Hotel:</strong> ${hotelName}</p>
            <p><strong>Price:</strong> ${price}</p>
          </div>
          <form id="booking-form">
            <div class="form-group">
              <label for="guest-name">Full Name:</label>
              <input type="text" id="guest-name" required>
            </div>
            <div class="form-group">
              <label for="guest-email">Email:</label>
              <input type="email" id="guest-email" required>
            </div>
            <div class="form-group">
              <label for="guest-phone">Phone:</label>
              <input type="tel" id="guest-phone" required>
            </div>
            <div class="form-group">
              <label for="check-in-date">Check-in Date:</label>
              <input type="date" id="check-in-date" required>
            </div>
            <div class="form-group">
              <label for="check-out-date">Check-out Date:</label>
              <input type="date" id="check-out-date" required>
            </div>
            <div class="form-group">
              <label for="num-guests">Number of Guests:</label>
              <select id="num-guests" required>
                <option value="1">1 Guest</option>
                <option value="2" selected>2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
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
          background: linear-gradient(45deg, #667eea, #764ba2);
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
      const name = document.getElementById('guest-name').value;
      alert(`Thank you, ${name}! Your booking for "${hotelName}" has been confirmed. A confirmation email has been sent to you.`);
      modal.style.display = 'none';
      form.reset();
    };
  }

  // Add loading animations
  function addLoadingAnimation() {
    const cards = document.querySelectorAll('.hotel-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // Initialize animations
  addLoadingAnimation();

  // Add date validation
  const checkInInput = document.getElementById('check-in');
  const checkOutInput = document.getElementById('check-out');

  if (checkInInput && checkOutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;
    checkOutInput.min = today;

    checkInInput.addEventListener('change', () => {
      checkOutInput.min = checkInInput.value;
    });
  }

  // Add smooth scrolling for filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.outer-container').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
});
