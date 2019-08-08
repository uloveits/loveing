import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import {AtButton} from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

import date from '../../public/imgs/svg/date.svg'
import todo from '../../public/imgs/svg/todo.svg'
import mail from '../../public/imgs/svg/mail.svg'
import photo from '../../public/imgs/svg/photo.svg'
import travel from '../../public/imgs/svg/travel.svg'
import Routes from "../../utils/route";
import rememberApi from "../../service/api/remember";
import wave from '../../public/imgs/user/wave.gif'
import commonApi from "../../service/api/common";
import Tips from "../../utils/tips";
import {PAGE} from "../../app.constant";




@inject('auth')
@observer
export default class Index extends Component {

  config = {
    navigationBarTitleText: 'ING',
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
  }
  constructor() {
    super(arguments)
    this.state = {
      isBind:true,
      together:'',
      count:{},
    }
  }


  componentDidMount () {
    this.getTogether()
    this.getCount()
  }

  componentDidShow () {
    const {auth} = this.props;
    if(!auth.check({block: true}))return;
    if(!this.props.auth.user.bindId || this.props.auth.bindUser === 0){
      this.checkBind();
    }

  }

  //下来刷新
  onPullDownRefresh() {
    this.getTogether()
    this.getCount()
    Taro.stopPullDownRefresh();
  }


  //分享
  onShareAppMessage (res) {
    if (res.from === 'button') {

    }
    const {auth} = this.props;
    console.log(auth);
    return {
      title: '绑定邀请',
      path: '/pages/share/index?shareId=' + auth.user.id + '&avatar=' + auth.user.avatarUrl + '&name='+auth.user.nickName,
      success: function (res) {
        console.log('成功', res)
      }
    }
  }

  //判断有没有绑定恋爱关系
  checkBind = async () => {
    const { auth } = this.props;
    let res = await auth.checkBindInfo();
    console.log(res)
    if(!res.user.bindId){
      this.setState({
        isBind:false
      })
    }
  };

  //获得在一起天数
  getTogether = async () => {
    const { auth } = this.props;
    let param = {
      id:auth.user._id,
      bindId:auth.user.bindId,
    }
    let res = await rememberApi.together(param);
    this.setState({
      together:res || '???'
    })
  };


  getCount = async () => {
    const { auth } = this.props;
    let param = {
      id:auth.user._id,
      bindId:auth.user.bindId,
    }
    let res = await commonApi.getCount(param);
    this.setState({
      count:res
    })
  }

  //关闭弹出框
  onClose () {
    this.setState({
      isBind: false
    })
  }

  //跳转页面
  goView = (type) => {
    if(!this.state.isBind){
      Tips.toast('请先绑定另一半哦')
    }
    if(type === 'remember') {
      Routes.toRemember()
    }else if(type === 'todo') {
      Routes.toTodo()
    }else if(type === 'mail') {
      Routes.toMail()
    }else if(type === 'photo') {
      Routes.toPhoto()
    }else if(type === 'travel') {

      Tips.toast('功能开发中')
    }
  }

