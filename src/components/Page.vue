<template>
  <div class="page">
    <Signboard
      :src="imgSrc"
      :render-status="true"
      @offset-modify="(offset: any) => offset"
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
import { ref } from 'vue'
let imgSrc = ref('https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')

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