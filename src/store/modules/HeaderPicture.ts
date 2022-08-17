import { Module, useStore } from "vuex"
import { computed } from "vue"
import { IGlobalState } from ".."
import { getHeaderPicture } from "@/api/http"

/** 题头图状态 */
export interface IHeaderPictureState {
    /** 图片地址 */
    src: String
    /** 图片偏移值 */
    offset: Number
    /** 图片渲染状态 */
    renderStatus: Boolean
}
const state:IHeaderPictureState = {
    src: 'undefined',
    offset: NaN,
    renderStatus: false
}

export const HeaderPicture: Module<IGlobalState,IHeaderPictureState> = {
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
export default function HeaderPictureApi() {
    const store = useStore();
    // store.getters
}