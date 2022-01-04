import { createStore } from "redux";
import rootReducer from "./reducers";
// Utworzenie komponentu do współdzielenia stanu
const store =createStore(rootReducer);

export default store;