import Taro from "@tarojs/taro"
import base from './base'



export default class authApi extends base {


  /**
   * 微信授权登录
   */
  static async wxCloudLogin(param) {

    //判定是否授权登陆
    let id = await this.checkSameUser();

    if(id){
      param.id = id;
    }
    console.log(id);
    console.log(param);

    let res = await Taro.cloud.callFunction({name: "login", data: param})

    if(res.errMsg === 'cloud.callFunction:ok'){
      return param
    }
  }

  /**
   * 判定是否注册过
   */
  static async checkSameUser() {

    let res = await Taro.cloud.callFunction({name: "checkSameUser", data: {}});
    console.log('判定是否注册过');
    console.log(res);
    if(res.errMsg === 'cloud.callFunction:ok') {
      if(res.result.data.length > 0){
        return res.result.data[0]._id;
      }else {
        return false
      }
    }
  }

  /**
   * 判定是否绑定关系
   */
  static async checkBindInfo() {
    //先看自己有没有bindId
    let user;
    let bindUser;
    let res = await Taro.cloud.callFunction({name: "checkSameUser", data: {}});

    user = res.result.data[0];

    if(user.bindId){
      console.log(user.bindId);
      //获取对象的信息
      let bindRes = await Taro.cloud.callFunction({name: "getUserInfoById", data: {id:user.bindId}});
      bindUser = bindRes.result.data[0];
    }
    return {
      user:user,
      bindUser:bindUser || false,
    }
  }

}
