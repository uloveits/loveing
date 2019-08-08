import Taro from '@tarojs/taro';
import base from '../service/api/base'
import {baseUrl} from "../app.config";
import common from '../store/common'

export default class file extends base {

  static async upload (files) {
    let res = await this.UploadFile(files);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      let resData = JSON.parse(res.data);
      console.log(resData);
      return resData;
    }
  }
  static async delete (param) {
   return this.put('/accessory/deleteAcc',param);
  }

  static UploadFile(files) {
    return Taro.uploadFile({
      url: baseUrl+ '/upload',
      filePath: files.file.path,
      name: 'file',
      header: {
        ...common.header(),
        'Content-Type': 'application/json',
      },
      success: (res)=>{
        return res;
      }
    })
  }

}




