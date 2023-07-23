const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const cardsPerPage = 10;

let currentPage = 0;
let totalCards = 0;
let totalPages = 0;
let movie_info = [];
let searchHeading = '';
let API_URL = `https://www.omdbapi.com/?apikey=ecdc1686&type=movie&s=${searchHeading}&page=${currentPage}`;

function fetchMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            const formattedJSON = JSON.stringify(data, null, 2);
            const jsonObject = JSON.parse(formattedJSON);
            if (jsonObject["Response"] == 'True') {


                movie_info = jsonObject["Search"];
                totalCards = parseInt(jsonObject["totalResults"]);
                totalPages = Math.ceil(totalCards / cardsPerPage);
                console.log(jsonObject);
                console.log(`totalPages: ${totalPages}`);
            } else {
                console.error(`Incorrect movie name : ${API_URL}`);
            }

            // updatePage();
            displayCards(currentPage);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayCards(currentPage) {
    cardsContainer.innerHTML = '';
    startIndex = 0;
    endIndex = 10;
    if (currentPage == totalPages) endIndex = totalPages % 10;
    if (endIndex == 0) endIndex = 10;
    for (let i = startIndex; i < endIndex; i++) {
        // const movie = movies[i]; backend
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${movie_info[i].Poster}" alt="${movie_info[i].Title}">
            <h3>${movie_info[i].Title}</h3>
        `;
        cardsContainer.appendChild(card);
    }
}

// function displayCards(startIndex, endIndex) {
//     cardsContainer.innerHTML = '';

//     for (let i = startIndex; i < endIndex; i++) {
//         const movie = movies[i];
//         const card = document.createElement('div');
//         card.classList.add('card');
//         card.innerHTML = `
//             <img src="${movie.poster}" alt="${movie.title}">
//             <h3>${movie.title}</h3>
//         `;
//         cardsContainer.appendChild(card);
//     }
// }

// function updatePage() {
//     const startIndex = (currentPage - 1) * cardsPerPage.desktop;
//     const endIndex = startIndex + cardsPerPage.desktop;
//     displayCards(startIndex, endIndex);

//     prevBtn.disabled = currentPage === 1;
//     nextBtn.disabled = currentPage === totalPages;
// }

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        // updatePage();

        API_URL = `https://www.omdbapi.com/?apikey=ecdc1686&type=movie&s=${searchHeading}&page=${currentPage}`;
        fetchMovies(API_URL);
        displayCards(currentPage);
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        // updatePage();

        API_URL = `https://www.omdbapi.com/?apikey=ecdc1686&type=movie&s=${searchHeading}&page=${currentPage}`;
        fetchMovies(API_URL);
        displayCards(currentPage);
    }
}

// Fetch movies and initialize the page
// fetchMovies();

function searchMovie() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    searchInput.value = '';

    searchHeading = searchQuery;
    currentPage = 1;
    API_URL = `https://www.omdbapi.com/?apikey=ecdc1686&type=movie&s=${searchHeading}&page=${currentPage}`;
    // console.log(API_URL);
    fetchMovies(API_URL);
}
