// /* Instagram Credentials */
// instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
// Fiber = Npm.require('fibers');
//
// /* Start Up Procedure */
// Meteor.startup(function () {
//   /* Rebuild DB on Server Start */
//   Tags_db.remove({}); // General Information collections
//   Instagram_db.remove({}); // Instagram collections
//
// });
//
// // Instagram to DB
// instaARCHIVE = function (tag, id) {
//   /* Undefined Check */
//   if (tag === undefined) { console.log("tag not defined"); return }
//
//
//   instagram.tags.media(tag, {max_tag_id: id}, function (tag, err, pag) {
//     try {
//       Fiber(function() {
//         // Tag to DB
//         for (i = 0; i < tag.length; ++i) {
//           Tags.insert(tag[i]);
//           New.insert(tag[i]); // FOR TESTING ONLY!
//         };
//
//         // Pagination to DB
//         var max = pag.next_max_id, min = pag.next_min_id;
//         if (Pagi.find().count() === 0) {
//           Pagi.insert({next_max_id: max, next_min_id: min, type: "pagi"});
//         } else {
//           Pagi.update({type: "pagi"}, {next_max_id: max, next_min_id: min, type: "pagi"});
//         };
//       }).run();
//     } catch (err) { throw err; }; // Error management
//   });
// };
