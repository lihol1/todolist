import TaskCreating from "./TaskCreating.jsx";
import TaskEdit from "./TaskEdit.jsx";
import ItemDelete from "./ItemDelete.js";
import CategoryCreating from "./CategoryCreating.js";
import CategoryEdit from "./CategoryEdit.js";
import "../styles/modal.css";
import React from "react";
import { useStoreContext } from "../hooks/useStoreContext.js";

export default function Modal() {
    const todoStore = useStoreContext();

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
