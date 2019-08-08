const cloud = require('wx-server-sdk');


cloud.init();

const db = cloud.database()

exports.main = async (event) => {
    let { OPENID } = cloud.getWXContext();
    let param = {
        _openid:OPENID,
        avatarUrl:event.avatarUrl,
        city:event.city,
        code:event.code,
        gender:event.gender,
        nickName:event.nickName,
    };
    if(event.id){
        return await db.collection('user').doc(event.id).update({
            data: param
        })
    }else{
        return await db.collection('user').add({
            data: param
        })
    }

}