import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";

const Form = styled.form`
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 80%;
    height: 30px;
  }
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IForm {
  toDo: string;
}

function CreateBoard() {
  const setTodo = useSetRecoilState(toDoState);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onVailed = ({ toDo }: IForm) => {
    console.log(toDo);
    setTodo((allboard) => {
      const result = { ...allboard, [toDo]: [] };
      localStorage.setItem("default", JSON.stringify(result));
      return result;
    });
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onVailed)}>
      <Title>ADD</Title>
      <input
        {...register("toDo", { required: true })}
        type="text"
        placeholder={`add on the`}
      ></input>
    </Form>
  );
}

export default CreateBoard;
