import { useContext, useEffect, useState } from "react";
import { Context } from './MyContext';
import { addTask, updateTask, getTasks } from "../services";
// import { getData } from './Tasks'

export default function TaskEdit() {
  const ctx = useContext(Context)
  
  const [value, setValue] = useState("")  
  const [task, setTask] = useState();
  const [values, setValues] = useState({
    id: 0,
    name:'',
    description: '',
    categoryId: 0
  })

  useEffect(()=>{
    setTask({...values, categoryId: value})    
  },[values, value])

  useEffect(()=>{
    // console.log(ctx.currentTask)
    // console.log(ctx.editId)
    setValues({...values, ...ctx.currentTask})  
  },[ctx.currentTask])


useEffect(()=>{
  // console.log(ctx.currentTask)  
},[ctx.currentTask])


  function updateCurrentTask(task){ 
    // console.log(task)
    updateTask(task);
    // promiseUpdate(task).
    // then(()=>ctx.setReload(!ctx.reload))
    ctx.setReload(!ctx.reload)          
    closeModal();   
  }

  // function promiseUpdate (){
  //   return new Promise((res,rej)=>{
  //     const data = updateTask(task)
  //     if(data) {
  //       res()
  //     } else {
  //       rej(err)
  //     }
      
  //   })
  // }
//  const promiseUpdate = promisify(updateTask(task))

//   function promisify(f) {
//     return function (...args) { // возвращает функцию-обёртку
//       return new Promise((resolve, reject) => {
//         function callback(err, result) { // наш специальный колбэк для f
//           if (err) {
//             reject(err);
//           } else {
//             resolve(result);
//           }
//         }
  
//         args.push(callback); // добавляем колбэк в конец аргументов f
  
//         f.call(this, ...args); // вызываем оригинальную функцию
//       });
//     };
//   };


  const handleChange = ({ target: { value, name } }) => {   
    setValues({ ...values, [name]: value });
  };

  const handle = (e)=>{
    setValue(e.target.value)
    // console.log('value: ', value)
  }

  return (
    <div className="modal__window">
        <h2 className="modal__title">Редактирование {ctx.type==='task'? 'задачи': 'категории'}</h2>
        <img className="modal__cross" src="/cross.svg" alt="крестик" onClick={()=>ctx.setModalIsOpen(false)}/>
            <div className="modal__pair">
              <fieldset className="modal__fieldset">
                <legend className="modal__legend">Имя<span>&#8727;</span></legend>
                <input className="modal__input" type="text" id="name" name="name" value={values.name} autoComplete="off" maxLength={255} placeholder="Введите имя задачи" onChange={handleChange}/>
                <label htmlFor="name"></label>
              </fieldset>
              <fieldset className="modal__fieldset">
                  <legend className="modal__legend">Категория</legend>
                  {/* <select className="modal__select" name="category-select" value={values.categoryId} id="category-select" onChange={handleChange}> */}
                  <select className="modal__select" name="category-select" value={value} id="category-select" onChange={handle}>
                    {/* <option value="">Выберите категорию</option> */}
                    <option value="1">Категория1</option>
                    <option value="2">Категория2</option>
                    <option value="3">Категория3</option>
                    <option value="4">Категория4</option>
                    <option value="5">Категория5</option>
                    <option value="6">Категория6</option>
                    <option value="7">Категория7</option>
                    <option value="8">Категория8</option>
                  </select>
                  {/* <input className="modal__input" type="text" id="category" name="category" value="" placeholder="Выберите категорию" onChange={(e)=>setValue(e.target.value)}/> */}
                  <label htmlFor="category-select"></label>
              </fieldset>
            </div>            
            <fieldset className="modal__fieldset modal__fieldset--last">
                  <legend className="modal__legend">Описание</legend>
                  <textarea className="modal__textarea" type="text" id="description" name="description" maxLength={1536} autoComplete="off" value={values.description} placeholder="Введите описание задачи" onChange={handleChange}/>
                  <label htmlFor="description"></label>
            </fieldset>            
            <div className="modal__buttonBlock">
                <button type="button" className="modal__btn modal__btn--blue" onClick={()=>updateCurrentTask(task)}>Сохранить</button>
                <button type="button" className="modal__btn" onClick={()=>ctx.setModalIsOpen(false)}>Закрыть</button>
            </div>
    </div>
  )
}
