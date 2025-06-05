//* Получаем все элементы со классом "arrow" (стрелки прокрутки)
const arrows = document.querySelectorAll(".arrow");

//* Получаем все списки фильмов
const movieLists = document.querySelectorAll(".movie-list");

//* Для каждой стрелки добавляем обработчик клика
arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});

//* ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

//* НАВИГАЦИЯ ПО РАЗДЕЛАМ
function setupNavigation() {
  const menuItems = document.querySelectorAll('.menu-list-item');
  const contentSections = {
    home: document.querySelector('.featured-content:first-of-type'),
    movies: document.querySelectorAll('.movie-list-container')[0],
    series: document.querySelectorAll('.movie-list-container')[1],
    popular: document.querySelectorAll('.movie-list-container')[2]
  };

  // Показываем домашний раздел по умолчанию
  contentSections.home.classList.add('active');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      // Удаляем активный класс у всех пунктов меню
      menuItems.forEach(i => i.classList.remove('active'));
      // Добавляем активный класс к текущему пункту
      item.classList.add('active');
      
      // Скрываем все разделы
      Object.values(contentSections).forEach(section => {
        if (section) section.classList.remove('active');
      });
      
      // Показываем выбранный раздел
      const section = item.dataset.section;
      if (contentSections[section]) {
        contentSections[section].classList.add('active');
        
        // Прокручиваем к выбранному разделу
        contentSections[section].scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Вызываем функцию после загрузки DOM
document.addEventListener('DOMContentLoaded', setupNavigation);

// В обработчике клика по пункту меню:
contentSections[section].scrollIntoView({ behavior: 'smooth' });

