const form = document.getElementById("club-form");

if (form) {   
  const fioRegex = /^[А-ЯЁҢҮӨA-Z][а-яёңүөa-z]+(\s[А-ЯЁҢҮӨA-Z][а-яёңүөa-z]+){1,2}$/;
  const phoneRegex = /^(\+\d{9,15}|0\d{9})$/;
  const emailRegex = /^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const fio = document.getElementById("fio").value.trim();
    const phone = document.getElementById("phone").value.replace(/[\s-]/g, ""); // без пробелов и дефисов
    const email = document.getElementById("email").value.trim();

    const fioError = document.getElementById("fio-error");
    const phoneError = document.getElementById("phone-error");
    const emailError = document.getElementById("email-error");
    const result = document.getElementById("form-result");

    let allOk = true;

    if (fioRegex.test(fio)) {
      fioError.textContent = "";
    } else {
      fioError.textContent = "Введите фамилию и имя с заглавных букв";
      allOk = false;
    }

    if (phoneRegex.test(phone)) {
      phoneError.textContent = "";
    } else {
      phoneError.textContent = "Введите номер с кодом страны, например +996 555 123 456.";
      allOk = false;
    }

    if (emailRegex.test(email)) {
      emailError.textContent = "";
    } else {
      emailError.textContent = "Введите почту в формате name@mail.com.";
      allOk = false;
    }

    if (allOk) {
      result.textContent = "Данные введены верно. Вы записаны!";
    } else {
      result.textContent = "";
    }
  });
}


// Lists

const DATA_URL = 'lists.json';
const filmList = document.getElementById('film-list');
const detailSection = document.getElementById('detail-section');
const detailCard = document.getElementById('detail-card');
const closeBtn = document.getElementById('close-btn');

let filmsData = [];

async function loadFilms() {
    if (!filmList) return;   
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

        filmsData = await response.json();
        renderFilmsList(filmsData);
    } catch (error) {
        console.error('Ошибка JSON', error);
        filmList.innerHTML = '<p class="film-error">Не удалось загрузить данные. Откройте сайт через Live Server.</p>';
    }
}


function posterHTML(film) {
    const hue = (film.id * 47) % 360;
    return `
    <span class="cover" style="--hue:${hue}">
        <span class="cover__label">${film.name}</span>
        <span class="cover__img" style="background-image:url('${film.image}')"></span>
    </span>`;
}

/* List */

function renderFilmsList(films) {
    filmList.innerHTML = '';

    films.forEach(film => {
        const card = document.createElement('div');
        card.className = 'credit credit--click';
        card.dataset.tags = film.tags;          
        card.innerHTML = `
        <div class="credit__role">
            ${film.name}
            <span class="credit__meta">${film.year}, ${film.director}</span>
            ${posterHTML(film)}
        </div>
        <div class="credit__body">
            <p>${film.short}</p>
            <button class="credit__more" type="button">Подробнее</button>
        </div>
        `;
        card.addEventListener('click', () => showFilmDetail(film.id));
        filmList.appendChild(card);
    });
}


function showFilmDetail(filmId) {
    const film = filmsData.find(f => f.id === filmId);
    if (!film) return;

    const specsList = Object.entries(film.specs)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
        .join('');

    detailCard.innerHTML = `
    <div class="detail-layout">
        ${posterHTML(film)}
        <div class="detail-text">
            <h2 class="detail-title">${film.name}</h2>
            <p class="detail-desc">${film.description}</p>
            <div class="detail-specs">
                <strong>Характеристики</strong>
                <ul>${specsList}</ul>
            </div>
        </div>
    </div>
    `;

    detailSection.classList.remove('hidden');
}
if (closeBtn && detailSection) {
    closeBtn.addEventListener('click', ()=>detailSection.classList.add('hidden'));
    detailSection.addEventListener('click', (e)=>{
        if (e.target === detailSection) detailSection.classList.add('hidden')
    });
}

document.addEventListener('DOMContentLoaded', loadFilms);
// function closeDetail() {
//     if (detailSection) detailSection.classList.add('hidden');
// }

// if (closeBtn && detailSection) {
//     closeBtn.addEventListener('click', closeDetail);
//     detailSection.addEventListener('click', (e) => {
//         if (e.target === detailSection) closeDetail();   
//     });
// }
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') closeDetail();
// });

// document.addEventListener('DOMContentLoaded', loadFilms);










// const form = document.getElementById("club-form");
// const fioRegex = /^[А-ЯЁҢҮӨA-Z][а-яёңүөa-z]+(\s[А-ЯЁҢҮӨA-Z][а-яёңүөa-z]+){1,2}$/;
// const phoneRegex = /^(\+\d{9,15}|0\d{9})$/;
// const emailRegex = /^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i;

// form.addEventListener("submit", function (event) {
//   event.preventDefault(); 
//   const fio = document.getElementById("fio").value.trim();
//   const phone = document.getElementById("phone").value.replace(/[\s-]/g, ""); // без пробелов и дефисов
//   const email = document.getElementById("email").value.trim();

//   const fioError = document.getElementById("fio-error");
//   const phoneError = document.getElementById("phone-error");
//   const emailError = document.getElementById("email-error");
//   const result = document.getElementById("form-result");

//   let allOk = true; 

//   if (fioRegex.test(fio)) {
//     fioError.textContent = "";
//   } else {
//     fioError.textContent = "Введите фамилию и имя с заглавных букв";
//     allOk = false;
//   }

//   if (phoneRegex.test(phone)) {
//     phoneError.textContent = "";
//   } else {
//     phoneError.textContent = "Введите номер с кодом страны, например +996 555 123 456.";
//     allOk = false;
//   }

//   if (emailRegex.test(email)) {
//     emailError.textContent = "";
//   } else {
//     emailError.textContent = "Введите почту в формате name@mail.com.";
//     allOk = false;
//   }

//   if (allOk) {
//     result.textContent = "Данные введены верно. Вы записаны!";
//   } else {
//     result.textContent = "";
//   }
// });










