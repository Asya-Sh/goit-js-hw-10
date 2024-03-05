// Описаний в документації Flatpickr
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

  // Описаний у документації iziToast
  import iziToast from "izitoast";
  // Додатковий імпорт стилів
  import "izitoast/dist/css/iziToast.min.css";
  
const elements = {
    input: document.querySelector('#datetime-picker'),
    start: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    timer: document.querySelector('.timer'),
  };
  let intervalId;
  elements.start.addEventListener('click', onStartClick);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose: onDatePeckerClose,
  };

  const picker = flatpickr(elements.input, options);

  function onDatePeckerClose (selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = Date.now();
    if (selectedDate < currentDate) {
   notifyPastTimedate();
      elements.start.disabled = true; // кнопка "Start" неактивною
    } else {
      elements.start.disabled = false; // кнопка "Start" активною
    }
    // зберегти selectedDate в об'єкті
    picker.selectedDate = selectedDate;
};

  function onStartClick() {
    const between = picker.selectedDates[0].getTime() - Date.now();
    if (between <= 0) {
      notifyPastTimedate();
      return;
    }
    elements.input.disabled = true;
    elements.start.disabled = true;
    updateTimer();
  
    intervalId = setInterval(updateTimer, 1000);
  }
  //Конвертує мс
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  //Обчислення різниці часу 
function updateTimer() {
    const selectedDate = picker.selectedDate;
    const currentDate = Date.now();
    const ms = selectedDate - currentDate;
  
    if (ms < 1000) {
      // Час вийшов, зупиняємо інтервал
      clearInterval(intervalId);
  
      elements.days.textContent = '00';
      elements.hours.textContent = '00';
      elements.minutes.textContent = '00';
      elements.seconds.textContent = '00';
    } else {
      // оновлює інтерфейс
      const timeObject = convertMs(ms);
  
      elements.days.textContent = addLeadingZero(timeObject.days);
      elements.hours.textContent = addLeadingZero(timeObject.hours);
      elements.minutes.textContent = addLeadingZero(timeObject.minutes);
      elements.seconds.textContent = addLeadingZero(timeObject.seconds);
    }
  }
  
  function addLeadingZero(value) {
    return value < 10 ? String(value).padStart(2, '0') : value;
  }
  
  elements.start.addEventListener('click', () => {
    // обчислює раз на секунду
    intervalId = setInterval(updateTimer, 1000);;
  });

// Повідомляє про вибрану дату в минулому
function notifyPastTimedate() {
    iziToast.warning({
      theme: 'dark',
      position: 'topRight',
      message: 'Please choose a date in the future',
      messageSize: '22',
      backgroundColor: '#fd4b3f',
      messageColor: '#fafafa',
      close: false,
      closeOnClick: false,
      timeout: '3000',
      pauseOnHover: true,
      progressBar: false,
      transitionIn: 'fadeIn',
      transitionOut: 'fadeOut',
    });
  }
