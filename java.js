// script.js

// Получение ссылок на страницы
const homePageLink = document.getElementById('nav-home');
const attractionsPageLink = document.getElementById('nav-attractions');
const contactsPageLink = document.getElementById('nav-contacts');

const homePage = document.getElementById('home-page');
const attractionsPage = document.getElementById('attractions-page');
const contactsPage = document.getElementById('contacts-page');
const attractionDetailsPage = document.getElementById('attraction-details');

// Обработка клика на ссылки в навигационном меню
homePageLink.addEventListener('click', () => {
    showPage(homePage);
    hidePage(attractionsPage);
    hidePage(contactsPage);
    hidePage(attractionDetailsPage);
});

attractionsPageLink.addEventListener('click', () => {
    showPage(attractionsPage);
    hidePage(homePage);

    hidePage(contactsPage);
    hidePage(attractionDetailsPage);
});

contactsPageLink.addEventListener('click', () => {
    showPage(contactsPage);
    hidePage(homePage);
    hidePage(attractionsPage);
    hidePage(attractionDetailsPage);
});

// Вспомогательные функции для показа/скрытия страниц
function showPage(page) {
    page.style.display = 'block';
}

function hidePage(page) {
    page.style.display = 'none';
}
