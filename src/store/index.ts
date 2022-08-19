import { createStore } from "vuex";
import { Signboard } from "./modules/Signboard";
export interface IGlobalState {

}
export default createStore({
  // state: {},
  // getters: {},
  // mutations: {},
  // actions: {},
  modules: {
    Signboard
  },
});
