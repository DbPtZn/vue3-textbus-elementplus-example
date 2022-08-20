<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :action="action"
    :auto-upload="false"
  >
    <template #trigger>
      <el-icon><Plus /></el-icon>
    </template>
    <template #file="{ file }">
     <div class="img-wrapper">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" @click="selectImage(file.url)" style="cursor: pointer;"/>
        <span class="close">
          <el-icon @click="handleRemove(file)"><Close /></el-icon>
        </span>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import { Plus, Close } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import type { UploadUserFile } from 'element-plus'

const props = defineProps<{
  /** 初始化的图片数据 */
  data:UploadUserFile[],
  /** 请求URL */
  action:string
}>()

const fileList = ref<UploadUserFile[]>(
  props.data
)
const emit = defineEmits(['select','remove'])

/** 图片删除 */
const handleRemove = (file: UploadFile) => {
  if (confirm("确定要删除这张图片吗?")) {
    fileList.value.splice(fileList.value.indexOf(file),1)
    emit('remove',file)
  }
}

const selectImage = (url:string) => {
  emit('select',url)
  // console.log(fileList)
}


</script>

<style lang="less" scoped>

.img-wrapper {
  width: 100%;
  height: 100%;

  .close {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    &:hover {
      color: rgba(0, 0, 0, 0.349);
    }

    &:active {
      color: #000;
    }
  }

  &:hover {
    .close {
      display: block;
    }
  }
}



</style>

/**
  组件与服务段的交互有两种：
  1.新增图片（上传）
  2.删除图片（上传）
 */