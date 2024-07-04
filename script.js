const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
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
    removeButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });
    bookCard.appendChild(removeButton);

    let toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = book.read ? 'Read' : 'Not Read';
    toggleReadButton.addEventListener('click', () => {
      book.toggleRead();
      displayBooks();
    });
    bookCard.appendChild(toggleReadButton);

    display.appendChild(bookCard);
  });
}

document.getElementById('new-book').addEventListener('click', () => {
  document.getElementById('new-book-form').style.display = 'block';
});

document.getElementById('new-book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  document.getElementById('new-book-form').reset();
  document.getElementById('new-book-form').style.display = 'none';
});


