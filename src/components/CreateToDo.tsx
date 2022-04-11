import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IToDo, toDoState } from "../atom";
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  console.log("create", category);
  const submitHandler = (data: IForm) => {
    console.log(data.toDo);
    setToDos((toDos) => [
      {
        id: Date.now(),
        text: data.toDo,
        category: category as IToDo["category"],
      },
      ...toDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input {...register("toDo")}></input>
      <button>Add</button>
    </form>
  );
}
export default CreateToDo;
