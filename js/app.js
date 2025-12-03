/* ===================== DATA FILM ===================== */
const movies = [
  {
    id: 1,
    title: "A Time Called You",
    type: "series",
    region: "korea",
    platform: "Netflix",
    year: 2023,
    rating: 4.5,
    poster: "assets/A-Time-Called-You.jpg"
  },
  {
    id: 2,
    title: "The Summer I Turned Pretty",
    type: "series",
    region: "western",
    platform: "Prime Video",
    year: 2022,
    rating: 4.2,
    poster: "assets/The-Summer-I-Turned-Pretty.jpg"
  },
  {
    id: 3,
    title: "Moving",
    type: "series",
    region: "korea",
    platform: "Disney+",
    year: 2023,
    rating: 4.8,
    poster: "assets/Moving.jpg"
  },
  {
    id: 4,
    title: "Parasite",
    type: "movie",
    region: "korea",
    platform: "Prime Video",
    year: 2019,
    rating: 4.9,
    poster: "assets/Parasite.jpg"
  },
  {
    id: 5,
    title: "Spirited Away",
    type: "movie",
    region: "japan",
    platform: "Netflix",
    year: 2001,
    rating: 4.8,
    poster: "assets/Spirited-Away.jpg"
  },
  {
    id: 6,
    title: "Guardian of the Galaxy",
    type: "movie",
    region: "western",
    platform: "Disney+",
    year: 2014,
    rating: 4.4,
    poster: "assets/Guardian.jpg"
  },
  {
    id: 7,
    title: "Dear Nathan",
    type: "movie",
    region: "indonesia",
    platform: "Netflix",
    year: 2017,
    rating: 3.9,
    poster: "assets/Dear-Nathan.jpg"
  },
  {
    id: 8,
    title: "The Wandering Earth",
    type: "movie",
    region: "china",
    platform: "Netflix",
    year: 2019,
    rating: 4.0,
    poster: "assets/The-Wandering-Earth.jpg"
  },

  {
    id: 9,
    title: "Moana 2",
    type: "movie",
    region: "western",
    platform: "Disney+",
    year: 2024,
    rating: 3.6,
    poster: "assets/Moana-2.jpg"
  },
  {
    id: 10,
    title: "Virgo and the Sparklings",
    type: "series",
    region: "indonesia",
    platform: "Prime Video",
    year: 2023,
    rating: 3.5,
    poster: "assets/Virgo.jpg"
  },
  {
    id: 11,
    title: "Good Boy",
    type: "movie",
    region: "western",
    platform: "Netflix",
    year: 2025,
    rating: 4.7,
    poster: "assets/Good-Boy.jpg"
  },
];

/* ===================== DATA REVIEWS (sample) ===================== */
const reviews = [
  {
    movieId: 9, // Moana 2
    date: "2025-11-26",
    rating: 3.0,
    text: "Hasilnya gak mengecewakan sama sekali!"
  },
  {
    movieId: 10, // Virgo and the Sparklings
    date: "2025-11-25",
    rating: 3.5,
    text: "Fyi, gue penggemar Virgo & The Sparklings dari webtoon—seru ngikutin develop-nya."
  },
  {
    movieId: 11, // Good Boy
    date: "2025-10-31",
    rating: 5.0,
    text: "Tegang dari awal sampai akhir. Eksekusi tone dan payoff-nya rapih."
  },
];

/* ===================== HELPERS ===================== */
function stars(r) {
  const full = Math.floor(r);
  return "★".repeat(full) + (r - full >= 0.5 ? "½" : "");
}

function findMovie(id) {
  return movies.find(m => m.id === id);
}

function monthName(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleString("id-ID", { month: "long", year: "numeric" });
}

/* ===================== HOME: Grid Cards ===================== */
function renderHomeCards(container, list) {
  if (!container) return;
  container.innerHTML = list.map(m => `
    <article class="home-card">
      <img src="${m.poster}" alt="${m.title}">
      <div class="home-card-body">
        <h3 class="home-card-title">${m.title}</h3>
        <div class="home-card-meta">
          <span>${m.platform}</span>
          <span>${m.year}</span>
        </div>
      </div>
    </article>
  `).join("");
}

/* ===================== PROFILE ===================== */
function renderProfileMovies(container, list) {
  if (!container) return;
  container.innerHTML = list.map(m => `
    <article class="movie-card">
      <img src="${m.poster}" alt="${m.title}">
      <div class="movie-body">
        <h3 class="movie-title">${m.title}</h3>
        <div class="movie-meta">
          <span class="badge badge-platform">${m.platform}</span>
          <span class="star-display">${stars(m.rating)}</span>
        </div>
        <div class="movie-meta">
          <span class="badge badge-type">${m.type === "movie" ? "Film" : "Series"}</span>
          <span>${m.year}</span>
        </div>
      </div>
    </article>
  `).join("");
}

/* ===================== SEARCH ===================== */
function initSearchPage() {
  const grid = document.getElementById("searchGrid");
  if (!grid) return;

  const q = document.getElementById("searchInput");
  const fType = document.getElementById("filterType");
  const fRegion = document.getElementById("filterRegion");
  const fPlatform = document.getElementById("filterPlatform");

  function update() {
    const keyword = q.value.toLowerCase();
    const result = movies.filter(m =>
      m.title.toLowerCase().includes(keyword) &&
      (fType.value === "all" || m.type === fType.value) &&
      (fRegion.value === "all" || m.region === fRegion.value) &&
      (fPlatform.value === "all" || m.platform === fPlatform.value)
    );
    renderHomeCards(grid, result);
  }

  q.addEventListener("input", update);
  fType.addEventListener("change", update);
  fRegion.addEventListener("change", update);
  fPlatform.addEventListener("change", update);
  update();
}

