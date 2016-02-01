Meteor.startup(function () { Tags_db.remove({}); }); // FOR PROTOTYPING ONLY!

Instagram_db.find({}, {fields: {created_time: 1}}).forEach(function (doc) {
  var date = moment.unix(doc.created_time).format("YYYYMMD");
  var tags = Tags_db.find({'_id': date}).fetch();

  /*
  TODO: Current method to determin if to update or insert is not correct! 
  */

  console.log(tags);
  if(tags.Instagram = 0) {
    console.log("attempting to insert new ID at: " + date)
    Tags_db.insert({'_id': date, 'Instagram': 1}, function (err, id) {
      if(err == null) console.log("Entry " + id + " was created.");
    });
  } else {
    // console.log(tags);
    console.log(tags.Instagram);
    tags = tags.Instagram + 1;
    Tags_db.update({'_id': date}, {'Instagram': tags});
  }
})
