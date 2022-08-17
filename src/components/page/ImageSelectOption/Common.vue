<template>
  <div class="demo-collapse" v-for="(item,index) in data" :key="index">
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="item.theme" :name="index" >
        <div class="image-group" >
          <div class="image-wrapper" v-for="(option,num) in item.img" :key="num">
            <img 
              class="image thumbnail" 
              :src="option.src" 
              :alt="option.title" 
              :title="option.title"
              @click="selectImage(option.src)"
              >
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

/** 图片 */
export interface ImageOption {
  src: string
  title: string
}

/** 主题图集 */
export interface ImagesDataOption {
  theme: string
  img: Array<ImageOption>
}

// interface ImagesData implements Array<ImagesDataOption> {}

const props = defineProps<{
  data:ImagesDataOption[]
  // data:ImagesData
}>()
const emit = defineEmits(['select'])


/** 根据length生成差值为1的等差数列 如 [0,1,2,3...] */
const activeNames = ref(Array.from({length: props.data.length}, (v, i) => i))

const selectImage = (src:string) => {
  emit('select',src)
}

</script>

<style lang="less" scoped>

.image-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 840px;
  margin: 0 auto;
  .image-wrapper {
    display: inline;
    margin: 0 8px 8px 0;
    width: 112px;
    height: 80px;
    border-radius: 4px;
    overflow: hidden;

  .image {
    cursor: pointer;
    // width: 120px;
    width: 100%;
    height: 80px;
    object-fit: cover;
    object-position: center center;
  }
}
}



</style>