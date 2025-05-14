//* Получаем все элементы со классом "arrow" (стрелки прокрутки)
const arrows = document.querySelectorAll(".arrow");

//* Получаем все списки фильмов
const movieLists = document.querySelectorAll(".movie-list");

//* Для каждой стрелки добавляем обработчик клика
arrows.forEach((arrow, i) => {
  //* Количество изображений (постеров фильмов) в текущем списке
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  
  //* Счетчик кликов (для отслеживания позиции прокрутки)
  let clickCounter = 0;
  
  //* Обработчик клика на стрелку
  arrow.addEventListener("click", () => {
    //* Рассчитываем количество видимых элементов в зависимости от ширины экрана
    //* (270px - примерная ширина одного элемента)
    const ratio = Math.floor(window.innerWidth / 270);
    
    //* Увеличиваем счетчик кликов
    clickCounter++;
    
    //* Проверяем, можно ли еще прокручивать список
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      //* Сдвигаем список влево на 300px
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      //* Если достигнут конец списка, возвращаем в начало
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0; //* Сбрасываем счетчик
    }
  });

  //* Логируем количество элементов, которые могут поместиться на экране
  console.log(Math.floor(window.innerWidth / 270));
});

//* ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ

//* Получаем шарик переключателя
const ball = document.querySelector(".toggle-ball");

//* Получаем все элементы, которые нужно переключать между темами
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

// *Добавляем обработчик клика на шарик
ball.addEventListener("click", () => {
  //* Для каждого элемента переключаем класс "active"
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  //* Также переключаем класс для самого шарика
  ball.classList.toggle("active");
});