<template>
    <div class="rich-editor" id="editorContainer">
        
    </div>
</template>

<script lang="ts" setup>
import '@textbus/editor/bundles/textbus.min.css'
import { InlineToolbarPlugin } from "@/editor-plugin/inline-toolbar.plugin"
import { Caret, CaretLimit } from "@textbus/browser"
import { boldTool, cleanTool, colorTool, createEditor, defaultGroupTool, EditorOptions, headingTool, imageTool, italicTool, LinkJumpTipPlugin, linkTool, strikeThroughTool, textBackgroundTool, underlineTool, unlinkTool } from "@textbus/editor"
import { debounceTime, fromEvent } from '@tanbo/stream'
import { computed, onMounted } from "vue"
const props = defineProps({
  value:{
    type:String
  }
})
const emits = defineEmits(['input']) 
const options: EditorOptions = {
  theme: 'light',
  autoFocus: true,
  autoHeight: true,
  zenCoding: true,
  historyStackSize: 30,
  content: props.value,
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
  editor.mount(editorContainer.value)
  /** debounceTime 防抖节流 */
  editor.onChange.pipe(debounceTime(2000)).subscribe(() => {
    emits('input',editor.getContents().content)
  })
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
        * 因为鼠标离开范围后没有触发选区事件，有其它办法再优化吧
        */
        padding: 0 500px;
        margin: 0 -500px;
        .textbus-ui-middle {
            border: none;
        }
    }
}
</style>