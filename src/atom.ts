import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export const LOCAL_RECOIL_TODO = "LOCAL_RECOIL_TODO";
export const LOCAL_CATEGORY = "LOCAL_CATEGORY";

const getCategoryStorageHandler = localStorage.getItem(LOCAL_CATEGORY) || "[]";
export const parsedCategoryStorage = JSON.parse(getCategoryStorageHandler);

const getToDoStorageHandler = localStorage.getItem(LOCAL_RECOIL_TODO) || "[]";
const parsedToDotorage = JSON.parse(getToDoStorageHandler);

export const createCategory = atom({
  key: "createCategory",
  default: [...parsedCategoryStorage],
});

export const categoryState = atom({
  key: "categoryState",
  default: "TO_DO",
});
export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: parsedToDotorage,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const category = get(categoryState);
    const toDos = get(toDoState);

    return toDos.filter((toDo) => toDo.category.includes(category));
  },
});
