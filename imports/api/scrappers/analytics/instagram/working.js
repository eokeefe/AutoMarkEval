/* Imports */
import { Instagram } from 'Instagram' // npm Instagram
import { Fibers } from 'Fibers' // npm Fibers
import { Moment } from 'Moment' // npm Moment
import '../../../../startup/server'; // server Startup

/* Instagram Credentials */
var instagram = new require('instagram').createClient('5c8f6f1097ae407a878b6797a3773d33', 'eb30f497709343cebfc4c636ffac3265');
var fiber = require('fibers');
var moment = require('moment');

/* Tag info */
instaINFO = function (id) {
  instagram.tags.tag(id, function (tag, err) {
    fiber(function () { // Start infomation fiber
      Interests.upsert( {_id: tag.name},
        {instagram: {
          media_count: tag.media_count, // Current count on tag
          update_time: moment().unix(), // Time infomation was last checked
          back_log: false // Is database upto date?\
        }
      }, function (err) { // TODO: Effectively handle error
        var doc = Interests.find({_id: id}).fetch();
        console.log(doc[0]._id + " has "+ doc[0].instagram.media_count + " tags as of " + moment.unix(doc[0].instagram.update_time).format('h:mm:ssa on MMMM Do, YYYY.'));
      });
    }).run(); // Execute Fiber
  });
};

/* Instagram to DB */
instaARCHIVE = function (request, id) {
  if (id === undefined) { pag_id = 0 }

  instagram.tags.media(request, {max_tag_id: id}, function (tag, err, pag) {
    fiber(function() {
      _.each(tag, function(doc) {
        Instagram_db.upsert({_id: request}, { $set: { hits: doc } });
      })

      Interests.update({_id: request}, {
        $set: {
          "instagram.pagi.min_id": pag.next_max_id,
          "instagram.pagi.max_id": pag.next_min_id,
          "instagram.pagi.first_date": tag[0].created_time,
          "instagram.pagi.last_date": tag[tag.length-1].created_time
        }
      });
    }).run(); // Execute Fiber
  });
};

export { instaINFO, instaARCHIVE };