  render () {
    const { isBind,together,count } = this.state;
    const { auth } = this.props;
    const { user, bindUser } = auth
    return (
      <View className='index'>
        {/*头部*/}
        <View className='pd20'>
          <View className='pd20 card rel' style='opacity: 0.8;'>
            <Image className='wd100 ht100 common-bg card' src={PAGE.BG.HOME} />
            <View className='at-row at-row__align--center'>
              <View className='at-col-3 text-center'>
                <Image className='avatar-normal' src={user.avatarUrl} />
                <View>
                  <Text className='lg'>{user.nickName}</Text>
                </View>

              </View>
              <View className='at-col-6 text-center'>
                <View>
                  <Text className='lg font-weight'>我们在一起</Text>
                </View>
                <View>
                  <Text className='xxl plr20 brand font-weight'>{together}</Text>
                  <Text className='lg'>天</Text>
                </View>
              </View>
              <View className='at-col-3 text-center'>
                {
                  isBind &&
                    <View>
                      <Image className='avatar-normal' src={bindUser.avatarUrl} />
                      <View>
                        <Text className='lg'>{bindUser.nickName}</Text>
                      </View>
                    </View>
                }
                {
                  !isBind &&
                    <View>
                      <AtButton type='primary' className='noCssBtn' openType='share' >
                          <View className='wx wx-plus-b white' style='font-size:40Px' />
                      </AtButton>
                      <View>
                        <Text className='sm'>邀请TA吧</Text>
                      </View>
                    </View>
                }
              </View>
            </View>
            <Image className='gif-wave' lazyLoad src={wave} mode='scaleToFill' />
          </View>
          <View className='order bgWhite' />
        </View>
        {/*功能部分*/}
        <View className='pd20'>
          <View className='at-row at-row--wrap'>
            <View className='at-col-6'>
              <View className='pr10' onClick={this.goView.bind(this,'remember')}>
                <View className='at-row at-row__align--center bgWhite card shadow-lg'>
                  <View className='at-col-7'>
                    <View className='pd20'>
                      <View className='pd10'>
                        <Text className='lg font-weight'>纪念日</Text>
                      </View>
                      <View className='pd10'>
                        <Text className='xxl major font-weight pr10'>{count.remember}</Text>
                        <Text className='lg weak'>个</Text>
                      </View>
                    </View>
                  </View>
                  <View className='at-col-5 text-center'>
                    <Image className='iconSize' src={date}/>
                  </View>
                </View>
              </View>
            </View>
            <View className='at-col-6'>
              <View className='pl10' onClick={this.goView.bind(this,'todo')}>
                <View className='at-row at-row__align--center bgWhite card shadow-lg'>
                  <View className='at-col-7'>
                    <View className='pd20'>
                      <View className='pd10'>
                        <Text className='lg font-weight'>愿望清单</Text>
                      </View>
                      <View className='pd10'>
                        <Text className='xxl major font-weight pr10'>{count.todo}</Text>
                        <Text className='lg weak'>个</Text>
                      </View>
                    </View>
                  </View>
                  <View className='at-col-5 text-center'>
                    <Image className='iconSize' src={todo}/>
                  </View>
                </View>
              </View>
            </View>
            <View className='at-col-6'>
              <View className='pr10 pt20' onClick={this.goView.bind(this,'mail')}>
                <View className='at-row at-row__align--center bgWhite card shadow-lg'>
                  <View className='at-col-7'>
                    <View className='pd20'>
                      <View className='pd10'>
                        <Text className='lg font-weight'>爱情邮箱</Text>
                      </View>
                      <View className='pd10'>
                        <Text className='xxl major font-weight pr10'>{count.mail}</Text>
                        <Text className='lg weak'>封</Text>
                      </View>
                    </View>
                  </View>
                  <View className='at-col-5 text-center'>
                    <Image className='iconSize' src={mail}/>
                  </View>
                </View>
              </View>
            </View>
            <View className='at-col-6'>
              <View className='pl10 pt20' onClick={this.goView.bind(this,'photo')}>
                <View className='at-row at-row__align--center bgWhite card shadow-lg'>
                  <View className='at-col-7'>
                    <View className='pd20'>
                      <View className='pd10'>
                        <Text className='lg font-weight'>共享相册</Text>
                      </View>
                      <View className='pd10'>
                        <Text className='xxl major font-weight pr10'>{count.photo}</Text>
                        <Text className='lg weak'>张</Text>
                      </View>
                    </View>
                  </View>
                  <View className='at-col-5 text-center'>
                    <Image className='iconSize' src={photo}/>
                  </View>
                </View>
              </View>
            </View>

            <View className='at-col-6'>
              <View className='pr10 pt20' onClick={this.goView.bind(this,'travel')}>
                <View className='at-row at-row__align--center bgWhite card shadow-lg'>
                  <View className='at-col-7'>
                    <View className='pd20'>
                      <View className='pd10'>
                        <Text className='lg font-weight'>旅游足迹</Text>
                      </View>
                      <View className='pd10'>
                        <Text className='xxl major font-weight pr10'>{count.travel}</Text>
                        <Text className='lg weak'>个</Text>
                      </View>
                    </View>
                  </View>
                  <View className='at-col-5 text-center'>
                    <Image className='iconSize' src={travel}/>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>


      </View>
    )
  }
}
