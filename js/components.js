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
