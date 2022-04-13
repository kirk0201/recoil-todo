import { IToDo, LOCAL_CATEGORY, LOCAL_TODO } from "./atom";

export const setToDoStorageHandler = (result: IToDo[]) => {
  return localStorage.setItem(LOCAL_TODO, JSON.stringify(result));
};

export const setCategoryLocalHandler = (result: []) => {
  return localStorage.setItem(LOCAL_CATEGORY, JSON.stringify(result));
};
