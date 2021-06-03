const { v4: uuidv4 } = require('uuid');

class Branch {
    constructor(title, description, tasks) {
        this.title = title;
        this.description = description;
        this.tasks = formateTasks(tasks);
        this.completion = 0;
        this.id = uuidv4();
    }
}

function formateTasks(tasks) {
    return tasks.map(task => {
        return {task, status: false}
    })
}

module.exports = { Branch }