// DATA FILM / SERIES
const movies = [
  {
    id: 1,
    title: "A Time Called You",
    type: "series",
    region: "korea",
    platform: "Netflix",
    year: 2023,
    rating: 4.5,
    poster: "assets/A Time Called You.jpg"
  },
  {
    id: 2,
    title: "The Summer I Turned Pretty",
    type: "series",
    region: "western",
    platform: "Prime Video",
    year: 2022,
    rating: 4.2,
    poster: "assets/The Summer I Turned Pretty.jpg"
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
    poster: "https://via.placeholder.com/200x300?text=Parasite"
  },
  {
    id: 5,
    title: "Spirited Away",
    type: "movie",
    region: "japan",
    platform: "Netflix",
    year: 2001,
    rating: 4.8,
    poster: "https://via.placeholder.com/200x300?text=Spirited+Away"
  },
  {
    id: 6,
    title: "Guardian of the Galaxy",
    type: "movie",
    region: "western",
    platform: "Disney+",
    year: 2014,
    rating: 4.4,
    poster: "https://via.placeholder.com/200x300?text=GOTG"
  },
  {
    id: 7,
    title: "Dear Nathan",
    type: "movie",
    region: "indonesia",
    platform: "Netflix",
    year: 2017,
    rating: 3.9,
    poster: "https://via.placeholder.com/200x300?text=Dear+Nathan"
  },
  {
    id: 8,
    title: "The Wandering Earth",
    type: "movie",
    region: "china",
    platform: "Netflix",
    year: 2019,
    rating: 4.0,
    poster: "https://via.placeholder.com/200x300?text=Wandering+Earth"
  }
];

// Helper: buat string bintang dari rating
function buildStarDisplay(rating) {
  const full = Math.floor(rating);
  let stars = "";
  for (let i = 0; i < full; i++) stars += "★";
  if (rating - full >= 0.5) stars += "½";
  return stars;
}

// Render grid movie ke container
function renderMovies(container, list) {
  if (!container) return;

  container.innerHTML = "";
  list.forEach(movie => {
    const card = document.createElement("article");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}" alt="Poster ${movie.title}">
      <div class="movie-body">
        <h3 class="movie-title">${movie.title}</h3>
        <div class="movie-meta">
          <span class="badge badge-platform">${movie.platform}</span>
          <span class="star-display">${buildStarDisplay(movie.rating)}</span>
        </div>
        <div class="movie-meta">
          <span class="badge badge-type">${movie.type === "movie" ? "Film" : "Series"}</span>
          <span>${movie.year}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Filter menurut platform, type, dan region
function filterMovies({ platform = "all", type = "all", region = "all" }) {
  return movies.filter(movie => {
    const matchPlatform = platform === "all" || movie.platform === platform;
    const matchType = type === "all" || movie.type === type;
    const matchRegion = region === "all" || movie.region === region;
    return matchPlatform && matchType && matchRegion;
  });
}

// Inisialisasi halaman HOME
function initHomePage() {
  const grid = document.getElementById("movieGrid");
  if (!grid) return; // bukan di index

  const platformFilter = document.getElementById("platformFilter");
  const typeFilter = document.getElementById("typeFilter");
  const regionFilter = document.getElementById("regionFilter");
  const resultInfo = document.getElementById("resultInfo");

  function update() {
    const filtered = filterMovies({
      platform: platformFilter.value,
      type: typeFilter.value,
      region: regionFilter.value
    });

    renderMovies(grid, filtered);
    if (resultInfo) {
      resultInfo.textContent = `${filtered.length} judul ditemukan`;
    }
  }

  platformFilter.addEventListener("change", update);
  typeFilter.addEventListener("change", update);
  regionFilter.addEventListener("change", update);

  update(); // pertama kali
}

// Inisialisasi halaman PROFILE
function initProfilePage() {
  const grid = document.getElementById("profileMovieGrid");
  if (!grid) return; // bukan di profile

  const platformFilter = document.getElementById("profilePlatformFilter");
  const typeFilter = document.getElementById("profileTypeFilter");
  const regionFilter = document.getElementById("profileRegionFilter");
  const totalWatchedEl = document.getElementById("totalWatched");
  const avgRatingEl = document.getElementById("avgRating");

  function updateStats(list) {
    if (!totalWatchedEl || !avgRatingEl) return;
    totalWatchedEl.textContent = list.length;
    if (list.length === 0) {
      avgRatingEl.textContent = "-";
      return;
    }
    const avg =
      list.reduce((sum, item) => sum + item.rating, 0) / list.length;
    avgRatingEl.textContent = avg.toFixed(1);
  }

  function update() {
    const filtered = filterMovies({
      platform: platformFilter.value,
      type: typeFilter.value,
      region: regionFilter.value
    });
    renderMovies(grid, filtered);
    updateStats(filtered);
  }

  platformFilter.addEventListener("change", update);
  typeFilter.addEventListener("change", update);
  regionFilter.addEventListener("change", update);

  update();
}

// Inisialisasi halaman DETAIL (rating & review)
function initDetailPage() {
  const starsContainer = document.getElementById("ratingStars");
  const ratingResult = document.getElementById("ratingResult");
  const reviewForm = document.getElementById("reviewForm");
  const reviewText = document.getElementById("reviewText");
  const reviewList = document.getElementById("reviewList");

  // Kalau elemen tidak ada, berarti bukan di detail.html
  if (!starsContainer || !ratingResult) return;

  const stars = Array.from(starsContainer.querySelectorAll(".star"));

  function setRating(value) {
    stars.forEach(star => {
      const starValue = Number(star.dataset.value);
      star.classList.toggle("active", starValue <= value);
    });
    ratingResult.textContent = `Rating kamu: ${value} / 5`;
  }

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const value = Number(star.dataset.value);
      setRating(value);
    });
  });

  if (reviewForm && reviewText && reviewList) {
    reviewForm.addEventListener("submit", event => {
      event.preventDefault();
      const text = reviewText.value.trim();
      if (!text) return;

      const li = document.createElement("li");
      li.textContent = text;
      reviewList.prepend(li);
      reviewText.value = "";
    });
  }
}

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initHomePage();
  initProfilePage();
  initDetailPage();
});
