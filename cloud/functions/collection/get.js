
module.exports = async (db,_,event) => {
  const collection = db.collection(event.collection)

  const res = await collection.orderBy('createTime', 'desc').where({
    createId:_.or(_.eq(event.id),_.eq(event.bindId)),
    ...event.condition
  }).skip(event.start).limit(event.limit).get();

  return res.data
}
