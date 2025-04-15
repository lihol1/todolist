import { useEffect } from "react";
import { getTasks } from "../services";
import "../styles/list.css";
import { useContext } from "react";
import { Context } from "./MyContext";

export default function Tasks() {
    const ctx = useContext(Context);

    async function getData() {
        const response = await getTasks();
        const res = await response.json();
        ctx.setTasks(res);
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const curTask = ctx.tasks.find((task) => task.id === ctx.editId);
        ctx.setCurrentTask(curTask);
    }, [ctx.editId]);

    function handleDel(id) {
        ctx.setAction("delete");
        ctx.setEditId(id);
        ctx.setModalIsOpen(true);
    }

    return (
        <ul className="page__list list">
            {ctx.tasks &&
                ctx.tasks.map(({ id, name, categoryId, description }) => {
                    return (
                        <li className="list__item" key={id}>
                            <div className="list__text">
                                <div className="list__top">
                                    <div className="list__name">{name}</div>
                                    <div className="list__cat">
                                        {categoryId && (
                                            <img
                                                src="/folder.svg"
                                                alt="папка"
                                            />
                                        )}
                                        <div>
                                            {categoryId
                                                ? `Категория${categoryId}`
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="list__description">
                                    {description}
                                </div>
                            </div>
                            <div className="list__icons">
                                <img
                                    className="list__icon"
                                    src="/pen.svg"
                                    alt="карандаш"
                                    onClick={() => ctx.editTask(id)}
                                />
                                <img
                                    className="list__icon"
                                    src="/basket.svg"
                                    alt="корзина"
                                    onClick={() => handleDel(id)}
                                />
                            </div>
                        </li>
                    );
                })}
        </ul>
    );
}
