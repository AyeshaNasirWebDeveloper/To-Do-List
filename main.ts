import inquirer from "inquirer";
import chalk from "chalk";

let toDoList: string[] = [];
console.log(chalk.yellowBright.bold("\n \t Welcome To Ayesha Nasir's \n \t To-Do List Program \n"));

let conditions = true;

let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                messgae: chalk.cyanBright("Select an option you want to do: "),
                choices: ["Add Task", "Delete Task", "Update Task", "View To-Do List", "Exit"]
            }
        ])
        if (option.choice === "Add Task") {
            await addTask();
        } else if (option.choice === "Delete Task") {
            await deleteTask();
        } else if (option.choice === "Update Task") {
            await updateTask()
        } else if (option.choice === "View To-Do List") {
            await viewTask();
        } else if (option.choice === "Exit") {
            conditions = false;
        }
    }
}
// Add Task Function
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your New Task: "
        }
    ])
    toDoList.push(newTask.task);
    console.log(chalk.magentaBright(`\n Your ${newTask.task} task added Successfully!`))
}

// View To-Don List Function
let viewTask = async () => {
    console.log(chalk.cyanBright("\n Your To-Do List: \n"));
    toDoList.forEach((task, index) => {
        console.log(chalk.green(`${index + 1}: ${task}`));
        
    })
}

// Delete Task Function
let deleteTask = async() => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.cyanBright("Enter the Index Number of the task you want to delete:")
        }
    ])
    let deletedTask = toDoList.splice(taskIndex.index-1, 1);
    console.log(chalk.green(`\n ${deletedTask} task has been deleted successfully from your To-Do list`));
}

// Update Task Function
let updateTask = async () => {
    await viewTask();
    let updatedIndex = await inquirer.prompt([
        {
            name: "index",
            type: "type",
            message: chalk.cyanBright("Enter the Index Number of the task you want to update:")
        },
        {
            name: "task",
            type: "input",
            message: chalk.magentaBright("Enter your new Task:"),
        }
    ]);
    toDoList[updatedIndex.index-1] = updatedIndex.task
    console.log(chalk.green(`\n Task at Index Number ${updatedIndex.index-1} updated Successfully!`));
}


main();