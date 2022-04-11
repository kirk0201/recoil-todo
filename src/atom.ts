import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export const createCategory = atom({
  key: "createCategory",
  default: ["TO_DO", "DOING", "DONE"],
});

export const categoryState = atom({
  key: "categoryState",
  default: "TO_DO",
});
export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const category = get(categoryState);
    const toDos = get(toDoState);

    return toDos.filter((toDo) => toDo.category.includes(category));
  },
});
