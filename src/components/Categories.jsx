import { useEffect } from "react";
import { getCategories } from "../services";
import "../styles/list.css";
import { useContext } from "react";
import { Context } from './MyContext';

export default function list() {
    const ctx = useContext(Context)
   
    async function getData() {        
        const response = await getCategories(); 
        const  res = await response.json();
        ctx.setCats(res); 
    }

    useEffect(() => {
        getData();            
    }, []);
 
    useEffect(()=>{    
        const curCat = ctx.cats.find((cat)=> cat.id === ctx.editId)         
    },[ctx.editId])
   

    function editCat(id){       
        ctx.setEditId(id);  
        ctx.setAction('edit');
        ctx.setModalIsOpen(true); 
    }    

    function handleDel(id){ 
        ctx.setAction('delete');
        ctx.setEditId(id);
        ctx.setModalIsOpen(true);      
    }

    return (
        <ul className="page__list list">
            {ctx.cats &&
                ctx.cats.map(({id, name, description}) => {
                    return (
                        <li className="list__item" key={id}>
                            <div className="list__text">
                                <div className="list__top">
                                    <div className="list__name">{name}</div>                                    
                                </div>
                                <div className="list__description">{description}</div>
                            </div>   
                            <div className="list__icons">
                                <img className="list__icon" src="/pen.svg" alt="карандаш" onClick={()=>editCat(id)}/>     
                                <img className="list__icon" src="/basket.svg" alt="корзина" onClick={()=>handleDel(id)}/>    
                            </div>                          
                        </li>
                    );
                })}
        </ul>
    );
}
   

