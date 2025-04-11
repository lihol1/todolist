// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// import { Routes, Route } from "react-router";
// import Layout from './components/Layout';
import Header from "./components/Header.jsx";
import Tasks from "./components/Tasks";
import Categories from "./components/Categories";
import { Context } from "./components/MyContext.js";
import "./App.css";
import { useState, useEffect } from "react";
import  Modal from './components/Modal.jsx';

function App() {
    const [tasks, setTasks] = useState([])
    const [cats, setCats] = useState([])
    const [type, setType] = useState("task");
    const [modalIsOpen, setModalIsOpen]= useState(false);
    const [action, setAction] = useState('create');
    const [editId, setEditId] = useState();
    const [currentTask, setCurrentTask] = useState({});
    const [reload, setReload] = useState(false)

    const store = { type, setType, modalIsOpen, setModalIsOpen, action, setAction, tasks, setTasks, cats, setCats, editId, setEditId, currentTask, setCurrentTask, reload, setReload};


    useEffect(()=>{
        // console.log(currentTask)
    },[currentTask])

    return (
        <>
            {/* className={({ isActive }) => isActive ? "active" : ""} */}
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
