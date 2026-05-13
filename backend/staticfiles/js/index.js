  import { getBooks } from "./main.js";

  async function loadCategories(books) {
    const grid = document.querySelector(".categories-grid");
    if (!grid) return;

    try {
      const response = await fetch( '/api/top_categories/' )
      const data = await response.json();
      const categories = data.topCat;

      grid.innerHTML = "";

      categories.forEach(name => {
      const card = document.createElement("a");
      card.href = `../html/browse-books.html?category=${encodeURIComponent(name)}`;
      card.className = "category-card";

      card.innerHTML = `
        <span class="category-icon"></span>
        <span class="category-name">${name}</span>
      `;

      grid.appendChild(card);
    });
    } catch ( error ) {
      console.error( "Error fetching categories:", error );
    }
  }

  const grid = document.querySelector(".categories-grid");
  function handleWheel(e) {
    e.preventDefault();
    grid.scrollLeft += e.deltaY;
  }
  grid.addEventListener("wheel", handleWheel);

  async function renderTopRated() {
    var grid = document.querySelector(".books-grid");
    if (!grid) return;
    grid.innerHTML = "";

    try {
      const response = await fetch( '/api/top_rated' );
      const data = await response.json();
      const selected = data.topRated;

          selected.forEach(function(book) {
      var card = `
        <div class="book-card">
          <div class="card-image-wrapper">
            <a href="../html/book.html?id=${book.id}">
              <img src="${book.image?book.image:"../images/index-img2.jpg"}" alt="${book.title}">
            </a>
          </div>

          <div class="card-info">
            <h3>${book.title}</h3>
            <p class="author">${book.authors[0] || ""}</p>
          </div>

          <a href="/api/books/details/?id=${book.id}" class="borrow-btn-hover">
            More details
          </a>
        </div>
      `;

      grid.insertAdjacentHTML("beforeend", card);
      } );
      
    } catch ( error ) {
    console.error( "Error fetching books:", error );
  }
  }



  async function init() {
    const books = await getBooks();
    loadCategories(books);
    renderTopRated();
  }

  init();
