import { Dispatch, SetStateAction } from 'react';

export type Task = {
    id: number,
    name: string,
    description: string,
    categoryId: number;
}

export type Category = {
    id: number;
    name: string;
    description: string;
}

export type Store = {
    type: string;
    setType: Dispatch<SetStateAction<string>>;
    modalIsOpen: boolean,
    setModalIsOpen: Dispatch<SetStateAction<boolean>>,
    action: string;
    setAction: Dispatch<SetStateAction<string>>;
    tasks: Task [];
    setTasks: Dispatch<SetStateAction<Task[]>>;
    categories: Category [];
    setCategories: Dispatch<SetStateAction<Category []>>;
    editId: number;
    setEditId: Dispatch<SetStateAction<number>>,
    currentTask: Task,
    setCurrentTask: Dispatch<SetStateAction<Task>>,         
    count: number,
    setCount: Dispatch<SetStateAction<number>>,
    editTask: (id:number)=>void,
    addNewTask: (task:Task)=>void,
    addNewCategory: (cat: Category)=>void,
    deleteTask: (id: number)=>void,
    deleteCategory: (id: number)=>void,
    updateCurrentTask: (task: Task)=>void,
    updateCurrentCategory: (cat: Category)=>void,
    getMaxId: (arr: Task | Category [])=>number
}