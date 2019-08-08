import Taro, { Component } from '@tarojs/taro'
import { View, Text,Picker } from '@tarojs/components'
import {AtFloatLayout,AtInput,AtIcon,AtButton,AtFab,AtSwitch,AtSwipeAction} from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import KtSeparator from "../../comps/layout/separator";
import CommonFnc from "../../utils/commonFnc";
import rememberApi from "../../service/api/remember";
import LunarCalendar from "../../utils/lunar";
import Tips from "../../utils/tips";
import commonApi from "../../service/api/common";




@inject('auth')
@observer
export default class RememberPage extends Component {

  config = {
    navigationBarTitleText: '我们的纪念',
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
  }

  constructor() {
    super(arguments);
    this.state = {
      isShowPlus:false,
      param:{
        time:CommonFnc.dateFormat("yyyy-MM-dd",new Date())
      },
      together:{
        name:'我们在一起已经',
        time:CommonFnc.dateFormat("yyyy-MM-dd",new Date()),
        type:'together'
      },
      togetherNum:'',
      isLunar:false,
      remember:[]
    }
  }


  componentWillMount () { }

  componentDidMount () {
    this.getTogether();
    this.getRemember();
  }

  //下来刷新
  onPullDownRefresh() {
    this.getTogether();
    this.getRemember();
    Taro.stopPullDownRefresh();
  }

  //获得在一起天数
  getTogether = async () => {
    const { auth } = this.props;
    let param = {
      id:auth.user._id,
      bindId:auth.user.bindId,
    }
    let res = await rememberApi.together(param);
    this.setState({
      togetherNum:res || false
    })
  };
  //获得其他纪念日（除系统设置的在一起天数）
  getRemember = async () => {
    const { auth } = this.props;
    let param = {
      id:auth.user._id,
      bindId:auth.user.bindId,
    }
    let res = await rememberApi.get(param);
    this.setState({
      remember:res
    })
  };


  isPlus = (item) => {
    this.setState({
      isShowPlus:true,
      param:item
    })
  };

  isShowPlusClose = () => {
    this.setState({
      isShowPlus:false
    })
  };

  //输入框的change事件
  onInputChange = (obj,prop,value) => {
    let _obj = this.state[obj];
    _obj[prop] = value;
    this.setState({
      [obj]:_obj
    })
  };

  //日期切换
  onDateChange = (obj,prop,e) => {
    let _obj = this.state[obj];
    _obj[prop] = e.detail.value;
    this.setState({
      [obj]:_obj
    });
  };

  //阳历阴历模式切换
  onSwitchChange = (b) => {
    this.setState({
      isLunar:b
    })
  }

  //添加纪念日
  plusRemember = async () => {
    const { auth } = this.props;
    let content = this.state.param;
    content.createId = auth.user._id;
    content.bindId = auth.bindUser._id;
    content.isLunar = this.state.isLunar ? 1 : 0;
    // 农历阳历转换
    if(this.state.isLunar){
      content.time = LunarCalendar.lunarToSolar(content.time);
      content.lunarTime = LunarCalendar.solarToLunar(content.time)

    }else {
      content.lunarTime = LunarCalendar.solarToLunar(content.time)
    }

    let param = {
      method:'add',
      collection:'remember',
      content:content
    }
    let res = await commonApi.add(param);
    if(res.errMsg === 'collection.add:ok'){
      Tips.toast('添加成功');
      this.setState({
        isShowPlus:false
      },()=>{
        this.getRemember();
      })
    }
  };

  //删除操作
  doDelete = async (item) => {
    await Tips.confirm('确定删除该条记录吗？');
    let param = {
      method:'del',
      collection:'remember',
      doc:item._id,
    }
    let res = await commonApi.del(param);

    console.log('删除操作 ');
    console.log(res);
    if(res.errMsg === 'document.remove:ok'){
      Tips.toast('删除成功');
      this.getRemember();
    }
  };

