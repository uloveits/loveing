import Taro from '@tarojs/taro'
import { View, Text,Image,ScrollView } from '@tarojs/components'
import { AtTextarea,AtInput,AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import CommonFnc from "../../../utils/commonFnc";
import KtSeparator from "../../../comps/layout/separator";
import {PAGE} from "../../../app.constant";
import mailApi from "../../../service/api/mail";
import commonApi from "../../../service/api/common";



@inject('auth')
@observer
export default class MailDetailPage extends Taro.Component {

  config = {
    navigationBarTitleText: '详情',
  }

  constructor() {
    super(arguments);

    this.state = {
      height:`height:${CommonFnc.getScreenSize().height - 40}px`,
      info:{}
    }
  }


  componentDidMount () {
    this.getMailDetail();
  }

  componentDidShow () {

  }

  getMailDetail = async () => {
    let param = {
      method:'doc',
      collection:'mail',
      doc:this.$router.params.id,
    }
    let res = await commonApi.doc(param)
    console.log(res)
    this.setState({
      info:res
    })
  };




  render () {
    const { info } = this.state;
    const createTime = info.createTime && info.createTime.substring(0,10);

    return (
      <View className='pd20'>
        <View className='bgWhite pd20 card'>
          <View>
            <Text className='lg font-weight'>{info.head}:</Text>
          </View>

          <View className='ptb20'>
            <Text className='lg pl20'>{info.content}</Text>
          </View>

          <View className='text-right'>
            <Text className='lg'>{info.end}</Text>
          </View>

          <View className='text-right'>
            <Text className='lg'>{createTime}</Text>
          </View>

        </View>
      </View>
    )
  }
}
