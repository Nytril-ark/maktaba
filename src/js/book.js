class Book {
  constructor({
    id,
    title,
    authors,
    image,
    category,
    pages,
    language,
    description,
    status,
    rating
  }) {
    Object.assign(this, {
      id,
      title,
      authors,
      image,
      category,
      pages,
      language,
      description,
      status,
      rating
    });
  }
}

function loadBook(book) {
  document.getElementById("bookImage").src = book.image;
  document.getElementById("bookTitle").textContent = "Title : " + book.title;

  const authorsEl = document.getElementById("bookAuthors");
  authorsEl.innerHTML = "";
  book.authors.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    authorsEl.appendChild(li);
  });

  document.getElementById("bookCategory").textContent = "Category : " + book.category;
  document.getElementById("bookPages").textContent = "Pages : " + book.pages;
  document.getElementById("bookLanguage").textContent = "Language : " + book.language;

  document.getElementById("bookDescription").textContent = book.description;

  document.getElementById("bookStatus").textContent = "Status : " + book.status;
  document.getElementById("bookRating").textContent =
    "Rating : " + "★".repeat(book.rating);
}

function getBookIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}


async function loadPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  if (!id) {
    window.location.href = "../html/404.html";
    return;
  }

  const res = await fetch("../data/books.json");
  const data = await res.json();

  const found = data.find(b => b.id === id);

  if (!found) {
    window.location.href = "../html/404.html";
    return;
  }

  const book = new Book(found);
  loadBook(book);
}

loadPage();
