import { useContext, useState, useEffect } from "react";
import { Context } from "./MyContext";
import { addTask, getTasks } from "../services";
import Task from "../Task.js";

export default function TaskCreating() {
    const ctx = useContext(Context);

    const [count, setCount] = useState(0);
    const [value, setValue] = useState("");
    const [task, setTask] = useState();
    const [values, setValues] = useState({
        id: 0,
        name: "",
        description: "",
        categoryId: "",
    });

    useEffect(()=>{
      setValues({...values, id: count})
    },[count])

    useEffect(()=>{
      console.log(values.id)
    },[values.id])

    useEffect(()=>{
      setTask({...values, id: count, categoryId: value}) 
    },[values, value, count])

    function closeModal() {
        ctx.setModalIsOpen(false);
    }

    // function addNewTask(task) {
        
    // }

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handle = (e) => {
        setValue(e.target.value);
    };

    // useEffect(() => {
    //     setValues({ ...values, categoryId: value });
    // }, [value, count]);

    async function handleSubmit(e) {
      setCount(count+1);
      console.log(task)
        if(task) {
          const newTask = new Task(task);
          if (newTask.name === "" || newTask.categoryId === "") return;
          const result = await addTask(newTask);
          ctx.setTasks(...ctx.tasks, result)
          ctx.setModalIsOpen(false);
        }
        // e.preventDefault();
        closeModal()
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
            <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__pair">
                    <fieldset className="modal__fieldset">
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
                            placeholder="Введите имя задачи"
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
                                <option value="">Выберите категорию</option>
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
                        // onClick={() => addNewTask(task)}
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
