document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Active navigation link
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop - sectionHeight / 3) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').slice(1) === current) {
              link.classList.add('active');
          }
      });
  });

  // Form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const formData = new FormData(contactForm);
          const name = formData.get('name');
          const email = formData.get('email');
          const message = formData.get('message');

          // Here you would typically send the form data to a server
          // For this example, we'll just log it to the console
          console.log('Form submitted:', { name, email, message });

          // Clear the form
          contactForm.reset();

          // Show a success message
          alert('Thank you for your message! I will get back to you soon.');
      });
  }

  // Add fade-in animation to sections
  const fadeInSection = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
          }
      });
  };

  const sectionObserver = new IntersectionObserver(fadeInSection, {
      root: null,
      threshold: 0.1
  });

  sections.forEach(section => {
      section.classList.add('fade-out');
      sectionObserver.observe(section);
  });
});