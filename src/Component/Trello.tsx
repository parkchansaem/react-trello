import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";
import Board from "./Board";
import CreateBoard from "./CreateBoard";
import Delete from "./Delete";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function Trello() {
  const [todo, setTodo] = useRecoilState(toDoState);
  const onDrgEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === "Delete") {
      console.log("1");
      setTodo((allboard) => {
        const copyBoard = [...allboard[source.droppableId]];
        copyBoard.splice(source.index, 1);
        const result = { ...allboard, [source.droppableId]: copyBoard };
        localStorage.setItem("default", JSON.stringify(result));
        return result;
      });
    }
    if (destination?.droppableId === source.droppableId) {
      setTodo((allBoard) => {
        const copyBoard = [...allBoard[source.droppableId]];
        const taskObj = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination.index, 0, taskObj);
        const result = { ...allBoard, [source.droppableId]: copyBoard };
        localStorage.setItem("default", JSON.stringify(result));
        return result;
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setTodo((allboard) => {
        const sourceBoard = [...allboard[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...allboard[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, taskObj);
        const result = {
          ...allboard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
        localStorage.setItem("default", JSON.stringify(result));
        return result;
      });
    }

    /*  if (!destination) return;
    setTodo((oldToDos) => {
      const copyTodo = [...oldToDos];
      copyTodo.splice(source.index, 1);
      copyTodo.splice(destination.index, 0, draggableId);
      return copyTodo;
    }); */
  };
  /* console.log(Object.keys(todo).map((boardId) => todo[boardId])); */
  return (
    <DragDropContext onDragEnd={onDrgEnd}>
      <Wrapper>
        <Header>
          <CreateBoard />
          <Delete />
        </Header>
        <Boards>
          {Object.keys(todo).map((boardId) => (
            <Board boardId={boardId} key={boardId} todo={todo[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default Trello;
