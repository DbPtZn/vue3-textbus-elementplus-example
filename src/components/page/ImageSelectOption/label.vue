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
const props = defineProps({ content:String, _id:String })
const emit = defineEmits(['rename','input','blur'])
const inputRef = ref()
const inputVisible = ref(false)

const inputValue = ref(props.content)
const toInput = () => {
    inputVisible.value = true
    inputRef.value.focus()
    emit('input')
}
const confirm = () => {
    inputVisible.value = false
    if(props.content != inputValue.value){ //脏值检测
        emit('rename',{label:inputValue.value},{_id:props._id})
    }
    emit('blur')
}
</script>

<style lang="less" scoped>
.label {
    display: inline;
}

</style>