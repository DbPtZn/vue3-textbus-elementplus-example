/** Note 的测试数据 */
interface NoteData {
  /** 标题 */
  title: string
  /** 内容（存放文件的地址） */
  content: string
  signboard: {
    /** 图片地址 */
    src: string
    /** 图片偏移值 */
    offset: number
    /** 图片渲染状态 */
    isRender: boolean
  },
  /** 扁平化管理下的父级笔记 id */
  parentId:string
  /** 缩略的文本内容，用于在列表展示 */
  abbreviation: string
  /** 用户id */
  userId: string
  state: number
  createAt: string
  updateAt: string
}

export const noteData: NoteData = {
  title: 'undefined',
  content: 'undefined',
  signboard: {
    src: 'https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    offset: 50,
    isRender: true
  },
  parentId: 'undefined',
  abbreviation: 'undefined',
  userId: 'undefined',
  state: 1,
  createAt: 'undefined',
  updateAt: 'undefined'
}