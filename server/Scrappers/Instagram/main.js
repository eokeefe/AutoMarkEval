/* Start Up Procedure */
Meteor.startup(function () {
  /* Rebuild DB on Server Start */
  Tags_db.remove({}); // General Information collections
  Instagram_db.remove({}); // Instagram collections

  Interests.find().forEach(function (doc) { instaINFO(doc._id); });
});

// Meteor.setInterval(function () {
  Interests.find().forEach(function (doc) {
    instaARCHIVE(doc._id, doc.next_min_id); // I think we want min here...
  });
// }, 10000);
