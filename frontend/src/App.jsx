import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateTasks from "./pages/CreateTasks";
import DeleteTask from "./pages/DeleteTask";
import EditTask from "./pages/EditTask";
import Home from "./pages/Home";
import ShowTask from "./pages/ShowTask";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks/create" element={<CreateTasks />} />
      <Route path="/tasks/delete/:id" element={<DeleteTask />} />
      <Route path="/tasks/edit/:id" element={<EditTask />} />
      <Route path="/tasks/details/:id" element={<ShowTask />} />
    </Routes>
  )
}

export default App;