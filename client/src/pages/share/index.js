import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import {AtButton} from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import Tips from "../../utils/tips";
import shareApi from "../../service/api/share";
import Routes from "../../utils/route";



@inject('auth')
@observer
export default class SharePage extends Component {

  config = {
    navigationBarTitleText: '邀请页面'
  }

  componentWillMount () { }

  componentDidMount () {

  }

  componentDidShow () {
    const {auth} = this.props;
    if(!auth.check({block: true}))return;
    console.log(this.$router.params)
    console.log(this.props.auth);
  }

  //绑定关系
  agree = async ()=>{
    const { auth } = this.props;
    const { shareId } = this.$router.params;

    console.log('绑定关系');
    console.log(shareId);
    console.log(this.$router);

    if(auth.user._id === shareId){
      Tips.toast('您不能和自己绑定关系哦')
      return;
    }
    let param = {
      id:auth.user._id,
      bindId:shareId,
    }

    let res = await shareApi.bindLoving(param);
    console.log(res);
    if(res.msg){
      Tips.toast(res.msg);
      setTimeout(()=>{
        Routes.toIndex()
      },2*1000)
    }

  };

  refuse = ()=> {
    Routes.toIndex()
  }


  render () {
    const { name , avatar} = this.$router.params;
    return (
      <View className='index'>
        <View className='text-center pd20 mt60'>
          <Image className='avatar-normal'  src={avatar} />
        </View>
        <View className='pd20'>
          <View className='pd20 bgWhite text-center card'>
            <View>
              <Text className='lg'>如果我爱你</Text>
            </View>
            <View>
              <Text className='lg'>绝不像攀援的凌霄花，借你的高枝炫耀自己</Text>
            </View>
            <View>
              <Text className='lg'>如果我爱你</Text>
            </View>
            <View>
              <Text className='lg'>绝不学痴情的鸟儿，为绿荫重复单纯的歌曲</Text>
            </View>
            <View>
              <Text className='lg'>如果我爱你</Text>
            </View>
            <View>
              <Text className='lg'>我会邀请你，和我绑定“最美恋爱”的情侣关系</Text>
            </View>
            <View>
              <Text className='lg'>因此，</Text>
            </View>
            <View className='font-weight mt20'>
              <Text className='lg'>您的好友</Text>
              <Text className='xxl major'>{name}</Text>
              <Text className='lg'>想邀请您成为情侣关系</Text>
            </View>

          </View>
        </View>
        <View className='pd20'>
          <View className='at-row'>
            <View className='at-col-6'>
              <View className='pd20'>
                <AtButton onClick={this.refuse.bind(this)}>拒绝TA</AtButton>
              </View>

            </View>
            <View className='at-col-6'>
              <View className='pd20'>
                <AtButton type='primary' onClick={this.agree.bind(this)}>答应TA</AtButton>
              </View>
            </View>

          </View>

        </View>
      </View>
    )
  }
}
