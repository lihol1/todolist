import { useContext } from "react";
import { TodoStore } from "../context/StoreProvider.jsx";
import useDeleteItem from "../hooks/useDeleteItem";

export default function ItemDelete() {
    const todoStore = useContext(TodoStore);
    // useDeleteItem(todoStore.editId, e, todoStore.type, todoStore.setTasks, todoStore.setCategories, todoStore.setModalIsOpen)

    // console.log(todoStore.categories.find((cat) => cat.id === todoStore.editId))   ?????????????
    const deleteItem = useDeleteItem(
        todoStore.editId,
        todoStore.type,
        todoStore.setTasks,
        todoStore.setCategories,
        todoStore.setModalIsOpen
    );

    const itemName =
        todoStore.type === "task"
            ? todoStore.tasks.find((task) => task.id === todoStore.editId)?.name
            : todoStore.categories.find((cat) => cat.id === todoStore.editId)
                  ?.name;

    return (
        <div className="modal__window modal__window--del">
            <h2 className="modal__title">
                Удаление {todoStore.type === "task" ? "задачи" : "категории"}
            </h2>
            <img
                className="modal__cross"
                src="/cross.svg"
                alt="крестик"
                onClick={() => todoStore.setModalIsOpen(false)}
            />
            <p className="modal__deltext">{`Вы уверены, что хотите удалить ${
                todoStore.type === "task" ? "задачу" : "категорию"
            } "${itemName}"?`}</p>
            <div className="modal__buttonBlock">
                <button
                    className="modal__btn modal__btn--blue modal__btn--del"
                    // onClick={(e) => todoStore.deleteItem(todoStore.editId, e)}
                    // onClick={(e) => useDeleteItem(todoStore.editId, e, todoStore.type, todoStore.setTasks, todoStore.setCategories, todoStore.setModalIsOpen)}
                    // onClick={(e)=>deleteItem(todoStore.editId, e, todoStore.type, todoStore.setTasks, todoStore.setCategories, todoStore.setModalIsOpen)}
                    onClick={deleteItem}
                >
                    Да
                </button>
                <button
                    type="button"
                    className="modal__btn modal__btn--del"
                    onClick={() => todoStore.setModalIsOpen(false)}
                >
                    Нет
                </button>
            </div>
        </div>
    );
}
