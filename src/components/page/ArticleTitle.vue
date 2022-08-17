<template>
    <div class = "article-title">
        <div class = "article-title-wrapper">
            <input class = "article-title-input" placeholder = '请输入标题'>
        </div>
    </div>
</template>

<script lang="ts" setup>



</script>

<style lang="less" scoped>
.article-title {
    width: 100%;

    .article-title-wrapper {
        padding: 8px 6px;
        margin: 24px 0;
        background-color: #ffffff;
        
        .article-title-input {
            border: none;
            outline: none;
            font-size: 36px;
            font-weight: 600;
            white-space: pre-wrap;
            word-break: break-word;
            word-wrap: break-word;

            &::placeholder {
                color: rgba(143, 143, 143, 0.64);
            }
        }
    }
  
}

</style>