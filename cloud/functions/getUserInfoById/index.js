const cloud = require('wx-server-sdk');


cloud.init();

const db = cloud.database()

exports.main = async (event) => {

    return db.collection('user').where({
        _id: event.id // 填入当前用户 openid
    }).get();

}