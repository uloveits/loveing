import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text} from '@tarojs/components'
import { AtActionSheet,AtActionSheetItem } from 'taro-ui'

import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import commonApi from "../../service/api/common";
import CommonFnc from "../../utils/commonFnc";

@inject('auth')
@observer
export default class TravelPage extends Component {

  config = {
    navigationBarTitleText: '共享相册',
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
  }

  constructor() {
    super(arguments);

    this.state = {
      isAction:false,
      photo:[]

    }
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.getImage(true)
  }

  componentDidShow () {

  }

  //下拉刷新
  onPullDownRefresh() {
    this.getImage(true)
    Taro.stopPullDownRefresh();
  }

  isPlus = () => {
    this.setState({
      isAction:true
    })
  };

  uploadImage = async () => {
    const { auth } = this.props;
    //选择图片
    let res = await Taro.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    });

    const filePathList = res.tempFilePaths;

    for(let i=0;i<filePathList.length;i++) {
      const cloudPath = `photo_${CommonFnc.getTimestamp() }` + filePathList[i].match(/\.[^.]+?$/);
      const filePath =  filePathList[i];
      console.log(cloudPath);

      let cloud = await Taro.cloud.uploadFile({
        cloudPath,
        filePath,
      });
      let param = {
        method:'add',
        collection:'photo',
        content:{
          createId:auth.user._id,
          bindId:auth.user.bindId,
          createTime : CommonFnc.dateFormat("yyyy-MM-dd hh:mm:ss",new Date()),
          cloudPath:cloud.fileID,
          filePath:cloudPath,
        }
      };
      await commonApi.add(param);
    }
  };

  getImage = async (isFirst) => {
    const { auth } = this.props;
    if(isFirst){
      this.setState({
        loading:true,
      })
      this.start = 0;
    }
    let param = {
      method:'get',
      collection:'photo',
      condition:{},
      id:auth.user._id,
      bindId:auth.user.bindId,
      start:this.start,
      limit:20
    };

    let res = await commonApi.list(param);
    console.log(res);

    this.start = this.start + 20;

    let _photo = this.state.photo;

    _photo = _photo.concat(res);

    if(isFirst) {
      this.setState({
        photo:res,
        loading:false,
      })
    }else {
      this.setState({
        photo:_photo,
        loading:false,
      })
    }

  }


  previewImage = (url) => {

    Taro.previewImage({
      urls: [url]
    })
  }



  render () {
    const { isAction,photo } = this.state;

    return (
      <View>

        <View>
          {
            photo.map((item,idx)=>(
              <View key={idx}>
                <View className='at-row at-row--wrap'>
                  <View className='at-col-6'>
                    <View className='pd20' onClick={this.previewImage.bind(this,item.cloudPath)}>
                      <Image className='wd100 card' mode='widthFix' src={item.cloudPath} />
                    </View>
                  </View>
                </View>
              </View>
            ))
          }
        </View>


        {/*动作面板*/}
        <AtActionSheet isOpened={isAction} cancelText='取消'>
          <AtActionSheetItem onClick={this.uploadImage.bind(this)}>
            上传图片
          </AtActionSheetItem>
          <AtActionSheetItem>
            上传视频
          </AtActionSheetItem>
        </AtActionSheet>

        {/*浮动添加按钮*/}
        <View className='floatFab'>
          <View className='bg-gradual-green fb-icon'  onClick={this.isPlus.bind(this)}>
            <Text className='at-icon at-icon-add'></Text>
          </View>
        </View>
      </View>
    )
  }
}
