import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, createCategory, IToDo, toDoState } from "../atom";

function ToDo({ id, text }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const getCategory = useRecoilValue(createCategory);
  const [getCategoryState] = useRecoilState(categoryState);

  const input = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setToDos((prev) =>
      prev.map((toDo) => {
        if (toDo.id === id) {
          return {
            ...toDo,
            category: value as IToDo["category"],
          };
        }
        return toDo;
      })
    );
  };

  return (
    <li>
      <span>{text}</span>
      <select value={getCategoryState} onInput={input}>
        {getCategory.map((category, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
      </select>
      {/* {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          TODO
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          DOING
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          DONE
        </button>
      )} */}
    </li>
  );
}
export default ToDo;
