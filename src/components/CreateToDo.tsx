import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, IToDo, toDoState } from "../atom";
import { setToDoStorageHandler } from "../todo.utils";
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [getToDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const submitHandler = (data: IForm) => {
    setToDos((toDos) => {
      const newToDo = [
        {
          id: Date.now(),
          text: data.toDo,
          category: category as IToDo["category"],
        },
        ...toDos,
      ];
      setToDoStorageHandler(newToDo);
      return newToDo;
    });
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input
        placeholder="TODO를 추가하세요"
        {...register("toDo", { required: true })}
      ></input>
      <Button>추가</Button>
    </form>
  );
}
export const Button = styled.button`
  border: none;
  color: white;
  font-weight: 700;
  padding: 5px 10px;
  background-color: #348de0;
  border-radius: 15px;
`;
export default CreateToDo;
