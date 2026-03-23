const express = require('express')
const app = express()

app.use(express.json());

let tasks = [
    { "id": 1, "title": "Learn JS", "done": false }
];

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (rq, rs) => {
    if (rq.body !== undefined && rq.body.title !== undefined ) {
        const newTask = {
            id: tasks.length + 1,
            title: rq.body.title,
            done: false
        }
        tasks.push(newTask)
        rs.json({"title": "Task  created!", "result": newTask});
    }
    else {
        rs.json({"error": "Task cannot be created!"});
    }
});

app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.filter(user => user.id !== id);
    res.json({success: true});
});

app.patch('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const value = Boolean(req.body.done);

    let task = tasks.find(task => task.id === id)

    if (task !== undefined) {
        task.done = value
        res.json({message: "Task updated successfully!", result: task});
    }
    else {
        res.json({error: "Task cannot be found!"});
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'))