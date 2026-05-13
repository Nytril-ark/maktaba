import { getBooks } from "./main.js";

const role = localStorage.getItem("Role") || "Guest";

export class Book {
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
    rating,
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
      rating,
    });
  }
}

function loadBook(book) {
  document.getElementById("bookImage").src = book.image ? book.image : "/static/images/index-img2.jpg";
  document.getElementById("bookTitle").textContent = "Title : " + book.title;

  const authorsEl = document.getElementById("bookAuthors");
  authorsEl.innerHTML = "";
  book.authors.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    authorsEl.appendChild(li);
  });

  document.getElementById("bookCategory").textContent =
    "Category : " + book.category;
  document.getElementById("bookPages").textContent = "Pages : " + book.pages;
  document.getElementById("bookLanguage").textContent =
    "Language : " + book.language;

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
  const id = params.get("id");

  if (!id) {
    window.location.href = "../html/404.html";
    return;
  }
  const data = await getBooks();
  const found = data.find((b) => String(b.id) === String(id));

  if (!found) {
    window.location.href = "../html/404.html";
    return;
  }

  const book = new Book(found);
  loadBook(book);
}

const borrowBtn = document.getElementById("borrowBookButton");

function setupBorrowButtons() {
  borrowBtn.addEventListener( "click", async ( e ) => {
    
    if (!borrowBtn) return;
    e.preventDefault();

    try {
      const params = new URLSearchParams(window.location.search);
      const bookId = params.get("id");
      const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      
      const btn = e.target;
      
      const response = await fetch( '/api/borrowing/borrow/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify( { book_id: bookId } )
      } );

      const data = await response.json();
      
      if ( response.ok && data.status === 'success' ) {
        alert( data.message );
      } else {
        alert( data.message );
      }
    } catch ( error ) {
      console.error( "Error borrowing book:", error );
    }
    
  });
}


setupBorrowButtons()
loadPage();
