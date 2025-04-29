import { useEffect } from "react";
import { fetchTasks } from "../services.js";
import "../styles/list.css";
import React from "react";
import { useStoreContext } from "../hooks/useStoreContext.js";
import { Task } from "../types.js";

export default function Tasks() {
    const todoStore = useStoreContext();

    async function getData(): Promise<void> {
        const response = await fetchTasks();
        if (response instanceof Response) {
            const res = (await response.json()) as Task[];
            todoStore.setTasks(res);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const curTask = todoStore.tasks.find(
            (task) => task.id === todoStore.editId
        );
        if (curTask !== undefined) {
            todoStore.setCurrentTask(curTask);
        }
    }, [todoStore.editId]);

    function handleDel(id: number) {
        todoStore.setAction("delete");
        todoStore.setEditId(id);
        todoStore.setModalIsOpen(true);
    }

    return (
        <ul className="page__list list">
            {todoStore.tasks &&
                todoStore.tasks.map(({ id, name, categoryId, description }) => {
                    return (
                        <li className="list__item" key={id}>
                            <div className="list__text">
                                <div className="list__top">
                                    <div className="list__name">{name}</div>
                                    <div className="list__cat">
                                        {categoryId !== 0 && (
                                            <img
                                                src="/folder.svg"
                                                alt="папка"
                                            />
                                        )}
                                        <div>
                                            {categoryId !== 0
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
                                    onClick={() => todoStore.editTask(id)}
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
