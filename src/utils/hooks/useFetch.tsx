import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  name: string;
  description: string;
}

export const useFetch = (baseUrl: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(baseUrl);
      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      const data = await res.json();
      setTodos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (name: string, description: string) => {
    try {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateTodo = async (id: string, name: string, description: string) => {
    try {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      const updatedTodo = await res.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [baseUrl]);

  return { todos, loading, error, addTodo, updateTodo, deleteTodo };
};
