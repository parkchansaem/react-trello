import { atom } from "recoil";

export const toDoState = atom({
  key: "todo",
  default: ["a", "b", "c", "d", "e", "f"],
});
