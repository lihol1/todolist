import React from "react";
import { useStoreContext } from "../hooks/useStoreContext.js";

export default function ItemDelete() {
    const todoStore = useStoreContext();

    function deleteCurrentItem() {
        if (typeof todoStore !== null) {
            todoStore.type === "task"
                ? todoStore.deleteTask(todoStore.editId)
                : todoStore.deleteCategory(todoStore.editId);
        }
    }

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
                    onClick={deleteCurrentItem}
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
