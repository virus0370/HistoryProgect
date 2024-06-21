// script.js

// Получение ссылок на страницы
const homePageLink = document.getElementById('nav-home');
const attractionsPageLink = document.getElementById('nav-attractions');
const contactsPageLink = document.getElementById('nav-contacts');

const homePage = document.getElementById('home-page');
const attractionsPage = document.getElementById('attractions-page');
const contactsPage = document.getElementById('contacts-page');

const attractionDetailsPage = document.getElementById('attraction-details')

const attractionData = {
    1: {
        name: "Музей Мирового океана",
        image: "https://vipavto39.ru/wp-content/uploads/2021/01/muzei-mirovogo-okeana-6.jpg",
        description: "Коллекция музея посвящена судоходству, исследованиям моря и его природе, а также искусству. Здесь вы увидите крупнейшее в мире научно-исследовательское судно «Витязь», единственное в мире судно космической связи «Космонавт Виктор Пацаев» и плавучий маяк «Ирбенский», а ещё — карты, приборы, морских моллюсков, скатов, акул, кораллы и пёстрых коралловых рыб. В музее выставлен скелет кашалота и глубоководный аппарат «Мир-1»."
    },
    2: {
        name: "Музей «Бункер»",
        image: "https://s6.stc.all.kpcdn.net/russia/wp-content/uploads/2020/03/bunker-kaliningrad-2601.jpg",
        description: "Музей военной истории находится на глубине 7 метров, в подземных ходах под центром Калининграда. В этом бункере произошло историческое событие: в 1945 году немецкий генерал Отто Ляш подписал акт о капитуляции Кёнигсберга."
    },
    3: {
        name: "Историко-художественный музей",
        image: "",
        description: "В этом музее хранятся артефакты разных исторических периодов Калининграда/Кёнигсберга: тевтонского, немецкого, советского и современного. Кроме главного здания около Нижнего пруда у музея есть шесть филиалов: «Блиндаж» (немецкий военный штаб), парк скульптуры, мемориальный музей литовского поэта Кристионаса Донелайтиса, КП 43-й армии в посёлке Холмогоровка, Форт №5 и кирха Арнау в посёлке Родники."
    },
    4: {
        name: "Музей янтаря",
        image: "",
        description: "В Музее янтаря собрана обширная коллекция предметов из этого камня — свыше 16 тысяч экспонатов: украшения, предметы интерьера и скульптуры. Изюминка музея — коллекция янтаря с «включениями» вроде мезозойских растений, насекомых и ящериц. Музей находится в оборонительной башне середины XIX века, так что обратите внимание и на архитектуру здания."
    },
    5: {
        name: "Остров Канта и Кафедральный собор",
        image: "https://vsegda-pomnim.com/uploads/posts/2022-01/1643026177_74-vsegda-pomnim-com-p-kafedralnii-sobor-kenigsberga-foto-77.jpg",
        description: "Бывший остров Кнайпхоф — зажиточный район Кёнигсберга — ныне носит имя Иммануила Канта, самого известного уроженца города. Здесь философ преподавал в утраченном Кёнигсбергском университете. Здесь же он похоронен — в профессорской усыпальнице Кафедрального собора."

    },
    6: {
        name: "Королевские ворота",
        image: "https://i7.photo.2gis.com/images/branch/40/5629499578745132_299a.jpg",
        description: "Одни из восьми сохранившихся городских ворот Калининграда. Расположены на пересечении улицы Фрунзе и Литовского вала.В 2005 году Королевские ворота были символом празднования 750-летия Калининграда. С того же года в воротах размещается Историко-культурный центр «Великое посольство»."
    },
    7: {
        name: "Калининградский зоопарк",
        image: "",
        description: "Основанный в 1896 году, это старейший зоопарк России. Апрель 1945 года стал самым трагичным в его истории. Той весной погибли все животные, кроме лани, барсука, осла и раненого бегемота Ганса. В память об этом событии на территории установлена скульптура в виде этих четырёх зверей."
    },

    8: {
        name: "",
        image: "",
        description: ""
    },
};
const { Client } = require('pg');

// Создание клиента для подключения к базе данных
const client = new Client({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // Стандартный порт PostgreSQL
});

// Подключение к базе данных
client.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }

    // Выполнение запроса к базе данных
    client.query('SELECT * FROM attractions', (err, res) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            return;
        }

        // Обработка результатов запроса
        console.log('Результат запроса:', res.rows);

        // Закрытие соединения с базой данных
        client.end();
    });
});


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

// Получение элементов для отображения информации о достопримечательности
const attractionNameElement = document.getElementById('attraction-name');
const attractionImageElement = document.getElementById('attraction-image');
const attractionDescriptionElement = document.getElementById('attraction-description');

// Обработка клика на ссылку достопримечательности
const attractionLinks = document.querySelectorAll('.attraction-link');
attractionLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const attractionId = event.target.dataset.attractionId;
        showAttractionDetails(attractionId);
        showPage(attractionDetailsPage);
        hidePage(homePage);
        hidePage(attractionsPage);
        hidePage(contactsPage);
    });
});

// Функция для отображения информации о достопримечательности
function showAttractionDetails(attractionId) {
    const attraction = attractionData[attractionId];
    attractionNameElement.textContent = attraction.name;
    attractionImageElement.src = attraction.image;
    attractionImageElement.alt = attraction.name;
    attractionDescriptionElement.textContent = attraction.description;
}


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
//ada