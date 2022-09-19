<template>
  <el-upload v-model:file-list="fileList" list-type="picture-card" :http-request="beforeAvatarUploadThree"
    :auto-upload="true">
    <template #trigger>
      <el-icon>
        <Plus />
      </el-icon>
    </template>
    <template #file="{ file }">
      <div class="img-wrapper">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" @click="selectImage(file.url)"
          style="cursor: pointer;" />
        <span class="close">
          <el-icon @click="handleRemove(file)">
            <Close />
          </el-icon>
        </span>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus, Close } from '@element-plus/icons-vue'
import type { UploadUserFile } from 'element-plus'
import { GetSignboardLibrary, AddImageToSignboardLibrary, RemoveImageFromSignboardLibrary } from '@/api/http'
import axios from 'axios'

const props = defineProps<{
  /** lib(tab) 的 id */
  _id: string,
}>()
/* 抛出选择图片的动作 */
const emit = defineEmits(['select'])
/** 库id */
const libId = props._id
/** 请求获取 lib 的数据 */
const libData = await GetSignboardLibrary(libId).then((res: any) => res.data as UploadUserFile[])
/** 设置 upload 初始化时的数据 */
const fileList = ref<UploadUserFile[]>(libData)

/** 删除图片 和 上传图片 需要根据服务端、图库的具体说明文档来设置 */
/** 图片删除 */
function handleRemove(file: any) {
  if (confirm("确定要删除这张图片吗?")) {
    // console.log(fileList.value.indexOf(file)) 被删除的图片在 fileList 中的下标
    fileList.value.splice(fileList.value.indexOf(file), 1)
    /** 向服务器请求删除指定图库中的指定图片
     * 参数1： 被删除图片所在的库id
     * 参数2： 被删除图片的id
     * 参数3： 被删除图片在图库中的地址
     */
    RemoveImageFromSignboardLibrary(libId, file._id, `${file.url}`).then(
      res => {
        if (res.data) { //服务器成功删除后会返回 true ，否则会返回 false
          axios({
            method: 'delete',
            url: 'http://localhost:3000/delete',
            data: {
              url: `${file.url}`, //参数1：被删除图片在图库中的地址（需字符串）
              uid: 'userId'       //参数2：用户id
            }
          }).then(
            res => {
              console.log(res)
            },
            err => {
              console.log(err)
            }
          )
        }
      },
      err => {
        console.log(err)
      }
    )
  }
}

/** 上传图片 */
function beforeAvatarUploadThree(file: any) {
  const formdata = new FormData()
  formdata.append("loginId", 'userId')  //用户id
  formdata.append("libId", libId)   //库id
  formdata.append("file", file.file)    //图片文件
  axios({
    method: 'post',
    url: 'http://localhost:3000/upload',
    data: formdata,
    headers: { 'content-type': 'multipart/form-data' }
  }).then(res => {
    const imgUrl = res.data
    fileList.value[fileList.value.length - 1].url = imgUrl
    /** 请求将图库返回的图片地址添加至对应库集合中 */
    AddImageToSignboardLibrary(libId,imgUrl).then(
      res => {
        // console.log(res)
      },
      err => {
        alert('图片更新失败')
      })
  })
    .catch(err => {
      console.log(err)
      alert('图片上传失败')
    })
}

/** 选择图片 */
const selectImage = (url: string) => {
  emit('select', url)
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