<template>
<div class="label" @dblclick="toInput">
    <span v-show="!inputVisible">{{inputValue}}</span>
    <el-input 
        v-show="inputVisible" 
        class="input"
        ref="inputRef" 
        maxlength="10"
        v-model="inputValue" 
        placeholder="输入图片链接..." 
        autofocus
        @blur="confirm"
        />
</div>
 
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const prop = defineProps({ content:String })
const emit = defineEmits(['rename','input'])
const inputRef = ref()
const inputVisible = ref(false)

const inputValue = ref(prop.content)
const toInput = () => {
    inputVisible.value = true
    inputRef.value.focus()
    emit('input')
}
const confirm = () => {
    inputVisible.value = false
    emit('rename',inputValue)
}
</script>

<style lang="less" scoped>
.label {
    display: inline;
}

</style>