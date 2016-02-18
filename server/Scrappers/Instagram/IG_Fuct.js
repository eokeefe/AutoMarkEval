/* Instagram Credentials */
instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
Fiber = Npm.require('fibers');

/* Tag info */
instaINFO = function (id) {
  instagram.tags.tag(id, function (tag, err) {
    Fiber(function () { // Start infomation fiber
      Interests.upsert( {_id: tag.name},
        {instagram: {
          media_count: tag.media_count, // Current count on tag
          update_time: moment().unix(), // Time infomation was last checked
          back_log: true, // Is database upto date?
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
  if (id === undefined) { pag_id = 0}

  instagram.tags.media(request, {max_tag_id: id}, function (tag, err, pag) {
    Fiber(function() {
      _.each(tag, function(doc) { // TODO: There should be a better way to do this...
        doc._id = doc.id;
        delete doc.id;
        Instagram_db.insert(doc, function (err, id) {
          if (err !== null) { throw err; }
        });
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
