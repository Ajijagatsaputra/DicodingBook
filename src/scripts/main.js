function main() {

  const baseUrl = 'https://books-api.dicoding.dev';
  const getBook = () => {
    //membuat instance dari XMLHTTPRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response succes dan eror
    xhr.onload = function(){
      const responseJson = JSON.parse(this.responseText);

      if(responseJson.error){
        showResponseMessage(responseJson.message);
      }else{
        renderAllBooks(responseJson.books);
      }
    };
    xhr.onerror = function(){
      showResponseMessage();
    };

    //Membuat GET request dan menetapkan target URL
    xhr.open('GET', 'https://books-api.dicoding.dev/list');

    //Mengirimkan request
    xhr.send();
  };


  const insertBook = (book) => {
    // Membuat instance dari XMLHTTPRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response sukses dan eror
    xhr.onload = function(){
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();
    };

    xhr.error = function(){
      showResponseMessage();
    };

    // Membuat POST request dan menetapkan target URL 
    xhr.open('POST','${baseUrl}/add');

    // Menetapkan properti content-type dan X-Auth-Token pada Header request
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    //Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
    xhr.send(JSON.stringify(book));
  };

  const updateBook = (book) => {
    // Membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // menetapkan callback jika response sukses dan error
    xhr.onload = function(){
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();
    };

    xhr.onerror = function(){
      showResponseMessage();
    };

    // Membuat PUT request dan menetapkan target URL 
    xhr.open('PUT', 'https://books-api.dicoding.dev/edit');

    // Menetapkan properti content-type dan x-auth-token pada header request
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    //Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
    xhr.send(JSON.stringify(book));
  };

  const removeBook = (bookId) => {
    // tuliskan kode di sini!
  };


  
  
  
  
  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.forEach(book => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        
        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {

    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };
      
      insertBook(book);
    });

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;