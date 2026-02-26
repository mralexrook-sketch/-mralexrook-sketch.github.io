/**
 * Скрипт для портфолио инженера-программиста ЧПУ
 * mralexrook-sketch.github.io
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== Мобильное меню =====
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Закрыть меню при клике на ссылку
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').classList.remove('fa-times');
        mobileToggle.querySelector('i').classList.add('fa-bars');
      });
    });
  }

  // ===== Плавная прокрутка для якорных ссылок =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Анимация появления при скролле =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Анимируем только один раз
      }
    });
  }, observerOptions);

  // Наблюдаем за элементами
  const animatedElements = document.querySelectorAll(
    '.timeline-item, .project-card, .skill-category, .edu-card, .cert-card, .stat-card'
  );
  
  animatedElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${index * 0.1}s`; // Каскадная анимация
    observer.observe(el);
  });

  // ===== Активная ссылка в навигации при скролле =====
  const sections = document.querySelectorAll('section[id], header[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== Обработка формы (если не используется FormSpree) =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm && contactForm.action.includes('formspree.io')) {
    contactForm.addEventListener('submit', function(e) {
      // FormSpree обработает отправку, но можно добавить визуальную обратную связь
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
      
      // Восстановить кнопку через 3 секунды (FormSpree перенаправит)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 3000);
    });
  }

  // ===== Кнопка "Скачать CV" =====
  const cvLink = document.querySelector('.btn-outline[download]');
  if (cvLink) {
    cvLink.addEventListener('click', (e) => {
      // Если файл резюме ещё не добавлен, показать подсказку
      const cvPath = cvLink.getAttribute('href');
      if (!cvPath || cvPath === '#') {
        e.preventDefault();
        alert('📄 Чтобы скачать резюме:\n\n1. Сохраните ваш CV в формате PDF\n2. Поместите файл в папку "assets" с именем "Grachev_CV.pdf"\n3. В index.html замените href="#" на href="assets/Grachev_CV.pdf"');
      }
    });
  }

  // ===== Консольное приветствие для разработчиков =====
  console.log('%c👋 Привет, разработчик!', 'font-size: 16px; font-weight: bold; color: #2563eb;');
  console.log('%cИщешь инженера-программиста ЧПУ?', 'font-size: 14px; color: #64748b;');
  console.log('%c📧 grachevcnc@gmail.com', 'font-size: 13px; color: #10b981;');
  console.log('%c🔗 https://github.com/mralexrook-sketch', 'font-size: 13px; color: #10b981;');
});