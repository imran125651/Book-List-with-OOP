// Get the UI elements
let form = document.querySelector("#book-form");


 

//class Book
class Book{
    constructor(title, author, isbn){
        this.title = title, 
        this.author = author, 
        this.isbn = isbn
    }
}

class UI{
    constructor() {
        
    }
    addToBookList(book){
        let list = document.querySelector("#book-list");
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);

        console.log(row);
    }


    showAlert(message, className) {
        let errrDiv = document.createElement("div");
        errrDiv.appendChild(document.createTextNode(message));
        errrDiv.className = `alert ${className}`;

        let container = document.querySelector(".container");
        container.insertBefore(errrDiv, form);

        setTimeout(()=>{
            errrDiv.remove();
        }, 3000);
       


        console.log(container);
    }
}



// Add Event Listener
form.addEventListener("submit", newBook);





///function
function newBook(e){

    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;

    let ui = new UI();

    if(title === "" || author === "" || isbn === ""){
        ui.showAlert("Please fill all the fields.", "error");
    }
    else{
        let book = new Book(title, author, isbn);

        ui.addToBookList(book);
        ui.showAlert("Book is added successfully", "success");
        clearFields();
    }    

    e.preventDefault();    
}


function clearFields(){
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
}