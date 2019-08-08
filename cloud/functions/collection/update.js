
module.exports = async (db,_,event) => {
  const collection = db.collection(event.collection);

  const res = await collection.doc(event.doc).update({
    data: {...event.content}
  });
  return res
}
