import { useContext } from "react";
import { Context } from './MyContext';

export default function CategoryCreating() {
  const ctx = useContext(Context)

  function closeModal(){
    ctx.setModalIsOpen(false);
  }

  return (
    <div>
        <h2 className="modal__title">Создание {ctx.type==='task'? 'задачи': 'категории'}</h2>
            <fieldset>
                <legend>Имя<span>&#8727;</span></legend>
                <input type="text" id="name" name="name" value="" placeholder="Введите имя категории" onChange={(e)=>setValue(e.target.value)}/>
                <label htmlFor="name"></label>
            </fieldset>            
            <fieldset>
                <legend>Описание</legend>
                <input type="text" id="description" name="description" value="" placeholder="Введите описание категории" onChange={(e)=>setValue(e.target.value)}/>
                <label htmlFor="description"></label>
            </fieldset>
            <div className="modal__buttonBlock">
                <button type="button" >Создать</button>
                <button type="button" onClick={closeModal}>Закрыть</button>
            </div>
    </div>
  )
}