(function () {
  const myLibrary = []; // Store books created by user
  let counter = 0; // Keep track of myLibrary index

  // Book constructor
  function Book(name, author, pageCount, readStatus) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
  }

  Book.prototype.changeStatus = function () {
    (this.readStatus === true) ? this.readStatus = false : this.raedStatus = true;
  };

  const init = () => {
    const showModalDialog = () => {
      document.querySelector('.create-button').addEventListener('click', () => {
        const book = document.querySelector('.md-modal');
        book.classList.add('md-show');
      });
    };

    const closeModalDialog = () => {
      document.querySelector('.md-overlay').addEventListener('click', () => {
        const book = document.querySelector('.md-modal');
        book.classList.remove('md-show');
      });
    };

    const inputsAreEmpty = () => {
      // Destructuring assignment
      const [name, author, pageCount] = document.querySelectorAll('input');
      return (name.value === '' || author.value === '' || pageCount.value === '');
    };

    const pageCountisInvalid = () => {
      const pageCount = document.querySelector('#page-count').value;
      return (Number.isNaN(parseInt(pageCount, 10))
            || parseInt(pageCount, 10) < 10);
    };

    // The buttons on book boxes created by the user
    const pressBookButtons = () => {
      document.querySelector('.content-container').addEventListener('click', (e) => {
        const grandParent = e.target.parentNode.parentNode.id;
        const object = myLibrary[grandParent];
        console.log(e.target.className)
        if (e.target && e.target.className === 'green-check') {
          const check = e.target;

          check.classList.remove('green-check');
          check.textContent = '✖';
          check.classList.add('red-x');
          // Change readStatus in array to false
          object.changeStatus();
          return;
        }
        if (e.target && e.target.className === 'red-x') {
          const x = e.target;
          
          x.classList.remove('red-x');
          x.textContent = '✔';
          x.classList.add('green-check');
          // Change readStatus in array to true
          object.changeStatus();
          return;
        }
        if (e.target && e.target.className === 'remove-book') {
          // Remove the visual div on webpage
          document.getElementById(`${grandParent}`).remove();
          // Remove the object in array that was used to create book
          myLibrary.splice(grandParent, 1);
          counter -= 1;
        }
      });
    };

    const createBookVisual = () => {
      const element = myLibrary[counter];
      const parent = document.querySelector('.content-container');
      const newBook = document.createElement('div');
      newBook.classList.add('new-book');
      newBook.id = `${counter}`;

      // The title of the book
      const title = document.createElement('h2');
      title.textContent = element.name;
      title.classList.add('book-title');

      // The author's name
      const author = document.createElement('p');
      author.textContent = `by ${element.author}`;
      author.classList.add('book-author');

      // The number of pages in the book
      const pageCount = document.createElement('span');
      pageCount.textContent = `${element.pageCount} pages`;
      pageCount.classList.add('book-pages');

      // Remove book and read status buttons
      const buttons = document.createElement('div');
      buttons.classList.add('buttons-container');
      const readButton = document.createElement('button');

      if (element.readStatus) {
        readButton.textContent = '✔';
        readButton.classList.add('green-check');
      } else if (element.readStatus === false) {
        readButton.textContent = '✖';
        readButton.classList.add('red-x');
      }

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-book');

      // Append buttons to div
      buttons.append(readButton, removeButton);

      parent.appendChild(newBook);
      newBook.append(title, author, pageCount, buttons);
    };

    const addBookToLibrary = () => {
      document.querySelector('.add-book').addEventListener('click', () => {
        const parent = document.querySelector('form');
        const child = document.createElement('p');

        if (parent.querySelector('.warning-text') !== null) {
          parent.querySelector('.warning-text').remove();
        }

        if (inputsAreEmpty()) {
          child.classList.add('warning-text');
          child.textContent = 'One or more forms are empty!';

          parent.appendChild(child);
          return;
        }
        if (pageCountisInvalid()) {
          child.classList.add('warning-text');
          child.textContent = 'Page count isn\'t valid!';

          parent.appendChild(child);
          return;
        }

        // Destructuring assignment to allocate data to 3 variables at once
        const [name, author, pageCount] = document.querySelectorAll('input');
        // Grab boolean value from checkbox
        const readStatus = document.querySelector('#read-status').checked;

        const userBook = new Book(name.value, author.value,
          parseInt(pageCount.value, 10), readStatus);

        myLibrary.push(userBook);

        createBookVisual();
        counter += 1; // Accumulate counter to keep count of created books
        document.querySelector('form').reset();
        document.querySelector('.md-modal').classList.remove('md-show');
      });
    };

    showModalDialog();
    closeModalDialog();
    addBookToLibrary();
    pressBookButtons();
  };

  init();
}());
