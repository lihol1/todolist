import { useContext } from "react";
import { Context } from './MyContext';
import TaskCreating from "./TaskCreating";
import TaskEdit from "./TaskEdit";
import TaskDelete from "./TaskDelete";
import CategoryCreating from "./CategoryCreating";
import "../styles/modal.css";

export default function Modal() {
  const ctx = useContext(Context)

    return (
        <>
          {ctx.modalIsOpen && (
            <div className="page__modal modal">

                  { ctx.type === 'task' ?                   
                  ctx.action === 'create' ? <TaskCreating /> : 
                  ctx.action === 'edit' ? <TaskEdit/> : 
                  ctx.action === 'delete' && <TaskDelete/>
                
                  
                  // ctx.type === 'category'

                  : ctx.action === 'create' ? <CategoryCreating /> : '' 
                
                  }

                    
                </div>           
          )}
        </>
    );
}
