import { createStore } from 'redux'
import { createAction, createReducer, ActionType } from 'typesafe-actions'

export type TodoItem = {
  id: number;
  done: boolean;
  title: string;
}
export type TodoWithoutId = Omit<TodoItem, "id">;
export type UpdateTodoPayload = {
  todo: TodoItem | TodoWithoutId,
  index: number,
}
export type State = {
  todos: TodoItem[]
}

const addTodo = createAction('ADD_TODO')<TodoItem>();
const updateTodoByIndex = createAction('UPDATE_TODO')<UpdateTodoPayload>();
const deleteTodoByIndex = createAction('DELETE_TODO')<number>();

export const actions = {
  addTodo,
  updateTodoByIndex,
  deleteTodoByIndex,
}

export type RootAction = ActionType<typeof actions>;

const reducer = createReducer<State, RootAction>({ todos: [] })
  .handleAction(addTodo, (state, { payload }) => ({ todos: state.todos.concat(payload) }))
  .handleAction(updateTodoByIndex, (state, { payload }) => {
    return {
      todos: state.todos.map((todo, index) => 
        payload.index === index ? { ...payload.todo, id: index } : todo)
    }
  })
  .handleAction(deleteTodoByIndex, (state, { payload }) => {
    return { 
      todos: state.todos.filter((_, index) => index !== payload) 
    }
  })

export const store = createStore(reducer);


