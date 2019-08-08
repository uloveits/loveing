import Taro from "@tarojs/taro"
import base from './base'
import CommonFnc from "../../utils/commonFnc";



export default class rememberApi extends base {


  /**
   * 添加纪念日记录
   */
  static async add(param) {
    console.log(param);

    let res = await Taro.cloud.callFunction({name: 'addRemember', data: param})
    console.log('====');
    console.log(res);

    if(res.errMsg === 'cloud.callFunction:ok'){
      return res.result
    }
  }
  /**
   * 获得其他纪念日（除系统设置的在一起天数）
   */
  static async get(param) {
    console.log(param);

    let res = await Taro.cloud.callFunction({name: 'getRemember', data: param})
    console.log('获得其他纪念日');
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

    let res = await Taro.cloud.callFunction({name: 'delete', data: param})
    console.log('删除');
    console.log(res);

    if (res.errMsg === 'cloud.callFunction:ok') {
      return res.result
    }
  }






  /**
   * 在一起天数
   */
  static async together(param) {
    console.log(param);

    let res = await Taro.cloud.callFunction({name: 'getTogether', data: param})
    console.log('在一起天数');
    console.log(res);

    if(res.errMsg === 'cloud.callFunction:ok'){
      if(res.result.data.length > 0 && res.result.data[0].type){
        let curDate = CommonFnc.dateFormat("yyyy-MM-dd",new Date())
        return CommonFnc.getDateDiff(res.result.data[0].time,curDate)
      }else {
        return false
      }
    }
  }

}
