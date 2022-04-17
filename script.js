function getAndUpdate() {
    console.log("updating list..");
    tit = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    if (localStorage.getItem("itemsJson") == null) {
      itemJsonArray = [];
      itemJsonArray.push([tit, desc]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } 
    else {
      itemJsonArrayStr = localStorage.getItem("itemsJson");
      itemJsonArray = JSON.parse(itemJsonArrayStr);
      itemJsonArray.push([tit, desc]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    update();
  }
  function update() 
  {
    if (localStorage.getItem("itemsJson") == null) {
      itemJsonArray = [];
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } 
    else {
      itemJsonArrayStr = localStorage.getItem("itemsJson");
      itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // POPULATE TABLE
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
      str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td id="unstrike">${element[1]} </td>
            <td><button class="btn btn-sm btn-primary" onclick = "deleted(${index})"> Undo </button> </td>
            <td class="checkthrough"> <input type="checkbox" id="check" onclick = "done(${index})">  </td>
        </tr>`;
    });
    tableBody.innerHTML = str;
}

    add = document.getElementById("add");
    add.addEventListener("click", getAndUpdate);
    update();
    function deleted(itemIndex) {
      console.log("delete", itemIndex);
      itemJsonArrayStr = localStorage.getItem("itemsJson");
      itemJsonArray = JSON.parse(itemJsonArrayStr);
      // Delete Item Index Element form Array
      itemJsonArray.splice(itemIndex, 1);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
      update();
    }

    function clearstr() {

        if (confirm("Do you really want to clear?! "))
        {
            localStorage.clear();
            console.log("Clearing the storage");
            update();
        }
    }
