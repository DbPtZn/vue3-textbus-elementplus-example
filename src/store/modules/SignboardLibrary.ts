import { Module, useStore } from "vuex"
import { computed } from "vue"
import { IGlobalState } from ".."
import { getSignboard } from "@/api/http"
// import  { Tab }  from "@/src/components/page/ImageSelectOption/ImageSelectDialog.vue"

interface content {
    name: string
    url: string
}

/** 招牌库数据状态 */
export interface ISignboardLibraryState  {
    _id?: string
    /** 主题 */
    title: string,
    /** name值 */
    name: string,
    /** 标签页内容 */
    content: content[],
}
const state:ISignboardLibraryState = {
    title: '',
    name: '1',
    content: []
}

export const SignboardLibrary: Module<ISignboardLibraryState,IGlobalState> = {
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
// export default function SignboardApi() {
//     const store = useStore();
//     /** 获取常用图片 */
    
//     /** 获取上传图片 */
//     /**  */
// }

/** 常用图片项有两个图片来源，一是公共的图片库 */