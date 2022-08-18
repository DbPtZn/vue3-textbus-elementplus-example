<template>
    <el-dialog  @close="$emit('dialogClose')">
        <el-tabs type="border-card" class="demo-tabs">
            <el-tab-pane label="常用">
                <Common
                    :data = CommonData
                    @select="useImage"
                />
            </el-tab-pane>
            <el-tab-pane label="上传">
                <Upload
                    :data = uploadData  
                    :action="'#'"
                    @select="useImage"
                    @remove="removeImage"
                />
            </el-tab-pane>
            <el-tab-pane label="链接">
                <Link
                    @link="useImage"
                />
            </el-tab-pane>
            <el-tab-pane label="自定义">开发中</el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Common from './ImageSelectOption/Common.vue'
import Upload from './ImageSelectOption/Upload.vue'
import Link from './ImageSelectOption/Link.vue'
import { UploadFile } from 'element-plus'

export default defineComponent({
    emits:["dialogClose",'apply'],
    components:{
        Common, Upload, Link
    },
    setup(props,{emit}){
        
        /** 使用题头图 */
        const useImage = (src:string) => {
            emit('apply',src)
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
        const removeImage = (file: UploadFile) => {
            console.log("删除图片")
            console.log(file)
        }

        /** 链接项 数据接口 */


        
        return {
            useImage,
            CommonData,
            uploadData,
            removeImage
        }
    }
})
</script>

<style lang="less" scoped>

  


</style>