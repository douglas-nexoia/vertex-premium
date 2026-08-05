/* ============================================
   VERTEX — Main JavaScript
   Animations, Scroll Effects, Menu, Form
   ============================================ */

(function () {
  'use strict';

  /* --- DOM References --- */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const contactForm = document.getElementById('contact-form');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navbarLinks = document.querySelectorAll('.navbar-link');

  /* ============================================
     NAVBAR SCROLL EFFECT
     ============================================ */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ============================================
     MOBILE MENU
     ============================================ */
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', toggleMobileMenu);

  /* Close mobile menu on link click */
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  /* Close mobile menu on escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* ============================================
     SMOOTH SCROLL FOR NAVIGATION
     ============================================ */
  function handleSmoothScroll(e) {
    var href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      var target = document.getElementById(href.substring(1));
      if (target) {
        var navHeight = navbar.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  navbarLinks.forEach(function (link) {
    link.addEventListener('click', handleSmoothScroll);
  });

  /* Also handle navbar logo click */
  var logoLink = document.querySelector('.navbar-logo');
  if (logoLink) {
    logoLink.addEventListener('click', handleSmoothScroll);
  }

  /* Also handle footer links */
  document.querySelectorAll('.footer-link').forEach(function (link) {
    link.addEventListener('click', handleSmoothScroll);
  });

  /* ============================================
     SCROLL REVEAL ANIMATIONS
     ============================================ */
  var revealElements = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ============================================
     ACTIVE NAVIGATION HIGHLIGHT
     ============================================ */
  var sections = document.querySelectorAll('section[id]');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navbarLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ============================================
     CONTACT FORM — WhatsApp Redirect
     ============================================ */
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameEl = document.getElementById('form-name');
    var phoneEl = document.getElementById('form-phone');
    var brandEl = document.getElementById('form-brand');
    var messageEl = document.getElementById('form-message');

    var name = nameEl.value.trim();
    var phone = phoneEl.value.trim();
    var brand = brandEl.value;
    var message = messageEl.value.trim();

    /* Basic validation */
    if (!name || !phone || !brand) {
      /* Highlight empty required fields */
      if (!name) nameEl.style.borderColor = '#C9A869';
      if (!phone) phoneEl.style.borderColor = '#C9A869';
      if (!brand) brandEl.style.borderColor = '#C9A869';
      return;
    }

    /* Build WhatsApp message */
    var whatsappText = 'Olá, gostaria de solicitar um atendimento técnico especializado.\n\n';
    whatsappText += 'Nome: ' + name + '\n';
    whatsappText += 'Telefone: ' + phone + '\n';
    whatsappText += 'Marca do equipamento: ' + brand + '\n';
    if (message) {
      whatsappText += 'Mensagem: ' + message + '\n';
    }

    var whatsappUrl = 'https://wa.me/5541999999999?text=' + encodeURIComponent(whatsappText);

    /* Open WhatsApp in new tab */
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    /* Reset form */
    contactForm.reset();

    /* Reset border colors */
    nameEl.style.borderColor = '';
    phoneEl.style.borderColor = '';
    brandEl.style.borderColor = '';
  });

  /* Reset field border on input */
  document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      this.style.borderColor = '';
    });
    field.addEventListener('change', function () {
      this.style.borderColor = '';
    });
  });

  /* ============================================
     PHONE INPUT MASK (Brazilian format)
     ============================================ */
  var phoneInput = document.getElementById('form-phone');
  phoneInput.addEventListener('input', function () {
    var value = this.value.replace(/\D/g, '');
    if (value.length <= 2) {
      this.value = value.length > 0 ? '(' + value : '';
    } else if (value.length <= 7) {
      this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
    } else if (value.length <= 11) {
      this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
    } else {
      this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
    }
  });

  /* ============================================
     DECORATIVE LINE ANIMATIONS ON SCROLL
     ============================================ */
  var decoLines = document.querySelectorAll('.line-deco');
  var lineObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.width = '60px';
        entry.target.style.transition = 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  decoLines.forEach(function (line) {
    line.style.width = '0';
    lineObserver.observe(line);
  });

})();
