// booking.js
document.addEventListener('DOMContentLoaded', function() {
    // Создаем сетку мест в зале
    const seatsGrid = document.querySelector('.seats-grid');
    const rows = 8;
    const cols = 10;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.dataset.row = i + 1;
            seat.dataset.col = j + 1;
            
            // Пример занятых мест (случайные)
            if (Math.random() < 0.2) {
                seat.classList.add('occupied');
            }
            
            seat.addEventListener('click', function() {
                if (!this.classList.contains('occupied')) {
                    this.classList.toggle('selected');
                }
            });
            
            seatsGrid.appendChild(seat);
        }
    }
    
    // Обработка формы бронирования
    const bookingForm = document.querySelector('.booking-form');
    const bookingButton = document.querySelector('.booking-button');
    
    bookingButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const selectedSeats = document.querySelectorAll('.seat.selected');
        if (selectedSeats.length === 0) {
            alert('Пожалуйста, выберите хотя бы одно место!');
            return;
        }
        
        const movie = document.getElementById('movie').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        // Здесь должна быть логика отправки данных на сервер
        alert(`Бронирование подтверждено!\nФильм: ${movie}\nДата: ${date}\nВремя: ${time}\nМест: ${selectedSeats.length}`);
        
        // Сброс выбора
        selectedSeats.forEach(seat => {
            seat.classList.remove('selected');
            seat.classList.add('occupied');
        });
    });
    
    // Инициализация даты (сегодня)
    const today = new Date();
    const dateInput = document.getElementById('date');
    dateInput.valueAsDate = today;
});