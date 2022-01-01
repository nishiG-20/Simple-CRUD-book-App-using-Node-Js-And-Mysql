//By Calling This Function We can Open Our Home Page
homePage();

//Home page of the DOM
function homePage() {
    //Clear Dom
    $(".showTable").html("");

    //Upload image and Text To DOM
    $(".showTable").append(`<h1 class="text-center my-2">Welcome to the BookSite</h1>`);
    $(".showTable").append(`<img src="./image/bookPic.jpg" class="img-fluid center" alt="Table image">`);
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


//Navbar
showNavbar();

function showNavbar() {
    let navbarHTML = makeNavbar();
    $(".navbarr").html(navbarHTML);
}

function makeNavbar() {
    return `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
             <div class="container-fluid">
                 <a class="navbar-brand" href="#" onClick=homePage()>BookSite</a>
                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                     aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                 </button>
                 <div class="collapse navbar-collapse" id="navbarSupportedContent">
                     <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                         <li class="nav-item">
                             <a class="nav-link active" aria-current="page" href="#"" onclick="showTable()">Home</a>
                         </li>
                         <li class="nav-item">
                             <a class="nav-link" href="#" onclick="showTable('Yes')">New Arrivals</a>
                         </li>
                         <li class="nav-item">
                             <a class="nav-link" href="#" onclick="showTable('Children')">Children</a>
                         </li>
                         <li class="nav-item">
                             <a class="nav-link" href="#" onclick="showTable('Fiction')">Fiction</a>
                         </li>
                         <li class="nav-item">
                             <a class="nav-link" href="#"  onclick="showTable('Mystery')">Mystery</a>
                         </li>
                         <li class="nav-item">
                             <a class="nav-link" href="#"  onclick="showTable('Management')">Management</a>
                         </li>
                         <li class="nav-item">
                             <a class="nav-link" href="#" onclick="showTable()">All Books</a>
                         </li>
                     </ul>
                     <ul class="ms-auto navbar-nav mb-2 mb-lg-0">
                         <li class="nav-item">
                             <a class="nav-link" href="#" onclick="addNewBook()">New Book</a>
                         </li>
                     </ul>
                 </div>
             </div>
          </nav>`;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


let genreArr = ["Fiction", "Mystery", "Self Help", "Children", "Management"]
let langArr = ["English", "Latin", "Other", "French"]
let errorBookDetails = {}
let editIndex = -1
let editBookDetails = {}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


//Show Table
function showTable(val) {
    //Clear Dom
    $(".showTable").html("");
    makeTable(val);
}


//Make Table
function makeTable(val = "") {
    let tableHeading = `<div class="row my-4">
                          <div class="col border text-white bg-dark text-center crsr">Bookid</div>
                          <div class="col border text-white bg-dark text-center crsr">Title</div>
                          <div class="col border text-white bg-dark text-center crsr">Author</div>
                          <div class="col border text-white bg-dark text-center crsr">Language</div>
                          <div class="col border text-white bg-dark text-center crsr">Genre</div>
                          <div class="col border text-white bg-dark text-center crsr">Price</div>
                          <div class="col border text-white bg-dark text-center crsr">BestSeller</div>
                          <div class="col border text-white bg-dark text-center crsr">New Arrival</div>
                          <div class="col"></div>
                          <div class="col"></div>
                      </div>`;
    $(".showTable").append(tableHeading);

    let URL = ''
    if (val === 'Yes') {
        URL = `api/booksapp/books?newarrival=Yes`
    } else {
        URL = `api/booksapp/books/${val}`
    }

    //Table Body
    $(document).ready(function() {
        //Table Body
        $.ajax({
            method: "GET",
            url: URL,
            dataType: "json",
        }).done(function(data) {
            $.each(data, function(index, elem) {
                $(".showTable").append(`
                  <div class="row">
                       <div class="col border">
                           ${elem.bookid}
                       </div>
                      <div class="col border">
                      <a href="#" onclick="showBookDetailById(${elem.bookid})">${elem.name}</a>
                      </div>
                       <div class="col border">
                           ${elem.author}
                       </div>
                       <div class="col border">
                          ${elem.language}
                      </div>
                      <div class="col border">
                           ${elem.genre}
                      </div>
                      <div class="col border">
                           ${elem.price}
                      </div>
                      <div class="col border">
                           ${elem.bestseller}
                      </div>
                      <div class="col border">
                           ${elem.newarrival}
                      </div>
                      <div class="col">
                         <button type="button" class="btn btn-secondary" onclick="editBookInfo(${elem.bookid})">Edit</button>
                      </div>
                      <div class="col">
                          <button type="button" class="btn btn-danger" onclick=deleteBookDtl(${elem.bookid})>Delete</button>
                      </div>    
                    </div>
                  `);
            });
        });
    });
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


//Show Book Detail
function showBookDetailById(bookid) {
    //Clear Dom
    $(".showTable").html("");

    $(document).ready(function(){
        $.ajax({
            method: "GET",
            url: `/api/booksapp/books/bookid/${bookid}`,
            dataType: "json",
        }).done(function(done) {
            let bookDtl = done[0]
            $(".showTable").append(`
            <h3>Book:${bookDtl.name}</h3>
    
              <div class="row border">
                   <div class="col-2">
                      Author :
                   </div>
                   <div class="col">
                      ${bookDtl.author}
                   </div>
              </div>
    
            <div class="row border">
                   <div class="col-2">
                      Genre :
                   </div>
                   <div class="col">
                     ${bookDtl.genre}
                   </div>
            </div>
    
            <div class="row border">
                <div class="col-2">
                   Description :
                </div>
                <div class="col">
                  ${bookDtl.description}
                </div>
            </div>
    
            <div class="row border">
                <div class="col-2">
                  Blurb :
                </div>
                <div class="col">
                   ${bookDtl.blurb}
                </div>
            </div>
    
            <div class="row border">
                 <div class="col-2">
                    Review :
                  </div>
                  <div class="col">
                     ${bookDtl.review}
                  </div>
            </div>
    
            <div class="row border">
                <div class="col-2">
                    Price :
                  </div>
                  <div class="col">
                    ${bookDtl.price}
                  </div>
            </div>
    
            <div class="row border">
                  <div class="col-2">
                     Average Rating :
                  </div>
                  <div class="col">
                  ${bookDtl.avgrating}
                  </div>
            </div>
        `);
        })
    
    })
}


//----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


//Delete Book Detail
function deleteBookDtl(bookid) {
    $(document).ready(function() {
        $.ajax({
            method: "DELETE",
            url: `api/booksapp/books/deleteBook/${bookid}`,
            dataType: "text",
        }).done(function(data) {
           alert('Delete SucessFully..')
        })
    });
    showTable("")
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


//Edit Book Details
function editBookInfo(bookid) {
    editIndex = bookid
        //Get Request using Ajax Function 
    $.ajax({
        method: 'GET',
        url: `/api/booksapp/books/bookid/${bookid}`,
        dataType: "json",
    }).done(function(result) {
        let data = result[0]
        let { author, avgrating, bestseller, blurb, bookid, description, genre, language, name, newarrival, price, publisher, review, year } = data        
        editBookDetails.newBookName = name
        editBookDetails.newBookAuthor = author
        editBookDetails.newBookDescription = description
        editBookDetails.newBookBlurb = blurb
        editBookDetails.newBookReview = review
        editBookDetails.newBookPrice = price
        editBookDetails.newBookYear = year
        editBookDetails.newBookPublisher = publisher
        editBookDetails.newBookRating = avgrating
        editBookDetails.newBookGenre = genre
        editBookDetails.newBookLanguage = language
        editBookDetails.newBookBestSeller = bestseller
        editBookDetails.newBookArrival = newarrival
        addNewBook()
    })
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


//Add new Book
function addNewBook() {
    //Clear Dom
    $(".showTable").html("");

    //Create Book Form
    let bookForm = createBookForm()
    $(".showTable").append(bookForm);
}


//Create Book Form
function createBookForm() {

    //Book Edit Details
    let { newBookName, newBookAuthor, newBookDescription, newBookBlurb, newBookReview, newBookPrice, newBookYear, newBookPublisher, newBookRating, newBookGenre, newBookLanguage, newBookBestSeller, newBookArrival } = editBookDetails

    //Form Heading
    let formHeading = `<h3 class ="text-center"> Create New Book </h3>`
    let bookName = makeTextField('bookName', 'Name', errorBookDetails.BookName, newBookName)
    let bookAuthor = makeTextField('bookAuthor', 'Author', errorBookDetails.BookAuthor, newBookAuthor)
    let bookDescription = makeTextField('bookDescription', 'Description', errorBookDetails.BookDescription, newBookDescription)
    let bookBlurb = makeTextField('bookBlurb', 'Blurb', errorBookDetails.BookBlurb, newBookBlurb)
    let bookReview = makeTextField('bookReview', 'Review', errorBookDetails.BookReview, newBookReview)
    let bookPrice = makeTextField('bookPrice', 'price', errorBookDetails.BookPrice, newBookPrice)
    let bookYear = makeTextField('bookYear', 'Year', errorBookDetails.BookYear, newBookYear)
    let bookPublisher = makeTextField('bookPublisher', 'Publisher', errorBookDetails.BookPublisher, newBookPublisher)
    let bookRating = makeTextField('bookRating', 'Rating', errorBookDetails.BookRating, newBookRating)
    let bookGenre = makeDropDown('bookGenre', genreArr, 'Genre', 'Select Genre', errorBookDetails.BookGenre, newBookGenre)
    let bookLang = makeDropDown('bookLang', langArr, 'Language', 'Select Language', errorBookDetails.BookLanguage, newBookLanguage)
    let bestSeller = makeRadio("BestSeller", 'bestseller', errorBookDetails.isBestSeller, newBookBestSeller)
    let newArrival = makeRadio("New Arrival", 'newarrival', errorBookDetails.isNewarrival, newBookArrival)

    //Submit The Book
    let submitForm = `<div class="row mb-3 mx-3">
                       <div class="col-sm-2"></div>
                       <div class="col-sm-8 text-center">
                           <button class="btn btn-primary" onclick=submitform()>Add Book</button>
                       </div>
                   </div>`

    return `
             <div class="container my-4">
                ${formHeading}
                ${bookName}
                ${bookAuthor}
                ${bookDescription}
                ${bookBlurb }
                ${bookReview}
                ${bookPrice}
                ${bookYear}
                ${bookPublisher}
                ${bookRating}
                ${bookGenre}
                ${bookLang}
                ${bestSeller}
                ${newArrival}   
                ${submitForm}             
             </div>
           `
}


//Text field for Book Name,Author,Description,Blurb,Review,Price,Year,Publisher,Rating
function makeTextField(id, label, err = '', EditInfo = '') {

    //Err messages .if User enter Invalid Details
    let errStr = (err) ? `<span class="text-danger">${err}</span>` : ''
    let inValidClass = (err) ? 'is-invalid' : ''

    return `
           <div class="row mb-3 mx-3">
                <label for="${id}" class="col-sm-2 col-form-label">${label}</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control ${inValidClass}" value="${EditInfo}" id="${id}">
                    ${errStr}
                </div>
            </div>
         `
}

//DropDown For Language,Genre
function makeDropDown(id, arr, label, header, err = '', EditInfo = '') {

    //Err messages .if User enter Invalid Details
    let errStr = (err) ? `<span class="text-danger">${err}</span>` : ''
    let inValidClass = (err) ? 'is-invalid' : ''

    let DpDownHeader = `<option selected disabled>${header}</option>`

    //For Editable Purposes.
    let selectedOption = ''

    let DpDownBody = arr.map((elem) => {
        elem === EditInfo ? selectedOption = 'selected' : selectedOption = ''
        return `<option value="${elem}" ${selectedOption}>${elem}</option>`
    })

    return `
            <div class="row mb-3 mx-3">
                <label for="colFormLabel" class="col-sm-2 col-form-label">${label}</label>
                <div class="col-sm-8">
                    <select id="${id}" class="form-select ${inValidClass}">
                        ${DpDownHeader}
                        ${DpDownBody}
                    </select>
                    ${errStr}
                </div>
            </div>
          `
}

//Radio For Books Best Seller and New Arrival 
function makeRadio(label, name, err = '', EditInfo = '') {
    //Err messages .if User enter Invalid Details
    let errStr = (err) ? `<span class="text-danger">${err}</span>` : ''
    let inValidClass = (err) ? 'is-invalid' : ''

    //For Edit Radio Porposes
    let checkedYesRadio = ''
    let checkedNoRadio = ''

    EditInfo === 'Yes' ? checkedYesRadio = 'checked' : EditInfo === 'No' ? checkedNoRadio = 'checked' : ''

    return `
             <div class="row mb-3 mx-3">
                <label for="colFormLabel" class="col-sm-2 col-form-label">${label}</label>
                <div class="col-sm-8">
                    <div class="form-check form-check-inline col-sm-4">
                        <input class="form-check-input ${inValidClass}" type="radio" name="${name}" id="" value="Yes" ${checkedYesRadio}>
                        <label class="form-check-label" for="">Yes</label>
                    </div>

                    <div class="form-check form-check-inline col-sm-6">
                        <input class="form-check-input ${inValidClass}" type="radio" name="${name}" id="" value="No" ${checkedNoRadio}>
                        <label class="form-check-label" for="">No</label>
                    </div>
                    </br>
                    ${errStr}
                </div>
            </div>
        `
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------



//Submit Form
function submitform() {
    let BookName = $("#bookName").val()
    let BookAuthor = $("#bookAuthor").val()
    let BookDescription = $("#bookDescription").val()
    let BookBlurb = $("#bookBlurb").val()
    let BookReview = $("#bookReview").val()
    let BookPrice = $("#bookPrice").val()
    let BookYear = $("#bookYear").val()
    let BookPublisher = $("#bookPublisher").val()
    let BookRating = $("#bookRating").val()
    let BookGenre = $("#bookGenre").val()
    let BookLanguage = $("#bookLang").val()

    //Grab The Radio By Name of BestSeller
    let isBestSeller = ''
    isBestSeller = $("input[name='bestseller']:checked").val();

    //Grab The Radio By Name of (New Arrival Book)
    let isNewarrival = ''
    isNewarrival = $("input[name='newarrival']:checked").val();


    //For validation we are Creating new Bok
    let newBook = {
        newBookName: BookName,
        newBookAuthor: BookAuthor,
        newBookDescription: BookDescription,
        newBookBlurb: BookBlurb,
        newBookReview: BookReview,
        newBookPrice: BookPrice,
        newBookYear: BookYear,
        newBookPublisher: BookPublisher,
        newBookRating: BookRating,
        newBookGenre: BookGenre,
        newBookLanguage: BookLanguage,
        newBookBestSeller: isBestSeller,
        newBookArrival: isNewarrival
    }

    let { newBookName, newBookAuthor, newBookDescription, newBookBlurb, newBookReview, newBookPrice, newBookYear, newBookPublisher, newBookRating, newBookGenre, newBookLanguage, newBookBestSeller, newBookArrival } = newBook

    if (validateBookDetails(newBook)) {
        if (editIndex >= 0) {
            $.ajax({
                url: `/api/booksapp/books/editBook/${editIndex}`,
                data: { name: newBookName, author: newBookAuthor, year: newBookYear, genre: newBookGenre, newarrival: newBookArrival, bestseller: newBookBestSeller, language: newBookLanguage, publisher: newBookPublisher, price: newBookPrice, blurb: newBookBlurb, description: newBookDescription, avgrating: newBookRating, review: newBookReview },
                type: 'PUT',
                success: function(resp) {
                    alert('SuccessFully Edit.')
                },
                error: function(err) {
                    if(err.status==401){
                        alert('Error While Updating Data.')
                    }else if(err.status==404){
                        alert('Invalid Bookid...')
                    }
                }
            })
            showTable('')
        } else {
            //Add New Book in Database using Post Request
           
            $.ajax({
                url: '/api/booksapp/books/addBook',
                data:{ name: newBookName, author: newBookAuthor, year: newBookYear, genre: newBookGenre, newarrival: newBookArrival, bestseller: newBookBestSeller, language: newBookLanguage, publisher: newBookPublisher, price: newBookPrice, blurb: newBookBlurb, description: newBookDescription, avgrating: newBookRating, review: newBookReview },
                type: 'POST',
                success: function(resp) {
                    alert('SuccessFully Added.')
                    setTimeout(() => {
                        showTable('')
                    });
                    //location.reload(true); 
                },
                error: function(err) {
                    if(err.status==401){
                        alert('Error While Adding Data..')
                    }else if(err.status==404){
                        alert("Book Name Already Exit..");
                    }
                }
            })
        }
        editBookDetails = {}
        editIndex = -1
    } else {
        console.log("Fail!")
        editBookDetails = newBook
        addNewBook()
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------


function validateBookDetails(newBook) {

    //validate Book Name
    if (newBook.newBookName) {
        errorBookDetails.BookName = Number(newBook.newBookName) ? 'Plz Enter Valid Book Name' : ''
    } else {
        errorBookDetails.BookName = 'Book Name is Mandatory'
    }

    //validate Author Name
    if (newBook.newBookAuthor) {
        errorBookDetails.BookAuthor = Number(newBook.newBookAuthor) ? 'Plz Enter Valid Author Name' : ''
    } else {
        errorBookDetails.BookAuthor = 'Author Name is Mandatory'
    }

    errorBookDetails.BookDescription = newBook.newBookDescription ? '' : 'Book Description is Mandatory'

    errorBookDetails.BookBlurb = newBook.newBookBlurb ? '' : 'Book Blurb is Mandatory'

    errorBookDetails.BookReview = newBook.newBookReview ? '' : 'Book Review is Mandatory'

    //Validate Price
    if (newBook.newBookPrice) {
        errorBookDetails.BookPrice = !Number(newBook.newBookPrice) ? 'Plz Enter Valid Price' : ''
    } else {
        errorBookDetails.BookPrice = 'Price is Mandatory'
    }

    //Validate Year
    if (newBook.newBookYear) {
        errorBookDetails.BookYear = !Number(newBook.newBookYear) ? 'Plz Enter Valid Year' : ''
    } else {
        errorBookDetails.BookYear = 'Year is Mandatory'
    }

    //Validate Publisher
    if (newBook.newBookPublisher) {
        errorBookDetails.BookPublisher = Number(newBook.newBookPublisher) ? 'Plz Enter Valid Publisher' : ''
    } else {
        errorBookDetails.BookPublisher = 'Book Publisher is Mandatory'
    }

    //Validate BookRating
    if (newBook.newBookRating) {
        errorBookDetails.BookRating = !Number(newBook.newBookRating) ? 'Invalid Rating' : ''
    } else {
        errorBookDetails.BookRating = 'Book Rating is Mandatory'
    }

    errorBookDetails.BookGenre = newBook.newBookGenre ? '' : 'Book Genre is Mandatory'

    errorBookDetails.BookLanguage = newBook.newBookLanguage ? '' : 'Book Language is Mandatory'


    errorBookDetails.isBestSeller = newBook.newBookBestSeller ? '' : 'Plz Select BestSeller'

    errorBookDetails.isNewarrival = newBook.newBookArrival ? '' : 'Plz Select New Arrival'

    return !(errorBookDetails.BookName || errorBookDetails.BookAuthor || errorBookDetails.BookDescription || errorBookDetails.BookBlurb || errorBookDetails.BookReview || errorBookDetails.BookPrice || errorBookDetails.BookYear || errorBookDetails.BookPublisher || errorBookDetails.BookRating || errorBookDetails.BookGenre || errorBookDetails.BookLanguage || errorBookDetails.isBestSeller || errorBookDetails.isNewarrival)
}
