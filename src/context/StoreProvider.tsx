import { createContext, useState } from "react";
import { Store, Task, Category } from "../types";
import React from "react";

function StoreProvider({ children }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [type, setType] = useState<string>("task");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [action, setAction] = useState("create");
    const [editId, setEditId] = useState<number | null>(null);
    const [count, setCount] = useState<number>(0);
    const [currentTask, setCurrentTask] = useState<Task>({
        id: 0,
        name: "",
        description: "",
        categoryId: 0,
    });

    const store: Store = {
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
        count,
        setCount,
        editTask,
    };

    function editTask(id: number) {
        setEditId(id);
        setAction("edit");
        setModalIsOpen(true);
    }

    return (
        <>
            <TodoStore.Provider value={store}>{children}</TodoStore.Provider>
        </>
    );
}

const TodoStore = createContext<Store | null>(null);

export { TodoStore, StoreProvider };
