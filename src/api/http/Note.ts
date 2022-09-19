import axios from "axios"

/** 
 * 创建一个新的笔记项目，并返回该项目的id 
 * @param uid: 用户id
 * @param pid: 父集id
*/
export function createNote<T>(uid:string, pid:string) {
  return axios.post<T>('/note/create', { uid, pid })
}
/** 
 * 根据笔记id请求笔记项目，返回该项目的数据 
 * @param noteId 
*/
export function getNote<T>(noteId: string) {
    return axios.get<T>('/note/read'+ noteId)
}