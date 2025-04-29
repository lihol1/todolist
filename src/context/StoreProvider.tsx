import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Store, Task, Category } from "../types";
import {
    fetchTasks,
    fetchAddTask,
    fetchAddCategory,
    fetchCategories,
    fetchRemoveTask,
    fetchRemoveCategory,
    fetchUpdateTask,
    fetchUpdateCategory,
} from "../services";
import React from "react";

function StoreProvider({ children }: PropsWithChildren) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [type, setType] = useState<string>("task");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [action, setAction] = useState("create");
    const [editId, setEditId] = useState<number>(0);
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
        addNewTask,
        addNewCategory,
        deleteTask,
        deleteCategory,
        updateCurrentTask,
        updateCurrentCategory,
        getMaxId,
    };

    async function getItemsCount(): Promise<void> {
        Promise.allSettled([
            fetchTasks().then((res) =>
                res instanceof Response ? res.json() : null
            ),
            fetchCategories().then((res) =>
                res instanceof Response ? res.json() : null
            ),
        ])
            .then((responses) =>
                responses.map((response) => {
                    if (response.status === "fulfilled") {
                        return response.value;
                    }
                })
            )
            .then((arr) => {
                setCount(getMaxId(arr) + 1);
            });
    }
    useEffect(() => {
        getItemsCount();
    }, []);

    function getMaxId(arr: Array<Task[] | Category[]>): number {
        let maxId: number = 0;
        let arr2: number[] = [];

        for (let i: number = 0; i < arr.length; i++) {
            const tempArr: number[] = arr[i].map(
                (item: Task | Category) => item.id
            );
            arr2.push(...tempArr);
        }
        maxId = Math.max(...arr2);
        return maxId;
    }

    function editTask(id: number) {
        setEditId(id);
        setAction("edit");
        setModalIsOpen(true);
    }

    function addNewTask(task: Task) {
        setCount(count + 1);

        fetchAddTask(task)
            .then(() => {
                return fetchTasks();
            })
            .then((response) => {
                if (response instanceof Response) return response.json();
            })
            .then((res: Task[]) => {
                setTasks(res);
            })
            .finally(() => setModalIsOpen(false));
    }
    function addNewCategory(category: Category) {
        setCount(count + 1);
        fetchAddCategory(category)
            .then(() => {
                return fetchCategories();
            })
            .then((response) => {
                if (response instanceof Response) return response.json();
            })
            .then((res: Category[]) => {
                setCategories(res);
            })
            .finally(() => setModalIsOpen(false));
    }
    function deleteTask(id: number) {
        fetchRemoveTask(id)
            .then(() => {
                return fetchTasks();
            })
            .then((response) => {
                if (response instanceof Response) return response.json();
            })
            .then((res) => {
                setTasks(res);
            })
            .finally(() => setModalIsOpen(false));
    }
    function deleteCategory(id: number) {
        fetchRemoveCategory(id)
            .then(() => {
                return fetchCategories();
            })
            .then((response) => {
                if (response instanceof Response) return response.json();
            })
            .then((res) => {
                setCategories(res);
            })
            .finally(() => setModalIsOpen(false));
    }
    function updateCurrentTask(task: Task) {
        fetchUpdateTask(task)
            .then(() => {
                return fetchTasks();
            })
            .then((response) => {
                if (response instanceof Response) return response.json();
            })
            .then((res) => {
                setTasks(res);
            })
            .finally(() => setModalIsOpen(false));
    }
    function updateCurrentCategory(category: Category) {
        fetchUpdateCategory(category)
            .then(() => {
                return fetchCategories();
            })
            .then((response) => {
                if (response instanceof Response) return response.json();
            })
            .then((res) => {
                setCategories(res);
            })
            .finally(() => setModalIsOpen(false));
    }

    return (
        <>
            <TodoStore.Provider value={store}>{children}</TodoStore.Provider>
        </>
    );
}

const TodoStore = createContext<Store | null>(null);

export { TodoStore, StoreProvider };
