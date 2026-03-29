import { getBooks } from "./main.js";

let books = [];
let currentPage = 1;
const BooksPerPage = 20;

document.addEventListener("DOMContentLoaded",() => {
    const mainSearch = document.querySelector(".searchInput");
    const btnSearch = document.querySelector(".searchIcon");

    function redirect(){
        const Query = mainSearch.value.trim();
        if(Query){
            window.location.href = `../html/browse-books.html?q=${encodeURIComponent(Query)}`;
        }
    }

    btnSearch?.addEventListener("click", redirect);

    mainSearch?.addEventListener("keypress", (e) => {
        if(e.key ==="Enter"){
            redirect();
        }
    })
})

function categoryListeners(){
    const categoryButtons = document.querySelectorAll(".categories-buttons");
    categoryButtons.forEach(button1 => {
        button1.addEventListener("click", () => {
            categoryButtons.forEach(button2 => button2.classList.remove("active"))
            button1.classList.add("active");
            currentPage = 1;
                filter();
        })
    })
}

function Pagination(Items){
    const pagination = document.getElementById("pageNumber");
    pagination.innerHTML = "";
    const tPages = Math.ceil(Items/BooksPerPage);
    
    if(tPages <= 1){
        return;
    }

    const range = 4;
    let pages = [1,2,3,4];
    pages.push(tPages);
    
    if(currentPage < tPages - range){
        for(let i = currentPage; i <= currentPage + range;i++){
            if(i >= 1 && i < tPages){
                pages.push(i);
            }
        }
    }
    else{
        for(let i = currentPage; i >= tPages - range;i--){
            if(i >= 1 && i <= tPages){
                pages.push(i);
            }
        }                
    }
    pages = [...new Set(pages)].sort((a,b) => a - b);

    const backButton = document.createElement("button");
    backButton.textContent = "<";
    backButton.className = "back";
    backButton.addEventListener("click", () => {
        if(currentPage > 1){
        currentPage = currentPage - 1;
        filter();
        window.scrollTo(0, 0);
        }    
    })
    pagination.appendChild(backButton);

    pages.forEach((page,idx) => {
        if(idx > 0 ){
            const seperation = document.createElement("span");
            if(page - pages[idx - 1] > 1){
            seperation.textContent = ".....";
            seperation.className = "dotseparate";
            }
            else{
            seperation.textContent = " ";
            seperation.className = "gapseparate";
            }    
            pagination.appendChild(seperation);
        }



    const pageButton = document.createElement("button");
    pageButton.textContent = page;
    pageButton.className = `page-button ${page === currentPage? "active":""}`;

    pageButton.addEventListener("click", () => {
        currentPage = page;
        filter();
        window.scrollTo(0, 0);
    })
    pagination.appendChild(pageButton); 
    })

    const nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.className = "back";
    nextButton.addEventListener("click", () => {
        if(currentPage < tPages){
        currentPage = currentPage + 1;
        filter();
        window.scrollTo(0, 0);
        }    
    })
    pagination.appendChild(nextButton);

}

function renderGrid(displayBook){
    const Grid = document.getElementById("booksGrid");
    Grid.innerHTML="";
    displayBook.forEach(book => {
    const card = `
        <div class="book-card" onclick="window.location.href='book.html?id=${book.id}'">
            <div class="card-img-container">
                <img src="${book.image?book.image:"../images/index-img2.jpg"}" alt="${book.title}" >
            </div>
            <div class="card-content">
                <h3 class="card-title">${book.title}</h3>
 
                <div class="card-footer">
                    <span class="card-status status-${book.status.toLowerCase().replace(/\s/g, '-')}">${book.status}</span>
                    <a href="book.html?id=${book.id}" class="button-details">View Details</a>
                </div>
            </div>
        </div>`;
        Grid.insertAdjacentHTML("beforeend",card);
    })
}

function categorySideBar(books){
    const categorylist = document.querySelector(".category-list");
    const categories = 
    new Set(books.map(book => book.category).filter(Boolean));

    categorylist.innerHTML = 
    ` <li><button class="categories-buttons active">All books</button></li>`;

    categories.forEach(Name => {
        const List = document.createElement("li");
        List.innerHTML = `<button class="categories-buttons">${Name}</button>` 
        categorylist.appendChild(List);
    })
    categoryListeners();
}

function filter(){
    const sQuery = (document.querySelector(".searchInput")?.value 
    || "").toLowerCase();
    
    const active = document.querySelector(".categories-buttons.active")
    const category = active? active.textContent.trim().toLowerCase():"all books";

    const filtered = books.filter( book => {
        const matchText = book.title.toLowerCase().includes(sQuery)
        || book.authors.some(a => a.toLowerCase().includes(sQuery));
        const bookCategory = book.category? 
        book.category.trim().toLowerCase():"";
        const Allbooks = category ==="all books";
        const matchCategory = (Allbooks)
        || (bookCategory === category);

        return matchText&&matchCategory;
    });

    const startIdx = (currentPage - 1) * BooksPerPage;
    const endIdx = startIdx + BooksPerPage;
    const bookPages = filtered.slice(startIdx, endIdx);

    Pagination(filtered.length);
    renderGrid(bookPages);
}

async function pre_search(){
    books = await getBooks();

    categorySideBar(books);

    const parameters = new URLSearchParams(window.location.search);
    const URLquery = parameters.get('q');
    const mainSearch = document.querySelector(".searchInput");
    if(URLquery && mainSearch){
        mainSearch.value = URLquery;
    }

    mainSearch?.addEventListener("input",() => {
        currentPage = 1;
        filter();
    })

    filter();
}

pre_search();