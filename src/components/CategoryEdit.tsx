import { useState } from "react";
import updateItem from "../utils/updateItem.js";
import React from "react";
import { useStoreContext } from "../hooks/useStoreContext.js";
import { Category } from "../types.js";

export default function CategoryEdit() {
    const todoStore = useStoreContext();

    const curCat = todoStore.categories.find(
        (cat) => cat.id === todoStore.editId
    );

    const [values, setValues] = useState<Category>(curCat ?? ({} as Category));
    const [nameError, setNameError] = useState("");
    const updateCurrentItem = updateItem(
        values,
        todoStore.type,
        todoStore.setTasks,
        todoStore.setCategories,
        todoStore.setModalIsOpen
    );

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (e.target.name === "name") {
            if (!(e.target.value.length >= 2 && e.target.value.length <= 255)) {
                setNameError("Имя должно содержать от 2 до 255 символов");
            } else {
                setNameError("");
            }
        }
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    function closeModal() {
        todoStore.setModalIsOpen(false);
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        updateCurrentItem();
    }

    return (
        <div className="modal__window">
            <h2 className="modal__title">
                Редактирование{" "}
                {todoStore.type === "task" ? "задачи" : "категории"}
            </h2>
            <img
                className="modal__cross"
                src="/cross.svg"
                alt="крестик"
                onClick={closeModal}
            />
            <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__top">
                    <fieldset className="modal__fieldset">
                        {nameError && (
                            <div className="modal__error">{nameError}</div>
                        )}
                        <legend className="modal__legend">
                            Имя<span>&#8727;</span>
                        </legend>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            maxLength={255}
                            minLength={2}
                            autoComplete="off"
                            placeholder="Введите имя категории"
                            onChange={handleChange}
                        />
                        <label htmlFor="name"></label>
                    </fieldset>
                </div>
                <div className="modal__bottom">
                    <fieldset className="modal__fieldset">
                        <textarea
                            className="modal__textarea"
                            id="description"
                            name="description"
                            autoComplete="off"
                            maxLength={512}
                            minLength={2}
                            value={values.description}
                            placeholder="Введите описание задачи"
                            onChange={handleChange}
                        />
                        <label htmlFor="description"></label>
                    </fieldset>
                </div>
                <div className="modal__buttonBlock">
                    <button
                        type="submit"
                        className="modal__btn modal__btn--blue"
                    >
                        Сохранить
                    </button>
                    <button
                        type="button"
                        className="modal__btn"
                        onClick={closeModal}
                    >
                        Закрыть
                    </button>
                </div>
            </form>
        </div>
    );
}
