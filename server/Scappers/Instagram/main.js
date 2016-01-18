// var tag = "porsche"; // Tag in question
//
// Instagram_pag.find().observe({
//   added: function (doc) {
//     if (doc.next_max_id !== null) instaARCHIVE(tag, doc.next_max_id)
//     else {
//       console.log("DB is currently up to date.");
//       Meteor.setInterval(function () {instaUPDATE(tag,doc.next_min_id)}, 3000);
//     }
//   },
//   changed: function (doc) {
//     if (doc.next_max_id !== null) instaARCHIVE(tag, doc.next_max_id)
//     else {
//       console.log("DB is currently up to date.");
//       Meteor.setInterval(function () {instaUPDATE(tag,doc.next_min_id)}, 3000);
//     }
//   }
// });
//
// instaINFO(tag); // Collect information on tag
// instaARCHIVE(tag, '0'); // Collect arcived data
