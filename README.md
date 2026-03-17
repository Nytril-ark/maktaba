# maktaba
website for the web technology uni project


> [!IMPORTANT]
> **Team notes**
> 
> we can split it into the following tasks:
> 1. login & signup, navigation bar (different for normal user and admin)
> 2. home page, contact / support page
> 3. admin dashboard (adding, removing, modifying books)
> 4. search/browsing books page for normal users
> 5. book page for each book (same page is reused of course)
> 6. page that contains borrowed books list for a certain user

# ~~PHASE 1:~~

~~phase 1 has to be just html and css (no frameworks or javascript)~~ 
~~each of us makes an html page and an associated css file for the page.~~

# PHASE 2: 
All pages import `main.css` which contains the color palette. We can change the pallette later if we want 
NEVER hardcode colors in your CSS/HTML, use the variables from main.css.

# tasks:

### CSS
- login, signup, and "forgot password" 
- put contact page under home page, add more photos, better css, more fake contacts (facebook, whatsapp, instagram, etc)
- better css & statistics for admin dashboard (number of books, number of users, etc)


- browse page: better css for search bar, use cards for books instead of table, like: https://uiverse.io/cards or like https://uiverse.io/Satwinder04/young-zebra-44. Use grid layout for cards 
- borrowed books: use cards too. 
- book page: Make each of the book details have classes, like: 
```
<div class="author"></div>
<div class="description"></div>
```
this way we can have just 1 html book page and change the details from javascript. (function that get element by classname, and changes author, description, picture, etc depending on what book is being displayed)



### JS:

##### search, admin dashboard, book page.
- we make a JS class for books that has attributes like author, description, image, etc.. Then we store an array of that class in the JS of the search page. And the search function looks through that array. 
- the array is stored in `books.js` and imported by all 3 pages. 
- admin dashboard can delete or add items in that array 

##### Login & Signup 
- admin pages have something in their JS like 
```
if (role !== admin) redirect();
```
which sends the user away if he's not admin. the user role is stored in local storage. 

if there is no role in localStorage, the user is a GUEST. HE only sees the home page, browse, and login. Other pages all redirect like above. 

if the role stored there is STUDENT, he sees all pages except for admin dashboard and login (because he's logged in already) 

if the role is ADMIN, he sees the admin page too.. 

the JS for the login page checks if the input username/password is like the one stored in an array in login.js, if it matches, user gets the role using something like:
```
localStorage.setItem("role", admin);
```
