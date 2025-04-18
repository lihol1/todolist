import { removeTask, removeCategory, getTasks, getCategories } from "../services";


export default function deleteItem(id, type, setTasks, setCategories, setModalIsOpen){

return () => {    
              if (id) {             
                
                if (type === "task") {
                    removeTask(id)
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
                } else {
                    removeCategory(id)
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
        }
}