/* ===================== WATCHLIST ===================== */
function initWatchlist() {
  const grid = document.getElementById("watchlistGrid");
  if (!grid) return;

  const selDecade = document.getElementById("wlDecade");
  const selRegion = document.getElementById("wlRegion");
  const selService = document.getElementById("wlService");
  const selType = document.getElementById("wlType");

  function update() {
    const result = movies.filter(m =>
      (selType.value === "all" || m.type === selType.value) &&
      (selRegion.value === "all" || m.region === selRegion.value) &&
      (selService.value === "all" || m.platform === selService.value) &&
      (selDecade.value === "all" || String(m.year).startsWith(selDecade.value))
    );

    grid.innerHTML = result.map(m => `
      <div class="watchlist-item">
        <img src="${m.poster}" alt="${m.title}">
        <div class="watchlist-caption">${m.title}</div>
      </div>
    `).join("");
  }

  selDecade.addEventListener("change", update);
  selRegion.addEventListener("change", update);
  selService.addEventListener("change", update);
  selType.addEventListener("change", update);

  update();
}

/* ===================== DETAIL ===================== */
function initDetailPage() {
  const starsBox = document.getElementById("ratingStars");
  if (!starsBox) return;

  const result = document.getElementById("ratingResult");
  const list = [...starsBox.querySelectorAll(".star")];

  function set(v) {
    list.forEach(s => s.classList.toggle("active", +s.dataset.value <= v));
    result.textContent = `Rating kamu: ${v} / 5`;
  }

  list.forEach(s => s.addEventListener("click", () => set(+s.dataset.value)));
}

/* ===================== WRAPPED ===================== */
function initWrapped() {
  const total = document.getElementById("wrapTotal");
  if (!total) return;

  total.textContent = `${movies.length} Film/Series`;
  document.getElementById("wrapAvg").textContent =
    (movies.reduce((s, m) => s + m.rating, 0) / movies.length).toFixed(1);

  const regCount = {};
  movies.forEach(m => regCount[m.region] = (regCount[m.region] || 0) + 1);
  document.getElementById("wrapRegion").textContent =
    Object.keys(regCount).sort((a, b) => regCount[b] - regCount[a])[0];

  const platCount = {};
  movies.forEach(m => platCount[m.platform] = (platCount[m.platform] || 0) + 1);
  document.getElementById("wrapPlatform").textContent =
    Object.keys(platCount).sort((a, b) => platCount[b] - platCount[a])[0];

  document.getElementById("wrapBest").textContent =
    [...movies].sort((a, b) => b.rating - a.rating)[0].title;
}

/* ===================== FAVORITES (Top 3) ===================== */
function initFavorites() {
  const grid = document.getElementById("favoritesGrid");
  if (!grid) return;

  const fav = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 3);
  grid.innerHTML = fav.map(m => `
    <div class="favorite-card">
      <img src="${m.poster}" alt="${m.title}">
      <div class="favorite-info"><h3>${m.title}</h3></div>
    </div>
  `).join("");
}

/* ===================== REVIEWS (Diary by month) ===================== */
function initReviewsPage() {
  const root = document.getElementById("reviewsList");
  if (!root) return;

  // group by month
  const groups = {};
  reviews.forEach(r => {
    const key = monthName(r.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  });

  // render
  const months = Object.keys(groups)
    .sort((a, b) => new Date(b) - new Date(a)); 

  root.innerHTML = months.map(label => {
    const items = groups[label]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(r => {
        const m = findMovie(r.movieId);
        if (!m) return "";
        return `
          <div class="review-row">
            <img class="review-poster" src="${m.poster}" alt="${m.title}">
            <div class="review-info">
              <h3 class="review-title">${m.title} <span class="review-year">${m.year}</span></h3>
              <div class="review-meta">
                <span class="review-stars">${stars(r.rating)}</span>
                <span class="review-when">Watched ${new Date(r.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</span>
              </div>
              <p class="review-text">${r.text}</p>
            </div>
          </div>
        `;
      }).join("");

    return `
      <section class="reviews-month">
        <h2 class="month-title">${label}</h2>
        ${items}
      </section>
    `;
  }).join("");
}

/* ===================== DOM READY ===================== */
document.addEventListener("DOMContentLoaded", () => {
  // HOME
  renderHomeCards(document.getElementById("movieGrid"), movies);
  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6);
  renderHomeCards(document.getElementById("topRatedGrid"), topRated);

  // PROFILE
  renderProfileMovies(document.getElementById("profileMovieGrid"), movies);

  const goSearch = document.getElementById('btnExplore');
  const goWatch  = document.getElementById('btnWatchlist');

  if (goSearch)  goSearch.addEventListener('click', () => location.href = 'search.html');
  if (goWatch)   goWatch.addEventListener('click',  () => location.href = 'watchlist.html');

  // PAGE inits
  initSearchPage();
  initWatchlist();
  initDetailPage();
  initWrapped();
  initFavorites();
  initReviewsPage();
});
