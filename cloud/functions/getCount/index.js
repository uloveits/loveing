const cloud = require('wx-server-sdk');


cloud.init();

const db = cloud.database();
const _ = db.command;

exports.main = async (event) => {

  const count = await db.collection(event.collection).where({
    createId:_.or(_.eq(event.id),_.eq(event.bindId)),
  }).count();

  return count.total

}