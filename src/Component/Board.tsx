import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atom";
import Delete from "./Delete";
import DraggbleCard from "./DraggbleCard";

const Wrapper = styled.div<{ isDragging: Boolean }>`
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
const Area = styled.div<ISnap>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
const DELETE = styled.button`
  display: flex;
  position: absolute;
  right: 5px;
  border-radius: 5px;
`;

interface ISnap {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IBoardProps {
  todo: ITodo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ todo, boardId, index }: IBoardProps) {
  const setTodo = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onVailed = ({ toDo }: IForm) => {
    const newTodo = {
      Id: Date.now(),
      text: toDo,
    };
    setTodo((allboard) => {
      const result = {
        ...allboard,
        [boardId]: [...allboard[boardId], newTodo],
      };
      localStorage.setItem("default", JSON.stringify(result));
      return result;
    });
    setValue("toDo", "");
  };
  const onclick = () => {
    setTodo((allboard) => {
      const copyboard = { ...allboard };
      delete copyboard[boardId];
      localStorage.setItem("default", JSON.stringify(copyboard));
      return copyboard;
    });
  };
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Title {...provided.dragHandleProps}>{boardId}</Title>
          <DELETE onClick={onclick}>X</DELETE>
          <Form onSubmit={handleSubmit(onVailed)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`add on the ${boardId} `}
            ></input>
          </Form>

          <Droppable droppableId={boardId}>
            {(magic, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {todo.map((todo, index) => (
                  <DraggbleCard
                    key={todo.Id}
                    todoId={todo.Id}
                    todoText={todo.text}
                    index={index}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Board);
