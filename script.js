const myLibrary = [];

const Book = (name, author, pageAmount, readStatus) => {
  this.name = name;
  this.author = author;
  this.pageAmount = pageAmount;
  this.readStatus = readStatus;
};

const addBookToLibrary = () => {
  const add = new Book();
};

const showModalDialog = () => {
  document.querySelector('.create-book').addEventListener('click', () => {
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

const main = () => {
  showModalDialog();
  closeModalDialog();
};

main();
