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
    editId: number | null;
    setEditId: Dispatch<SetStateAction<number | null>>,
    currentTask: Task,
    setCurrentTask: Dispatch<SetStateAction<Task>>,
    // currentCat,
    // setCurrentCat,       
    count: number,
    setCount: Dispatch<SetStateAction<number>>,
    editTask: (id:number)=>void
}