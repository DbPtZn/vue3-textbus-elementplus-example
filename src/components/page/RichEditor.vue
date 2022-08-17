<template>
    <div class="rich-editor" id="editorContainer">
        
    </div>
</template>

<script lang="ts" setup>
import '@textbus/editor/bundles/textbus.min.css'
import { InlineToolbarPlugin } from "@/editor-plugin/inline-toolbar.plugin"
import { Caret, CaretLimit } from "@textbus/browser"
import { boldTool, cleanTool, colorTool, createEditor, defaultGroupTool, EditorOptions, headingTool, imageTool, italicTool, LinkJumpTipPlugin, linkTool, strikeThroughTool, textBackgroundTool, underlineTool, unlinkTool } from "@textbus/editor"
import { fromEvent } from '@tanbo/stream'
import { computed, onMounted } from "vue"

const options: EditorOptions = {
  theme: 'light',
  autoFocus: true,
  autoHeight: true,
  zenCoding: true,
  historyStackSize: 30,
  content: '<p>你好，我是 Textbus 富文本编辑器！你好，我是 Textbus 富文本编辑器！你好，我是 Textbus 富文本编辑器！你好，我是 Textbus 富文本编辑器！</p>',
  plugins: [
    //   () => new Toolbar(defaultTools, toolbar.value!),
    () => new InlineToolbarPlugin([
      [defaultGroupTool],
      [headingTool],
      [boldTool, italicTool, strikeThroughTool, underlineTool],
      [colorTool, textBackgroundTool],
      [linkTool, unlinkTool],
      [imageTool],
      [cleanTool], 
    ]),
    () => new LinkJumpTipPlugin()
  ],

  setup(starter) {
    const caret = starter.get(Caret)
    caret.correctScrollTop({
    onScroll: fromEvent(document,'scoll'),
    getLimit(): CaretLimit {
        return {
        top:0,
        bottom: document.documentElement.clientHeight
        }
    },
    setOffset(offsetScrollTop: number) {
        document.documentElement.scrollTop += offsetScrollTop
    }
    })
  }
}
onMounted(() => {
    const editorContainer = computed(()=>document.getElementById('editorContainer') as HTMLElement)
    const editor = createEditor(options)
    console.log(editorContainer.value)
    editor.mount(editorContainer.value)
    editor.onChange.subscribe(() => {
        console.log(editor.getContents())
    });
})

</script>

<style lang="less" scoped>
.rich-editor {
  flex:1;
  display: flex;

    :deep(.textbus-container){  
        flex:1;
        border: none;
        outline: none;
        /**
        * 负负得正：
        * 为了扩大 textbus-container 的范围且不影响布局
        * 因为鼠标离开范围后没有触发选区事件，后续有其它办法再优化
        */
        padding: 0 500px;
        margin: 0 -500px;
        .textbus-ui-middle {
            border: none;
        }
    }
}
</style>