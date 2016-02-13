/* Instagram Credentials */
instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
Fiber = Npm.require('fibers');

/* Tag info */
instaINFO = function (id) {
  instagram.tags.tag(id, function (tag, err) {
    Fiber(function () {
      Interests.upsert( {_id: tag.name},
        {instagram: {media_count: tag.media_count, created_time: moment().unix()}
      });

      console.log(tag.name + " has "+ tag.media_count + " tags as of " + moment().format('h:mm:ssa on MMMM Do, YYYY.'));
    }).run(); // Execute Fiber
  });
};

/* Instagram to DB */
instaARCHIVE = function (request, id) {
  instagram.tags.media(request, {max_tag_id: id}, function (tag, err, pag) {
    Fiber(function() {
      for (i = 0; i < tag.length; ++i) {
        Instagram_db.insert(tag);
      };
      console.log(Instagram_db.find().count());

      Interests.upsert({_id: request}, {
        $set: {"instagram.pagi.min_id": pag.next_max_id, "instagram.pagi.max_id": pag.next_min_id}
      });
    }).run(); // Execute Fiber
  });
};
