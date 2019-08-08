import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import KtSeparator from "../../../comps/layout/separator";
import commonApi from "../../../service/api/common";
import Tips from "../../../utils/tips";
import img from "../../../public/imgs/svg/complete.svg"






@inject('auth')
@observer
export default class TodoDetailPage extends Component {

  config = {
    navigationBarTitleText: '详情',
  }

  constructor() {
    super(arguments);
    this.state = {
      info:{},
      imgUrl:''
    }
  }


  componentWillMount () { }

  componentDidMount () {
    this.getTodoDetail();
  }

  getTodoDetail = async () => {
    let param = {
      method:'doc',
      collection:'todo',
      doc:this.$router.params.id,
    }
    let res = await commonApi.doc(param)
    console.log(res)
    this.setState({
      info:res
    })
  };

  // 上传图片
  //上传的时候，我们可以获得一个fileId，这个id我们必须存起来，在别人查看的时候，image的src使用的就是fileId，然后用户必
  //须得知道上传的是哪张图片呀， 所以我们使用的是本地的图片路径来展示，即imagePath
  doUpload = async () => {
    //选择图片
    let res = await Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    })
    const filePath = res.tempFilePaths[0];
    this.setState({
      imgUrl: filePath
    })
    console.log(res)
  };

  saveImg = async () => {

    const filePath = this.state.imgUrl;
    // 上传图片
    const cloudPath = `todo_${this.state.info._id }` + filePath.match(/\.[^.]+?$/);

    console.log(cloudPath);

    let res = await Taro.cloud.uploadFile({
      cloudPath,
      filePath,
    });

    let param = {
      method:'update',
      collection:'todo',
      doc:this.state.info._id ,
      content:{
        cloudPath:res.fileID,
        filePath:cloudPath,
      }
    }
    await commonApi.update(param);
    this.setState({
      imgUrl:''
    },()=>{
      this.getTodoDetail();
    })
  }

  //删除
  delete = async (info) => {
    await Tips.confirm('确定要删除吗？');
    let param = {
      method:'del',
      collection:'todo',
      doc:info._id,
    }
    await commonApi.del(param);

    if(info.cloudPath){
      await Taro.cloud.deleteFile({
        fileList: [info.cloudPath],
      })
    }

    Taro.navigateBack({
      delta:1
    })

  }

  //完成
  complete = async (id) => {
    await Tips.confirm('确定这事已经完成了吗？');
    let param = {
      method:'update',
      collection:'todo',
      doc:id,
      content: {
        isComplete:1
      }
    }
    await commonApi.update(param);

    this.getTodoDetail();

  }



  render () {
    const { info,imgUrl } = this.state;
    const Line = (<KtSeparator comp={{height:'1px'}} />);

    return (
      <View>
        <View className='pd20'>
          <View className='pd20 bgWhite card rel'>
            {
              info.isComplete === 1 &&
              <View className='complete'>
                <Image className='wd100 ht100' src={img} />
              </View>
            }

            <View className='ptb20'>
              {
                (imgUrl === '' && !info.cloudPath )&&
                <View className='text-center bgEC wd100 card' style='height:60px' >
                  <View className='pt40' onClick={this.doUpload}>
                    <Text className='wx wx-img weak'></Text>
                    <Text className='sm weak'>添加图片</Text>
                  </View>
                </View>
              }
              {
                (imgUrl !== '' || info.cloudPath) &&
                <View>
                  <Image className='wd100' mode='widthFix' lazyLoad src={imgUrl || info.cloudPath } />
                </View>
              }
              {
                imgUrl !== '' && !info.cloudPath &&
                  <View className='pd20'>
                    <View className='at-row'>
                      <View className='at-col-6 text-center' onClick={this.doUpload.bind(this)}>
                        <Text className='blue lg font-weight'>换一张</Text>
                      </View>
                      <View className='at-col-6 text-center' onClick={this.saveImg.bind(this)}>
                        <Text className='major lg font-weight'>就要这张了</Text>
                      </View>
                    </View>
                  </View>
              }

            </View>
            <View>
              <Text className='wx wx-aims primary '></Text>
              <Text className='lg weak pl20'>{info.title}</Text>
            </View>
            <View>
              <Text className='wx wx-time primary middle'></Text>
              <Text className='lg weak pl20'>{info.createTime}</Text>
            </View>

            <View className='pt20'>
              <View className='at-row'>
                <View className='at-col-2 at-col__offset-8'>
                  {
                    info.isComplete === 0 &&
                    <AtButton type='primary' size='small' onClick={this.complete.bind(this,info._id)}>完成</AtButton>
                  }
                </View>
                <View className='at-col-2 '>
                  <AtButton size='small' onClick={this.delete.bind(this,info)}>删除</AtButton>
                </View>

              </View>
            </View>
          </View>



        </View>
      </View>
    )
  }
}
