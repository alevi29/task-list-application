import express from "express";
import { Task } from "../models/taskModel.js";

const router = express.Router();

// add a task
router.post("/", async (request, response) => {
    try {
        if (
            !request.body.body ||
            !request.body.author ||
            !request.body.title
        ) {
            return response.status(400).send({
                message: "Send all fields necessary (author, body, title)",
            });
        }

        const newTask = {
            title: request.body.title,
            author: request.body.author,
            body: request.body.body,
            deadline: request.body.deadline ? request.body.deadline : null,
        }

        const task = await Task.create(newTask);
        return response.status(201).send(task);
    }

    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// find all tasks
router.get("/", async (request, response) => {
    try {
        const tasks = await Task.find({});
        return response.status(200).json({
            count: tasks.length,
            data: tasks
        });
    }

    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const task = await Task.findById(id);
        return response.status(200).json(task);
    }

    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// update a task
router.put("/:id", async (request, response) => {
    try {
        if (
            !request.body.body ||
            !request.body.author ||
            !request.body.title
        ) {
            return response.status(400).send({
                message: "Send all fields necessary (author, body, title)",
            });
        }

        const { id } = request.params;
        const result = await Task.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Task not found" });
        }

        return response.status(200).send({ message: "Task updated successfully" });
    }

    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// delete a task
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Task.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Task not found" });
        }

        return response.status(200).send({ message: "Task deleted successfully" });
    }

    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;