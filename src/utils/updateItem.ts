import { updateTask, updateCategory, getTasks, getCategories } from "../services";

export default function updateItem(item,type, setTasks,setCategories, setModalIsOpen) {
    return () => {
        if (item) {
            if (type === "task") {
                updateTask(item)
                    .then(() => {
                        return getTasks();
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        setTasks(res);
                    })
                    .then(() => setModalIsOpen(false));
            } else {
                updateCategory(item)
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
