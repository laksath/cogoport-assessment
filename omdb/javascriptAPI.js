const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageInfo = document.getElementById('currentPageInfo');
const searchHeadingElement = document.getElementById('searchHeading');

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
                currentPageInfo.textContent = `Showing Page ${currentPage} out of ${totalPages}`;

            } else {
                currentPageInfo.textContent = `No results found for the name : ${searchHeading}`;
                console.error(`Incorrect movie name : ${API_URL}`);
            }
            searchHeadingElement.textContent = `Search results for "${searchHeading}"`;
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

        
        if (movie_info[i].Poster == 'N/A') {
            card.innerHTML = `
            <img src="404.jpg" alt="${movie_info[i].Title}">
            <h3>${movie_info[i].Title}</h3>
        `;
        } else {
            card.innerHTML = `
            <img src="${movie_info[i].Poster}" alt="${movie_info[i].Title}">
            <h3>${movie_info[i].Title}</h3>
        `;
        }

        cardsContainer.appendChild(card);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;

        API_URL = `https://www.omdbapi.com/?apikey=ecdc1686&type=movie&s=${searchHeading}&page=${currentPage}`;
        fetchMovies(API_URL);
        displayCards(currentPage);
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;

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
