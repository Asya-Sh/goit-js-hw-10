import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as n}from"./assets/vendor-77e16229.js";const o=document.querySelector(".form");o.addEventListener("submit",m);function m(e){e.preventDefault();const t=+e.currentTarget.elements.delay.value,s=e.currentTarget.elements.state.value;u(s,t).then(r=>{n.success({message:`✅ Обіцянка виконана за ${r}мс`})}).catch(r=>{n.error({message:`❌ Обіцянка відхилена за ${r}мс`})}),e.currentTarget.reset()}function u(e,t){return new Promise((s,r)=>{setTimeout(()=>{e==="fulfilled"?s(t):r(t)},t)})}
//# sourceMappingURL=commonHelpers2.js.map