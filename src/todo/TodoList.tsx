import React, { useState } from "react";
import type { Todo } from "../utils/hooks/useFetch";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, name: string, description: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setName(todo.name);
    setDescription(todo.description);
  };

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className=" p-4 rounded shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2"
        >
          {editingId === todo.id ? (
            <>
              <input
                className="border rounded px-2 py-1 flex-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border rounded px-2 py-1 flex-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-800 text-white px-3 py-1 rounded"
                  onClick={() => {
                    onUpdate(todo.id, name, description);
                    setEditingId(null);
                  }}
                >
                  Сохранить
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
                  onClick={() => setEditingId(null)}
                >
                  Отмена
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1">
                <strong>{todo.name}</strong>: {todo.description}
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => startEdit(todo)}
                >
                  Редактировать
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => onDelete(todo.id)}
                >
                  Удалить
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
