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
const props = defineProps<{content:string, _id:string}>()
const emit = defineEmits(['rename','input','blur'])
/** 库id */
const libId = props._id
/** 输入框dom元素 */
const inputRef = ref()
/** 输入框显示 */
const inputVisible = ref(false)
/** 输入值 */
const inputValue = ref(props.content)
/** 切换至输入模式 */
const toInput = () => {
    inputVisible.value = true
    inputRef.value.focus()
    emit('input')
}
/** 输入完毕-确认 */
const confirm = () => {
    inputVisible.value = false
    if(props.content != inputValue.value){ //脏值检测
        emit('rename',libId,inputValue.value)
    }
    emit('blur')
}
</script>

<style lang="less" scoped>
.label {
    display: inline;
}

</style>