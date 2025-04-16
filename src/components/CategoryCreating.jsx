import { useState, useContext } from "react";
import { TodoStore } from "../context/StoreProvider.jsx";
import useAddItem from "../hooks/useAddItem.js";

export default function CategoryCreating() {
    const todoStore = useContext(TodoStore);

    const [nameDirty, setNameIsDirty] = useState(false);
    const [nameError, setNameError] = useState("Поле не должно быть пустым");
    const [values, setValues] = useState({
        id: todoStore.count,
        // id: Date.now(),
        name: "",
        description: "",
    });
          
    const addItem = useAddItem(values, todoStore.type, todoStore.count, todoStore.setCount, todoStore.setTasks, todoStore.setCategories, todoStore.setModalIsOpen)

    function blurHandler() {
        setNameIsDirty(true);
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

    function closeModal() {
        todoStore.setModalIsOpen(false);
    }
    function handleSubmit(e){
        e.preventDefault();
        addItem();
    }

    return (
        <div className="modal__window">
            <h2 className="modal__title">
                Создание {todoStore.type === "task" ? "задачи" : "категории"}
            </h2>
            <img
                className="modal__cross"
                src="/cross.svg"
                alt="крестик"
                onClick={closeModal}
            />
            <form
                className="modal__form"
                onSubmit={handleSubmit}
            >
                <div className="modal__top">
                    <fieldset className="modal__fieldset">
                        {nameDirty && nameError && (
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
                            placeholder="Введите имя категории"
                            autoComplete="off"
                            onBlur={blurHandler}
                            onChange={handleChange}                                                        
                        />
                        <label htmlFor="name"></label>
                    </fieldset>
                </div>
                <div className="modal__bottom">
                    <fieldset className="modal__fieldset">
                        <textarea
                            className="modal__textarea"
                            type="text"
                            id="description"
                            name="description"
                            autoComplete="off"
                            maxLength={512}
                            minLength={2}   
                            value={values.description}                    
                            onChange={handleChange}  
                            placeholder="Введите описание задачи"                           
                        />
                        <label htmlFor="description"></label>
                    </fieldset>
                </div>
                <div className="modal__buttonBlock">
                    <button
                        type="submit"
                        className="modal__btn modal__btn--blue"
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
