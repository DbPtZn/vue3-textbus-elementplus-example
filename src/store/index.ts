import { createStore } from "vuex"
import { Signboard, ISignboardState } from "./modules/Signboard"
import { SignboardLibrary, ISignboardLibraryState } from "./modules/SignboardLibrary"

export interface IGlobalState {
  // SignboardState:ISignboardState,
  // SignboardLibraryState:ISignboardLibraryState
}
export default createStore({
  // state: {},
  // getters: {},
  // mutations: {},
  // actions: {},
  modules: {
    Signboard,
    SignboardLibrary
  },
});

