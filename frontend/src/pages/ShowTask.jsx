import { useEffect, useState, React } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReturnButton from "../components/ReturnButton";
import Spinner from "../components/Spinner";

const ShowTask = () => {
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/tasks/${id}`)
            .then((response) => {
                setTask(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [])

    return (
        <div className="p-4">
            <ReturnButton />
            <h1 className="text-3xl my-4 flex justify-center">
                Show Task
            </h1>
            <div>
                {loading ? (<Spinner />) :
                    (
                        <div className="flex justify-center">
                            <div className="flex flex-col border-2 border-sky-400 w-fit p-4">
                                <div className="my-4">
                                    <span className="text-xl mr-4 text-gray-500">ID</span>
                                    <span>{task._id}</span>
                                </div>
                                <div className="my-4">
                                    <span className="text-xl mr-4 text-gray-500">Title</span>
                                    <span>{task.title}</span>
                                </div>
                                <div className="my-4">
                                    <span className="text-xl mr-4 text-gray-500">Author</span>
                                    <span>{task.author}</span>
                                </div>
                                <div className="my-4">
                                    <span className="text-xl mr-4 text-gray-500">Details</span>
                                    <span>{task.body}</span>
                                </div>
                                <div className="my-4">
                                    <span className="text-xl mr-4 text-gray-500">Deadline</span>
                                    <span>{task.deadline}</span>
                                </div>
                                <div className="my-4">
                                    <span className="text-xl mr-4 text-gray-500">Time Created</span>
                                    <span>{new Date(task.createdAt).toString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default ShowTask;