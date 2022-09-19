import { Module } from "vuex"
import { IGlobalState } from ".."
import * as Types from '@/store/action-type'
import { createNote } from "@/api/http"
import { NewNoteParam } from "@/type"
interface Signboard {
  /** 图片地址 */
  src: String
  /** 图片偏移值 */
  offset: Number
  /** 图片渲染状态 */
  renderStatus: Boolean
}
/** 题头图状态 */
export interface INoteState {
  title: String,
  content: String,
  signboard: Signboard,
  abbreviation: String,
  state: Number,
  createAt: String,
  updateAt: String,
}
const state:INoteState = {
  title: '',
  content: '',
  signboard: {
    src: 'undefined',
    offset: NaN,
    renderStatus: false
  },
  abbreviation: '',
  state: NaN,
  createAt: 'Date',
  updateAt: 'Date',
}

export const Note: Module<INoteState,IGlobalState> = {
    namespaced:true,
    state,
    getters:{

    },
    mutations:{

    },
    actions:{
      async [Types.FETCH_NEW_NOTE]({commit},params:NewNoteParam) {
        const { uid, pid } = params
        await createNote(uid,pid)
      }
    }
}

// /** 进一步封装 */
// export default function SignboardApi() {
//     const store = useStore();
//     /** 获取常用图片 */
    
//     /** 获取上传图片 */
//     /**  */
// }

// /** 常用图片项有两个图片来源，一是公共的图片库 */