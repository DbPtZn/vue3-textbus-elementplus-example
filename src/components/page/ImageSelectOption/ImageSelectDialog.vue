<template>
  <el-dialog @close="$emit('dialogClose')" v-model="dialogVisible">
    <el-tabs 
      v-model="editableTabsValue" 
      type="card" 
      class="demo-tabs" 
      addable 
      :closable="closable"
      @edit="handleTabsEdit" 
    >
      <el-tab-pane v-for="item in editableTabs" :key="item._id" :name="item.name" :lazy="true">
        <template #label>
          <Label
            :_id="item._id" 
            :content="item.label" 
            @input="closable = false" 
            @blur="closable = true"
            @rename="rename"
          />
        </template>
        <Upload :_id="item._id" :action="'#'" @select="useImage" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue'
import Upload from './Upload.vue'
import Label from './Label.vue'
import { ElMessage, UploadUserFile } from 'element-plus'
import { useImage } from '@vueuse/core'
import { CreateSignboardLibrary, DeleteSignboardLibrary, GetSignboardLibraryList, RenameSignboardLibrary } from '@/api/http'

interface Tab {
  _id: string
  label: string,
  name: string,
  content: UploadUserFile[],
}

export default defineComponent({
  emits: ['dialogClose', 'apply'],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Upload, Label
  },
  async setup(props, { emit }) {
    /** 接收父组件的 dialogVisible ，使得父组件可以控制dialog开关 */
    const dialogVisible = ref(props.dialogVisible)
    watch(() => props.dialogVisible, () => {
      dialogVisible.value = props.dialogVisible
    })
    /** 控制标签页关闭按钮的显示 */
    const closable = ref(true)
    /** 初始化的数据  */
    const editableTabs: Ref<Tab[]> =ref( await GetSignboardLibraryList('user').then(
      (res:any) => {
        return res.data as Tab[]
      },
      err => {
        ElMessage('获取图库失败')
        return []
      }
    ))
    /** 设置初始化时展开的标签 */
    const editableTabsValue: Ref<string> = ref(editableTabs.value.length != 0 ? editableTabs.value[0]._id : '')
    /** 增/删标签页 */
    const handleTabsEdit = async (targetName: string, action: 'remove' | 'add') => {
      if (action === 'add') {
        /** 请求新建标签页 */
         let _id: string = await CreateSignboardLibrary('userId').then(
          (res:any) => {
            return res.data._id as string
          },
          err => {
            ElMessage('请求新增标签页错误')
            return ''
          }
        )
        if (_id === '') return
        editableTabs.value.push({
          _id: _id,
          label: '新标签',
          name: _id,
          content: [],
        })
        editableTabsValue.value = _id
      } else if (action === 'remove') {
        if (!confirm("确定要删除该标签吗?")) return
        /** 请求删除标签页 */
        const libId = targetName
        const result: boolean = await DeleteSignboardLibrary(libId).then(
          (res:any) => {
            if(!res.data.result) { //删除失败时返回false
              ElMessage('请求删除失败') 
              return false
            }
            return res.data.result as boolean
          },
          err => {
            ElMessage('请求删除错误')
            return false
          }
        )
        if(!result) return ElMessage('删除失败')
        const tabs = editableTabs.value
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
      }
    }
    /** 标签页重命名 */
    const rename = async (libId:string ,newName: string) => {
      await RenameSignboardLibrary(libId,newName).then(
        res => {
          ElMessage('请求重命名成功')
        },
        err => {
          ElMessage('请求重命名失败')
        }
      )
    }
    /** 使用图片：*/
    const useImage = (imgSrc: string) => {
      emit('apply', imgSrc)
    }
    return {
      rename,
      useImage,
      handleTabsEdit,
      editableTabs,
      editableTabsValue,
      closable,
      dialogVisible
    }
  }
})


</script>

<style lang="less" scoped>
:deep(.el-tabs__item) {
  user-select: none
}
</style>