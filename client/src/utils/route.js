import Taro from '@tarojs/taro'
import CommonFnc from "./commonFnc";


export default class Routes {

  /**
   * 登陆注册页面
   * @param params
   * @param options
   */
  static toLogin(params={}, options={}){
    CommonFnc.gotoPage('/pages/index/auth/index',params, options)
  }

  /**
   * 首页
   * @param params
   * @param options
   */
  static toIndex(params={}, options={}){
    Taro.switchTab({
      url:'/pages/index/index'
    })
  }

  /**
   * 纪念日
   * @param params
   * @param options
   */
  static toRemember(params={}, options={}){
    CommonFnc.gotoPage('/pages/remember/index',params, options)
  }

  /**
   * 愿望清单
   * @param params
   * @param options
   */
  static toTodo(params={}, options={}){
    CommonFnc.gotoPage('/pages/todo/index',params, options)
  }

  /**
   * 愿望清单详情
   * @param params
   * @param options
   */
  static toTodoDetail(params={}, options={}){
    CommonFnc.gotoPage('/pages/todo/detail/index',params, options)
  }

  /**
   * 爱情邮箱
   * @param params
   * @param options
   */
  static toMail(params={}, options={}){
    CommonFnc.gotoPage('/pages/mail/index',params, options)
  }

  /**
   * 爱情邮箱编辑
   * @param params
   * @param options
   */
  static toMailEdit(params={}, options={}){
    CommonFnc.gotoPage('/pages/mail/edit/index',params, options)
  }

  /**
   * 爱情邮箱详情
   * @param params
   * @param options
   */
  static toMailDetail(params={}, options={}){
    CommonFnc.gotoPage('/pages/mail/detail/index',params, options)
  }


  /**
   * 旅游足迹
   * @param params
   * @param options
   */
  static toTravel(params={}, options={}){
    CommonFnc.gotoPage('/pages/travel/index',params, options)
  }

  /**
   * 共享相册
   * @param params
   * @param options
   */
  static toPhoto(params={}, options={}){
    CommonFnc.gotoPage('/pages/photo/index',params, options)
  }








}

