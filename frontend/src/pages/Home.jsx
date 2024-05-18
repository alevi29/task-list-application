import { React, useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/tasks")
            .then((response) => {
                setTasks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);
    return (
        <div className="p-4">
            <h1 className="text-center text-3xl my-8">
                Tasks List
            </h1>
            <div className="flex justify-end items-center">
                <Link to="/tasks/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md max-md:hidden">
                                No
                            </th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">
                                Title
                            </th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">
                                Author
                            </th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">
                                Details
                            </th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">
                                Deadline
                            </th>
                            <th className="border border-slate-600 rounded-md">
                                Operations
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, i) => (
                            <tr key={task._id} className="h-8">
                                <td className="border border-slate-700 rounded-md text-center">
                                    {i + 1}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {task.title}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                    {task.author}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {task.body}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                    {task.deadline}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/tasks/details/${task._id}`}>
                                            <BsInfoCircle className="text-2xl text-green-800" />
                                        </Link>
                                        <Link to={`/tasks/edit/${task._id}`}>
                                            <AiOutlineEdit className="text-2xl text-yellow-600" />
                                        </Link>
                                        <Link to={`/tasks/delete/${task._id}`}>
                                            <MdOutlineDelete className="text-2xl text-red-600" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home;