  render () {
    const { isShowPlus,together,togetherNum,remember } = this.state;
    const Line = (<KtSeparator comp={{height:'1px'}} />);


    const opt = [
      {
        text: '删除',
        style: {
          backgroundColor: '#FF4949'
        }
      }
    ]
    return (
      <View>
        {/*纪念日*/}
        <View className='pd20'>
          <View className='pd20 bgWhite card shadow-lg bg-gradual-red'>
            <View className='at-row at-row__align--center'>
              <View className='at-col-1'>
                <Text className='wx wx-tag brand' />
              </View>
              <View className='at-col-7'>
                <View className='pd10'>
                  <Text className='lg font-weight'>我们在一起已经</Text>
                </View>

              </View>
              <View className='at-col-4'>
                {
                  togetherNum &&
                  <View className='pd10 text-right'>
                    <Text className='xxl'>{togetherNum}</Text>
                    <Text className='xs pl10'>天</Text>
                  </View>
                }
                {
                  !togetherNum &&
                  <View className='text-right' onClick={this.isPlus.bind(this,together)}>
                    <Text className='wx wx-plus primary' />
                  </View>
                }
              </View>

            </View>
          </View>

        </View>

        {
          remember.map((item,idx)=>(
            <View className='plr20 pb20'  key={idx}>
              <View className='bgWhite card shadow-lg'>
                <AtSwipeAction options={opt} onClick={this.doDelete.bind(this,item)} className='card'>
                  <View className='pd20'>
                    <View className='at-row at-row__align--center'>
                      <View className='at-col-1'>
                        <Text className='wx wx-tag brand' />
                      </View>
                      <View className='at-col-5'>
                        <View className='pd10'>
                          <Text className='lg font-weight'>{item.name}</Text>
                        </View>

                      </View>
                      <View className='at-col-6'>
                        <View className='pd10 text-right'>
                          {
                            item.isLunar === 0 &&  <Text className='lg major'>还有{CommonFnc.getBirthDayDiff(item.time,false)}天</Text>
                          }
                          {
                            item.isLunar === 1 &&  <Text className='lg major'>还有{CommonFnc.getBirthDayDiff(item.lunarTime.num,true)}天</Text>
                          }
                        </View>
                      </View>

                    </View>
                  </View>
                </AtSwipeAction>
              </View>
            </View>
          ))
        }

        {/*浮动添加按钮*/}
        <View className='floatFab'>
          <AtFab size='normal' onClick={this.isPlus.bind(this,this.state.param)}>
            <Text className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab>
        </View>
        {/*添加纪念日*/}
        <AtFloatLayout isOpened={isShowPlus} title='添加纪念日' onClose={this.isShowPlusClose.bind(this)}>
          <View >
            <View className='pd20'>
              <AtInput
                title='名字'
                type='text'
                placeholder='请输入纪念日的名字'
                value={this.state.param.name}
                onChange={this.onInputChange.bind(this,'param','name')}
              />
            </View>
            <View className='plr20'>
              {Line}
            </View>
            <View className='pd20'>
              <AtSwitch title='是否为农历' checked={this.state.isLunar} onChange={this.onSwitchChange.bind(this)} />
            </View>
            <View className='plr20'>
              {Line}
            </View>
            <View className='pd20'>
              <Picker mode='date' onChange={this.onDateChange.bind(this,'param','time')}>
                <View className='picker'>
                  <View className='at-row'>
                    <View className='at-col-6'>
                      <Text className='lg'>选择日期：</Text>
                    </View>
                    <View className='at-col-6 text-right'>
                      <Text className='sm muted'>{this.state.param.time}</Text>
                      <AtIcon  value='chevron-right' size='18' color='#735134'></AtIcon>
                    </View>
                  </View>
                </View>
              </Picker>
            </View>

            <View className='pd20 mt60'>
              <AtButton type='primary' onClick={this.plusRemember.bind(this)}>添加</AtButton>
            </View>
          </View>
        </AtFloatLayout>

      </View>
    )
  }
}
