import { Task } from './task.model.js'

export class TaskService {
    tasks = [];

    constructor(Task) { }

    addTask(title, content) {
        const tasks = this.tasks;
        tasks.push(new Task(title, content))
        this.tasks = tasks;
    }

    changeTaskStatus(key) {
        const tasks = [...this.tasks];
        tasks.forEach((task, index) => {
            if (index === key) {
                task.status = !task.status;
            }
        });
        this.tasks = tasks;
    }

    resetStatus() {
        const tasks = [...this.tasks];
        tasks.forEach((task, index) => {
            task.status = false;
        });
        this.tasks = tasks;
    }
}