import { useContext } from "react";
import { Context } from "./MyContext";
import TaskCreating from "./TaskCreating";
import TaskEdit from "./TaskEdit";
import ItemDelete from "./ItemDelete";
import CategoryCreating from "./CategoryCreating";
import CategoryEdit from "./CategoryEdit";
import "../styles/modal.css";

export default function Modal() {
    const ctx = useContext(Context);

    return (
        <>
            {ctx.modalIsOpen && (
                <div className="page__modal modal">
                    {ctx.action === "delete" ? (
                        <ItemDelete />
                    ) : ctx.type === "task" && ctx.action === "create" ? (
                        <TaskCreating />
                    ) : ctx.type === "task" && ctx.action === "edit" ? (
                        <TaskEdit />
                    ) : ctx.type === "category" && ctx.action === "create" ? (
                        <CategoryCreating />
                    ) : ctx.type === "category" && ctx.action === "edit" ? (
                        <CategoryEdit />
                    ) : (
                        ""
                    )}
                </div>
            )}
        </>
    );
}
