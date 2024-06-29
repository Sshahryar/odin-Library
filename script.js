const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const newBook = newBook(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  const display = document.getElementById('book-display');
  display.innerHTML = '';

  myLibrary.forEach((book, index) => {
    let bookCard = document.createElement('div');
    bookCard.dataset.index = index;

    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', (e) => {
      let index = e.target.parentElement.dataset.index;
      myLibrary.splice(index, 1);
      displayBooks();
    });
    bookCard.appendChild(removeButton);

    let toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = book.read ? 'Read' : 'Not Read';
    toggleReadButton.addEventListener('click', (e) => {
      let index = e.target.parentElement.dataset.index;
      myLibrary[index].toggleRead();
      displayBooks();
    });
    bookCard.appendChild(toggleReadButton);

    display.appendChild(bookCard);
  });
}

const newBookForm = document.getElementById('new-book-form');
const newBookButton = document.getElementById('new-book');

newBookButton.addEventListener('click', () => {
  newBookForm.style.display = 'block';
});

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  newBookForm.reset();
  newBookForm.style.display = 'none';
});
