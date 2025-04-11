import { useContext } from "react";
import { Context } from "./MyContext";

export default function CategoryCreating() {
    const ctx = useContext(Context);

    function closeModal() {
        ctx.setModalIsOpen(false);
    }

    return (
        <div className="modal__window">
            <h2 className="modal__title">
                Создание {ctx.type === "task" ? "задачи" : "категории"}
            </h2>
            <img
                className="modal__cross"
                src="/cross.svg"
                alt="крестик"
                onClick={closeModal}
            />
            <form className="modal__form">
                <fieldset className="modal__fieldset">
                    <legend className="modal__legend">
                        Имя<span>&#8727;</span>
                    </legend>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value=""
                        placeholder="Введите имя категории"
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <label htmlFor="name"></label>
                </fieldset>
                <fieldset className="modal__fieldset">
                <textarea
                        className="modal__textarea"
                        type="text"
                        id="description"
                        name="description"
                        autoComplete="off"
                        maxLength={1536}
                        value=""
                        placeholder="Введите описание задачи"
                        onChange={handleChange}
                    />
                    <label htmlFor="description"></label>
                </fieldset>
                <div className="modal__buttonBlock">
                    <button type="button">Создать</button>
                    <button type="button" onClick={closeModal}>
                        Закрыть
                    </button>
                </div>
            </form>
        </div>
    );
}
