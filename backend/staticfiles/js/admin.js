let pieChart = null;
let lineChart = null;

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
      description: "",
    },
    {
      id: 2,
      title: "Clean Code",
      authors: ["Robert C. Martin"],
      category: "Software Engineering",
      isbn: "970-02601",
      year: 2006,
      status: "borrowed",
      description: "",
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      authors: ["Stuart Russell"],
      category: "AI & ML",
      isbn: "970-0700",
      year: 2024,
      status: "available",
      description: "",
    },
  ];

  localStorage.setItem("books", JSON.stringify(defaultBooks));
}

document.addEventListener("DOMContentLoaded", () => {
  initializeDefaultBooks();
  handleAddBook();
  loadBooks();
  handleEditBook();
  deleteBook();
  updateDashboard();
  setInterval(updateDashboard,30000);
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
      authors: authors.map((a) => a.trim()),
      category: category,
      isbn: isbn,
      year: year,
      quantity: quantity,
      description: description,
      status: status,
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

  books.forEach((book) => {
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
            <a href="edit_book.html?id=${book.id}" class="icon-btn edit-btn"><img src="../images/edit.svg" alt="edit"></a>
            <button class="icon-btn delete-btn" onclick="deleteBook(${book.id})"><img src="../images/delete.svg" alt="delete"></button>
          </td>
        `;

    tableBody.appendChild(row);
  });
}

function deleteBook(id) {
  let books = JSON.parse(localStorage.getItem("books")) || [];

  books = books.filter((book) => book.id !== id);

  localStorage.setItem("books", JSON.stringify(books));

  loadBooks();
}



///////////////////////////////////////////////////////////////////////////////////////////

function handleAddBook() {
    const form = document.getElementById("addBookForm");
    if (!form) return;

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const payload = {
            title: document.getElementById("title").value,
            authors: document.getElementById("authors").value,
            category: document.getElementById("category").value,
            isbn: document.getElementById("isbn").value,
            status: document.getElementById("status").value,
            description: document.getElementById("description").value,
        };

        const res = await fetch("http://127.0.0.1:8000/api/admine/api/add_book/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        window.location.href = "/api/admine/dashboard/";
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////


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
    status: "Available",
  },
  {
    id: 2,
    title: "Introduction to Algorithms",
    author: "Clifford Stein",
    category: "Software Engineering",
    status: "Available",
  },
  {
    id: 3,
    title: "Cyber Security And Data protection",
    author: "Ronald L.Rivest",
    category: "Cyber Security",
    status: "Available",
  },
];

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function updateTrends(elementID, val){
  const element = document.getElementById(elementID);
  if(!element){
    return;
  }
  const container = element.parentElement;
  const icon = container.querySelector(".trend-icon");

  element.innerText = `${val}%`;

  if (val > 0){
    if (icon){ 
      icon.style.transform = "rotate(0deg)";
    }
  }
  else if(val < 0){
    if (icon) {
      icon.style.transform = "rotate(180deg)";
    }
  }
  else{
    if(icon){
      icon.src = "/static/images/dash.svg";
    }
  }
}

function recentBorrows(data){
  const recentList  = document.querySelector(".activity-list");
  recentList.innerHTML = "";
  if(data.recent_borrowers.length === 0){
    recentList.innerHTML = "<li>No recent activity.</li>";
  }
  else{
      data.recent_borrowers.forEach(act => {
        const li = document.createElement("li");

        let actionText = "borrowed";
        if (act.status === "returned") {
          actionText = "returned";
        }

        li.innerHTML = 
        `<p><strong>${act.name}</strong> ${actionText} "${act.book}"</p>
        <span class="time">${act.borrowdate}</span>`;
        recentList.appendChild(li);
   });
  }
}

async function getDashboardData() {
   try{
      const [bookResponse,borrowResponse] = await Promise.all([
        fetch('/api/admine/api/books_stats/'),
        fetch('/api/admine/api/borrow_stats/')
      ]);
      if(!bookResponse.ok || !borrowResponse.ok) {
        throw new Error('Problem with network');
      }

    const bookData = await bookResponse.json();
    const borrowData = await borrowResponse.json();
    return {...bookData,...borrowData};
   }catch(error){
      console.error(error);
      return null;
  }
}

async function loadCards(data) {

  const books = document.getElementById("Total-books");
  const borrowers = document.getElementById("Active-Borrowers");
  const overdue = document.getElementById("Overdue-Books");
  const borrowedToday = document.getElementById("Borrowed-Today");
  
  
  if(books){
    books.innerText = data.books;
  }
  if(borrowers){
    borrowers.innerText = data.borrowers;
  }
  if(overdue){
    overdue.innerText = data.overdue;
  }
  if(borrowedToday){
    borrowedToday.innerText = data.borrow_today;
  }

  updateTrends("borrower_trend",data.borrower_trend);
  updateTrends("overdue_trend",data.overdue_trend);
  updateTrends("borrowed_today_trend",data.borrow_today_trend);
}

async function loadCharts(data) {
  // months chart
  const ctx1 = document.getElementById("monthlyChart");

  if (ctx1) {
    new Chart(ctx1, {
      type: "line",
      data: {
        labels: data.line_label || [],
        datasets: [
          {
            label: "Books Borrowed",
            data: data.line_count || [],
            borderWidth: 2,
          },
        ],
      },
    });
  }

  // categories chart
  const ctx2 = document.getElementById("categoryChart");

  if (ctx2) {
     if(pieChart){
        pieChart.destroy();
      }
    pieChart = new Chart(ctx2, {
      type: "pie",
      data: {
        labels: data.pie_label || [],
        datasets: [
          {
            data: data.pie_count || [],
            backgroundColor: [
              "#4CAF50",
              "#2196F3",
              "#FF9800",
              "#E91E63",
              "#9C27B0",
              "#5C6D49",
              "#A3AB82",
            ],
          },
        ],
      },
      plugins: [ChartDataLabels],

      options: {
        plugins: {
          datalabels: {
            color: "#fff",
            font: {
              weight: "bold",
              size: 14,
            },

            formatter: (value, context) => {
              let total = context.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0,
              );

              let percentage = ((value / total) * 100).toFixed(1) + "%";

              return percentage;
            },
          },
        },
      },
    });
  }
}


async function updateDashboard(){
    let data = await getDashboardData();
    if(!data){
      return;
    }
    loadCards(data);
    loadCharts(data);
    recentBorrows(data);
}
// window.onload = function () {
//   loadCharts();
// };
