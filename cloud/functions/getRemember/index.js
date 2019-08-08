const cloud = require('wx-server-sdk');


cloud.init();

const db = cloud.database();
const _ = db.command;

exports.main = async (event) => {

    let getRet = await db.collection('remember').where({
      type:_.neq('together'),
      createId:_.or(_.eq(event.id),_.eq(event.bindId))
    }).get();

    return getRet

}