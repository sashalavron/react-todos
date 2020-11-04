
import React, { ChangeEvent } from 'react';
import { TodoWithoutId } from './store';

type TodoProps = {
  todo: TodoWithoutId;
  updateTodo: (todo: TodoWithoutId) => void;
}

export const Todo: React.FC<TodoProps> = ({ updateTodo, todo, children }) => {
  const updateTodoTitle = (event: ChangeEvent<HTMLInputElement>) => {
    updateTodo({ ...todo, title: event.target.value })
  }
  const updateTodoIsDone = (event: ChangeEvent<HTMLInputElement>) => {
    updateTodo({ ...todo, done: event.target.checked })
  }

  return (
    <div>
      <input type="checkbox" onChange={updateTodoIsDone} checked={todo.done} />
      <input value={todo.title} onInput={updateTodoTitle} />
      { children }
    </div>
  )
}
  