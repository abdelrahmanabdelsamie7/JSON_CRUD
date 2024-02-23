let Name = document.getElementById("Name");
let Position = document.getElementById("Position");
let inputSalary = document.querySelectorAll("#inputSalary input");
let Department = document.getElementById("Department");
let Counter = document.getElementById("Counter");
let CreateBtn = document.getElementById("CreateBtn");
let tbody = document.getElementById("tbody");
let deleteBtn = document.getElementById("deleteBtn");
let spanCounter = document.getElementById("spanCounter");
let modal = document.getElementById("modal");
let hNoEmployee = document.getElementById("hNoEmployee") ; 

let mood = "create";
let GlobalId;
//Array of Employees
if (localStorage.Employees == null) {
  Employees = [];
} else {
  Employees = JSON.parse(localStorage.Employees);
}

// Numbers Of Employees
let EmployeeNumber = () => {
  spanCounter.innerHTML = Employees.length;
};
EmployeeNumber();

// Function getSalary()
let getSalary = () => {
  let gross = inputSalary[0].value;
  let tax = inputSalary[1].value;
  let trancost = inputSalary[2].value;
  let bonous = inputSalary[3].value;

  let TaxCost = +gross * (tax / 100);
  let salaryAfterTax = +gross - +TaxCost;
  let salaryAfterTranCost = salaryAfterTax - +trancost;
  let netSalary = salaryAfterTranCost + +bonous;
  inputSalary[4].value = Math.round(+netSalary);
};
for (let i = 0; i < inputSalary.length; i++) {
  inputSalary[i].addEventListener("keyup", getSalary);
}

// Check If Empty Employees
let checkIfEmptyEmployees = () => {
  if (tbody.childElementCount == 0 || localStorage.length == 0) {
    deleteBtn.classList.add("none");
  } else {
    deleteBtn.classList.remove("none");
  }
};

// Create Employees
let CreateEmployee = () => {
  let newEmployee = {
    EmpName: Name.value,
    EmpPosition: Position.value,
    Gross: inputSalary[0].value,
    Tax: inputSalary[1].value,
    TranCost: inputSalary[2].value,
    Bonous: inputSalary[3].value,
    Total: inputSalary[4].value,
    Department: Department.value,
    Counter: Counter.value,
  };
  if(newEmployee.EmpName =="" || newEmployee.EmpPosition=="" || newEmployee.Gross =="" || 
     newEmployee.Tax==""||newEmployee.TranCost==""||newEmployee.Bonous==""||newEmployee.Total=="" || newEmployee.Department =="" ){  
    hNoEmployee.classList.remove("none") ; 
  }
  else
  {
      if (mood == "create") {
        if (newEmployee.Counter <= 1) {
          Employees.push(newEmployee);
        } else {
          for (let x = 0; x < newEmployee.Counter; x++) {
            Employees.push(newEmployee);
          }
        }
      } else {
        Employees[GlobalId] = newEmployee;
        mood = "create";
        Counter.classList.remove("none");
        CreateBtn.innerHTML = `Create Employee `;
        CreateBtn.classList.replace("btn-warning", "btn-info");
      }
  }
  
  localStorage.setItem("Employees", JSON.stringify(Employees));
  ResetFun();
  showData();
  checkIfEmptyEmployees();
  EmployeeNumber();
};

CreateBtn.addEventListener("click", CreateEmployee);

//Reset Function
let ResetFun = () => {
  Name.value = "";
  Position.value = "";
  inputSalary[0].value = "";
  inputSalary[1].value = "";
  inputSalary[2].value = "";
  inputSalary[3].value = "";
  inputSalary[4].value = "";
  Department.value = "";
  Counter.value = "";
};

// Sow Data in TableBody
let showData = () => {
  TableRow = "";
  for (let i = 0; i < Employees.length; i++) {
    TableRow += `
   <tr>
    <td>${i + 1}</td>
    <td>${Employees[i].EmpName}</td>
    <td><i onclick="showOneItem(${i})" class="fa-solid fa-eye text-primary"></i></td>
    <td><i onclick="deleteOneItem(${i})" class="fa-solid fa-trash text-danger"></i></td>
    <td><i onclick="editOneItem(${i})" class="fa-solid fa-pen-to-square text-warning"></i></td>
  </tr>
`;
  }
  tbody.innerHTML = TableRow;
};
showData();
checkIfEmptyEmployees();
//Delete All Employees
let deleteAll = () => {
  if (confirm("Are You Sure You Need To Delete All Employees ? ")) {
    localStorage.clear();
    Employees.splice(0);
  }
  EmployeeNumber();
  checkIfEmptyEmployees();
  showData();
};

deleteBtn.addEventListener("click", deleteAll);
//Delete One Item

let deleteOneItem = (i) => {
  Employees.splice(i, 1);
  localStorage.Employees = JSON.stringify(Employees);
  showData();
  EmployeeNumber();
};

let editOneItem = (i) => {
  mood = "uptdate";
  GlobalId = i;
  Name.value = Employees[i].EmpName;
  Position.value = Employees[i].EmpPosition;
  inputSalary[0].value = Employees[i].Gross;
  inputSalary[1].value = Employees[i].Tax;
  inputSalary[2].value = Employees[i].TranCost;
  inputSalary[3].value = Employees[i].Bonous;
  inputSalary[4].value = Employees[i].Total;
  Department.value = Employees[i].Department;
  Counter.classList.add("none");
  CreateBtn.innerHTML = `Update Employee ${i + 1}`;
  CreateBtn.classList.replace("btn-info", "btn-warning");
};

let showOneItem = (i) => {
  modal.style.display = "flex";
  modal.innerHTML = `
        <div class="col-md-5">
        <div class="card">
          <div class="card-header">
             ${Employees[i].EmpName}
             <i onclick="closeModal()" class="fa-solid fa-xmark x-mark"></i>
          </div>
          <div class="card-body">
            <h5> Position :  ${Employees[i].EmpPosition}</h5> 
            <hr/>
            <h5> Gross :  ${Employees[i].Gross}</h5>
            <hr/>
            <h5> Tax :  ${Employees[i].Tax}% </h5>
            <hr/>
            <h5> TranCost :  ${Employees[i].TranCost}</h5>
            <hr/>
            <h5> Bonous :  ${Employees[i].Bonous}</h5>
            <hr/>
            <h5> Total :  ${Employees[i].Total}</h5>
            <hr/>
            <h5> Department :  ${Employees[i].Department}</h5>
            <hr/>
            <h5> Counter :  ${Employees[i].Counter}</h5>
            <hr/>
          </div>
        </div>
      </div>
  `;
};
let closeModal = () =>
{
  modal.style.display ="none" ; 
} 
modal.addEventListener("click" , closeModal)  ; 