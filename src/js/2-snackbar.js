import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import done from "../img/done.svg";
import error from "../img/error.svg";

const form = document.querySelector('.form-delay');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delayInput = +event.currentTarget.elements.delay.value;
  const stateInput = event.currentTarget.elements.state.value;

  createPromiseWithDelay(stateInput, delayInput)
    .then(delay => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        iconUrl: done,
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        position: "topRight"
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        iconUrl: error,
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        position: "topRight"
      });
    });

  event.currentTarget.reset();
}

function createPromiseWithDelay(btn, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (btn === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}