import { createContext, PropsWithChildren, useState } from "react";
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

function StoreProvider({ children } : PropsWithChildren) { 
    

    const [tasks, setTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [type, setType] = useState<string>("task");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [action, setAction] = useState("create");
    const [editId, setEditId] = useState<number>(0);

    
    // const [count, setCount] = useState<number>(getMaxId()?? 0);
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
        // getMaxId
    };

    // function getMaxId(): number {
    //     let maxId: number=0;
    //     if(type === 'task') {
    //         if(tasks) {
    //             const taskIds: number[] = tasks.map((task)=>task.id)
    //             console.log(1, Math.max(...taskIds))
    //             maxId = Math.max(...taskIds);             
    //         }
    //     } else {
    //         const catIds: number[] = categories.map((cat)=>cat.id)
    //         console.log(2, Math.max(...catIds))
    //         if(categories)
    //         maxId = Math.max(...catIds)            
    //     }
    //     console.log(maxId)
    //     return maxId        
    // }
    

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
                if(response instanceof Response) return response.json();
            })
            .then((res: Task[]) => {
                console.log(res);
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
                if(response instanceof Response) return response.json();
            })
            .then((res: Category[]) => {
                console.log(res);
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
                if(response instanceof Response) return response.json();
            })
            .then((res) => {
                console.log(res);
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
                if(response instanceof Response) return response.json();
            })
            .then((res) => {
                console.log(res);
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
                if(response instanceof Response) return response.json();
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
                if(response instanceof Response) return response.json();
            })
            .then((res) => {
                console.log(res);
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
