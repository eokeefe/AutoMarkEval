/* Start Up Procedure */
Meteor.startup(function () {
  /* Rebuild DB on Server Start */
  Tags_db.remove({}); // General Information collections
  Instagram_db.remove({}); // Instagram collections

  Interests.find().forEach(function (doc) { instaINFO(doc._id);});
});

Interests.find().observe({
  changed: function (doc) { // TODO: Only call when update_time or media_count is changed
    console.log(doc._id + " has "+ doc.instagram.media_count + " tags as of " + moment.unix(doc.instagram.update_time).format('h:mm:ssa on MMMM Do, YYYY.'));
  }
})

// Instagram_pag.find().observe({
//   added: function (doc) {
//     if (doc.next_max_id !== null) instaARCHIVE(tag, doc.next_max_id)
//     else {
//       console.log("DB is currently up to date.");
//     }
//   },
//   changed: function (doc) {
//     if (doc.next_max_id !== null) instaARCHIVE(tag, doc.next_max_id)
//     else { console.log("DB is currently up to date."); }
//   }
// });

instaARCHIVE(Interests.findOne()._id, '0'); // Collect arcived data
