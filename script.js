(function () {
  const myLibrary = [];

  function Book(name, author, pageCount, readStatus) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
  }

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
      const [name, author, pageCount] = document.querySelectorAll('input');
      return (name.value === '' || author.value === '' || pageCount.value === '');
    };

    const pageCountisInvalid = () => {
      const pageCount = document.querySelector('#page-count').value;
      // https://stackoverflow.com/questions/46677774/eslint-unexpected-use-of-isnan
      return (Number.isNaN(parseInt(pageCount, 10))
            || parseInt(pageCount, 10) < 10);
    };

    const createBookVisual = () => {
      myLibrary.forEach( (element) => {

      }
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
        document.querySelector('form').reset();
        document.querySelector('.md-modal').classList.remove('md-show');
      });
    };

    showModalDialog();
    closeModalDialog();
    addBookToLibrary();
  };

  init();
}());
