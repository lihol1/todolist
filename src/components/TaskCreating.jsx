import { useContext, useState, useEffect } from "react";
import { Context } from "./MyContext";

export default function TaskCreating() {
    const ctx = useContext(Context);

    const [value, setValue] = useState("");
    const [task, setTask] = useState();
    const [nameDirty, setNameisDirty] = useState(false);
    const [nameError, setNameError] = useState("Поле не должно быть пустым");
    const [values, setValues] = useState({
        id: ctx.count,
        name: "",
        description: "",
        categoryId: "",
    });

    useEffect(() => {
        setValues({ ...values, id: ctx.count });
    }, [ctx.count]);

    useEffect(() => {
        setTask({ ...values, id: ctx.count, categoryId: +value });
    }, [values, value, ctx.count]);

    function blurHandler() {
        setNameisDirty(true);
    }

    function closeModal() {
        ctx.setModalIsOpen(false);
    }

    const handleChange = (e) => {
        if (e.target.name === "name") {
            if (!(e.target.value.length >= 2 && e.target.value.length <= 255)) {
                setNameError("Имя должно содержать от 2 до 255 символов");
            } else {
                setNameError("");
            }
        }
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handle = (e) => {
        setValue(e.target.value);
    };

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
            <form
                className="modal__form"
                onSubmit={(e) => ctx.addItem(task, e)}
            >
                <div className="modal__pair">
                    <fieldset className="modal__fieldset">
                        {nameDirty && nameError && (
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
                            required
                            autoComplete="off"
                            maxLength={255}
                            minLength={2}
                            placeholder="Введите имя задачи"
                            onBlur={blurHandler}
                            onChange={handleChange}
                        />
                        <label htmlFor="name"></label>
                    </fieldset>
                    <fieldset className="modal__fieldset">
                        <legend className="modal__legend">Категория</legend>
                        <div className="modal__wrapper">
                            <select
                                className="modal__select"
                                name="category-select"
                                value={value}
                                id="category-select"
                                onChange={handle}
                                required
                            >
                                <option disabled value="">
                                    Выберите категорию
                                </option>
                                <option value="1">Категория1</option>
                                <option value="2">Категория2</option>
                                <option value="3">Категория3</option>
                                <option value="4">Категория4</option>
                                <option value="5">Категория5</option>
                                <option value="6">Категория6</option>
                                <option value="7">Категория7</option>
                                <option value="8">Категория8</option>
                            </select>
                        </div>
                        <label htmlFor="category-select"></label>
                    </fieldset>
                </div>
                <fieldset className="modal__fieldset modal__fieldset--last">
                    <legend className="modal__legend">Описание</legend>
                    <textarea
                        className="modal__textarea"
                        type="text"
                        id="description"
                        name="description"
                        autoComplete="off"
                        maxLength={1536}
                        minLength={2}
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
                        // onClick={()=>ctx.addItem(task)}
                    >
                        Создать
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
