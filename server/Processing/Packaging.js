// Tags_db.remove({}); // General Information collections
//
// Instagram_db.find({}, {fields: {created_time: 1}}).forEach(function (doc) {
//   var date = moment.unix(doc.created_time).format("YYYYMMDD");
//   var tags = this.findOne({'_id': date});
//
//   if(tags === undefined) {
//     this.insert({'_id': date, 'Instagram': 1}, function (err, id) {
//       try { console.log("Entry " + id + " was created."); }
//       catch (err) { console.log(err); }
//     });
//   } else { this.update({'_id': date}, {$inc: {'Instagram': 1}}); }
// }, Tags_db)
