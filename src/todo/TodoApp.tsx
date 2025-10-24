import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useFetch } from "../utils/hooks/useFetch";

export default function TodoApp() {
  const { todos, addTodo, updateTodo, deleteTodo } = useFetch(
    "https://c383442fdda6b070.mokky.dev/todo"
  );

  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Todo List</h1>
      <div className="w-full max-w-xl rounded-lg">
        <TodoForm onAdd={addTodo} />
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 mb-6">
          <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
        </div>
      </div>
    </div>
  );
}
