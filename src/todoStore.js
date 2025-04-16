import { useState } from "react";

    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [type, setType] = useState("task");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [action, setAction] = useState("create");
    const [editId, setEditId] = useState();
    const [count, setCount] = useState(0);
    const [currentTask, setCurrentTask] = useState({
        id: 0,
        name: "",
        description: "",
        categoryId: 0,
    });
    const [currentCat, setCurrentCat] = useState({
        id: 0,
        name: "",
        description: "",
    });

    export const store = {
        type,
        setType,
        modalIsOpen,
        setModalIsOpen,
        action,
        setAction,
        tasks,
        setTasks,
        categories,
        setCategories,
        editId,
        setEditId,
        currentTask,
        setCurrentTask,
        currentCat,
        setCurrentCat,
        deleteItem,
        addItem,
        count,
        setCount,
        editTask,
    };