// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// import { Routes, Route } from "react-router";
// import Layout from './components/Layout';
import Header from "./components/Header.jsx";
import Task from "./Task.js";
import Category from "./Category.js";
import Tasks from "./components/Tasks";
import Categories from "./components/Categories";
import { Context } from "./components/MyContext.js";
import "./App.css";
import { useState, useEffect } from "react";
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
    
    // console.log(initCountCat)
    const [count, setCount] = useState(0);
    // const [countCat, setCountCat] = useState(initCountCat);
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

    // const handleChange = (e, values, setValues) => {
    //     if(e.target.name === 'name'){            
    //         if(!(e.target.value.length >2 && e.target.value.length < 255)) {
                
    //             ctx.setNameError('Имя должно содержать от 2 до 255 символов')
    //         } else {
    //             ctx.setNameError("")
    //         }
    //     }
    //     setValues({ ...values, [e.target.name]: e.target.value });
    // };

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
        // validate,
        // handleChange,
        // nameDirty,
        // setNameisDirty,
        // nameError,
        // setNameError,
    };

       

    // function validate (input){
    //     console.log(input)
    //     if(input.name === 'name'){            
    //         if(!(input.value.length >2 && input.value.length < 255)) {
                
    //             ctx.setNameError('Имя должно содержать от 2 до 255 символов')
    //         } else {
    //             ctx.setNameError("")
    //         }
    //     }
    // }

    function addItem(item, e) {
        e.preventDefault();
        console.log(item);

        if (item) {
            setCount(count + 1);
            // console.log((tasks.findIndex((task)=>task.id === count))>=0 || (cats.find((cat)=>cat.id === count))>=0)
            // while ((tasks.findIndex((task)=>task.id === count))>=0 || (cats.find((cat)=>cat.id === count))>=0) {setCount(count + 1)};
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
                // setCountCat(countCat + 1)
                const newCat = new Category(item);
                // if (newCat.name === "" || newCat.id === "")
                //     return;
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

    // useEffect(() => {
    //     console.log(currentTask);
    // }, [currentTask]);

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
