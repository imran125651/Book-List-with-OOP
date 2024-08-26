// Get the UI elements
let form = document.querySelector("#book-form");
let booklist = document.querySelector("#book-list");


 

//class Book
class Book{
    constructor(title, author, isbn){
        this.title = title, 
        this.author = author, 
        this.isbn = isbn
    }
}

class UI{
    static addToBookList(book){
        let list = document.querySelector("#book-list");
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>  
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);

    }

    static removeBookFromBookList(target){
        if(target.hasAttribute("href")){
            target.parentElement.parentElement.remove(); 
            UI.showAlert("Book Removed!", "success");
        }
    }


    static showAlert(message, className) {
        let errrDiv = document.createElement("div");
        errrDiv.appendChild(document.createTextNode(message));
        errrDiv.className = `alert ${className}`;

        let container = document.querySelector(".container");
        container.insertBefore(errrDiv, form);

        setTimeout(()=>{
            errrDiv.remove();
        }, 3000);
       
    }
}



// Add Event Listener

document.addEventListener("DOMContentLoaded", Store.displayBooks());
form.addEventListener("submit", newBook);
booklist.addEventListener("click", removeBook);





///function
function newBook(e){

    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;


    if(title === "" || author === "" || isbn === ""){
        UI.showAlert("Please fill all the fields.", "error");
    }
    else{
        let book = new Book(title, author, isbn);
        

        UI.addToBookList(book);
        UI.showAlert("Book is added successfully", "success");

        
        Store.addNewBook(book);
        clearFields();
    }    

    e.preventDefault();    
}


function removeBook(e){
    UI.removeBookFromBookList(e.target);

    e.preventDefault();
}


function clearFields(){
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
}


class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }


    static addNewBook(book){
        let allBooks = Store.getBooks();
        allBooks.push(book);
        localStorage.setItem("books", JSON.stringify(allBooks));
    }


    static displayBooks(){
        console.log("display books");
    }
}