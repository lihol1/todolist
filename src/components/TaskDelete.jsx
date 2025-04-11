import { useContext } from "react";
import { Context } from "./MyContext";

export default function TaskDelete() {
    const ctx = useContext(Context);

    function deleteTask(id) {
        if (id) removeTask(id);
    }
    const taskName = ctx.tasks.find((task) => task.id === ctx.editId);
    return (
        <div className="modal__window modal__window--del">
            <h2 className="modal__title">
                Удаление {ctx.type === "task" ? "задачи" : "категории"}
            </h2>
            <img
                className="modal__cross"
                src="/cross.svg"
                alt="крестик"
                onClick={()=>ctx.setModalIsOpen(false)}
            />
            <p className="modal__deltext">{`Вы уверены, что хотите удалить задачу ${taskName}`}</p>
            <div className="modal__buttonBlock">
                <button
                    className="modal__btn modal__btn--blue modal__btn--del"
                    onClick={() => deleteTask(ctx.editId)}
                >
                    Да
                </button>
                <button
                    type="button"
                    className="modal__btn modal__btn--del"
                    onClick={()=>ctx.setModalIsOpen(false)}
                >
                    Нет
                </button>
            </div>
        </div>
    );
}
