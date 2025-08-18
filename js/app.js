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

// Карта соответствия "часть URL" -> "Название темы"
const servicesMap = {
    'attestation': 'Аттестация',
    'certification': 'Сертификация СЗИ',
    'tech-protection': 'Техническая защита', // Пример для URL вроде /services/technical-protection.html
    'pentest': 'Аудит ИБ',
    'development': 'Разработка ПО'
};

  // Show consultation modal
// Show consultation modal
function showConsultationModal() {
    // --- НАЧАЛО ИЗМЕНЕНИЙ ---

    // 1. Определяем текущую тему на основе URL
    const pathname = window.location.pathname;
    let currentTopic = 'Другое'; // Тема по умолчанию

    for (const key in servicesMap) {
        if (pathname.includes(key)) {
            currentTopic = servicesMap[key];
            break; // Прерываем цикл, как только нашли совпадение
        }
    }

    // 2. Генерируем HTML для выпадающего списка <select>
    const allTopics = [...Object.values(servicesMap), 'Другое'];
    const topicOptionsHTML = allTopics.map(topic =>
        `<option value="${topic}" ${topic === currentTopic ? 'selected' : ''}>${topic}</option>`
    ).join('');

    // --- КОНЕЦ ИЗМЕНЕНИЙ ---


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

                <!-- --- НАЧАЛО ИЗМЕНЕНИЙ: ВСТАВКА НОВОГО ПОЛЯ --- -->
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; color: #333; margin-bottom: 0.5rem;">Тема обращения *</label>
                    <select name="topic" required
                            style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; background-color: white;">
                        ${topicOptionsHTML}
                    </select>
                </div>
                <!-- --- КОНЕЦ ИЗМЕНЕНИЙ --- -->
                
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
                <!-- Блок согласия на обработку данных -->
<div style="margin-bottom: 1.5rem; display: flex; align-items: flex-start;">
    <input type="checkbox" id="privacy-consent" required
           style="margin-top: 0.2rem; margin-right: 0.75rem; flex-shrink: 0;">
    <label for="privacy-consent" style="font-size: 0.8rem; color: #666; line-height: 1.4;">
        Нажимая кнопку «Отправить заявку», я даю свое согласие на обработку персональных данных согласно 
        <a href="/reports/Politic152.pdf" target="_blank" rel="noopener noreferrer" style="color: #003d82; text-decoration: underline;">
            Политике конфиденциальности
        </a>.
    </label>
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
    e.preventDefault(); // Предотвращаем стандартную отправку формы

    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const modalContent = form.parentElement;

    // Убираем старые сообщения об ошибках, если они были
    const existingError = form.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }

    // Блокируем кнопку и показываем процесс отправки
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;

    // Отправляем данные на сервер с помощью fetch
    fetch('/send_mail.php', { // Убедитесь, что путь к файлу верный!
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Проверяем, что сервер ответил успешно (код 200-299)
        if (response.ok) {
            return response.json(); // Если да, читаем ответ как JSON
        }
        // Если сервер ответил ошибкой (например, 404 или 500)
        return response.json().then(errorData => {
            // Пытаемся прочитать сообщение об ошибке от сервера
            throw new Error(errorData.message || 'Ошибка на стороне сервера.');
        });
    })
    .then(data => {
        if (data.status === 'success') {
            // Если PHP вернул success, показываем экран благодарности
            modalContent.innerHTML = `
                <button class="modal-close" onclick="closeModal(this)">&times;</button>
                <div style="text-align: center; padding: 2rem 1rem;">
                    <svg width="80" height="80" viewBox="0 0 100 100" style="margin-bottom: 1rem;">
                        <circle cx="50" cy="50" r="46" fill="#e8f5e9"/>
                        <path d="M30 50 L45 65 L70 40" stroke="#4caf50" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h3 style="color: #003d82; font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">Заявка принята!</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">Спасибо! Наш эксперт скоро свяжется с вами.</p>
                    <button onclick="closeModal(this.closest('.modal'))" style="background: #003d82; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">Закрыть</button>
                </div>
            `;
        } else {
            // Если PHP вернул осмысленную ошибку (например, валидации)
            throw new Error(data.message || 'Произошла неизвестная ошибка.');
        }
    })
    .catch(error => {
        // Этот блок сработает при любой ошибке: сетевой, серверной, или из блоков .then()
        console.error('Ошибка отправки формы:', error);

        // Показываем сообщение об ошибке прямо под кнопкой
        const errorContainer = document.createElement('p');
        errorContainer.className = 'form-error-message'; // Добавим класс для удобства
        errorContainer.textContent = 'Ошибка: ' + error.message;
        errorContainer.style.color = '#d93025'; // Красный цвет ошибки
        errorContainer.style.textAlign = 'center';
        errorContainer.style.marginTop = '1rem';
        form.appendChild(errorContainer); // Добавляем в конец формы

        // Возвращаем кнопку в исходное состояние, чтобы пользователь мог попробовать еще раз
        submitButton.textContent = 'Отправить заявку';
        submitButton.disabled = false;
    });
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
// Back-to-top с кольцевым индикатором прогресса (глобально, автосоздание)
(() => {
  if (window.__backToTopInit) return;
  window.__backToTopInit = true;

  const SHOW_AT = 250; // px прокрутки, после которых показываем кнопку
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let btn, ringEl, circumference = 0, maxScroll = 1;

  function createBtn() {
    // Если уже есть (на случай хардкодной вставки), используем её
    btn = document.getElementById('backToTop');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'backToTop';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Наверх');
      btn.className = [
        'fixed bottom-6 right-6 z-[80] grid place-items-center rounded-full',
        'bg-rosatom-blue/90 text-white shadow-lg border border-white/20',
        'hover:bg-rosatom-dark transition-all transform backdrop-blur',
        'p-3 sm:p-3.5',
        'opacity-0 pointer-events-none translate-y-1 scale-95',
        'focus-ring'
      ].join(' ');

      btn.innerHTML = `
        <div class="relative">
          <!-- Кольцо прогресса (трек + активный) -->
          <svg class="-rotate-90 w-11 h-11" viewBox="0 0 44 44" fill="none" aria-hidden="true">
            <circle cx="22" cy="22" r="20" stroke="currentColor" class="text-white/20" stroke-width="3"></circle>
            <circle cx="22" cy="22" r="20" data-ring stroke="currentColor" class="text-white" stroke-width="3" stroke-linecap="round"></circle>
          </svg>
          <!-- Иконка стрелки вверх -->
          <svg class="w-5 h-5 absolute inset-0 m-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M5 10l7-7 7 7M12 3v18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
        <span class="sr-only">Наверх</span>
      `;
      document.body.appendChild(btn);
    }

    ringEl = btn.querySelector('[data-ring]');
    initRing();
  }

  function initRing() {
    if (!ringEl) return;
    // r = 20 (см. SVG выше)
    const r = Number(ringEl.getAttribute('r') || 20);
    circumference = 2 * Math.PI * r;
    ringEl.style.strokeDasharray = String(circumference);
    ringEl.style.strokeDashoffset = String(circumference);
  }

  function calcMaxScroll() {
    const doc = document.documentElement;
    const body = document.body;
    const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
    const viewport = window.innerHeight;
    return Math.max(1, scrollHeight - viewport);
  }

  function updateProgress() {
    if (!ringEl) return;
    const y = window.scrollY || window.pageYOffset;
    const p = Math.min(1, Math.max(0, y / maxScroll));
    ringEl.style.strokeDashoffset = String(circumference * (1 - p));
  }

  function show() {
    if (!btn) return;
    btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-1', 'scale-95');
    btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
  }
  function hide() {
    if (!btn) return;
    btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-1', 'scale-95');
    btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
  }

  function syncVisibility() {
    (window.scrollY > SHOW_AT) ? show() : hide();
  }

  function syncAll() {
    maxScroll = calcMaxScroll();
    syncVisibility();
    updateProgress();
  }

  function onClick(e) {
    if (!btn) return;
    if (e.target === btn || (e.target.closest && e.target.closest('#backToTop'))) {
      window.scrollTo({ top: 0, behavior: prefersReduced.matches ? 'auto' : 'smooth' });
    }
  }

  function start() {
    createBtn();
    syncAll();

    window.addEventListener('scroll', () => {
      syncVisibility();
      updateProgress();
    }, { passive: true });

    window.addEventListener('resize', syncAll);
    window.addEventListener('orientationchange', syncAll);
    window.addEventListener('load', syncAll);
    document.addEventListener('click', onClick);

    // Поддержка динамической высоты страницы (ленти, подгрузки и т.п.)
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => syncAll());
      ro.observe(document.documentElement);
      ro.observe(document.body);
    } else {
      // Фолбэк: периодическая проверка
      setInterval(syncAll, 1000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();