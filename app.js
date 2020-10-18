let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeed_db"
})
connection.connect(function(err){
    if(err) throw err;
    console.log("connected");
    StartHere();
});
function StartHere(){
    inquirer.prompt({
        name:"Start",
        type: "list",
        message: "Would you like to do??",
        choices:["Add", "View", "Update","Delete", "Quit"]
    }).then(function(answer){
        switch(answer.Start){
            case "Add":
                add();
                break;
            case "View":
                view();
                break;
            case "Update":
                update();
                break;
            case "Delete":
                deleteHere();
                break;    
            default:
                process.exit(1);
                break;}
    })
}

function add(){
    inquirer.prompt({
        name: "AddHere",
        type: "list",
        message: "What would you like to add?",
        choices:["Department", "Role", "Employee", "Back"],
    }).then(function(answer){
        switch(answer.AddHere){
            case "Department":
               addD();
                break;
            case "Role":
               addR();
                break;
            case "Employee":
                addE();
                break;
            default:
                StartHere();
                break;}
    })
}

function view(){
    inquirer.prompt({
        name: "ViewS",
        type: "list",
        message: "Would you like to view?",
        choices:["Departments", "Roles", "Employees", "Back"]
    }).then(function(answer){
        switch (answer.ViewS){
            case "Departments":
               viewD();
                break;
            case "Roles":
              viewR();
                break;
            case "Employees":
               viewE();
                break;
            default:
                StartHere(); 
                break;}
    })
}

function addD(){
   let dQuestions = [
        {type: "input",
         message: "What is the name of the department?",
         name: "dName"}];

    inquirer.prompt(dQuestions).then(function(newD) {
        connection.query("Insert into department set ?", 
        {Department_Name: newD.dName,
        },
        function(err){
            if(err)throw err;
            console.log("success");
            StartHere();
        }
        );
        
    });
}
function addR() {
    rQuestions = [
        {type: "input",
         message: "enter the title of the role",
         name: "title"
        },
        {type: "input",
         message: "enter the salary of the role",
         name: "salary",
            validate: function (value) {
                let valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number value";
            },
            filter: Number,
        },
        {type: "input",
         message: "What is the department id?",
         name: "dID",
            validate: function(Dvalue){
                let valid = !isNaN(parseFloat(Dvalue));
                return valid || "enter a numberical value";
            }
        }
    ];
    inquirer.prompt(rQuestions).then(function (newR) {
        connection.query("Insert to role SET ?",
            {title: newR.title,
             salary: newR.salary,
             department_id: newR.dID
            },
            function (err) {
                if (err) throw err;
                console.log("successful");
                add();
            });
    });
}

function addE(){
    let empQ = [
        {type:"input",
         name: "firstName",
         message: "What is the first name of the employee?"
        },
        { type:"input",
          name: "lastName",
          message:"What is the last name of the employee?"
        },
        {type:"input",
         name:"role",
         message: "enter the role ID of the employee?",
            validate: function (value) {
            let valid = !isNaN(parseFloat(value));
            return valid || "enter a number value";   
            filter: Number
         }
        },    
        { type:"input",
          name: "manager",
          message:"Please enter the manager_ID of the employees manager.",
            validate: function (value) {
            let valid = !isNaN(parseFloat(value));
            return valid || "enter a number value";
            filter: Number
            }
        },
    ];
    inquirer.prompt(empQ).then(function(employee){
        connection.query("INSERT INTO employee SET ?", 
            {first_name: employee.firstName,
             last_name: employee.lastName,
             role_id: employee.role,
             manager_id: employee.manager,
            },
            function (err) {
                if (err) throw err;
                console.log("successful");
                console.log('\n')
                add();
            })    
        }
    );
};

function viewD(){
    connection.query("SELECT * FROM department ", function(err, res){
        if(err) throw err;
        console.table(res);
        view();
    })
}

function viewRoles(){
    connection.query("SELECT * FROM role ", function(err, res){
        if(err) throw err;
        console.table(res);
        view();
    })

}

function viewE(){
    connection.query("Select e.first_name, e.last_name, r.title, d.Department_Name, r.salary, e.manager_id From employee e inner join role r ON e.role_id = r.id Inner join department d ON r.department_id = d.id;",
     function (err, res) {
    if(err) throw err;
        console.table(res);
        view();
    })
}

function update(){
    let getE = [
        {type: "input",
         message: "Enter the Employee ID you wish to update the role for.",
         name:"empID",
            validate: function (value) {
                let valid = !isNaN(parseFloat(value));
                return valid || " enter a number value";
                filter: Number
            }
        },
        {type: "input",
         message: "Enter the role ID you wish to change on the employee.",
         name: "empRole",
            validate: function (value) {
                let valid = !isNaN(parseFloat(value));
                return valid || " enter a number value";
                filter: Number
            }
        }
    ];

    inquirer.prompt(getE).then(function(name){
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [name.empRole, name.empID],function (err, result) {
            if (err) { console.log("Could not find ID or another issue exists...") }else
            console.log("updated role of employee with ID of" + name.empID);
            StartHere();
        })
    })
}

function deleteHere(){
    let getE = [
        {type: "input",
         message: "enter the Employee ID you want to delete",
         name: "empID",
            validate: function (value) {
                let valid = !isNaN(parseFloat(value));
                return valid || "Please enter a numerical value";
                filter: Number
            }
        },
    ];
        inquirer.prompt(getE).then(function (name) {
        connection.query("Delete employee where id = ?", name.empID, function(err, result){
            if(err){console.log("Could not find ID or another issue exists.")};
            console.log("deleted employee with ID of" + name.empID);
            StartHere();
        })
    })
}