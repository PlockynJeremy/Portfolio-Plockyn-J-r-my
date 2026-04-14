

document.addEventListener('DOMContentLoaded', () => {

  // --- PHOTO HERO ---
  window.addEventListener('load', () => {
    const heroPhoto = document.getElementById('heroPhoto');
    const heroPlaceholder = document.getElementById('heroPlaceholder');
    if (!heroPhoto) return;

    const tryShow = () => {
      if (heroPhoto.naturalWidth > 0) {
        heroPhoto.style.display = 'block';
        heroPhoto.classList.add('loaded');
        if (heroPlaceholder) heroPlaceholder.style.display = 'none';
      }
    };

    heroPhoto.addEventListener('load', tryShow);
    heroPhoto.addEventListener('error', () => {
      heroPhoto.style.display = 'none';
      if (heroPlaceholder) heroPlaceholder.style.display = 'flex';
    });

    tryShow();
  });

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observerNav.observe(s));


  const reveals = document.querySelectorAll('.reveal');
  const observerReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observerReveal.observe(el));


  const skillFills = document.querySelectorAll('.skill-fill');
  const observerSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observerSkills.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(bar => observerSkills.observe(bar));


  const animItems = document.querySelectorAll('.timeline-item, .project-card, .info-card, .skill-item');
  animItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  });

  const observerItems = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observerItems.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animItems.forEach(el => observerItems.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  window.handleContact = function () {
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const note = document.getElementById('formNote');

    if (!nom || !email || !message) {
      note.textContent = 'Veuillez remplir tous les champs.';
      note.style.color = '#e24b4a';
      return;
    }
    if (!email.includes('@')) {
      note.textContent = 'Adresse email invalide.';
      note.style.color = '#e24b4a';
      return;
    }

    note.textContent = 'Message envoyé ! Merci pour votre contact.';
    note.style.color = '#1a56db';
    document.getElementById('nom').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  };

});
