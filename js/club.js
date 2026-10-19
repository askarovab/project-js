const form = document.getElementById("club-form");
const result = document.getElementById("form-result"); // место для сообщения

// Шаблоны
const fioRegex = /^[А-ЯЁҢҮӨA-Z][а-яёңүөa-z]+(\s[А-ЯЁҢҮӨA-Z][а-яёңүөa-z]+){1,2}$/;
const phoneRegex = /^(\+\d{9,15}|0\d{9})$/;
const emailRegex = /^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i;

function showResult(id, isValid, message) {
  const input = document.getElementById(id);
  const error = document.getElementById(id + "-error");

  if (isValid) {
    input.setAttribute("aria-invalid", "false");
    error.textContent = "";
  } else {
    input.setAttribute("aria-invalid", "true");
    error.textContent = message;
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fio = document.getElementById("fio").value.trim();
  const phone = document.getElementById("phone").value.replace(/[\s-]/g, ""); // убираем пробелы и дефисы
  const email = document.getElementById("email").value.trim();

  const fioOk = fioRegex.test(fio);
  const phoneOk = phoneRegex.test(phone);
  const emailOk = emailRegex.test(email);

  showResult("fio", fioOk, "Введите фамилию и имя с заглавных букв, например: Аскарова Бермет.");
  showResult("phone", phoneOk, "Введите номер с кодом страны, например +996 555 123 456.");
  showResult("email", emailOk, "Введите почту в формате name@mail.com.");

  // Сообщение о правильной записи
  if (fioOk && phoneOk && emailOk) {
    result.textContent = "Данные введены верно. Вы записаны!";
    result.className = "form__result form__result--ok";
  } else {
    result.textContent = "";
  }
});


// const form = document.getElementById("club-form");

// // Шаблоны
// const fioRegex = /^[А-ЯЁҢҮӨA-Z][а-яёңүөa-z]+(\s[А-ЯЁҢҮӨA-Z][а-яёңүөa-z]+){1,2}$/;
// const phoneRegex = /^(\+\d{9,15}|0\d{9})$/;
// const emailRegex = /^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i;

// // Показывает или убирает ошибку под полем
// function showResult(id, isValid, message) {
//   const input = document.getElementById(id);
//   const error = document.getElementById(id + "-error");

//   if (isValid) {
//     input.setAttribute("aria-invalid", "false");
//     error.textContent = "";
//   } else {
//     input.setAttribute("aria-invalid", "true");
//     error.textContent = message;
//   }
// }

// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const fio = document.getElementById("fio").value.trim();
//   const phone = document.getElementById("phone").value.replace(/[\s-]/g, ""); // убираем пробелы и дефисы
//   const email = document.getElementById("email").value.trim();

//   showResult("fio", fioRegex.test(fio), "Введите фамилию и имя с заглавных букв, например: Аскарова Бермет.");
//   showResult("phone", phoneRegex.test(phone), "Введите номер с кодом страны, например +996 555 123 456.");
//   showResult("email", emailRegex.test(email), "Введите почту в формате name@mail.com.");
// });

  