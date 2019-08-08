import Taro from '@tarojs/taro';
import { observable } from 'mobx'
import common from './common'

import authApi from '../service/api/auth'
import CommonFnc from "../utils/commonFnc";

const CACHE_USER = 'cacheUser';
const BIND_USER = 'bindUser';

const auth = observable({
  user: initUser(),
  bindUser:Taro.getStorageSync(BIND_USER) || 0,
});

/**
 * 获取用户信息
 */
auth.check = function(param = {block: false, redirect: false}) {
  console.log(param.block);
  console.log(param.redirect);
  // 检查
  if (this.user) {
    return true
  } else {
    // 从未登录
    if (param.block) {
      CommonFnc.goView('/pages/index/auth/index', {}, param.redirect)
    }
    return false
  }
};

auth.checkBindInfo = async function(param) {
  const res = await authApi.checkBindInfo(param);

  this.saveUser(res.user);

  res.bindUser&&this.saveBindUser(res.bindUser);

  return res;
}


auth.wxCloudLogin = async function(param) {
  const res = await authApi.wxCloudLogin(param);

  this.saveUser(res);

  return res;
}




auth.logout = function() {
  this.user = null;
  common.token = null;
  Taro.removeStorageSync(CACHE_USER)
}

auth.saveUser = function(user, code) {
  user.validTime = getTimestamp()
  this.user = user
  user.token&&common.setToken(user.token)
  code&&common.setWxCode(code)
  Taro.setStorageSync(CACHE_USER, user)
};

auth.saveBindUser = function(user) {
  user.validTime = getTimestamp()
  this.bindUser = user
  Taro.setStorageSync(BIND_USER, user)
};


function initUser() {
  const user = Taro.getStorageSync(CACHE_USER)
  common.setToken(user.token);
  return user
}


function getTimestamp() {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  return timestamp
}


export default auth
