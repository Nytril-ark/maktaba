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

async function loadBook() { 
  try {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    if (!bookId) return;

    const response = await fetch(`/api/books/js/?id=${bookId}`);
    const data = await response.json();
    const book = data[0]; 

    if (!book) {
      console.error("Book not found in database!");
      return;
    }
    
    const imgEl = document.getElementById("bookImage");
    if(imgEl) imgEl.src = book.image ? book.image : "/static/images/index-img2.jpg";
    
    const titleEl = document.getElementById("bookTitle");
    if(titleEl) titleEl.textContent = "Title : " + book.title;
    
    const authorsEl = document.getElementById( "bookAuthors" );
    if (authorsEl) {
      authorsEl.innerHTML = "";
      if (book.authors && book.authors.length > 0) {
        book.authors.forEach((name) => {
          const li = document.createElement("li");
          li.textContent = name;
          authorsEl.appendChild(li);
        });
      }
    }

    const catEl = document.getElementById("bookCategory");
    if(catEl) catEl.textContent = "Category : " + (book.category || "N/A");
    
    const pagesEl = document.getElementById("bookPages");
    if(pagesEl) pagesEl.textContent = "Pages : " + (book.pages || "N/A");
    
    const langEl = document.getElementById("bookLanguage");
    if(langEl) langEl.textContent = "Language : " + (book.language || "N/A");
    
    const descEl = document.getElementById("bookDescription");
    if(descEl) descEl.textContent = book.description || "No description available.";

    const statusEl = document.getElementById("bookStatus");
    if(statusEl) statusEl.textContent = "Status : " + book.status;
    
    const ratingEl = document.getElementById("bookRating");

    if(ratingEl) ratingEl.textContent = "Rating : " + "★".repeat(book.rating || 0);

  } catch (error) {
    console.error("Error loading book details:", error);
  }
}

function getBookIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

async function loadPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    window.location.href = "Error";
    return;
  }
  const data = await getBooks();
  const found = data.find((b) => String(b.id) === String(id));

  if (!found) {
    window.location.href = "/Error";
    return;
  }

  const book = new Book(found);
  loadBook();
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
        loadBook();
      } else {
        alert( data.message );
      }
    } catch ( error ) {
      console.error( "Error borrowing book:", error );
    }
    
  });
}


setupBorrowButtons();
loadBook();
loadPage();
