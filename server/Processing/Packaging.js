// Instagram_db.find({}, {fields: {created_time: 1}}).forEach(function (doc) {
//   var date = moment.unix(doc.created_time).format("YYYYMMDD");
//   var tags = this.findOne({'_id': date});
//
//   try {
//     if(tags === undefined) {
//       this.insert({'_id': date, 'Instagram': 1}, function (err, id) {
//         if(err == null) console.log("Entry " + id + " was created.");
//         else console.log(err);
//       });
//     } else {
//       tags.Instagram = tags.Instagram+1;
//       this.update({'_id': date}, {'Instagram': tags.Instagram});
//     }
//   } catch (err) {throw err;}
//
//   return this;
// }, Tags_db)
