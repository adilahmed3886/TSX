import { useState } from 'react'
import { useTodoContext } from './context/todoContext'

function App() {
  const [text, setText] = useState('')
  const { todos ,addTodo, updateTodo, deleteTodo, toggleTodo } = useTodoContext()

  
  

  return (
    <>
      <div className='w-full h-screen bg-zinc-900 p-8 flex pt-20 items-center flex-col gap-8 text-red-500 font-bold'>
        <h1 className='text-4xl'>Todo Context List</h1>
        <div className='flex justify-center items-center gap-4 h-[50px] w-[40vw]'>
          <input 
          type="text" 
          placeholder='Add a todo'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='w-full h-full rounded-md p-2 bg-zinc-800 text-red-300 focus:outline-none' />
          <button 
          onClick={() => {
            addTodo(text)
            setText('')
          }}
          className='bg-black text-red-500 hover:bg-red-500 hover:text-black transition-all duration-300 px-4 py-2 h-full text-xl cursor-pointer rounded-md'>Add</button>
        </div>
        <div className='w-full p-8 flex flex-col items-center justify-center'>
          {todos.map((todo) => {
            return (
              <div key={todo.id} className='w-[50vw] h-[60px] rounded-md p-2 gap-4 flex items-center justify-between'>
                <input 
                type="checkbox" 
                name="" id=""
                onChange={() => toggleTodo(todo.id)} 
                className='w-10 h-10 rounded-md bg-zinc-800 text-red-300 focus:outline-none text-center' />
                <input 
                type="text" 
                value={todo.text} 
                onChange={(e) => updateTodo(todo.id, e.target.value)} 
                className={`w-full h-full rounded-md uppercase p-2 bg-zinc-800 text-red-300 focus:outline-none text-center ${todo.isCompleted ? 'line-through text-red-500' : ''}`} />
                <button 
                onClick={() => deleteTodo(todo.id)} 
                className='bg-black text-red-500 hover:bg-red-500 hover:text-black transition-all duration-300 px-4 py-2 h-full text-xl cursor-pointer rounded-md'>❌</button>
              </div>
            )
          })}
        </div>
          
        
      </div>

    </>
  )
}

export default App
