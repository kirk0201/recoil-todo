import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, createCategory, IToDo, toDoState } from "../atom";
import { setToDoStorageHandler } from "../todo.utils";
import { Button } from "./CreateToDo";

function ToDo({ id, text }: IToDo) {
  const [getToDos, setToDos] = useRecoilState(toDoState);
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
  const deleteBtnHandler = (e: any) => {
    setToDos((prevState) => {
      const newArray = prevState.filter((prev) => prev.id !== id);
      setToDoStorageHandler(newArray);
      return newArray;
    });
  };
  return (
    <Container>
      <select value={getCategoryState} onInput={input}>
        {getCategory.map((category, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
      </select>
      <span>{text}</span>
      <Button onClick={deleteBtnHandler}>삭제</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  margin-bottom: 10px;
  span {
    display: flex;
    align-items: center;
  }
`;
export default ToDo;
