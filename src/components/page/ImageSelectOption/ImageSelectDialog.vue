<template>
    <el-dialog  @close="$emit('dialogClose')">
        <el-tabs 
        v-model="editableTabsValue"
        type="card" 
        class="demo-tabs"
        editable
        @edit="handleTabsEdit"
        >
            <el-tab-pane 
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                class="tab"
            >
            <Upload
                    :data = uploadData  
                    :action="'#'"
                    @select="useImage"
                    @remove="removeImage"
                />
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Upload from './Upload.vue'
import { UploadFile } from 'element-plus'

export default defineComponent({
    emits:["dialogClose",'apply'],
    components:{
        Upload
    },
    setup(props,{emit}){
        let tabIndex = 2
        const editableTabsValue = ref('1')
        const editableTabs = ref([
        {
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content',
        },
        {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content',
        },
        ])

        const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
            console.log(123)
            if (action === 'add') {
                const newTabName = `${++tabIndex}`
                editableTabs.value.push({
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content',
                })
                editableTabsValue.value = newTabName
            } else if (action === 'remove') {
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

        /** 常用项 数据接口 */
        const data = {
            theme: '测试主题',
            img: [
                {title:'test',src:'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'},
                {title:'test',src:'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1600'},
                {title:'test',src:'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'},
                {title:'test',src:'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'},
                {title:'test',src:'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'},
                {title:'test',src:'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'},
                {title:'test',src:'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'},
                {title:'test',src:'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'},
            ]
        }
        const CommonData = [
            data,
            data
        ]

        /** 上传项 数据接口 */
        const uploadData = [
            {
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
            {
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            }
        ]

         /** 使用图片 */
        const useImage = (src:string) => {
            emit('apply',src)
        }
        const removeImage = (file: UploadFile) => {
            console.log("删除图片")
            console.log(file)
        }

        /** 链接项 数据接口 */



        
        return {
            useImage,
            CommonData,
            uploadData,
            removeImage,
            editableTabs,
            editableTabsValue,
            tabIndex,
            handleTabsEdit
        }
    }
})
</script>

<style lang="less" scoped>

:deep(.el-tabs__item) {
    user-select: none
}


</style>