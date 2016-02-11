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
instaARCHIVE = function (tag, id) {
  /* Undefined Check */
  if (tag === undefined) {
    console.log("tag not defined");
    return
  }

  /* Gather Instagram Tags */
  instagram.tags.media(tag, {max_tag_id: id}, function (tag, err, pag) {
    try {
      Fiber(function() {
        /* Tag Collections */
        for (i = 0; i < tag.length; ++i) {
          Instagram_db.insert(tag[i]);
        };

        /* Tag Pagination */
        var max = pag.next_max_id, min = pag.next_min_id; // Variables

        if (Instagram_pag.find().count() === 0) { // Build Pagination
          Instagram_pag.insert({next_max_id: max, next_min_id: min, type: "pagi"});
        } else { // Update Pagination
          Instagram_pag.update({type: "pagi"}, {next_max_id: max, next_min_id: min, type: "pagi"});
        };
      }).run(); // Execute Fiber
    } catch (err) { throw err; }; // Error management
  });
};

/* Instagram Update DB */
instaUPDATE = function (tag, id) {
  /* Undefined Check */
  if (tag === undefined) {
    console.log("tag not defined");
    return
  }

  instagram.tags.media(tag, {max_tag_id: id}, function (tag, err, pag) {
    try {
      Fiber(function() {
        /* Tag Collections */
        for (i = 0; i < tag.length; ++i) {
          if(Instagram_db.findOne({"images.standard_resolution.url": tag[i].images.standard_resolution.url}) === null) {
            Instagram_db.insert(tag[i]);
          }
        };
      }).run();
    } catch (err) { throw err; }; // Error management
  });
};
