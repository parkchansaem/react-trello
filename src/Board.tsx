import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggbleCard from "./DraggbleCard";
const Wrapper = styled.div`
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
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

interface ISnap {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IBoardProps {
  todo: string[];
  boardId: string;
}

function Board({ todo, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {todo.map((todo, index) => (
              <DraggbleCard key={todo} todo={todo} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
