<template>
    <el-dialog  @close="$emit('dialogClose')">
        <el-tabs 
        v-model="editableTabsValue"
        type="card" 
        class="demo-tabs"
        addable
        :closable="closable"
        @edit="handleTabsEdit"
        >
            <el-tab-pane 
                v-for="item in editableTabs"
                :key="item.name"
                :name="item.name"
            >
            <template #label >
                <Label
                    :_id="item._id" 
                    :content="item.title" 
                    @input="closable = false"
                    @blur="closable = true"
                    @rename="rename"
                />
            </template>
            <Upload
                :data = item.content  
                :action="'#'"
                @select="useImage"
                @remove="removeImage"
                />
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import type { PropType } from 'vue'
import Upload from './Upload.vue'
import Label from './Label.vue'
import { UploadFile } from 'element-plus'
import axios from 'axios'

interface content {
    name: string
    url: string
}
interface Tab {
    _id?: string
    title: string,
    name: string,
    content: content[],
}

export default defineComponent({
    emits:['dialogClose','apply','rename',],
    props:{
        data:{
            type: Object as PropType<Tab[]>,
            default:[]
        },
        /** 新增标签页请求地址  数据：`${++tabIndex}` 返回：新标签页id */
        addTabURI:{
            type:String,
            default:"#"
        },
        /** 移除标签页请求地址  数据：标签页id  返回：成功/失败 */
        removeTabURI:{
            type:String,
            default:"#"
        }
    },
    components:{
        Upload, Label
    },
    setup(props,{emit}){

        let tabIndex = props.data ? props.data.length : 0
        const closable = ref(true)  //标签页关闭按钮
        const editableTabsValue = ref('1')

        const removeTabId = ref('')

        /** 初始化数据  */
        const editableTabs:Ref<Tab[]> = ref(props.data)

        /** 增/删标签页 */
        const handleTabsEdit = async (targetName: string, action: 'remove' | 'add') => {
            if (action === 'add') {
                const newTabName = `${++tabIndex}`
                /** 请求新建标签页 */
                const res = await axios.post(props.addTabURI,{name:newTabName})

                editableTabs.value.push({
                _id:res.data._id,
                title: '新标签',
                name: newTabName,
                content: [],
                })
                editableTabsValue.value = newTabName
            } else if (action === 'remove') {
                /** 请求删除标签页 */
                const _id = props.data[Number(targetName)-1]._id
                const res = await axios.delete(props.removeTabURI+_id)
                if(!res.data) {
                    console.log(res.data) 
                    return
                }

                const tabs = editableTabs.value
                let activeName = editableTabsValue.value
                if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                    }
                })
                }
                editableTabsValue.value = activeName
                editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
            }
        }
        /** 标签页重命名 */
        const rename = (label:string,_id:string) => {
            console.log(label)
            console.log(_id)
            emit('rename',{label,_id})
        }

         /** 使用图片：*/
        const useImage = (src:string) => {
            emit('apply',src)
        }
        /** 删除图片 */
        const removeImage = (file: UploadFile) => {
            console.log("删除图片")
            console.log(file)
        }

        return {
            rename,
            useImage,
            removeImage,
            handleTabsEdit,
            editableTabs,
            editableTabsValue,
            closable,
            removeTabId
        }
    }
})
</script>

<style lang="less" scoped>
:deep(.el-tabs__item) {
    user-select: none
}
</style>