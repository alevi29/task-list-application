import { React, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ReturnButton from "../components/ReturnButton";


const DeleteTask = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const nav = useNavigate();

    const handleDelete = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/tasks/${id}`)
            .then(() => {
                setLoading(false);
                nav("/");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }

    return (
        <div className="p-4">
            <ReturnButton />
            <h1 className="text-3xl my-4 flex justify-center">
                Delete Task
            </h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <h3 className="text-2xl">
                    Are you sure you want to delete this task?
                </h3>
                <div className="flex-row">
                    <button className="p-4 bg-green-600 text-white m-8 w-[200px]" onClick={handleDelete}>
                        OK
                    </button>
                    <button className="p-4 bg-red-600 text-white m-8 w-[200px]">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTask;