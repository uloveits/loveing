import Taro from "@tarojs/taro"
import base from './base'



export default class todoApi extends base {


  /**
   * 添加TODO
   */
  static async add(param) {
    console.log(param);

    let res = await Taro.cloud.callFunction({name: 'add', data: {collection:'todo',param:param}})
    console.log('添加TODO');
    console.log(res);

    if(res.errMsg === 'cloud.callFunction:ok'){
      return res.result
    }
  }

  /**
   * 获得TODO列表
   */
  static async list(param) {

    let res = await Taro.cloud.callFunction({name: 'get', data: param});
    console.log('获得TODO列表');
    console.log(res);

    if (res.errMsg === 'cloud.callFunction:ok') {
      return res.result.data
    }
  }

  /**
   * 删除
   */
  static async del(param) {
    console.log(param);

    let res = await Taro.cloud.callFunction({name: 'delete', data: param});
    console.log('删除');
    console.log(res);

    if (res.errMsg === 'cloud.callFunction:ok') {
      return res.result
    }
  }



}
