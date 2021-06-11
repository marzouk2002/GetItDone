const { v4: uuidv4 } = require('uuid');
const moment = require('moment')

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

class Comment {
    constructor(id, pic, role, name, content) {
        this.id = uuidv4();
        this.userId = id;
        this.picture = pic;
        this.role = role;
        this.userName = name;
        this.content = content;
    }
}


class Message {
    constructor(userId, text) {
        this.userId = userId;
        this.text = text;
        this.time= moment().format('h:mm a')
    }
}

class Conversation {
    constructor(user1Id, user2Id) {
        this.between= [user1Id, user2Id],
        this.viewed={
           [user1Id]: true, 
           [user2Id]: true
        },
        this.chat= []
    }
}

module.exports = { Branch, Comment, Message, Conversation }