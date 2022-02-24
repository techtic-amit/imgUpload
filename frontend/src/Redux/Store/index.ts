import { createStore } from "redux";
import add from "../reducer/add";

export const store = createStore(add);
