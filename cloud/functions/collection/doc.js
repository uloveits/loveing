module.exports = async (db,_,event) => {
  const collection = db.collection(event.collection);

  const res = await collection.doc(event.doc).get();

  return res.data
}
