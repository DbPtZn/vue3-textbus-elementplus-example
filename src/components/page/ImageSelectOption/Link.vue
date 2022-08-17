<template>
<div class="link">
    <el-input class="input" v-model="input" placeholder="输入图片链接..." />
    <el-button class="btn" @click="useLink">确定</el-button>
</div>
 
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const emit = defineEmits(['link'])
const input = ref('')
const useLink = () => {
    emit('link',input.value)
}
</script>

<style lang="less" scoped>

.link {
    display: flex;
    flex-direction: column;
    align-items: center;
    // .input {

    // }
    .btn {
        margin-top: 8px;
        align-items: center;
        width: 30%;
    }
}

</style>