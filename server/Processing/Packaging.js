Meteor.startup(function () { Tags_db.remove({}); }); // FOR PROTOTYPING ONLY!

Instagram_db.find({}, {fields: {created_time: 1}}).forEach(function (doc) {
  var date = moment.unix(doc.created_time).format("YYYYMMD");
  var tags = Tags_db.findOne({'_id': date});

  if(tags.Instagram === undefined) {
    Tags_db.insert({'_id': date, 'Instagram': 1}, function (err, id) {
      if(err == null) console.log("Entry " + id + " was created.");
      else console.log(err);
    });
  } else {
    tags.Instagram = tags.Instagram++;
    Tags_db.update({'_id': date}, {'Instagram': tags.Instagram});
  }
})
