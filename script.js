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

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          document.getElementById('title').value = book.title;
          document.getElementById('author').value = book.author;
          document.getElementById('pages').value = book.pages;
          document.getElementById('read').checked = book.read;
          document.getElementById('new-book-form').dataset.index = index;
          document.getElementById('new-book-form').style.display = 'block';
        });
        bookCard.appendChild(editButton);

        display.appendChild(bookCard);
      });
    }

    document.getElementById('new-book').addEventListener('click', () => {
      document.getElementById('new-book-form').reset();
      document.getElementById('new-book-form').removeAttribute('data-index');
      document.getElementById('new-book-form').style.display = 'block';
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
      } else {
        addBookToLibrary(title, author, pages, read);
      }

      displayBooks();
      document.getElementById('new-book-form').reset();
      document.getElementById('new-book-form').style.display = 'none';
    });




