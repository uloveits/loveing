import Taro from "@tarojs/taro"
import base from './base'



export default class commonApi extends base {


  /**
   * 首页各部分条数
   */
  static async getCount(param) {

    let remember = await Taro.cloud.callFunction({name: "getCount", data: {collection:'remember',...param}});

    let todo = await Taro.cloud.callFunction({name: "getCount", data: {collection:'todo',...param}});

    let mail = await Taro.cloud.callFunction({name: "getCount", data: {collection:'mail',...param}});

    let photo = await Taro.cloud.callFunction({name: "getCount", data: {collection:'photo',...param}});

    let travel = await Taro.cloud.callFunction({name: "getCount", data: {collection:'travel',...param}});


    return {
      remember:remember.result,
      todo:todo.result,
      mail:mail.result,
      photo:photo.result,
      travel:travel.result,
    }
  }

  /**
   * 通过Id查详情
   * @param param
   * @returns {Promise<void>}
   */
  static async doc(param) {
    console.log('通过Id查详情');
    console.log(param);
    let res = await Taro.cloud.callFunction({name: "collection", data: {$url: param.method,...param}});

    if (res.result.code === '200') {
      return res.result.data
    }
  }

  /**
   * 查一个表的集合
   */
  static async list(param) {

    let res = await Taro.cloud.callFunction({name: 'collection', data: {$url: param.method,...param}});
    console.log('查一个表的集合');
    console.log(res);

    if (res.result.code === '200') {
      return res.result.data
    }
  }


  /**
   * 通过Id删除
   * @param param
   * @returns {Promise<void>}
   */
  static async del(param) {
    console.log('通过Id删除');
    console.log(param);
    let res = await Taro.cloud.callFunction({name: "collection", data: {$url: param.method,...param}});

    if (res.result.code === '200') {
      return res.result.data
    }
  }

  /**
   * 通过Id更新
   * @param param
   * @returns {Promise<void>}
   */
  static async update(param) {
    console.log('通过Id更新操作');
    console.log(param);
    let res = await Taro.cloud.callFunction({name: "collection", data: {$url: param.method,...param}});

    if (res.result.code === '200') {
      return res.result.data
    }
  }

  /**
   * 向集合里新增数据
   * @param param
   * @returns {Promise<void>}
   */
  static async add(param) {
    console.log('向集合里新增数据');
    console.log(param);
    let res = await Taro.cloud.callFunction({name: "collection", data: {$url: param.method,...param}});

    if (res.result.code === '200') {
      return res.result.data
    }
  }

  /**
   * 获取各种flag
   * @param param
   * @returns {Promise<void>}
   */
  static async flag(param) {
    let res = await Taro.cloud.callFunction({name: "getFlag", data: {...param}});
    return res.result.data;
  }

}
