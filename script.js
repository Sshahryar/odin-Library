const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log('Book added:', newBook);
}

function displayBooks() {
  const display = document.getElementById('book-display');
  display.innerHTML = '';

  myLibrary.forEach((book, index) => {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.index = index;

    let bookInfo = document.createElement('p');
    bookInfo.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? 'read' : 'not read yet'}`;
    bookCard.appendChild(bookInfo);

    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      console.log('Book removed:', book);
      displayBooks();
    });
    bookCard.appendChild(removeButton);

    let toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = book.read ? 'Read' : 'Not Read';
    toggleReadButton.addEventListener('click', () => {
      book.toggleRead();
      console.log('Read status toggled:', book);
      displayBooks();
    });
    bookCard.appendChild(toggleReadButton);

    display.appendChild(bookCard);
  });
}

document.getElementById('new-book').addEventListener('click', () => {
  document.getElementById('new-book-form').reset();
  document.getElementById('new-book-form').removeAttribute('data-index');
  document.getElementById('new-book-form').style.display = 'block';
  console.log('New book form displayed');
});

document.getElementById('new-book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  if (title === '' || author === '' || pages === '') {
    alert('Please fill out all fields.');
    return;
  }

  const index = document.getElementById('new-book-form').dataset.index;
  if (index !== undefined) {
    myLibrary[index] = new Book(title, author, pages, read);
    console.log('Book updated:', myLibrary[index]);
  } else {
    addBookToLibrary(title, author, pages, read);
  }

  displayBooks();
  document.getElementById('new-book-form').reset();
  document.getElementById('new-book-form').style.display = 'none';
  console.log('Form submitted and reset');
});








