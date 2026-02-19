document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchInput = document.getElementById('destination-search');
  const searchBtn = document.getElementById('search-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const packageCards = document.querySelectorAll('.package-card');
  const bookButtons = document.querySelectorAll('.book-now');

  // Search functionality
  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    packageCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const description = card.querySelector('.pkg-info p').textContent.toLowerCase();
      const isVisible = name.includes(query) || description.includes(query) || query === '';
      card.style.display = isVisible ? 'block' : 'none';
    });
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener('input', performSearch);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      packageCards.forEach(card => {
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
      const card = e.target.closest('.package-card');
      const packageName = card.dataset.name;
      const price = card.querySelector('.price').textContent;

      // Show booking confirmation
      showBookingModal(packageName, price);
    });
  });

  // Card click functionality (navigate to hotels)
  packageCards.forEach(card => {
    card.addEventListener('click', () => {
      const packageName = card.dataset.name;
      // Store selected package in localStorage for hotel page
      localStorage.setItem('selectedPackage', packageName);
      window.location.href = 'hotel.html';
    });
  });

  // Booking modal functionality
  function showBookingModal(packageName, price) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('booking-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'booking-modal';
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Book Your Trip</h2>
          <div class="booking-details">
            <p><strong>Package:</strong> ${packageName}</p>
            <p><strong>Price:</strong> ${price}</p>
          </div>
          <form id="booking-form">
            <div class="form-group">
              <label for="traveler-name">Full Name:</label>
              <input type="text" id="traveler-name" required>
            </div>
            <div class="form-group">
              <label for="traveler-email">Email:</label>
              <input type="email" id="traveler-email" required>
            </div>
            <div class="form-group">
              <label for="traveler-phone">Phone:</label>
              <input type="tel" id="traveler-phone" required>
            </div>
            <div class="form-group">
              <label for="travel-date">Travel Date:</label>
              <input type="date" id="travel-date" required>
            </div>
            <div class="form-group">
              <label for="num-travelers">Number of Travelers:</label>
              <select id="num-travelers" required>
                <option value="1">1</option>
                <option value="2" selected>2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>
            <button type="submit" class="submit-btn">Confirm Booking</button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      // Modal styles
      const style = document.createElement('style');
      style.textContent = `
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
        .form-group input, .form-group select {
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
      document.head.appendChild(style);
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
      const name = document.getElementById('traveler-name').value;
      alert(`Thank you, ${name}! Your booking for ${packageName} has been confirmed. We'll contact you soon with more details.`);
      modal.style.display = 'none';
      form.reset();
    };
  }

  // Smooth scrolling for filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.package-grid').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Add loading animation
  function addLoadingAnimation() {
    const cards = document.querySelectorAll('.package-card');
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
});
