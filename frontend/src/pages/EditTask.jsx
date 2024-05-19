import React, { useState, useEffect } from "react";
import ReturnButton from "../components/ReturnButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditTask = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    const [deadline, setDeadline] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/tasks/${id}`)
            .then((response) => {
                setAuthor(response.data.author);
                setTitle(response.data.title);
                setBody(response.data.body);
                setDeadline(response.data.deadline);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }, [])

    const editTask = () => {
        const data = {
            title,
            author,
            body,
            deadline,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/tasks/${id}`, data)
            .then(() => {
                setLoading(false);
                nav("/");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    return (
        <div className="p-4">
            <ReturnButton />
            <h1 className="text-3xl my-4 flex justify-center">
                Edit Task
            </h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <div className="flex flex-row p-4">
                        <label className="text-xl mr-4 text-black-0">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-black px-4 py-2 w-full"
                        />
                    </div>
                    <div className="flex flex-row p-4">
                        <label className="text-xl mr-4 text-black-0">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="border-2 border-black px-4 py-2 w-full"
                        />
                    </div>
                    <div className="flex flex-row p-4">
                        <label className="text-xl mr-4 text-black-0">Body</label>
                        <input
                            type="text"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="border-2 border-black px-4 py-2 w-full"
                        />
                    </div>
                    <div className="flex flex-row p-4">
                        <label className="text-xl mr-4 text-black-0">Deadline</label>
                        <DatePicker
                            selected={deadline}
                            onChange={(date) => setDeadline(date)}
                            className="border-2 border-black px-4 py-2 w-full"
                        />
                    </div>
                    <button className="p-2 bg-sky-300 m-8" onClick={editTask}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditTask;