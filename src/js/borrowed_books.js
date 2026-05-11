async function getBooks() {
  try {
    const response = await fetch( '/api/borrowing/my/' );
    if ( !response.ok ) {
      throw Error( "Server connection issues" )
    }

    const data = await response.json();
    const books = data.borrowedBooks;

    const tbody = document.getElementById( "borrowedTableBody" );
    tbody.innerHTML = "";

    books.forEach(book => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.authors.join(", ")}</td>
      <td>${book.category}</td>
      <td class="Status-borrowd">Borrowed</td>
      <td><a href="../html/book.html?id=${book.id}">view book page</a></td>
      <td>
        <button class="returnBtn" data-id="${book.id}">Return</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
  }
  catch ( error ) {
    console.error( "Error fetching books:", error );
  }

}

// function setupReturnButtons() {
//   document.addEventListener("click", (e) => {
//     if (!e.target.classList.contains("returnBtn")) return;

//     const id = parseInt(e.target.dataset.id);

//     let borrowed = getBorrowedIds();
//     borrowed = borrowed.filter(b => b !== id);

//     localStorage.setItem("borrowedBooks", JSON.stringify(borrowed));

//     init();
//   });
// }

async function init() {

  getBooks()
  // renderBorrowedBooks(books, borrowedIds);
}

// setupReturnButtons();
init();
