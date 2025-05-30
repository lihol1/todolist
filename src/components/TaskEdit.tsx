import { useEffect, useState } from "react";
import React from "react";
import { Task } from "../types.js";
import { useStoreContext } from "../hooks/useStoreContext.js";

export default function TaskEdit() {
    const todoStore = useStoreContext();

    const curTask = todoStore.tasks.find(
        (task: Task) => task.id === todoStore.editId
    );

    const [nameError, setNameError] = useState("");
    const [value, setValue] = useState(curTask?.categoryId ?? "");

    const [values, setValues] = useState<Task>({
        id: curTask?.id ?? -1,
        name: curTask?.name ?? "",
        description: curTask?.description ?? "",
        categoryId: +value,
    });

    useEffect(() => {
        setValues({ ...values, categoryId: +value });
    }, [value]);

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

    const handle = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(+e.target.value);
    };
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        todoStore.updateCurrentTask(values);
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
                onClick={() => todoStore.setModalIsOpen(false)}
            />
            <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__pair">
                    <fieldset className="modal__fieldset modal__fieldset--edit">
                        {nameError && (
                            <div className="modal__error">{nameError}</div>
                        )}
                        <legend className="modal__legend">
                            Имя<span>&#8727;</span>
                        </legend>
                        <input
                            className="modal__input"
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            autoComplete="off"
                            maxLength={255}
                            minLength={2}
                            placeholder="Введите имя задачи"
                            onChange={handleChange}
                        />
                        <label htmlFor="name"></label>
                    </fieldset>
                    <fieldset className="modal__fieldset modal__fieldset--edit">
                        <legend className="modal__legend">Категория</legend>
                        <select
                            className="modal__select"
                            name="category-select"
                            value={values.categoryId}
                            id="category-select"
                            onChange={handle}
                        >
                            <option value="0">Выберите категорию</option>
                            <option value="1">Категория1</option>
                            <option value="2">Категория2</option>
                            <option value="3">Категория3</option>
                            <option value="4">Категория4</option>
                            <option value="5">Категория5</option>
                            <option value="6">Категория6</option>
                            <option value="7">Категория7</option>
                            <option value="8">Категория8</option>
                        </select>
                        <label htmlFor="category-select"></label>
                    </fieldset>
                </div>
                <fieldset className="modal__fieldset modal__fieldset--last modal__fieldset--edit">
                    <legend className="modal__legend">Описание</legend>
                    <textarea
                        className="modal__textarea"
                        id="description"
                        name="description"
                        maxLength={1536}
                        minLength={2}
                        autoComplete="off"
                        value={values.description}
                        placeholder="Введите описание задачи"
                        onChange={handleChange}
                    />
                    <label htmlFor="description"></label>
                </fieldset>
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
                        onClick={() => todoStore.setModalIsOpen(false)}
                    >
                        Закрыть
                    </button>
                </div>
            </form>
        </div>
    );
}
