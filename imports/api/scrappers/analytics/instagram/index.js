/* Imports */
import { Instagram } from 'Instagram' // npm Instagram
import { Fibers } from 'Fibers' // npm Fibers
import { Moment } from 'Moment' // npm Moment
import '../../../../startup/server'; // server Startup

/* Local Variables */
var instagram_ID = '5166661f18554a699feaed3de378c3bf';
var instagram_Secret = 'bfebf48354df4928a0aab8efec13d906';

/* Dependents */
var instance = new require('instagram').createClient(instagram_ID, instagram_Secret);
var Fiber = Npm.require('fibers');
var moment = require('moment');

/* Object */
instagram = function () {
  var instagram = { version: "0.0.1" };

  /* Tag info */
  instagram.info = function (id) {
    function info(id) {
      instance.tags.tag(id, function (tag, err) {
        Fiber(function () { // Start infomation fiber
          Interests.upsert( {_id: tag.name},
            {instagram: {
              media_count: tag.media_count, // Current count on tag
              update_time: moment().unix(), // Time infomation was last checked
              back_log: false, // Is database upto date?
            }
          }, function (err) { // TODO: Effectively handle error
            if (err === null) {
              var doc = Interests.find({_id: id}).fetch();
              console.log(doc[0]._id + " has "+ doc[0].instagram.media_count + " tags as of " + moment.unix(doc[0].instagram.update_time).format('h:mm:ssa on MMMM Do, YYYY.'));
            }
            else console.log("Error is: " + err);

          });
        }).run(); // Execute Fiber
      });
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
