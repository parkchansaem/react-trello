import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Tap = styled.div`
  height: 150px;
  width: 200px;
  border-radius: 30px;
  background-color: transparent;
  display: flex;
`;
const Area = styled.div<ISnap>`
  flex-grow: 3;
  padding: 30px;
  padding-left: 100px;
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
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
            <FontAwesomeIcon icon={faTrash} size={"5x"} color={"white"} />
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Tap>
  );
}

export default Delete;
