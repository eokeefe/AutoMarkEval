/* Imports */
import { Instagram } from 'Instagram' // npm Instagram
import { Fibers } from 'Fibers' // npm Fibers
import { Moment } from 'Moment' // npm Moment
import '../../../../startup/server'; // server Startup

/* Local Variables */
// AutoMarkEval
// var instagram_ID = '5c8f6f1097ae407a878b6797a3773d33';
// var instagram_Secret = 'eb30f497709343cebfc4c636ffac3265';
// PamuRico
var instagram_ID = '5166661f18554a699feaed3de378c3bf';
var instagram_Secret = 'e14d92ae364f400bbbb05a0e71e346c9';

/* Dependents */
var Fiber = Npm.require('fibers');
var moment = require('moment');
// Nodestagram
var instance = new require('instagram').createClient(instagram_ID, instagram_Secret);
// Instagram-Node
var ig = require('instagram-node').instagram();
ig.use({ client_id: instagram_ID, client_secret: instagram_Secret });

/* Object */
instagram = function () {
  var instagram = { version: "0.0.1" };

  /* Tag info */
  instagram.info = function (id) {
    function info(id) {
      ig.tag(id, function(err, result, remaining, limit) {
        console.log(err);
        console.log('result: ' + result);
        console.log('remaining: ' + remaining);
        console.log('limit: ' + limit);
      });

      /* NOTE
      // Nodestagram based Instagram API
      //
      // This was working code before Meteor 1.3,
      // however, as of 1.4 Instagram is throwing error 400.
      // 400 relates to not having an access_token.
      // I don't think we need an access_token because
      // we are not asking for user information and we have a
      // developers ID/Secret. Best of luck!
      */
      // instance.tags.tag(id, function (tag, err) {
      //   Fiber(function () { // Start infomation fiber
      //     debugger;
      //     console.log(err);
      //     if (tag ==! undefined) {
      //       Interests.upsert( {_id: tag.name},
      //         {instagram: {
      //           media_count: tag.media_count, // Current count on tag
      //           update_time: moment().unix(), // Time infomation was last checked
      //           back_log: false, // Is database upto date?
      //         }
      //       }, function (err) { // TODO: Effectively handle error
      //         if (err === null) {
      //           var doc = Interests.find({_id: id}).fetch();
      //           console.log(doc[0]._id + " has "+ doc[0].instagram.media_count + " tags as of " + moment.unix(doc[0].instagram.update_time).format('h:mm:ssa on MMMM Do, YYYY.'));
      //         } else console.log("Error is: " + err);
      //       });
      //     }
      //   }).run(); // Execute Fiber
      // });
    }

    return info;
  }();

  instagram.archive = function (request, id) {
    if (id === undefined) { pag_id = 0 }

    instagram.tags.media(request, {max_tag_id: id}, function (tag, err, pag) {
      Fiber(function() {
        _.each(tag, function(doc) {
          Instagram_db.upsert({_id: request}, { $set: { hits: doc } });
        })

        Instagram_db.update({_id: request}, {
          $set: {
            "pagi.min_id": pag.next_max_id,
            "pagi.max_id": pag.next_min_id,
            "pagi.first_date": tag[0].created_time,
            "pagi.last_date": tag[tag.length-1].created_time
          }
        });
      }).run(); // Execute Fiber
    });
  };

  return instagram;
}();

export { instagram };
