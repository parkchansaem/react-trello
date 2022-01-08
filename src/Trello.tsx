import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import Board from "./Board";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodo((allBoard) => {
        const copyBoard = [...allBoard[source.droppableId]];
        const taskObj = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination.index, 0, taskObj);
        return { ...allBoard, [source.droppableId]: copyBoard };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setTodo((allboard) => {
        const sourceBoard = [...allboard[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...allboard[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, taskObj);
        return {
          ...allboard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
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
  console.log(Object.keys(todo).map((boardId) => todo[boardId]));
  return (
    <DragDropContext onDragEnd={onDrgEnd}>
      <Wrapper>
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
