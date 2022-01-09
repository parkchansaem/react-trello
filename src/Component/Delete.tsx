import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Tap = styled.div`
  height: 150px;
  width: 200px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  left: 50%;
`;
const Text = styled.span`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
  justify-content: center;
`;
interface ISnap {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

function Delete() {
  return (
    <Tap>
      <Droppable droppableId="Delete">
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            <Text>Delete</Text>
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Tap>
  );
}

export default Delete;
