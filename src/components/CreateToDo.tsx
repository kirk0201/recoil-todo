import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, IToDo, toDoState } from "../atom";
import { setToDoStorageHandler } from "../todo.utils";
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [getToDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  console.log("create", category);
  const submitHandler = (data: IForm) => {
    console.log(data.toDo);
    setToDos((toDos) => {
      const newToDo = [
        {
          id: Date.now(),
          text: data.toDo,
          category: category as IToDo["category"],
        },
        ...toDos,
      ];
      console.log("getToDo", newToDo);
      setToDoStorageHandler(newToDo);
      return newToDo;
    });
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input {...register("toDo", { required: true })}></input>
      <button>Add</button>
    </form>
  );
}
export default CreateToDo;
