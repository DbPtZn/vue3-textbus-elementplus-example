import axios from "../index"
/**
 * 请求招牌库的列表 
 * @param userId: 用户id 
 * 返回值： lib 列表 数据
*/
export function GetSignboardLibraryList<T>(userId: string) {
  return axios.get<T>('signboardLibrary/read/list/' + userId)
}
/**请求招牌库的内容 
 * @param libId: 库id 
 * 返回值： lib 数据
*/
export function GetSignboardLibrary<T>(libId: string) {
  return axios.get<T>('signboardLibrary/read/' + libId)
}
/**
 * 创建新的招牌库
 * @param userId: 用户id  
 * 返回值：lib id
*/
export function CreateSignboardLibrary<T>(userId:string) {
  return axios.post<T>('signboardLibrary/create/'+userId)
}
/** 
 * 删除招牌库
 * @param libId: 库id 
 * 返回值： true or false
*/
export function DeleteSignboardLibrary<T>(libId: string) {
  return axios.delete<T>('signboardLibrary/delete/'+ libId)
}

/** 
 * 招牌库重命名
 * @param libId: 库id
 * @param newName： 新的库名称 
 * 返回值：true or false
*/
export function RenameSignboardLibrary<T>(libId:string,newName:string) {
  return axios.post<T>('signboardLibrary/update/rename',{ libId, newName })
}

/**
 * 请求添加图片至招牌库 
 * @param libId: 库id 
 * @param imgUrl: 图片地址
*/
export function AddImageToSignboardLibrary<T>(libId:string,imgUrl:string) {
  return axios({
    method: 'post',
    url: 'signboardLibrary/update/add',
    data: {
      libId, 
      imgUrl
    }
  })
}

/** 
 * 请求删除招牌库中的图片 
 * @param libId: 库id
 * @param imgId: 图片id
 * @param imgUrl: 图片地址
*/
export function RemoveImageFromSignboardLibrary<T>(libId: string, imgId: string, imgUrl: string) {
  return axios({
    method: 'post',
    url: 'signboardLibrary/update/remove/',
    data: {
      libId,
      imgId,
      imgUrl
    }
  })
}


