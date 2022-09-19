import { createStore } from "vuex"
import { Note, INoteState } from './modules/Note'
// import { Signboard } from "./modules/Signboard"
// import { SignboardLibrary } from "./modules/SignboardLibrary"
// import { SignboardLibraryList } from "./modules/SignboardLibraryList"

export interface IGlobalState {
  INoteState:INoteState
}
export default createStore({
  modules: {
    Note
  },
});

