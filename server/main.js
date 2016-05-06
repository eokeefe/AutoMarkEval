/* Server Code Entry Point */
import { Meteor } from 'meteor/meteor'
import '../imports/startup/shared'
import { instagram } from '../imports/api/scrappers/analytics/instagram'

/* Start Up Procedure */
Meteor.startup(function () {
  /* Rebuild DB on Server Start */
  Tags_db.remove({}); // General Information collections
  Instagram_db.remove({}); // Instagram collections

  // FOR TESTING -- To pull out mysterious _id's..
  // Interests.remove({});
  // Interests.insert({_id: 'porsche'});
  // Interests.insert({_id: 'ferrari'});
  // Interests.insert({_id: 'ducati'});

  Interests.find().forEach(function (doc) { instagram.info(doc._id); });
});

// var next_id = 0;
//
// Meteor.setInterval(function () {
//   Interests.find().forEach(function (doc) {
//     if (doc.Instagram.pagi != undefined) { next_id = doc.instagram.pagi.min_id; }
//     console.log(doc.Instagram.pagi);
//     instaARCHIVE(doc._id, doc.instagram.pagi.min_id); // I think we want min here...
//   });
// }, 3000);
