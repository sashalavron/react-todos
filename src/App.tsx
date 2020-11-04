import React, { Dispatch, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootAction, State, actions, TodoWithoutId } from './store';
import './App.css';
import { Todo } from './Todo';

const { updateTodoByIndex, deleteTodoByIndex, addTodo } = actions;
const selectTodos = (state: State) => state.todos;

function App() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch<Dispatch<RootAction>>();

  const getEmptyTodo = (): TodoWithoutId => ({ done: false, title: '' });
  const [newTodo, setNewTodo] = useState<TodoWithoutId>(getEmptyTodo());
  const addNewTodo = () => {
    dispatch(addTodo({ ...newTodo, id: todos.length }));
    setNewTodo(getEmptyTodo());
  }

  return (
      <div className="App">
        {
          todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo} 
              updateTodo={todoToUpdate => dispatch(updateTodoByIndex({
                todo: todoToUpdate,
                index,
              }))} 
            >
              <button onClick={() => dispatch(deleteTodoByIndex(index))}>
                Delete
              </button>
            </Todo>
          ))
        }

        <Todo todo={newTodo} updateTodo={setNewTodo} >
          <button onClick={addNewTodo}>
            Add
          </button>
        </Todo>
      </div>
  );
}

export default App;
