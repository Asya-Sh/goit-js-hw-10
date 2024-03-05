import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
let userSelectedDate;

elements.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = Date.now();
    userSelectedDate = selectedDate;

    if (selectedDate < currentDate) {
      notifyPastTimedate();
      elements.start.disabled = true;
    } else {
      elements.start.disabled = false;
    }
  },
};

const picker = flatpickr(elements.input, options);
elements.start.addEventListener('click', onStartClick);

function onStartClick() {
  elements.start.disabled = true;
  elements.input.disabled = true;

  if (intervalId) {
    clearInterval(intervalId);
  }
  updateTimer();
  intervalId = setInterval(updateTimer, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer() {
  const selectedDate = userSelectedDate;
  const currentDate = Date.now();
  const ms = selectedDate - currentDate;

  if (ms <= 0) {
    clearInterval(intervalId);
    elements.input.disabled = false;
  } else {
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
