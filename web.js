//   SLIDEBAR LOGIC CODE
document.addEventListener('DOMContentLoaded', function(){
  // slider
  const images = document.querySelectorAll('.slider img');
  if(images && images.length){
    let index = 0;
    function showNextImage(){
      images.forEach(img => img.classList.remove('active'));
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }
    setInterval(showNextImage, 5000);
  }

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.navbar-menu');
  if(toggle && menu){
    toggle.addEventListener('click', ()=>{
      menu.classList.toggle('active');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // Basic form validation for signin (password match) and generic required check
  const regForm = document.querySelector('form');
  if(regForm){
    regForm.addEventListener('submit', function(e){
      // for signin/register page: if password and confirm exist
      const pwd = regForm.querySelector('#password');
      const confirm = regForm.querySelector('#confirm');
      if(pwd && confirm){
        if(pwd.value !== confirm.value){
          e.preventDefault();
          alert('Passwords do not match');
          return;
        }
      }
      // allow other forms to submit (they may be handled server-side)
    });
  }

  // simple contact form handling on main site
  const contactForm = document.querySelector('.contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Thank you for reaching out — we will contact you soon.');
      contactForm.reset();
    });
  }
});
