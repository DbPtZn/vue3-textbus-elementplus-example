import { Module, useStore } from "vuex"
import { computed } from "vue"
import { IGlobalState } from ".."
import { getSignboard } from "@/api/http"
import { createSignboardLibrary } from "@/api/http/SignboardLibrary"
// import  { Tab }  from "@/src/components/page/ImageSelectOption/ImageSelectDialog.vue"

interface content {
    title: string
    url: string
}

/** 招牌库数据状态 */
export interface ISignboardLibraryState  {
    _id?: string
    /** 标签名 */
    label: string,
    /** name值 */
    name: string,
    /** 标签页内容 */
    content: content[],
}

const state:ISignboardLibraryState = {
    label: '',
    name: '1',
    content: []
}

export const SignboardLibrary: Module<ISignboardLibraryState,IGlobalState> = {
    namespaced:true,
    state,
    getters:{
        GET_SIGNBOARD_LIBRARY_ID(state){
            return state._id
        }
    },
    mutations:{
        SET_SIGNBOARD_LIBRARY_ID(state,payload){
            state._id = payload
        }
    },
    actions:{
        async REQ_CREATE_SIGNBOARD_LIBRARY({commit},name:string){
            const res:any = await createSignboardLibrary(name)
            console.log(res)
            commit('SET_SIGNBOARD_LIBRARY_ID',res.data._id)
        }

    }
}

/** 进一步封装 */
export function SignboardLibraryApi() {
    const store = useStore();
    /** 创建新招牌照片库 */
    return{
        create : async (name:string) => {
            await store.dispatch(`SignboardLibrary/REQ_CREATE_SIGNBOARD_LIBRARY`,name)
            return store.getters[`SignboardLibrary/GET_SIGNBOARD_LIBRARY_ID`]
        }
        //delete
        //update
    }
}

/** 常用图片项有两个图片来源，一是公共的图片库 */