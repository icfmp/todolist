import { TaskService } from './task.service.js';

export class App {

    tasks;

    constructor() {

        this.tasks = new Proxy(new TaskService, {
            set: (taskService) => {
                this.taskListRender(taskService.tasks);
                this.rateRender(taskService.tasks);
                return true;
            }
        });

        this.initReset();

        for (let i = 0; i < 7; i++) {
            this.tasks.addTask('Titre ' + (i + 1), 'Contenu ' + (i + 1));
        }
    }

    taskListRender(taskList) {
        const domList = document.getElementById('tasksList');
        domList.innerHTML = '';

        taskList.forEach((task, key) => {
            const li = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.onchange = () => { this.onStatusChange(key) };
            if (task.status) checkbox.setAttribute('checked', 'true');
            li.appendChild(checkbox);

            const h3 = document.createElement('h3');
            li.appendChild(h3);

            const title = document.createTextNode(task.title);
            h3.appendChild(title);

            const p = document.createElement('p');
            li.appendChild(p);

            const content = document.createTextNode(task.content);
            p.appendChild(content);

            domList.appendChild(li);
        });
    }

    rateRender(tasks) {
        const total = tasks.length;
        let checked = 0;
        tasks.forEach((task) => { if (task.status) checked++ });

        const rate = Math.round(checked * 100 / total)
        document.getElementById('rate').innerHTML = rate + '%' + ((rate >= 100) ? ', félicitations !' : '');
    }

    initReset() {
        document.getElementById('reset').onclick = () => this.tasks.resetStatus();
    }

    onStatusChange(key) {
        this.tasks.changeTaskStatus(key);
    }
}