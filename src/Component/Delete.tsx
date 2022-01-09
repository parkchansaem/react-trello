import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Tap = styled.div`
  height: 150px;
  width: 200px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  position: absolute;
  top: 0;
  text-align: center;
`;
const Text = styled.h1`
  font-size: 50px;
  padding: 30px;
`;

interface IBoardid {
  boardId: string;
}
function Delete() {
  return (
    <Tap>
      <Text>Delete</Text>
      <Droppable droppableId="Delete">
        {(magic, snapshot) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Tap>
  );
}

export default Delete;
