import Header from "./components/Header.jsx";
import Task from "./Task.js";
import Category from "./Category.js";
import Tasks from "./components/Tasks";
import Categories from "./components/Categories";
import { Context } from "./components/MyContext.js";
import "./App.css";
import { useState } from "react";
import Modal from "./components/Modal.jsx";
import {
    addTask,
    addCategory,
    getTasks,
    getCategories,
    removeTask,
    removeCategory,
} from "./services.js";

function App() {
    const [tasks, setTasks] = useState([]);
    const [cats, setCats] = useState([]);
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

    const store = {
        type,
        setType,
        modalIsOpen,
        setModalIsOpen,
        action,
        setAction,
        tasks,
        setTasks,
        cats,
        setCats,
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

    function addItem(item, e) {
        e.preventDefault();
        console.log(item);

        if (item) {
            setCount(count + 1);

            if (type === "task") {
                const newTask = new Task(item);
                if (newTask.name === "" || newTask.categoryId === "") return;

                addTask(newTask)
                    .then(() => {
                        return getTasks();
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        console.log(res);
                        setTasks(res);
                    })
                    .then(() => setModalIsOpen(false));
            } else if (type === "category") {
                const newCat = new Category(item);
                addCategory(newCat)
                    .then(() => {
                        return getCategories();
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        console.log(res);
                        setCats(res);
                    })
                    .then(() => setModalIsOpen(false));
            }
        }
    }

    function deleteItem(id, e) {
        e.preventDefault();
        if (id) {
            if (type === "task") {
                removeTask(id)
                    .then(() => {
                        return getTasks();
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        console.log(res);
                        setTasks(res);
                    })
                    .then(() => setModalIsOpen(false));
            } else {
                removeCategory(id)
                    .then(() => {
                        return getCategories();
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        console.log(res);
                        setCats(res);
                    })
                    .then(() => setModalIsOpen(false));
            }
        }
    }

    function editTask(id) {
        setEditId(id);
        setAction("edit");
        setModalIsOpen(true);
    }

    return (
        <>
            <div className="page">
                <div className="page__container">
                    <Context value={store}>
                        <Header />
                        <main className="page__main">
                            {type === "task" ? <Tasks /> : <Categories />}
                            <Modal />
                        </main>
                    </Context>

                    <footer></footer>
                </div>
            </div>
        </>
    );
}

export default App;
