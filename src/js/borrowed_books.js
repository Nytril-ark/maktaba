import { getBooks } from "./main.js";

function getBorrowedIds() {
  return JSON.parse(localStorage.getItem("borrowedBooks")) || [];
}

function renderBorrowedBooks(books, borrowedIds) {
  const tbody = document.getElementById("borrowedTableBody");
  tbody.innerHTML = "";

  borrowedIds.forEach(id => {
    const book = books.find(b => b.id === id);
    if (!book) return;

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

function setupReturnButtons() {
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("returnBtn")) return;

    const id = parseInt(e.target.dataset.id);

    let borrowed = getBorrowedIds();
    borrowed = borrowed.filter(b => b !== id);

    localStorage.setItem("borrowedBooks", JSON.stringify(borrowed));

    init();
  });
}

async function init() {
  const books = await getBooks();
  const borrowedIds = getBorrowedIds();

  renderBorrowedBooks(books, borrowedIds);
}

setupReturnButtons();
init();
