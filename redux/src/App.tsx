import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "./slices/todoSlice";

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col items-center py-20 px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-8">Todo Redux</h1>

      <div className="w-full max-w-2xl flex items-center gap-4 mb-8">
        <input
          type="text"
          className="flex-grow rounded-md p-2 bg-zinc-800 text-white"
          placeholder="Add a todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <button
          className="py-2 px-4 rounded-md bg-black text-red-500 focus:outline-none hover:bg-red-600 hover:text-white whitespace-nowrap"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        {todos.length === 0 ? (
          <p className="text-white/70 text-center py-4">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-4 w-full bg-zinc-800/50 p-3 rounded-lg"
            >
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="w-6 h-6 accent-red-500 cursor-pointer"
              />
              <input
                type="text"
                value={todo.text}
                onChange={(e) =>
                  dispatch(updateTodo({ id: todo.id, text: e.target.value }))
                }
                className={`flex-grow bg-zinc-700 rounded-md p-2 text-center uppercase focus:outline-none focus:bg-zinc-600 ${
                  todo.isCompleted ? "line-through text-white/50" : "text-white"
                }`}
              />
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="py-2 px-3 rounded-md bg-black text-red-500 focus:outline-none hover:bg-red-600 hover:text-white"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
