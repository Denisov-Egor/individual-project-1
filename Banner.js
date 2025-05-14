//* Импорт необходимых зависимостей
import { useState, useEffect } from "react"; //* Хуки React
import { Container, Row, Col } from "react-bootstrap"; //* Компоненты Bootstrap для разметки
import headerImg from "../assets/img/header-img.svg"; //* Изображение для баннера
import { ArrowRightCircle } from 'react-bootstrap-icons'; //* Иконка из библиотеки Bootstrap Icons
import 'animate.css'; //* Библиотека анимаций
import TrackVisibility from 'react-on-screen'; //* Компонент для отслеживания видимости элемента

export const Banner = () => {
  //* Состояния компонента
  const [loopNum, setLoopNum] = useState(0); //* Текущий индекс в массиве профессий
  const [isDeleting, setIsDeleting] = useState(false); // *Флаг удаления текста
  const [text, setText] = useState(''); //* Текущий отображаемый текст
  const [delta, setDelta] = useState(300 - Math.random() * 100); //* Скорость печати/удаления
  const [index, setIndex] = useState(1); //* Счетчик для управления анимацией
  const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ]; //* Массив профессий для анимации
  const period = 2000; //* Время паузы между анимациями

  //* Эффект для управления анимацией текста
  useEffect(() => {
    let ticker = setInterval(() => {
      tick(); //* Вызываем функцию tick через определенные интервалы
    }, delta);

    //* Очистка интервала при размонтировании компонента
    return () => { clearInterval(ticker) };
  }, [text]) //* Зависимость от text - эффект срабатывает при его изменении

  //* Функция для анимации текста (печать/удаление)
  const tick = () => {
    let i = loopNum % toRotate.length; //* Определяем текущую профессию
    let fullText = toRotate[i]; //* Полный текст текущей профессии
    //* Формируем текст для отображения (добавляем или удаляем символ)
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText); //* Обновляем состояние текста

    //* Если в режиме удаления - ускоряем процесс
    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    //* Логика переключения между режимами печати и удаления
    if (!isDeleting && updatedText === fullText) {
      //* Если текст напечатан полностью - переключаемся в режим удаления
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period); //* Устанавливаем паузу перед удалением
    } else if (isDeleting && updatedText === '') {
      //* Если текст полностью удален - переключаемся на следующую профессию
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500); //* Скорость печати для следующего слова
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  //* Рендер компонента
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          {/* Левая колонка - текстовая часть */}
          <Col xs={12} md={6} xl={7}>
            {/* Компонент для отслеживания видимости - добавляет анимацию при появлении */}
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Judy`} 
                  <span className="txt-rotate">
                    <span className="wrap">{text}</span>
                  </span>
                </h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                <button onClick={() => console.log('connect')}>
                  Let’s Connect <ArrowRightCircle size={25} />
                </button>
              </div>}
            </TrackVisibility>
          </Col>
          
          {/* Правая колонка - изображение */}
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}