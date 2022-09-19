/** 
 * 新建Note的条件参数 
 * @param uid：用户id
 * @param pid：父note的id
*/
export interface NewNoteParam {
  uid: string,
  pid: string
}