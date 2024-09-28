const LOCAL_STORAGE_KEY = "myBookshelf";
let books = [];

// Load books from localStorage when the page loads
function loadBooksFromLocalStorage() {
  const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
  books = storedBooks ? JSON.parse(storedBooks) : [];
}

// Save books to localStorage after any modification
function saveBooksToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
}

// Render books in the unread and read lists
function renderBooks() {
  const unreadList = document.getElementById("unread-list");
  const readList = document.getElementById("read-list");

  unreadList.innerHTML = "";
  readList.innerHTML = "";

  books.forEach((book, index) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book-item");
    bookElement.setAttribute("data-bookid", book.id); // Using data-bookid

    // using dicoding requirements
    bookElement.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemCategory">Category: ${book.category}</p>
      <p data-testid="bookItemPages">Pages: ${book.pages}</p>
      <button data-testid="bookItemIsCompleteButton" onclick="toggleBookStatus(${index})">
        ${book.status === "Unread" ? "Mark as Read" : "Mark as Unread"}
      </button>
      <button data-testid="bookItemDeleteButton" onclick="deleteBook(${index})">Delete</button>
    `;

    // Append book to the appropriate list based on its status
    if (book.status === "Unread") {
      unreadList.appendChild(bookElement);
    } else {
      readList.appendChild(bookElement);
    }
  });
}

// Add new book based on form input
function addBook(event) {
  event.preventDefault();

  const title = document.getElementById("book-title").value;
  const category = document.getElementById("book-category").value;
  const pages = document.getElementById("book-pages").value;
  const status = document.getElementById("book-status").value;

  // Create a new book object
  const newBook = { id: Date.now(), title, category, pages, status };

  // Add new book to the books array and save it to localStorage
  books.push(newBook);
  saveBooksToLocalStorage();
  renderBooks();

  // Reset the form after submission
  document.getElementById("book-form").reset();
}

// Toggle book status between "Unread" and "Have Read"
function toggleBookStatus(index) {
  books[index].status =
    books[index].status === "Unread" ? "Have Read" : "Unread";
  saveBooksToLocalStorage();
  renderBooks();
}

// Delete book from the list
function deleteBook(index) {
  books.splice(index, 1);
  saveBooksToLocalStorage();
  renderBooks();
}

// Event listener for form submission
document.getElementById("book-form").addEventListener("submit", addBook);

// Load and render books when the window loads
window.onload = function () {
  loadBooksFromLocalStorage();
  renderBooks();
};
