async function borrowedBooks() {
  try {
    const response = await fetch( '/api/borrowing/my' );
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
      <td>${book.authors}</td>
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

function setupReturnButtons() {
  document.addEventListener( "click", async ( e ) => {
    if ( !e.target.classList.contains( "returnBtn" ) ) return;

    const csrfToken = document.querySelector( '[name=csrfmiddlewaretoken]' ).value;
    const bookISBN =  e.target.dataset.id;
    
    try {
      const response = await fetch( `/api/borrowing/return/${bookISBN}/`, {
        method: 'POST',
        'X-CSRFToken': csrfToken
      } );
      const data = await response.json();
      
      if ( response.ok && data.status == 'success') {
        borrowedBooks()
        alert( data.message );
      } else {
        alert(data.message)
      }
    } catch ( error ) {
      console.error( "Error returning book:", error );
    }
  });
}


setupReturnButtons();
borrowedBooks();
