const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeList = [];

buildEngineer = () => {

  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please provide engineer's name."
    },
    {
      type: "input",
      name: "id",
      message: "Engineer's ID#?"
    },
    {
      type: "input",
      name: "email",
      message: "Engineer's email address?",
    },
    {
      type: "input",
      name: "github",
      message: "Engineer's GitHub username?"

    }
  ])
    .then(results => {
      results.role = "Engineer";

      const { name, id, email, github, role } = results;

      const newEmployee = new Engineer(name, id, email, github, role)

      employeeList.push(newEmployee);

      console.log(`\n${name} has been added!\n`);

      addAnother();
    });

}

buildIntern = () => {

  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please provide intern's name."
    },
    {
      type: "input",
      name: "id",
      message: "Intern's ID#?"
    },
    {
      type: "input",
      name: "email",
      message: "Intern's email address?",
    },
    {
      type: "input",
      name: "school",
      message: "Intern's school?"

    }
  ])
    .then(results => {
      results.role = "Intern";

      const { name, id, email, school, role } = results;

      const newEmployee = new Intern(name, id, email, school, role)

      employeeList.push(newEmployee);

      console.log(`\n${name} has been added!\n`);

      addAnother();

    });

}

addAnother = () => {
  inquirer.prompt({
    type: "list",
    name: "addAnother",
    message: "Would you like to add another employee?",
    choices: [
      'YES',
      "NO"
    ]
  })
    .then(choice => {
      if (choice.addAnother === 'YES') {
        buildEmployeeList();;
      } else {
        exitQuestions();
      }
    })
};

buildEmployeeList = () => {

  inquirer.prompt({
    type: "list",
    name: "employeeType",
    message: "Choose employee type",
    choices: [
      'Engineer',
      'Intern'
    ]
  })
    .then(choice => {
      if (choice.employeeType === 'Engineer') {
        buildEngineer();
      } else {
        buildIntern();
      }
    })

};


init = () => {
  console.log("\nWelcome to the employee page builder!");
  console.log("You're just a few questions away from your new employee summary page.\n");

  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please provide Manager's name."
    },
    {
      type: "input",
      name: "id",
      message: "Manager's ID#?"
    },
    {
      type: "input",
      name: "email",
      message: "Manager's email address?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "This team's office number?"

    }
  ])
    .then(results => {
      results.role = "Manager";

      const { name, id, email, officeNumber, role } = results;

      const newEmployee = new Manager(name, id, email, officeNumber, role)

      employeeList.push(newEmployee);

      console.log("\nGreat! Now let's start adding employees! \n");

      buildEmployeeList();

    });

}

exitQuestions = () => {

  render(employeeList);

  fs.writeFile(outputPath, render(employeeList), function (err) {
    if (err) return console.log(err);

  });
}

init()
