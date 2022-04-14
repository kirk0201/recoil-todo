import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export const LOCAL_RECOIL_TODO = "LOCAL_RECOIL_TODO";
export const LOCAL_CATEGORY = "LOCAL_CATEGORY";

const getCategoryStorageHandler = localStorage.getItem(LOCAL_CATEGORY) || "[]";
export const parsedCategoryStoraget = JSON.parse(getCategoryStorageHandler);

const getToDoStorageHandler = localStorage.getItem(LOCAL_RECOIL_TODO) || "[]";
export const parsedCategoryStorage = () => {
  if (getToDoStorageHandler === "[]") {
    return `["TO_DO", "DOING", "DONE"]`;
  }
  return JSON.parse(getToDoStorageHandler);
};

export const createCategory = atom({
  key: "createCategory",
  default: [...parsedCategoryStoraget],
});

export const categoryState = atom({
  key: "categoryState",
  default: "TO_DO",
});
export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: parsedCategoryStorage(),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const category = get(categoryState);
    const toDos = get(toDoState);
    console.log("toDos : ", toDos);
    console.log("category : ", category);
    return toDos?.filter((toDo) => toDo.category.includes(category));
  },
});
