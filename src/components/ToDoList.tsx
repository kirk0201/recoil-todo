import CreateToDo from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import ToDo from "./ToDo";
import {
  categoryState,
  createCategory,
  toDoSelector,
  toDoState,
} from "../atom";
import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  createCategory: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const { register, handleSubmit, getValues, setValue } = useForm<IForm>();
  const [category, setCategory] = useRecoilState(createCategory);
  const [getCategoryState, setCategoryState] = useRecoilState(categoryState);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategoryState(e.currentTarget.value);
  };

  console.log("category", category);
  console.log("getCategoryState", getCategoryState);
  const categoryHandler = () => {
    setCategory((prev) => [...prev, getValues("createCategory")]);
    setValue("createCategory", "");
  };
  console.log(getValues("createCategory"));
  return (
    <div>
      <h1>To Dos</h1>
      <form onSubmit={handleSubmit(categoryHandler)}>
        <input {...register("createCategory", { required: true })}></input>
        <button>CreateCategory</button>
      </form>
      <hr />
      <select value={getCategoryState} onInput={onInput}>
        {category.map((cate, i) => (
          <option key={i} value={cate}>
            {cate}
          </option>
        ))}
      </select>
      <CreateToDo />

      <ul>
        {/* {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))} */}
      </ul>
    </div>
  );
}

export default ToDoList;
