import { IToDo, LOCAL_CATEGORY, LOCAL_RECOIL_TODO } from "./atom";

export const setToDoStorageHandler = (result: IToDo[]) => {
  return localStorage.setItem(LOCAL_RECOIL_TODO, JSON.stringify(result));
};

export const setCategoryLocalHandler = (result: Array<string>) => {
  return localStorage.setItem(LOCAL_CATEGORY, JSON.stringify(result));
};
