import { useEffect } from "react";
import { getCategories } from "../services";
import "../styles/list.css";
import { useContext } from "react";
import { TodoStore } from "../context/StoreProvider.jsx";

export default function list() {
    const todoStore = useContext(TodoStore);

    async function getData() {
        const response = await getCategories();
        const res = await response.json();
        todoStore.setCategories(res);
    }

    useEffect(() => {
        getData();
    }, []);

    // useEffect(()=>{
    //     const curCat = todoStore.categories.find((cat)=> cat.id === todoStore.editId)
    // },[todoStore.editId])

    function editCategory(id) {
        todoStore.setEditId(id);
        todoStore.setAction("edit");
        todoStore.setModalIsOpen(true);
    }

    function handleDelete(id) {
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
