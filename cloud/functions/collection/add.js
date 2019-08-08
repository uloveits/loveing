
module.exports = async (db,_,event) => {
  const collection = db.collection(event.collection);

  const res =  await collection.add({data: event.content});

  return res
}
