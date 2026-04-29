# maktaba
website for the web technology uni project

<details><summary>
PHASE 1:
  </summary>
  
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



~~phase 1 has to be just html and css (no frameworks or javascript)~~ 
~~each of us makes an html page and an associated css file for the page.~~
</details>

<details><summary>
PHASE 2:
  </summary>
All pages import `main.css` which contains the color palette. We can change the pallette later if we want 

NEVER hardcode colors in your CSS/HTML, use or create variables from main.css so its easier to change them later

# tasks:

### CSS (2 people)
- login, signup, and "forgot password" using better input form. (try: https://uiverse.io/forms)
- put contact page under home page, add more photos, better css, more fake contacts (facebook, whatsapp, instagram, etc)
- statistics / graph for admin dashboard (number of books, number of users, etc)


- browse page: better css for search bar, use cards for books instead of table, like: https://uiverse.io/cards or like https://uiverse.io/Satwinder04/young-zebra-44. Use grid layout for cards 
- borrowed books: use cards too. 

### JS: search, admin dashboard, book page. (3 people)
- book page: Make each of the book details have classes, like: 
```
<div class="author"></div>
<div class="description"></div>
```
- this way we can have just 1 html book page and change the details from javascript. (function that get element by classname, and changes author, description, picture, etc depending on what book is being displayed)
- we make a JS class for books that has attributes like author, description, image, etc.. The array is stored in `books.js` and imported by all relevant pages.
- The search page should be fully functional: looks through that array, making the books appear that are relevant to the user's search.
- admin dashboard should be fully functional: delete or edit items in that array
- make the borrow book button in the book page functional (borrowed books should appear in the borrowed page.)


---


### JS: Login & Signup (1 person)
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

navbar should change according to role too
</details>

---
---

# PHASE 3 
## tasks:
#### SEARCH AND BOOK PAGE (1 person):
- create the schema for the DB because the rest of the work depends on it (what columns / attributes do we have for the books / users)
- they get the book data from the backend DB instead.

#### LOGIN (1 person): 
- login, username's, passwords, and admin users should now be in the database. 
- the password of the current user is saved in session storage so that he stays loggedin while the page is open, but the rest of the data isnt saved in local storage anymore. 

#### BORROWED BOOKS (1 person): 
- borrowed books are saved in the DB now and they are tied to the user by their email (because email is unique).
- fix small issues from previous phase if needed

#### ADMIN: (3 people): 
- Book statistics should be from the DB.
- Edit book should be functional and should update the DB.
- Add book should be functional and should update the DB.
