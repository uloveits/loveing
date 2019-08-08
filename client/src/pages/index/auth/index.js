import Taro from '@tarojs/taro'
import {View,Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import {inject, observer} from "@tarojs/mobx/index";

import logo from '../../../public/imgs/logo.png'
import './index.scss'

@inject('auth')
@observer
class auth extends Taro.Component {

  config =  {
    navigationBarTitleText: '授权登陆',
  };

  constructor() {
    super(...arguments);
    this.state={

    }
  }

  //微信登录
  getUserInfo = async (e) => {
    if (e.detail.userInfo) {   //同意
      let res = await Taro.login();
      //将code存到数据库
      //登录后台
      let param = e.detail.userInfo;
      param.code = res.code;

      const user = await this.props.auth.wxCloudLogin(param);
      if (user) {
        Taro.navigateBack({
          delta:1
        })
      }
    }
  };


  render () {
    return (
      <View className='auth'>
        <View className='mt100'>
          <View className='at-row at-row__justify--center'>
            <View className='at-col-10 text-center'>
              <Image className='wd100' src={logo} mode='widthFix' />
            </View>
          </View>
        </View>
        <View className='at-row at-row__justify--center mt350 '>
          <View className='at-col-8 text-center'>
            <AtButton type='primary' openType='getUserInfo' onGetUserInfo={this.getUserInfo}>微信授权登陆</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
export default auth
