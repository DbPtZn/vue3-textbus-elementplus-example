<template>
  <div class="page">
    <Signboard
      :src="imgSrc"
      :render-status="true"
      @offset-modify="(offset: any) => offset"
      @change-image="dialogVisibleOn"
    />
    <ImageSelectDialog
      :model-value="dialogVisible"
      @dialog-close="dialogVisibleOff"
      @apply="applyToSignboard"
      :data="data"
      :add-tab-u-r-i="'#'"
      :remove-tab-u-r-i="'#'"
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
import Signboard from './page/Signboard.vue'
import ImageSelectDialog from './page/ImageSelectOption/ImageSelectDialog.vue'
import { ref } from 'vue'


let dialogVisible = ref(true)
const dialogVisibleOn = () => {
  dialogVisible.value = true
}
const dialogVisibleOff = () => {
  dialogVisible.value = false
}

let imgSrc = ref('https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
/** 应用题头图 */
const applyToSignboard = (src:string) => {
    imgSrc.value = src
}


const data = [
        {
            title: 'Tab 1',
            name: '1',
            content: [
                {
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                },
                {
                name: 'food.jpeg',
                url: 'https://images.pexels.com/photos/10402422/pexels-photo-10402422.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
                }
            ],
        },
        {
            title: 'Tab 2',
            name: '2',
            content: [
                {
                name: 'food.jpeg',
                url: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1600',
                }
            ],
        },
]


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