import { useContext } from "react";
import { Context } from "./MyContext";

export default function ItemDelete() {
    const ctx = useContext(Context);
  
    const itemName =
        ctx.type === "task"
            ? ctx.tasks.find((task) => task.id === ctx.editId).name
            : ctx.cats.find((cat) => cat.id === ctx.editId).name;
    
    return (
        <div className="modal__window modal__window--del">
            <h2 className="modal__title">
                Удаление {ctx.type === "task" ? "задачи" : "категории"}
            </h2>
            <img
                className="modal__cross"
                src="/cross.svg"
                alt="крестик"
                onClick={() => ctx.setModalIsOpen(false)}
            />
            <p className="modal__deltext">{`Вы уверены, что хотите удалить ${ctx.type === "task" ? "задачу" : "категорию"} "${itemName}"?`}</p>
            <div className="modal__buttonBlock">
                <button
                    className="modal__btn modal__btn--blue modal__btn--del"
                    onClick={(e) => ctx.deleteItem(ctx.editId, e)}
                >
                    Да
                </button>
                <button
                    type="button"
                    className="modal__btn modal__btn--del"
                    onClick={() => ctx.setModalIsOpen(false)}
                >
                    Нет
                </button>
            </div>
        </div>
    );
}
