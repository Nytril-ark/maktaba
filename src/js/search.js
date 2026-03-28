import { getBooks } from "./main.js";

document.addEventListener("DOMContentLoaded",() => {
    const mainSearch = document.querySelector(".searchInput");
    const btnSearch = document.querySelector(".searchIcon");

    function redirect(){
        const Query = mainSearch.value.trim();
        if(Query){
            window.location.href = `../html/browse-books.html?q=${encodeURIComponent(Query)}`;
        }
    }

    btnSearch?.addEventListener("click", redirect());

    mainSearch?.addEventListener("keypress", (e) => {
        if(e.key ==="Enter"){
            redirect();
        }
    })
})

let books = [];

function rendertable(displayBook){
    const table = document.getElementById("booksTable");

    let html = `
        <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Status</th>
        <th>Details</th>
        </tr>`
        displayBook.forEach(book => {
            html += `
        <tr>
        <td align="center">${book.title}</td>
        <td align="center">${book.authors? book.authors.join(" , "): "unknown"}</td>
        <td align="center">${book.category}</td>
        <td align="center">${book.status}</td>
        <td align="center"><a href="book.html?id=${book.id}">View details</a></td>
        </tr>`;
        })
        table.innerHTML = html;
}

function filter(){
    const tQuery = (document.getElementById("Search")?.value
    || document.querySelector(".searchInput")?.value).toLowerCase();
    const cQuery = document.getElementById("Search-Category")?.value.toLowerCase();

    const filtered = books.filter( book => {
        const matchText = book.title.toLowerCase().includes(tQuery)
        || book.authors.some(a => a.toLowerCase().includes(tQuery));

        const matchCategory = book.category.toLowerCase().includes(cQuery)
        || cQuery === "";

        return matchText&&matchCategory;
    });
    rendertable(filtered);
}

async function pre_search(){
    books = await getBooks();
    
    const parameters = new URLSearchParams(window.location.search);
    const URLquery = parameters.get('q');
    if(URLquery){
        const browseSearch = document.getElementById("Search");
        if(browseSearch){
            browseSearch.value = URLquery;
        }
    }
    filter();

    const mainSearch = document.querySelector(".searchInput");
    const browseSearch = document.getElementById("Search");
    const categorySearch = document.getElementById("Search-Category");

    [mainSearch, browseSearch, categorySearch].forEach(
        input => {input?.addEventListener("input", filter);}
    );
}

pre_search();