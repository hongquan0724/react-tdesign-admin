import {useEffect, useState} from "react";
import TodoItem from "@/view/home/components/TodoList/TodoItem.jsx";
import classNames from "classnames";


const defalutList = [
    { text: 'star this repository', done: false},
    { text: 'fork this repository', done: false },
    { text: 'follow author', done: false },
    { text: 'react-admin', done: true },
    { text: 'react', done: true },
    { text: 'tdesign', done: true },
    { text: 'axios', done: true },
    { text: 'webpack', done: true }
]
const TodoList = ()=>{
    const [todoList,setTodoList] = useState(defalutList)
    const [filteredTodos,setfilteredTodos] = useState(defalutList)
    const [checkedall,setCheckedall] = useState(false)
    const [visibility,setVisibility] = useState('all')
    const filters = ['all','active','completed']
    const toggleAll = (e) => {
      setCheckedall(!checkedall)
     CheckedAllStatus('all',!checkedall)
    }
    const todoCallback = (type,params,index)=>{
        let changelist = []
        switch (type){
            case 'toggleTodo':
                params.done = !params.done
                changelist = todoList.map((m,i)=>{
                    return i == index ? params : m
                })
                break;
            case 'deleteTodo':
                changelist = todoList.toSpliced(index,1)
                break;
            case 'editTodo':
                changelist = todoList.map((m,i)=>{
                    return i == index ? params : m
                })
                break;
        }
        setTodoList(changelist)
        setfilteredTodos(changelist)
        CheckedAllStatus()
    }
    const CheckedAllStatus = (type,flag)=>{
        if(type == 'all'){
           const changelist =  todoList.map(m=>{
                m.done = flag
                return m
            })
            setTodoList(changelist)
            setfilteredTodos(changelist)
        }else {
            if(todoList.every(e=>e.done)){
                setCheckedall(true)
            }else {
                setCheckedall(false)
            }
        }
    }
    const addTodoList = (e) => {
        // console.log(e);
        if(e.keyCode === 13){
            const changelist = todoList.concat({text:e.target.value,done:false})
            setTodoList(changelist)
            setfilteredTodos(changelist)
            e.target.value = ''
      }
    }
    const selectClick = (e,type)=>{
        switch (type){
            case 'all':
                setfilteredTodos(todoList);break;
            case 'active':
                setfilteredTodos(todoList.filter(todo => !todo.done));break;
            case 'completed' :
                setfilteredTodos(todoList.filter(todo => todo.done));break;
        }
        setVisibility(type)
    }
    let checkedallContent, mainContent , footerContent

    if(todoList.length) {
        let remaining = todoList.reduce((pre,cur)=>{
            return pre += +cur.done
        },0)
        const filterslist = filters.map(m=>{
            return <li key={m}>
                <a className={classNames({"selected": visibility == m})}

                   onClick={(e) => selectClick(e, m)}>{m}</a>
            </li>
        })
        checkedallContent = <div className="toggle-all-box">
            <input id="toggle-all" className="toggle-all" type="checkbox"
                   onChange={(e) => toggleAll(e)}
                   checked={checkedall}/>
            <label className="toggle-label"></label>
        </div>

        mainContent = <section className="main">
            <ul className="todo-list custom-scrollbar">
                {filteredTodos.map((todo,todoindex)=>{
                    return  <TodoItem todo={todo}
                                      key={todoindex+'todo'}
                                      todoCallback={(type,params)=>todoCallback(type,params,todoindex)}
                    />
                })}

            </ul>
        </section>
        footerContent = <footer className="footer">
            <span className="todo-count">
                <strong>{remaining}&nbsp;</strong>
                items
            </span>
            <ul className="filters">{filterslist}</ul>
        </footer>
    }



    return (
        <section className="todoapp">
            <header className="header">
                {checkedallContent}
                <input className="new-todo" placeholder="Todo List"

                       onKeyUp={(e)=>addTodoList(e)}/>
            </header>
            {mainContent}
            {footerContent}
        </section>
    )
}

export default TodoList
