/* Start Up Procedure */
Meteor.startup(function () {
  /* Rebuild DB on Server Start */
  Tags_db.remove({}); // General Information collections
  Instagram_db.remove({}); // Instagram collections

  Interests.find().forEach(function (doc) { instaINFO(doc._id); });
});

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
