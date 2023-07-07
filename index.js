const filmsMenu = document.querySelector('#films');
const poster = document.querySelector('#poster');
const title = document.querySelector('#title');
const runtime = document.querySelector('#runtime');
const showtime = document.querySelector('#showtime');
const availableTickets = document.querySelector('#availableTickets');
const buyTicketBtn = document.querySelector('#buy-ticket');
const Allfilms = "http://localhost:3000/films";

document.addEventListener('DOMContentLoaded', fetchAllFilms);

function fetchAllFilms() {
  fetch(Allfilms)
    .then(response => response.json())
    .then(movies => {
      movies.forEach(movie => {
        const filmItem = document.createElement('li');
        filmItem.className = 'film-item';
        filmItem.innerText = movie.title;
        filmItem.addEventListener('click', () => {
          const selectedFilm = filmsMenu.querySelector('.selected');
          if (selectedFilm) {
            selectedFilm.classList.remove('selected');
          }
          filmItem.classList.add('selected');
          updateMovieDetails(movie);
        });
        filmsMenu.appendChild(filmItem);
      });
    });
}

const updateMovieDetails = (movie) => {
  poster.innerHTML = `<img src="${movie.poster}" alt="${movie.title} Poster" width="200" height="300">`;
  title.innerText = movie.title;
  runtime.innerText = movie.runtime;
  showtime.innerText = movie.showtime;
  availableTickets.innerText = movie.capacity - movie.tickets_sold;
  buyTicketBtn.disabled = (movie.capacity - movie.tickets_sold) === 0;
};

const buyTicket = () => {
  const currentTickets = parseInt(availableTickets.innerText);
  if (currentTickets > 0) {
    availableTickets.innerText = currentTickets - 1;
  }
};
