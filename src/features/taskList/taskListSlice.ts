import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  text: string;
  priority: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: loadTasksFromLocalStorage(),
};

function loadTasksFromLocalStorage(): Task[] {
  const tasksJson = localStorage.getItem('tasks');
  return tasksJson ? JSON.parse(tasksJson) : [];
}

function saveTasksToLocalStorage(tasks: Task[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export const addTaskSlice = createSlice({
  name: 'addTask',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string, priority: string }>) => {
      const { text, priority } = action.payload;
      const newTask: Task = {
        id: uuidv4(),
        text,
        priority
      };
      state.tasks.unshift(newTask);
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== id);
      saveTasksToLocalStorage(state.tasks);
    }
  }
});

export const { addTask, deleteTask } = addTaskSlice.actions;

export default addTaskSlice.reducer;
