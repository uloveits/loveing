import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtFloatLayout,AtInput,AtIcon,AtButton,AtFab,AtLoadMore} from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import KtSeparator from "../../comps/layout/separator";
import CommonFnc from "../../utils/commonFnc";

import todoApi from "../../service/api/todo";
import KtLoadMore from "../../comps/layout/load/more";
import Routes from "../../utils/route";
import commonApi from "../../service/api/common";





@inject('auth')
@observer
export default class TodoPage extends Component {

  config = {
    navigationBarTitleText: '愿望清单',
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
  }

  constructor() {
    super(arguments);
    this.state = {
      curIdx:0,
      isAddTodo:false,
      param:{},
      isComplete:0,
      todo:[],
      loading:false

    }
  }

  componentDidShow() {
    this.getTodo(true)
  }

  onReachBottom() {
    this.setState({
      loading:true
    },()=>{
      this.getTodo(false)
    })

  }

  //下来刷新
  onPullDownRefresh() {
    this.getTodo(true)
    Taro.stopPullDownRefresh();
  }

  //获得对话信息
  getTodo = async (isFirst)=> {
    const { auth } = this.props;
    if(isFirst){
      this.setState({
        loading:true,
      })
      this.start = 0;
    }
    let param = {
      method:'get',
      collection:'todo',
      condition:{
        isComplete:this.state.isComplete
      },
      id:auth.user._id,
      bindId:auth.user.bindId,
      start:this.start,
      limit:20
    };

    let res = await commonApi.list(param);
    console.log(res);

    this.start = this.start + 20;

    let _todo = this.state.todo;

    _todo = _todo.concat(res);

    if(isFirst) {
      this.setState({
        todo:res,
        loading:false,
      })
    }else {
      this.setState({
        todo:_todo,
        loading:false,
      })
    }

  }


  isPlus = () => {
    this.setState({
      isAddTodo:true,
      param:{
        title:''
      },
    })
  };

  isShowPlusClose = () => {
    this.setState({
      isAddTodo:false
    })
  };


  //tab切换
  onSwitchTab = (idx)=>{
    this.setState({
      curIdx:idx,
      isComplete:idx,
    },()=>{
      this.getTodo(true)
    })
  }

  //输入框的change事件
  onInputChange = (obj,prop,value) => {
    let _obj = this.state[obj];
    _obj[prop] = value;
    this.setState({
      [obj]:_obj
    })
  };


  //添加
  plusTodo = async () => {
    const { auth } = this.props;
    let content = this.state.param;
    if(!content.title || content.title === ''){
      return
    }
    content.createId = auth.user._id;
    content.bindId = auth.user.bindId;
    content.isComplete = 0;
    content.createTime = CommonFnc.dateFormat("yyyy-MM-dd hh:mm:ss",new Date());

    let param = {
      method:'add',
      collection:'todo',
      content:content
    };

    let res = await commonApi.add(param);

    if(res.errMsg === 'collection.add:ok'){
      this.isShowPlusClose();
      this.getTodo(true)
    }
  }

  goView = (item) => {
    Routes.toTodoDetail({id:item._id})
  }


  render () {
    const { curIdx,isAddTodo,todo,loading } = this.state;
    const Line = (<KtSeparator comp={{height:'1px'}} />);
    const tab = [{title:'未完成'},{title:'已完成'}]
    return (
      <View>
        {/*tab选择*/}
        <View className='pd20'>
          <View className='at-row at-row__align--center bgWhite card'>
            {
              tab.map((item,idx)=>(
                <View className='at-col-6 text-center ' key={idx} onClick={this.onSwitchTab.bind(this,idx)}>
                  <View className={curIdx === idx ? 'pd10 bg-gradual-primary  card' : 'pd10 card'}>
                    <View className='pb10'>
                      <Text className={curIdx === idx ? 'lg white' : 'lg'}>{item.title}</Text>
                    </View>
                    <View className='flex-center p'>
                      {
                        curIdx === idx &&  <View className='tabLine bgWhite' />
                      }
                    </View>

                  </View>
                </View>
              ))
            }
          </View>
        </View>

        {/*愿望的内容*/}
        {
          todo.length>0 &&
          <View className='pd20'>
            <View className='bgWhite plr20 card'>
              {
                todo.map((item,idx)=>(
                  <View key={idx}>
                    <View className='ptb20' onClick={this.goView.bind(this,item)}>
                      <View className='at-row'>
                        <View className='at-col-10'>
                          <View className='limitWidth'>
                            <Text className='wx wx-todo middle major font-weight' />
                            <Text className='lg pl20 font-weight'>{item.title}</Text>
                          </View>

                        </View>
                        <View className='at-col-2 text-right'>
                          <AtIcon  value='chevron-right' size='18' color='#735134'></AtIcon>
                        </View>
                      </View>
                    </View>
                    {idx < todo.length - 1 && Line}
                  </View>
                ))
              }
            </View>
          </View>
        }


        {
          todo.length === 0 &&
          <View className='pd20'>
            <View className='bgWhite plr20 card'>
            {
              loading ? <AtLoadMore status='loading' /> :  <KtLoadMore text='空空如也鸭~' />
            }
            </View>
          </View>
        }
        {
          todo.length > 0 &&
            <View>
              {
                loading && <AtLoadMore status='loading' />
              }
            </View>
        }

        {/*浮动添加按钮*/}
        <View className='floatFab'>
          <AtFab size='normal' onClick={this.isPlus.bind(this,this.state.param)}>
            <Text className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab>
        </View>

        {/*添加愿望*/}
        <AtFloatLayout isOpened={isAddTodo} title='添加计划' onClose={this.isShowPlusClose.bind(this)}>
          <View >
            <View className='pd20'>
              <AtInput
                title='标题'
                type='text'
                placeholder='请输入想要做的事情'
                value={this.state.param.title}
                onChange={this.onInputChange.bind(this,'param','title')}
              />
            </View>
            <View className='plr20'>
              {Line}
            </View>

            <View className='pd20 mt60'>
              <AtButton type='primary' onClick={this.plusTodo.bind(this)}>添加</AtButton>
            </View>
          </View>
        </AtFloatLayout>

      </View>
    )
  }
}
