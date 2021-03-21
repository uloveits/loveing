const cloud = require('wx-server-sdk');


cloud.init();

const db = cloud.database();


exports.main = async (event) => {

  const res = await db.collection('flag').where({
    ...event.condition
  }).get();

  return res
}