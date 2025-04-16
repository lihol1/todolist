import { useContext } from "react";
import { TodoStore } from "../context/StoreProvider.jsx";
import TaskCreating from "./TaskCreating";
import TaskEdit from "./TaskEdit";
import ItemDelete from "./ItemDelete";
import CategoryCreating from "./CategoryCreating";
import CategoryEdit from "./CategoryEdit";
import "../styles/modal.css";

export default function Modal() {
    const todoStore = useContext(TodoStore);

    return (
        <>
            {todoStore.modalIsOpen && (
                <div className="page__modal modal">
                    {todoStore.action === "delete" ? (
                        <ItemDelete />
                    ) : todoStore.type === "task" &&
                      todoStore.action === "create" ? (
                        <TaskCreating />
                    ) : todoStore.type === "task" &&
                      todoStore.action === "edit" ? (
                        <TaskEdit />
                    ) : todoStore.type === "category" &&
                      todoStore.action === "create" ? (
                        <CategoryCreating />
                    ) : todoStore.type === "category" &&
                      todoStore.action === "edit" ? (
                        <CategoryEdit />
                    ) : (
                        ""
                    )}
                </div>
            )}
        </>
    );
}
