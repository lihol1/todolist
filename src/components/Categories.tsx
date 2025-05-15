import { useEffect } from "react";
import { fetchCategories } from "../services.js";
import "../styles/list.css";
import React from "react";
import { useStoreContext } from "../hooks/useStoreContext.js";
import { Category } from "../types.js";

export default function list() {
    const todoStore = useStoreContext();

    async function getData(): Promise<void> {
        const response = await fetchCategories();
        if (response instanceof Response) {
            const res = (await response.json()) as Category[];
            todoStore.setCategories(res);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    function editCategory(id: number): void {
        todoStore.setEditId(id);
        todoStore.setAction("edit");
        todoStore.setModalIsOpen(true);
    }

    function handleDelete(id: number): void {
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
