import Taro from "@tarojs/taro"
import base from './base'



export default class mailApi extends base {


  /**
   * 添加mail
   */
  static async add(param) {
    console.log(param);

    let res = await Taro.cloud.callFunction({name: 'add', data: {collection:'mail',param:param}})
    console.log('添加mail');
    console.log(res);

    if(res.errMsg === 'cloud.callFunction:ok'){
      return res.result
    }
  }

  /**
   * 获得mail列表
   */
  static async list(param) {

    let res = await Taro.cloud.callFunction({name: 'get', data: param});
    console.log('获得mail列表');
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
