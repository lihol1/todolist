import { useState, useEffect } from "react";
import { getTasks, removeTask } from "../services";
import "../styles/tasks.css";
import { useContext } from "react";
import { Context } from './MyContext';




export default function Tasks() {
    const ctx = useContext(Context)
   
    async function getData() {        
        const res = await getTasks(); 
        ctx.setTasks(res); 
    }

    useEffect(() => {
        getData();  
        // console.log('reload')      
    }, [ctx.reload]);
 
    useEffect(()=>{
        // console.log(ctx.editId)
        // console.log(ctx.tasks.find((task)=> task.id === ctx.editId))
        // console.log(1)
        ctx.setCurrentTask(ctx.tasks.find((task)=> task.id === ctx.editId))
    },[ctx.editId])


    function editTask(id){       
        ctx.setEditId(id);  
        ctx.setAction('edit');
        ctx.setModalIsOpen(true); 
    }
    

    function deleteTask (id){ 
        ctx.setAction('delete')
        ctx.setModalIsOpen(true)
        // ctx.setEditId(id)
        // ctx.setCurrentTask({id, name, categoryId, description})
        // removeTask(id)  
    }

    return (
        <ul className="page__tasks tasks">
            {ctx.tasks &&
                ctx.tasks.map(({id, name, categoryId, description}) => {
                    return (
                        <li className="tasks__item" key={id}>
                            <div className="tasks__text">
                                <div className="tasks__top">
                                    <div className="tasks__name">{name}</div>
                                    <div className="tasks__cat">
                                    {categoryId && 
                                        <img src="/folder.svg" alt="папка" /> }
                                        <div>{categoryId ? `Категория${categoryId}` : ""}</div>
                                    </div>
                                </div>
                                <div className="tasks__description">{description}</div>
                            </div>   
                            <div className="tasks__icons">
                                <img className="tasks__icon" src="/pen.svg" alt="карандаш" onClick={()=>editTask(id)}/>     
                                <img className="tasks__icon" src="/basket.svg" alt="корзина" onClick={()=>deleteTask(id)}/>    
                            </div>                          
                        </li>
                    );
                })}
        </ul>
    );
}
