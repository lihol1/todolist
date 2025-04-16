import { useContext, useEffect } from "react";
import { TodoStore } from "../context/StoreProvider.jsx";
import "../styles/header.css";

export default function Header() {    
    const todoStore = useContext(TodoStore);

    function handleClick(type) {
        todoStore.setType(type);
    }

    function openModal() {
        todoStore.setAction("create");
        todoStore.setModalIsOpen(true);
    }

    return (
        <header className="page__header header">
            <div className="header__title">ToDo List</div>
            <nav className="header__nav">
                <button
                    className={`header__button header__btntask ${
                        todoStore.type === "task"
                            ? "header__button--active"
                            : ""
                    }`}
                    type="button"
                    onClick={() => handleClick("task")}                    
                >
                    Задачи
                </button>

                <div className="header__border"></div>
                <button
                    className={`header__button ${
                        todoStore.type !== "task"
                            ? "header__button--active"
                            : ""
                    }`}
                    type="button"
                    onClick={() => handleClick("category")}                   
                >
                    Категории
                </button>
            </nav>
            <button className="header__add" type="button" onClick={openModal}>
                Добавить {todoStore.type === "task" ? "задачу" : "категорию"}
            </button>
        </header>
    );
}
