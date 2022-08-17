import { createStore } from "vuex";
import { HeaderPicture } from "./modules/HeaderPicture";
export interface IGlobalState {

}
export default createStore({
  // state: {},
  // getters: {},
  // mutations: {},
  // actions: {},
  modules: {
    HeaderPicture
  },
});
