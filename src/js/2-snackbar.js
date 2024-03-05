import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delayInput = +event.currentTarget.elements.delay.value;
  const stateInput = event.currentTarget.elements.state.value;

  namePromise(stateInput, delayInput)
    .then(delay => {
      iziToast.success({
        message: `✅ Обіцянка виконана за ${delay}мс`
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Обіцянка відхилена за ${delay}мс`,
      });
    });

  event.currentTarget.reset();
}

function namePromise(btn, delay) {
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