import { addTask, addCategory, getTasks, getCategories } from "../services";
import Category from "../Category";
import Task from "../Task";


export default function addItem(item, type, count, setCount, setTasks, setCategories, setModalIsOpen) {
    return () => { 
        if (item) {            
            setCount(count + 1);

            if (type === "task") {
                const newTask = new Task(item);               

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
                const newCat = new Category(item);
                addCategory(newCat)
                    .then(() => {
                        return getCategories();
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        console.log(res);
                        setCategories(res);
                    })
                    .then(() => setModalIsOpen(false));
            }
        }
    };
}
