import React, { useState } from 'react';
import { Todo } from './Todo';
import './App.css';

export type TodoItem = {
  id: number;
  done: boolean;
  title: string;
}

export type TodoWithoutId = Omit<TodoItem, "id">;

function App() {
  const getEmptyTodo = (): TodoWithoutId => ({ done: false, title: '' });
  const [newTodo, setNewTodo] = useState<TodoWithoutId>(getEmptyTodo());
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    setTodos(todos.concat({ ...newTodo, id: todos.length }));
    setNewTodo(getEmptyTodo());
  };
  const updateTodoByIndex = (todo: TodoWithoutId, indexToUpdate: number) => {
    setTodos(todos.map((oldTodo, index) => indexToUpdate === index ? { ...todo, id: index } : oldTodo));
  }
  const deleteTodoByIndex = (indexToDelete: number) => setTodos(todos.filter((_, index) => index !== indexToDelete));
  

  return (
    <div className="App">
      {
        todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo} 
            updateTodo={todoToUpdate => updateTodoByIndex(todoToUpdate, index)} 
          >
            <button onClick={() => deleteTodoByIndex(index)}>
              Delete
            </button>
          </Todo>
        ))
      }

      <Todo todo={newTodo} updateTodo={setNewTodo} >
        <button onClick={addTodo}>
          Add
        </button>
      </Todo>
    </div>
  );
}

export default App;
