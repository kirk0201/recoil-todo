import CreateToDo, { Button } from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import ToDo from "./ToDo";
import {
  categoryState,
  createCategory,
  LOCAL_CATEGORY,
  toDoSelector,
  toDoState,
} from "../atom";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { setCategoryLocalHandler } from "../todo.utils";
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

  const categoryHandler = () => {
    setCategory((prev) => {
      const newArray = [...prev, getValues("createCategory")];
      setCategoryLocalHandler(newArray);
      return newArray;
    });
    setValue("createCategory", "");
  };

  const categoryDeleteHandler = () => {
    setCategory((prevState) => {
      const newArray = prevState.filter((prev) => prev !== getCategoryState);
      setCategoryLocalHandler(newArray);
      return newArray;
    });
  };
  return (
    <Container>
      <Wrapper>
        <h1>To Dos</h1>
        <Contents>
          <form onSubmit={handleSubmit(categoryHandler)}>
            <input
              placeholder="카테고리를 추가하세요"
              {...register("createCategory", { required: true })}
            ></input>
            <Button>추가</Button>
          </form>
        </Contents>
        <hr />
        <Contents>
          <select value={getCategoryState} onInput={onInput}>
            {category.map((cate, i) => (
              <option key={i} value={cate}>
                {cate}
              </option>
            ))}
          </select>
          <Button onClick={categoryDeleteHandler}>삭제</Button>
        </Contents>
        <Contents>
          <CreateToDo />
        </Contents>
        <Contents>
          <ToDoListContainer>
            {toDos.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ToDoListContainer>
        </Contents>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Wrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
  h1 {
    display: flex;
    justify-content: center;
  }
`;
const Contents = styled.div`
  display: flex;
  justify-content: center;
`;
const ToDoListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export default ToDoList;
