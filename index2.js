// getting the Data From DOM
let expenses = [];
let amount = document.getElementById("ExpenseAmount");

let description = document.getElementById("Description");
let category = document.getElementById("Category");
let addExpense = document.getElementById("add-items");
let items = document.getElementById("items");

addExpense.addEventListener("submit", addData);
items.addEventListener("click", modified);
window.addEventListener("load", getdataFromLocalStorage);
function getdataFromLocalStorage() {
  axios
    .get(
      "https://crudcrud.com/api/cc9df701b8d64374a616416bea1cc085/expenseData"
    )
    .then((response) => {

      response.data.forEach((obj) => {
     
        DisplayData(obj);
      });
    })
    .catch((err) => console.log(err));

}
function addData(e) {
  e.preventDefault();
  let item = document.createElement("li");
  item.classList.add("list-group-item");
  let obj = {
    Amount: amount.value,
    Description: description.value,
    Category: category.value,
  };
  expenses.push(obj);

  axios
    .post(
      "https://crudcrud.com/api/cc9df701b8d64374a616416bea1cc085/expenseData",
      obj
    )
    .then((response) => {
      console.log(response.data);
      item.appendChild(
        document.createTextNode(
          `Amount :${response.data.Amount}, Description :${response.data.Description}, Category : ${response.data.Category}`
        )
      );
    })
    .catch((err) => console.log(err));
  let deletButton = document.createElement("button");
  deletButton.classList = "btn btn-sm btn-danger mx-1 float-end delete";
  deletButton.appendChild(document.createTextNode("Delete"));
  let editButton = document.createElement("button");
  editButton.appendChild(document.createTextNode("Edit"));
  editButton.classList = "btn btn-sm btn-success mx-1 float-end edit";
  item.appendChild(editButton);
  item.appendChild(deletButton);
  items.appendChild(item);
  amount.value = "";
  description.value = "";
  category.value = "Movies";
}
// Delete Button functionality;
function modified(e) {
  e.preventDefault();
  
  if (e.target.classList.contains("delete")) {
    
    let li = e.target.parentElement;
    let index = Array.from(li.parentNode.children).indexOf(li);

    if (index !== -1) {
      expenses.splice(index, 1);
    }
    addlocal();
    items.removeChild(li);
  }
  if (e.target.classList.contains("edit")) {
    let li = e.target.parentElement;
    let index = Array.from(li.parentNode.children).indexOf(li);

    let expense = expenses[index];
    amount.value = expense.Amount;
    description.value = expense.Description;
    category.value = expense.Category;
    if (index !== -1) {
      expenses.splice(index, 1);
    }
    addlocal();
    items.removeChild(li);
  }
}

// use to display the data from the array
function DisplayData(obj) {
  console.log(obj.Amount);
  // items.innerHTML = "";

  let item = document.createElement("li");
  item.classList.add("list-group-item");
  item.appendChild(
    document.createTextNode(
      // `Amount : ${expense.Amount}, Description :${expense.Description}, Category : ${expense.Category}`
      // console.log("hey")
      `Amount :${obj.Amount}, Description :${obj.Description}, Category : ${obj.Category}`
    )
  );
  let deletButton = document.createElement("button");
  deletButton.classList = "btn btn-danger btn-sm float-end delete mx-1";
  deletButton.appendChild(document.createTextNode("Delete"));

  let editButton = document.createElement("button");
  editButton.classList = "btn btn-success btn-sm mx-1 edit float-end";
  editButton.appendChild(document.createTextNode("Edit"));
  item.appendChild(editButton);
  item.appendChild(deletButton);
  items.appendChild(item);
}
// expenses.forEach((expense)=>{
//   let item = document.createElement('li');
//   item.classList.add("list-group-item");
//   item.appendChild(
//     document.createTextNode(
//       // `Amount : ${expense.Amount}, Description :${expense.Description}, Category : ${expense.Category}`
//       // console.log("hey")
//       `Amount :${obj.Amount}, Description :${obj.Description}, Category : ${obj.Category}`
//     )
//   )
//   let deletButton = document.createElement('button');
//   deletButton.classList = "btn btn-danger btn-sm float-end delete mx-1";
//   deletButton.appendChild(document.createTextNode("Delete"));

//   let editButton = document.createElement('button');
//   editButton.classList = "btn btn-success btn-sm mx-1 edit float-end"
//   editButton.appendChild(document.createTextNode('Edit'));
//   item.appendChild(editButton);
//   item.appendChild(deletButton);
//   items.appendChild(item);
// });

// }

// adding to local storage
function addlocal() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// function addlocal (){

// }
