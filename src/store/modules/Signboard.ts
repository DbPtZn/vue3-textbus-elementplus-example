import { Module, useStore } from "vuex"
import { computed } from "vue"
import { IGlobalState } from ".."
import { getSignboard } from "@/api/http"

/** 题头图状态 */
export interface ISignboardState {
    /** 图片地址 */
    src: String
    /** 图片偏移值 */
    offset: Number
    /** 图片渲染状态 */
    renderStatus: Boolean
}
const state:ISignboardState = {
    src: 'undefined',
    offset: NaN,
    renderStatus: false
}

export const Signboard: Module<IGlobalState,ISignboardState> = {
    namespaced:true,
    state,
    getters:{

    },
    mutations:{

    },
    actions:{


    }
}

/** 进一步封装 */
export default function SignboardApi() {
    const store = useStore();
    /** 获取常用图片 */
    
    /** 获取上传图片 */
    /**  */
}

/** 常用图片项有两个图片来源，一是公共的图片库 */