import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react'
import TodoList from './components/TodoList'
import todo_image from "../assets/to-do-list.png"

function App(props){
  let [todo, setTodo] = useState(localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []);
  const textRef = useRef(null);

  const addTodo = () => {
    const text = textRef.current.value.trim()
    if (text === "") return null;

    const data = {
      id: Date.now(),
      text: text,
      isComplete: false
    }

    setTodo([...todo, data])
    textRef.current.value = ""
  }

  const deleteTodo = (id) => {
    setTodo((prevValue) => {
      return prevValue.filter((value) => value.id !== id)
    })
  }

  const toggle = (id) => {
    setTodo((prev) => {
      return prev.map((value) => {
        if (value.id === id) {
          return {...value, isComplete: !value.isComplete}
        }
        return value
      })
    })
  }

  const editTodo = (id) => {
    let newText = prompt("Update to-do")
    setTodo((prev) => {
      return prev.map((value) => {
        if (value.id === id) {
          return { ...value, text: newText.trim() }
        }
        return value
      })
    })
  }

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo))
  }, [addTodo])

  return (
    <div
      className='h-screen w-screen flex items-center justify-center text-black'>
      <div className='w-96 h-[450px] bg-yellow-50 rounded-lg overflow-y-auto'>
        <div className='flex gap-x-3 mt-4 ml-4'>
          <img src={todo_image} className='w-4'/>
          <h1 className='font-bold text-lg'>
            To-Do List
          </h1>
        </div>
        <div className='flex items-center justify-center gap-x-2 mt-4 mb-4'>
          <input type='text' className='bg-gray-200 w-[300px] h-8 rounded-lg outline-none px-3' ref={textRef}/>
          <button className='bg-gray-200 h-8 w-12 rounded-lg hover:bg-blue-500 font-bold' onClick={addTodo}>Add</button>
        </div>
        <div>
          {
            todo.map((value, index) => {
               return <TodoList text={value.text} key={value.id} index={index} id={value.id} isComplete={value.isComplete} deleteTodo={deleteTodo} toggle={toggle} editTodo={editTodo}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App