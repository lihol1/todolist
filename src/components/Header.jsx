import { useContext } from "react";
import { Context } from './MyContext';
import '../styles/header.css';


export default function Header() {
  const ctx = useContext(Context)

  function handleClick(type){
    ctx.setType(type)
  }
  
  function openModal(){
    ctx.setModalIsOpen(true);
  }

  return (
    <header className="page__header header">
      <div className="header__title">ToDo List</div>
        <nav className="header__nav">         
            <button className="header__button header__button--active header__btntask" type="button" onClick={()=>handleClick('task')} >Задачи</button>
            <div className="header__border"></div>
            <button className="header__button" type="button" onClick={()=>handleClick('cat')} >Категории</button>
        </nav>
        <button className="header__add" type="button" onClick={openModal}>Добавить {ctx.type === 'task' ? 'задачу' : 'категорию'}</button>
      
    </header>
  )
}
