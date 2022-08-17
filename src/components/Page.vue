<template>
  <div class="page">
    <HeaderPicture
      :src="imgSrc"
      :render-status="true"
      @offset-modify="(offset: any) => offset"
      @change-picture="dialogVisibleOn"
    />
    <ImageSelectDialog
      :model-value="dialogVisible"
      @dialog-close="dialogVisibleOff"
      @apply="applyToHeaderPicture"

    />
    <div class="layout">
      <ArticleTitle/>
      <RichEditor/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import RichEditor from './page/RichEditor.vue'
import ArticleTitle from './page/ArticleTitle.vue'
import HeaderPicture from './page/HeaderPicture.vue'
import ImageSelectDialog from './page/ImageSelectDialog.vue'
import { ref } from 'vue'


let dialogVisible = ref(false)
const dialogVisibleOn = () => {
  dialogVisible.value = true
}
const dialogVisibleOff = () => {
  dialogVisible.value = false
}

let imgSrc = ref('https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
/** 应用题头图 */
const applyToHeaderPicture = (src:string) => {
    imgSrc.value = src
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