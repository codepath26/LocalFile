let amount = document.getElementById("ExpenseAmount");
  let description = document.getElementById("Discription");
  let category = document.getElementById("Category");
  let addExpense = document.getElementById("add-items");
  let items = document.getElementById("items");

  addExpense.addEventListener("submit", addData);
  items.addEventListener("click", modified);

  // Retrieve data from local storage and populate the UI list on page load
  window.addEventListener("load", () => {
    const data = JSON.parse(localStorage.getItem("expenseData")) || [];
    data.forEach((item) => createListItem(item));
  });

  function addData(e) {
    e.preventDefault();
    console.log(amount.value, description.value, category.value);
    let itemData = {
      amount: amount.value,
      description: description.value,
      category: category.value,
    };
    createListItem(itemData);

    // Save data to local storage
    let data = JSON.parse(localStorage.getItem("expenseData")) || [];
    data.push(itemData);
    localStorage.setItem("expenseData", JSON.stringify(data));

    // Clear input fields after adding the item
    amount.value = "";
    description.value = "";
    category.value = "";
  }

  function createListItem(itemData) {
    let item = document.createElement("li");
    item.classList = "expense-list w-75";
    item.appendChild(
      document.createTextNode(
        `Amount: ${itemData.amount}, Description: ${itemData.description}, Category: ${itemData.category}`
      )
    );
    let deleteButton = document.createElement("button");
    deleteButton.classList = "btn btn-sm btn-danger m-1 float-end delete";
    deleteButton.appendChild(document.createTextNode("Delete"));

    let editButton = document.createElement("button");
    editButton.classList = "btn btn-sm btn-success m-1 float-end edit";
    editButton.appendChild(document.createTextNode("Edit"));

    item.appendChild(editButton);
    item.appendChild(deleteButton);
    items.appendChild(item);
  }

  // Delete and Edit Button functionality;
  function modified(e) {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
      let li = e.target.parentElement;
      items.removeChild(li);

      // Update local storage after removing the item
      let data = JSON.parse(localStorage.getItem("expenseData")) || [];
      data = data.filter((item) => {
        return item.amount !== li.textContent.split(",")[0].replace("Amount:", "").trim();
      });
      localStorage.setItem("expenseData", JSON.stringify(data));
    }
    if (e.target.classList.contains("edit")) {
      let li = e.target.parentElement;
      let dataString = li.textContent.trim();
      let [amountValue, descriptionValue, categoryValue] = dataString
        .replace(/Amount:|Description:|Category:/g, "")
        .split(",");

      amount.value = amountValue.trim();
      description.value = descriptionValue.trim();
      category.value = categoryValue.trim();

      items.removeChild(li);
    }
  }
