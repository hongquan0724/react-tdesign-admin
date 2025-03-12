
import classNames from 'classnames';
import {useEffect, useRef, useState} from "react";


const TodoItem = ({todo,todoCallback}) => {
    const [editFlag,setEditFlag] = useState(false)
    const inputRef = useRef(null)
    // console.log(todo,'todo');
    const toggleTodo = (e) => {
        e.stopPropagation()
        todoCallback('toggleTodo',todo)
        showContent()
    }
    const doneEdit = (e,type)=>{
        if(type == "keyup" && e.keyCode === 13 || type == "blur"){
            todoCallback('editTodo', {...todo,text:e.target.value})
            setEditFlag(false)
        }
    }
    const deleteClick = (e)=>{
        e.stopPropagation()

        // console.log(e,'deleteTodo')
        todoCallback('deleteTodo', todo)
    }
    const onDoubleClick = (e) => {
        e.preventDefault()
        setEditFlag(true)
    }
    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus()
            inputRef.current.select()
        }
        return ()=>inputRef
    })


    let todoContent
    const showContent = () => {
        if(!editFlag){
          todoContent = <>
                  <label onDoubleClick={(e) => onDoubleClick(e)}>{todo.text} </label>
                  <button className="destroy" onClick={(e) => deleteClick(e)}></button>
              </>

      } else {
          todoContent = <input className="edit"
                               defaultValue={todo.text}
                                ref={inputRef}
                               onBlur={(e) => doneEdit(e,'blur')}
                               onKeyUp={(e)=>doneEdit(e,'keyup')}
          />

      }
    }
    showContent()

  return(
      <li className={classNames('todo',{"completed":todo.done,editing:editFlag})}>
        <div className="view">
            <input checked={todo.done} className="toggle" type="checkbox" defaultValue={false}
                   onChange={(e)=>toggleTodo(e)} />
            {todoContent}
        </div>
      </li>
  )
}
export default TodoItem

