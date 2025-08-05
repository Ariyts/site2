// В самом начале загрузки страницы
const startTime = performance.now();

(function() {
  'use strict';

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll effect to navbar
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.classList.add('shadow-xl');
    } else {
      header.classList.remove('shadow-xl');
    }
  });

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('button.md\\:hidden');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      // Add mobile menu functionality here
      console.log('Mobile menu clicked');
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe service cards for animations
  document.querySelectorAll('.bg-white.rounded-2xl, .bg-white.rounded-xl').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Counter animation for stats
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target + (element.dataset.suffix || '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + (element.dataset.suffix || '');
      }
    }, 16);
  }

  // Animate counters when they come into view
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const number = entry.target.textContent.replace(/[^0-9]/g, '');
        const suffix = entry.target.textContent.replace(/[0-9]/g, '');
        entry.target.dataset.suffix = suffix;
        animateCounter(entry.target, parseInt(number));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // Apply to stats numbers
  document.querySelectorAll('.text-4xl.font-bold.text-rosatom-blue').forEach(stat => {
    statsObserver.observe(stat);
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.floating-animation');
    if (parallax) {
      const speed = scrolled * 0.2;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });

  // Button click handlers
  document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Консультация') || button.textContent.includes('консультацию')) {
      button.addEventListener('click', function() {
        // Here you can add modal opening or form functionality
        showConsultationModal();
      });
    }
  });

  // Hover effects for service cards
  document.querySelectorAll('.bg-white.rounded-2xl').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 25px 50px -12px rgba(0, 61, 130, 0.15)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    });
  });

  // Smooth reveal animation for sections
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  // Add fade-in animation styles
  const style = document.createElement('style');
  style.textContent = `
        .animate-fade-in {
            animation: fadeInUp 0.8s ease forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
        }

        /* Modal styles */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .modal.show {
            opacity: 1;
            visibility: visible;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }

        .modal.show .modal-content {
            transform: scale(1);
        }

        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }

        .modal-close:hover {
            color: #333;
        }
    `;
  document.head.appendChild(style);

  // Apply to all sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    revealObserver.observe(section);
  });

  // Form validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Phone validation function
  function validatePhone(phone) {
    const re = /^[\+]?[7|8]?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return re.test(phone);
  }

  // Show consultation modal
  function showConsultationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
            <div class="modal-content" style="position: relative;">
                <button class="modal-close" onclick="closeModal(this)">&times;</button>
                <h3 style="color: #003d82; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">
                    Бесплатная консультация
                </h3>
                <p style="color: #666; margin-bottom: 1.5rem;">
                    Оставьте заявку и наш эксперт свяжется с вами в течение часа
                </p>
                <form id="consultationForm">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; color: #333; margin-bottom: 0.5rem;">Имя *</label>
                        <input type="text" name="name" required
                               style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; color: #333; margin-bottom: 0.5rem;">Email *</label>
                        <input type="email" name="email" required
                               style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; color: #333; margin-bottom: 0.5rem;">Телефон *</label>
                        <input type="tel" name="phone" required
                               style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; color: #333; margin-bottom: 0.5rem;">Компания</label>
                        <input type="text" name="company"
                               style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: #333; margin-bottom: 0.5rem;">Комментарий</label>
                        <textarea name="comment" rows="3"
                                  style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>
                    </div>
                    <button type="submit"
                            style="width: 100%; background: #003d82; color: white; padding: 0.75rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.3s;">
                        Отправить заявку
                    </button>
                </form>
            </div>
        `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    // Form submission handler
    const form = modal.querySelector('#consultationForm');
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Validation
      if (!data.name.trim()) {
        CyberGuard.showNotification('Пожалуйста, введите имя', 'error');
        return;
      }

      if (!validateEmail(data.email)) {
        CyberGuard.showNotification('Пожалуйста, введите корректный email', 'error');
        return;
      }

      if (!validatePhone(data.phone)) {
        CyberGuard.showNotification('Пожалуйста, введите корректный номер телефона', 'error');
        return;
      }

      // Here you would normally send data to your server
      console.log('Form data:', data);

      // Simulate sending
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.textContent = 'Отправка...';
      submitButton.disabled = true;

      setTimeout(() => {
        closeModal(modal.querySelector('.modal-close'));
        CyberGuard.showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
      }, 1500);
    });
  }

  // Close modal function
  window.closeModal = function(closeButton) {
    const modal = closeButton.closest('.modal');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  };

  // Close modal on backdrop click
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target.querySelector('.modal-close'));
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal.show');
      if (modal) {
        closeModal(modal.querySelector('.modal-close'));
      }
    }
  });

  // Console log for development
  console.log('CyberGuard website loaded successfully');
  console.log('Rosatom branding applied');
  console.log('All animations and interactions initialized');

  // Этот код нужно добавить в ваш JS файл

// Находим ВСЕ кнопки с классом 'js-open-modal'
const openModalButtons = document.querySelectorAll('.js-open-modal');

// Для каждой найденной кнопки добавляем обработчик клика,
// который будет вызывать вашу функцию showConsultationModal
openModalButtons.forEach(button => {
  button.addEventListener('click', showConsultationModal);
});
})();

// Additional utility functions
const CyberGuard = {
  // Smooth scroll to section
  scrollTo: function(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  // Show notification
  showNotification: function(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transform translate-x-full transition-transform duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Slide out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  },

  // Initialize mobile menu
  initMobileMenu: function() {
    const button = document.querySelector('.mobile-menu-button');
    const menu = document.querySelector('.mobile-menu');

    if (button && menu) {
      button.addEventListener('click', function() {
        menu.classList.toggle('hidden');
      });
    }
  },

  // Lazy load images
  lazyLoadImages: function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  // Analytics tracking (placeholder)
  trackEvent: function(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    // Here you would integrate with Google Analytics or other tracking service
    // gtag('event', action, {
    //     'event_category': category,
    //     'event_label': label
    // });
  },

  // Performance monitoring
  measurePerformance: function() {
    window.addEventListener('load', function() {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log('Page load time:', loadTime + 'ms');

      // You can send this data to your analytics service
      CyberGuard.trackEvent('Performance', 'Page Load Time', loadTime);
    });
  }
};

// Make CyberGuard utilities available globally
window.CyberGuard = CyberGuard;

// Initialize performance monitoring
CyberGuard.measurePerformance();

// Track page view
CyberGuard.trackEvent('Page', 'View', 'Homepage');


/**
 * Функция для динамического добавления favicon в <head> документа.
 * Это гарантирует, что иконка будет на всех страницах,
 * где подключен этот скрипт.
 */
function addFavicon() {
  // Создаем новый элемент <link>
  const faviconLink = document.createElement('link');

  // Устанавливаем его атрибуты
  faviconLink.rel = 'icon';
  faviconLink.type = 'image/png'; // Укажите правильный тип вашего файла
  faviconLink.href = '../img/fevicon.ico'; // Укажите путь к вашей иконке

  // Добавляем созданный тег в <head> текущей страницы
  document.head.appendChild(faviconLink);
}

// Вызываем функцию после загрузки основной структуры страницы
document.addEventListener('DOMContentLoaded', addFavicon);

// Когда страница полностью загружена (например, в window.onload)
window.addEventListener('load', () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    console.log(`Page load time: ${loadTime.toFixed(2)}ms`); // Результат будет в миллисекундах
    // ... ваш код для отслеживания события
});

// Убрали внешний DOMContentLoaded. Теперь это просто набор функций.

// Функция для установки cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; samesite=Lax";
}

// Функция для получения cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// === ГЛАВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ БАННЕРА ===
// Мы будем вызывать её из другого скрипта, когда футер будет готов.
function initializeCookieBanner() {
  const cookieNotice = document.getElementById('cookie-notice');
  const acceptButton = document.getElementById('accept-cookies');

  // Если на странице (уже загруженной!) нет баннера, ничего не делаем.
  // Эта проверка теперь сработает корректно.
  if (!cookieNotice || !acceptButton) {
    // Можно добавить console.log для отладки
    // console.log('Элементы cookie-баннера не найдены. Возможно, он уже принят или ошибка в HTML.');
    return;
  }

  // Проверяем, было ли дано согласие ранее
  if (!getCookie('cookie_consent_accepted')) {
    cookieNotice.classList.remove('hidden');
    cookieNotice.classList.add('animate-fade-in-up');
  }

  // Обработчик нажатия на кнопку "Принять и закрыть"
  acceptButton.addEventListener('click', function() {
    setCookie('cookie_consent_accepted', 'true', 365);
    
    cookieNotice.style.transition = 'opacity 0.3s, transform 0.3s';
    cookieNotice.style.opacity = '0';
    cookieNotice.style.transform = 'translateY(100%)';

    setTimeout(() => {
        cookieNotice.classList.add('hidden');
    }, 300);
  });
}