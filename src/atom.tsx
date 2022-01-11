import { stringify } from "querystring";
import { atom } from "recoil";

export interface ITodo {
  Id: number;
  text: string;
}

interface ITodoState {
  [key: string]: ITodo[];
}

let output = localStorage.getItem("default");
let localData = JSON.parse(output as any);

export const toDoState = atom<ITodoState>({
  key: "todo",
  default: localData,
});
if (localData === null) {
  const defaultValue = {
    "To Do": [],
    Doing: [],
    Done: [],
  };
  localStorage.setItem("default", JSON.stringify(defaultValue));
}
