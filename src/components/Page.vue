<template>
  <div class="page">
    <Signboard
      :src="imgSrc"
      :offset="offset"
      :render-status="isRender"
      @offset-modify="signboardOffsetModify"
      @image-modify="signboardImgModify"
      @is-hide="isHide"
    />
    <div class="layout">
      <ArticleTitle
        :value="title"
        @input="titleInput"
      />
      <RichEditor
        :value="content"
        @input="contentInput"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import RichEditor from './page/RichEditor.vue'
import ArticleTitle from './page/ArticleTitle.vue'
import Signboard from './page/Signboard.vue'
import { ref } from 'vue'
import { isDiff, noteData } from '@/utils'
// const emit = defineEmits(['title'])

let imgSrc = ref(noteData.signboard.src)
let offset = ref(noteData.signboard.offset)
let isRender = ref(noteData.signboard.isRender)
let title = ref(noteData.title)
let content = ref(noteData.content)
/** 招牌图片偏移值改变时触发 */
const signboardOffsetModify = (offset: number) => {
  console.log(offset)
}
/** 招牌图片改变时触发 */
const signboardImgModify = (imgScr: string) => {
  console.log(imgScr)
}
/** 招牌图片显示隐藏状态改变时触发 */
const isHide = (status: boolean) => {
  console.log(status)
}
/** 标题输入结束后触发 */
const titleInput = (value: string) => {
  console.log('value')
  if(isDiff(title.value,value)){
    console.log(value)
  }
}
/** 内容输入结束后触发 */
const contentInput = (value: string) => {
  console.log('value')
  if(isDiff(content.value,value)){
    console.log(value)
  }
}

</script>

<style lang="less" scoped>
.page{
  height: 100vh;
  display: flex;
  flex-direction: column;

  .layout{
    flex:1;
    display: flex;
    flex-direction: column;
    width: 100%;
    /** 编辑器窗口大小 */
    max-width: 760px;
    margin: 0 auto;
  }
}

</style>