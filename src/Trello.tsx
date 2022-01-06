import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;
const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
`;
function Trello() {
  const [todo, setTodo] = useRecoilState(toDoState);
  const onDrgEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) return;
    setTodo((oldToDos) => {
      const copyTodo = [...oldToDos];

      copyTodo.splice(source.index, 1);
      copyTodo.splice(destination.index, 0, draggableId);

      return copyTodo;
    });
  };
  return (
    <DragDropContext onDragEnd={onDrgEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {todo.map((todo, index) => (
                  <Draggable key={todo} draggableId={todo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                      >
                        {todo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default Trello;
