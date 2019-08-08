import Taro from "@tarojs/taro"
import base from './base'



export default class shareApi extends base {


  /**
   * 绑定关系
   */
  static async bindLoving(param) {

    console.log(param);


    //判定是否绑定关系
    let isBind = await this.checkSameUser();

    if(isBind){
      return {
        msg:'您已经绑定过情侣关系了'
      };
    }
    //更新我的数据
    let paramMe = {
      method:'update',
      collection:'user',
      doc:param.id,
      content:{
        bindId:param.bindId
      }
    };
    let bindMe = await Taro.cloud.callFunction({name: "collection", data: {$url: paramMe.method,...paramMe}});
    console.log(bindMe);

    let paramTa = {
      method:'update',
      collection:'user',
      doc:param.bindId,
      content:{
        bindId:param.id
      }
    };
    let bindTa = await Taro.cloud.callFunction({name: "collection", data: {$url: paramTa.method,...paramTa}});
    console.log(bindTa);
    if(bindMe.errMsg === 'cloud.callFunction:ok' && bindTa.errMsg === 'cloud.callFunction:ok'){
      return {
        msg:'绑定成功！'
      }
    }
  }

  /**
   * 判定是否绑定关系
   */
  static async checkSameUser() {

    let res = await Taro.cloud.callFunction({name: "checkSameUser", data: {}});

    if(res.errMsg === 'cloud.callFunction:ok') {
      if(res.result.data.length > 0){
        return res.result.data[0].bindId ? true : false;
      }else {
        return false
      }

    }

  }

}
