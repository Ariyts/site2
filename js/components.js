document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = async (id, url) => {
    const container = document.getElementById(id);
    if (container) {
      try {
        const res = await fetch(url);
        const html = await res.text();
        container.innerHTML = html;
      } catch (e) {
        console.error(`Ошибка загрузки ${url}:`, e);
      }
    }
  };

  loadComponent("header-placeholder", "/components/header.html");
  loadComponent("footer-placeholder", "/components/footer.html");
});





// /js/components.js

document.addEventListener("DOMContentLoaded", function() {

  // Функция для загрузки HTML-компонентов.
  // Теперь она возвращает Promise, что позволяет нам знать, когда она закончит работу.
  const loadComponent = (selector, url) => {
    // Возвращаем fetch, чтобы можно было использовать .then()
    return fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Ошибка загрузки: ${url}`);
        return response.text();
      })
      .then(html => {
        const element = document.querySelector(selector);
        if (element) {
          element.innerHTML = html;
        }
      });
  };

  // --- Наша новая логика ---
  
  // 1. Находим плейсхолдер футера
  const footerPlaceholder = document.querySelector("#footer-placeholder");

  // 2. Если плейсхолдер есть на странице, загружаем футер
  if (footerPlaceholder) {
    loadComponent("#footer-placeholder", "/components/footer.html")
      .then(() => {
        // ЭТОТ КОД ВЫПОЛНИТСЯ ТОЛЬКО ПОСЛЕ ЗАГРУЗКИ И ВСТАВКИ ФУТЕРА
        console.log("Футер загружен, запускаем инициализацию cookie-баннера.");
        
        // Теперь мы можем безопасно вызывать нашу функцию из app.js
        initializeCookieBanner(); 
      })
      .catch(error => {
        console.error("Не удалось загрузить футер:", error);
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = `<p class="text-red-500 text-center">Ошибка загрузки футера.</p>`;
        }
      });
  }

  // То же самое можно сделать для хэдера
  // const headerPlaceholder = document.querySelector("#header-placeholder");
  // if (headerPlaceholder) {
  //   loadComponent("#header-placeholder", "/components/header.html")
  //     .then(() => {
  //        console.log("Хэдер загружен.");
  //        // здесь можно запустить скрипты, зависящие от хэдера (например, меню-бургер)
  //     })
  //     .catch(error => console.error("Не удалось загрузить хэдер:", error));
  // }
});