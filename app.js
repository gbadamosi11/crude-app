var selectedRow=null;
class Employee{
    constructor(title, author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class UI{

    static displayemployee(){
       const StoreEmp=[
           {
               title: 'Book One',
               author: 'John Doe',
               isbn: '32432432'    
           },
            {
               title: 'Book Two',
               author: 'John Doe',
               isbn: '32432432'    
           }
       ];
       const employee= StoreEmp;

       employee.forEach((book)=> UI.AddEmployeeToList(book));
   }


    static AddEmployeeToList(employee){
        const list=document.querySelector("#employee-list");
        const row=document.createElement("tr");
        row.innerHTML=`
        <td>${employee.title}</td>
        <td>${employee.author}</td>
        <td>${employee.isbn}</td>
        <td><a href="#" class="btn btn-success btn-sm edit">Edit</a></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `
        list.appendChild(row);
    }

    static editEmployeeToList(employee){
        selectedRow.children[0].textContent= employee.title;
        selectedRow.children[1].textContent= employee.author;
        selectedRow.children[2].textContent= employee.isbn;


        document.querySelector(".sumbit_btn").value="Submit";
            document.querySelector(".sumbit_btn").classList="btn btn-success btn-block add-btn sumbit_btn";
    }
    static deleteEmpyee(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();
            UI.showAlert("Employee deleted", "danger");
        }else{
            null;
        }
    }

// popunjavanje input polja sa podacima iz zeljenog reda
    static editEmployee(el){
        if(el.classList.contains('edit')){
            selectedRow= el.parentElement.parentElement;
            document.querySelector("#title").value= selectedRow.children[0].textContent;
            document.querySelector("#author").value= selectedRow.children[1].textContent;
            document.querySelector("#isbn").value= selectedRow.children[2].textContent;

            document.querySelector(".sumbit_btn").value="Update";
            document.querySelector(".sumbit_btn").classList="btn btn-primary btn-block add-btn sumbit_btn";
        }else{null}
    }

// message toast
static showAlert(message, className) {
   const div = document.createElement('div');
   div.className = `alert alert-${className}`;
   div.appendChild(document.createTextNode(message));
   const container = document.querySelector('.container');
   const main = document.querySelector('.main');
   container.insertBefore(div, main);
   div.style.position = "absolute";
   div.style.top = "30px";
   div.style.left = "90%";
   setTimeout(() => document.querySelector('.alert').remove(), 3000);
 }

// reset fields
 static clearFields() {
   document.querySelector('#title').value = '';
   document.querySelector('#author').value = '';
   document.querySelector('#isbn').value = '';
 }



}
//  end of UI CLASS

document.addEventListener('DOMContentLoaded', UI.displayemployee);

document.querySelector('#employee-form').addEventListener('submit', (e) => {
 e.preventDefault();

 const title = document.querySelector('#title').value;
 const author = document.querySelector('#author').value;
 const isbn = document.querySelector('#isbn').value;

 if(title === '' || author === '' || isbn === '') {
   UI.showAlert('Please fill in all fields', 'danger');
 } else {
   const employee = new Employee(title, author, isbn);

 if (selectedRow == null) {
   UI.AddEmployeeToList(employee);
   selectedRow = null;
   UI.showAlert('Employee Added', 'success');
 } else {
   UI.editEmployeeToList(employee);
   selectedRow = null;
   UI.showAlert('Employee Info Edited', 'info');
 }
   UI.clearFields();
 }
});

document.querySelector('#employee-list').addEventListener('click', (e) => {
 UI.deleteEmpyee(e.target);
 UI.editEmployee(e.target);
});