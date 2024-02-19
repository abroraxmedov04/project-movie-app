"use strict";

const mainFragment = document.createDocumentFragment();
const elCardList = document.querySelector(".js-movie-list");
const elTemplateMovie = document.querySelector(".js-template").content;

// Use const for constant values
const MAX_MOVIES_TO_DISPLAY = 200;

let sliceMovie = movies.slice(0, MAX_MOVIES_TO_DISPLAY);

let getHoursAndMin = (data) => {
  const hours = Math.floor(data / 60);
  const min = data % 60;
  return `${hours} h ${min} min`;
};

let renderMovies = (arr, node) => {
  arr.forEach((movie) => {
    const {
      ytid,
      Title,
      imdb_rating,
      movie_year,
      runtime,
      Categories,
      imdb_id,
    } = movie;
    const cloneTemplate = elTemplateMovie.cloneNode(true);

    cloneTemplate.querySelector(
      ".js-movie-image"
    ).src = `http://i3.ytimg.com/vi/${ytid}/mqdefault.jpg`;
    cloneTemplate.querySelector(".js-movie-name").textContent = String(
      Title
    ).substring(0, 15);
    cloneTemplate.querySelector(".js-movie-rating").textContent = imdb_rating;
    cloneTemplate.querySelector(".js-movie-year").textContent = movie_year;
    cloneTemplate.querySelector(".js-movie-watch-time").textContent =
      getHoursAndMin(runtime);
    cloneTemplate.querySelector(".js-movie-genres").textContent =
      Categories.split("|").slice(0, 3).join(", ");
    cloneTemplate.querySelector(".js-modal-btn").dataset.imdbId = imdb_id;

    mainFragment.appendChild(cloneTemplate);
    console.log(movie.Categories);
  });

  node.appendChild(mainFragment);
};

renderMovies(sliceMovie, elCardList);

// Search functionality
const elFormSearch = document.querySelector(".js-form-search");
const elInput = document.querySelector(".js-input-search");

let searchedMovie = (evt) => {
  evt.preventDefault();
  elCardList.innerHTML = "";
  const inputValue = elInput.value.toLowerCase().trim();
  const matchingMovies = sliceMovie.filter((movie) =>
    String(movie.Title).toLowerCase().includes(inputValue)
  );
  renderMovies(matchingMovies, elCardList);
};

elFormSearch.addEventListener("submit", searchedMovie);

// Category filter functionality
const elSelectcategoryForm = document.querySelector(".js-select-option-form");
const elSelectOptionInput = document.querySelector(".js-select-option-input");

// Category filter functionality
let filterByCategory = (evt) => {
  evt.preventDefault();
  elCardList.innerHTML = "";
  const selectedCategory = elSelectOptionInput.value.toLowerCase().trim();

  if (selectedCategory === "all") {
    renderMovies(sliceMovie, elCardList);
  } else {
    const moviesInCategory = sliceMovie.filter((movie) =>
      movie.Categories.toLowerCase().includes(selectedCategory)
    );
    renderMovies(moviesInCategory, elCardList);
  }
};

elSelectcategoryForm.addEventListener("submit", filterByCategory);

