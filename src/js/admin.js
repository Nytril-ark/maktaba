function initializeDefaultBooks() {
    let books = JSON.parse(localStorage.getItem("books"));

    if (books && books.length > 0) return;

    const defaultBooks = [
        {
            id: 1,
            title: "Introduction to Algorithms",
            authors: ["Thomas H. Cormen"],
            category: "Computer Science",
            isbn: "970-02600",
            year: 2009,
            status: "available",
            description: ""
        },
        {
            id: 2,
            title: "Clean Code",
            authors: ["Robert C. Martin"],
            category: "Software Engineering",
            isbn: "970-02601",
            year: 2006,
            status: "borrowed",
            description: ""
        },
        {
            id: 3,
            title: "Artificial Intelligence",
            authors: ["Stuart Russell"],
            category: "AI & ML",
            isbn: "970-0700",
            year: 2024,
            status: "available",
            description: ""
        }
    ];

    localStorage.setItem("books", JSON.stringify(defaultBooks));
}



document.addEventListener("DOMContentLoaded", () => {
    initializeDefaultBooks();
    handleAddBook();
    loadBooks();
    handleEditBook();
    deleteBook();
});

function handleAddBook() {
    const form = document.getElementById("addBookForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const authors = document.getElementById("authors").value.split(",");
        const category = document.getElementById("category").value;
        const isbn = document.getElementById("isbn").value;
        const year = document.getElementById("year").value;
        const quantity = document.getElementById("quantity").value;
        const status = document.getElementById("status").value;
        const description = document.getElementById("description").value;

        let books = JSON.parse(localStorage.getItem("books")) || [];

        const newId = books.length ? books[books.length - 1].id + 1 : 1;

        const newBook = {
            id: newId,
            title: title,
            authors: authors.map(a => a.trim()),
            category: category,
            isbn: isbn,
            year: year,
            quantity: quantity,
            description: description,
            status: status
        };

        books.push(newBook);

        localStorage.setItem("books", JSON.stringify(books));

        window.location.href = "book_inventory.html";
    });
}


function loadBooks() {
    const tableBody = document.getElementById("booksTableBody");

    if (!tableBody) return;

    let books = JSON.parse(localStorage.getItem("books")) || [];

    tableBody.innerHTML = "";

    books.forEach(book => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${book.id}</td>
          <td class="book-title">${book.title}</td>
          <td>${book.authors.join(", ")}</td>
          <td>${book.category}</td>
          <td>${book.isbn || "-"}</td>
          <td>${book.year || "-"}</td>
          <td><span class="status ${getStatusClass(book.status)}">${book.status}</span></td>
          <td class="Actions">
            <a href="edit_book.html?id=${book.id}" class="icon-btn edit-btn">✏️</a>
            <button class="icon-btn delete-btn" onclick="deleteBook(${book.id})">🗑️</button>
          </td>
        `;

        tableBody.appendChild(row);
    });
}

function deleteBook(id) {
    let books = JSON.parse(localStorage.getItem("books")) || [];

    books = books.filter(book => book.id !== id);

    localStorage.setItem("books", JSON.stringify(books));

    loadBooks();
}


//edit function
function handleEditBook() {
    const form = document.querySelector("form");

    if (!window.location.href.includes("edit_book.html")) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    let books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books.find(b => b.id === id);

    if (!book) {
        alert("Book not found!");
        window.location.href = "book_inventory.html";
        return;
    }

    // get elements
    const title = document.getElementById("editTitle");
    const authors = document.getElementById("editAuthors");
    const category = document.getElementById("editCategory");
    const isbn = document.getElementById("editISBN");
    const year = document.getElementById("editYear");
    const quantity = document.getElementById("editQuantity");
    const status = document.getElementById("editStatus");
    const description = document.getElementById("editDescription");

    //fill form
    title.value = book.title;
    authors.value = book.authors.join(", ");
    category.value = book.category;
    isbn.value = book.isbn;
    year.value = book.year;
    quantity.value = book.quantity || 0;
    status.value = book.status;
    description.value = book.description;

    // function to update Book
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        book.title = title.value;
        book.authors = authors.value.split(",").map(a => a.trim());
        book.category = category.value;
        book.isbn = isbn.value;
        book.year = year.value;
        book.quantity = quantity.value;
        book.status = status.value;
        book.description = description.value;

        localStorage.setItem("books", JSON.stringify(books));

        window.location.href = "book_inventory.html";
    });
}


function getStatusClass(status) {
    if (status === "available") return "ava";
    if (status === "borrowed") return "Borrowed";
    if (status === "maintenance") return "maintenance";
    if (status === "lost") return "lost";
    return "";
}




//Draw Charts
let books = JSON.parse(localStorage.getItem("books")) || [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Software Engineering",
        status: "Available"
    },
    {
        id: 2,
        title: "Introduction to Algorithms",
        author: "Clifford Stein",
        category: "Software Engineering",
        status: "Available"
    },
    {
        id: 3,
        title: "Cyber Security And Data protection",
        author: "Ronald L.Rivest",
        category: "Cyber Security",
        status: "Available"
    }
];

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function loadCharts() {

    // months chart
    const ctx1 = document.getElementById("monthlyChart");

    if (ctx1) {
        new Chart(ctx1, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    label: "Books Borrowed",
                    data: [120, 190, 300, 250, 220, 310],
                    borderWidth: 2
                }]
            }
        });
    }

    // categories chart
    const ctx2 = document.getElementById("categoryChart");

    if (ctx2) {

        const categories = {};

        books.forEach(book => {
            categories[book.category] = (categories[book.category] || 0) + 1;
        });

        console.log(categories);
        const values = Object.values(categories);


        new Chart(ctx2, {
            type: "pie",
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: [
                        "#4CAF50",
                        "#2196F3",
                        "#FF9800",
                        "#E91E63",
                        "#9C27B0",
                        "#5C6D49",
                        "#A3AB82"
                    ]
                }]
            },
            plugins: [ChartDataLabels],

            options: {
                plugins: {
                    datalabels: {
                        color: "#fff",
                        font: {
                            weight: "bold",
                            size: 14
                        },

                        formatter: (value, context) => {
                            let total = context.chart.data.datasets[0].data
                                .reduce((a, b) => a + b, 0);

                            let percentage = (value / total * 100).toFixed(1) + "%";

                            return percentage;
                        }
                    }
                }
            }
        });

    }
}
window.onload = function () {
    loadCharts();
};
