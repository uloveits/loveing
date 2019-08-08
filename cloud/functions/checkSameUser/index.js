const cloud = require('wx-server-sdk');


cloud.init();

const db = cloud.database()

exports.main = async (event) => {
    let { OPENID } = cloud.getWXContext();

    return db.collection('user').where({
        _openid: OPENID // 填入当前用户 openid
    }).get();

}