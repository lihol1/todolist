import { useEffect } from "react";
import { getCategories } from "../services.js";
import "../styles/list.css";
import React from "react";
import { useStoreContext } from "../hooks/useStoreContext.js";

export default function list() {
    const todoStore = useStoreContext();

    async function getData() {
        const response = await getCategories();
        if (response instanceof Response) {
            const res = await response.json();
            todoStore.setCategories(res);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    function editCategory(id: number) {
        todoStore.setEditId(id);
        todoStore.setAction("edit");
        todoStore.setModalIsOpen(true);
    }

    function handleDelete(id: number) {
        todoStore.setAction("delete");
        todoStore.setEditId(id);
        todoStore.setModalIsOpen(true);
    }

    return (
        <ul className="page__list list">
            {todoStore.categories &&
                todoStore.categories.map(({ id, name, description }) => {
                    return (
                        <li className="list__item" key={id}>
                            <div className="list__text">
                                <div className="list__top">
                                    <div className="list__name">{name}</div>
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
                                    onClick={() => editCategory(id)}
                                />
                                <img
                                    className="list__icon"
                                    src="/basket.svg"
                                    alt="корзина"
                                    onClick={() => handleDelete(id)}
                                />
                            </div>
                        </li>
                    );
                })}
        </ul>
    );
}
