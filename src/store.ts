import { create } from "zustand";
// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Zustand Implementation
type Store = {
  todos: Todo[];
  newTodo: string;
  addTodo: () => void;
  setNewTodo: (text: string) => void;
};

const useStore = create<Store>(
  (set): Store => ({
    todos: [],
    newTodo: "",
    addTodo: () =>
      set((state:any) => ({
        ...state,
        todos: addTodo(state.todos, state.newTodo),
        newTodo: "",
      })),
    setNewTodo(text: string) {
      set((state:any) => ({
        ...state,
        newTodo: text,
      }));
    },
  })
);

export default useStore;
