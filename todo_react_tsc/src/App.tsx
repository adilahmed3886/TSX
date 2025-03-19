import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAdd = () => {
    setTodos([
      ...todos,
      { id: todos.length + 1, text: input, completed: false },
    ]);
    setInput("");
  };

  return (
    <div className="bg-zinc-900 flex h-screen flex-col items-center p-10">
      <h1 className="text-red-500 text-2xl font-bold my-5">
        Todo List with React
      </h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a todo"
          className="text-white bg-zinc-700 rounded-md py-2 px-2 w-[30vw] "
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleAdd() : null)}
        />
        <button
          onClick={handleAdd}
          className="bg-black text-red-500 px-4 py-2 rounded-md w-20 hover:bg-red-500 hover:text-white"
        >
          Add
        </button>
      </div>
      <div className="todosContainer flex flex-col gap-2 mt-3">
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="flex gap-2 mt-4 justify-between items-center h-[40px] w-[70vw]"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleComplete(todo.id)}
                className="cursor-pointer h-[40px] w-[40px]"
              />
              <input
                type="text"
                value={todo.text}
                readOnly={true}
                className={`text-center w-full h-[40px] font-bold text-xl rounded-md py-2 px-2 ${todo.completed ? "line-through text-black bg-red-500" : "text-white bg-zinc-700"}`}
              />
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-black text-red-500 h-[40px] cursor-pointer px-4 py-2 rounded-md w-20 hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
