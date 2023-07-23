const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageInfo = document.getElementById('currentPageInfo');
const searchHeadingElement = document.getElementById('searchHeading');

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

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
                // console.log(jsonObject);
                // console.log(`totalPages: ${totalPages}`);
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

function fetchMovie(url) {
    fetch(url)
        .then(response => response.json())
        .then(movie => {
            let htmlContent = `<h2>${movie.Title} (${movie.Year})</h2>`;
            htmlContent += `<img src="${movie.Poster}" alt="${movie.Title}">`;
            htmlContent += `<p><strong>Director:</strong> ${movie.Director}</p>`;
            htmlContent += `<p><strong>Genre:</strong> ${movie.Genre}</p>`;
            htmlContent += `<p><strong>Plot:</strong> ${movie.Plot}</p>`;
            htmlContent += `<p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>`;

            modalContent.innerHTML = htmlContent;
            modal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function closeModal() {
    modal.style.display = 'none';
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
            <button onclick="showMovieDetails(${i})">Movie Details</button>
        `;
        } else {
            card.innerHTML = `
            <img src="${movie_info[i].Poster}" alt="${movie_info[i].Title}">
            <h3>${movie_info[i].Title}</h3>
            <button onclick="showMovieDetails(${i})">Movie Details</button>
        `;
        }

        cardsContainer.appendChild(card);
    }
}

function showMovieDetails(index) {
    const imdbID = movie_info[index].imdbID;
    let API_URL_LONG = `https://www.omdbapi.com/?apikey=ecdc1686&i=${imdbID}`;
    fetchMovie(API_URL_LONG);
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
