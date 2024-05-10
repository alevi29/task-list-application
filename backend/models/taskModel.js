import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        deadline: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model("Task", TaskSchema);