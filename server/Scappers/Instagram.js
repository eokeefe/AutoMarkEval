
/////////////////// Instagram based functions ///////////////////

// Objects
instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
Fiber = Npm.require('fibers');

// Tag info
instaINFO = function (tag) {
  if (tag === undefined) {console.log("tag not defined"); return }
  instagram.tags.tag(tag, function (tag, err) {
    try {
      Fiber(function () {
        var count = tag.media_count, name = tag.name;
        if (Info.find().count() === 0) { Info.insert({type: "info", media_count: count, name: name}); } // Build
        else { Info.update({type: "info"}, {type: "info", media_count: count, name: name}); } // Update

        console.log("currently " + tag.media_count + " tags for "  + tag.name); // Change to display from DB
      }).run();
    } catch (err) { throw err; }; // Error management
  });
};

// Instagram to DB
instaARCHIVE = function (tag, id) {
  if (tag === undefined) {console.log("tag not defined"); return }
  instagram.tags.media(tag, {max_tag_id: id}, function (tag, err, pag) {
    try {
      Fiber(function() {
        // Tag to DB
        for (i = 0; i < tag.length; ++i) {
          Tags.insert(tag[i]);
          New.insert(tag[i]); // FOR TESTING ONLY!
        };

        // Pagination to DB
        var max = pag.next_max_id, min = pag.next_min_id;
        if (Pagi.find().count() === 0) {
          Pagi.insert({next_max_id: max, next_min_id: min, type: "pagi"});
        } else {
          Pagi.update({type: "pagi"}, {next_max_id: max, next_min_id: min, type: "pagi"});
        };
      }).run();
    } catch (err) { throw err; }; // Error management
  });
};

instaUPDATE = function (tag, id) {
  if (tag === undefined) {console.log("tag not defined"); return }
  instagram.tags.media(tag, {max_tag_id: id}, function (tag, err, pag) {
    try {
      Fiber(function() {
        // Tag to DB
        for (i = 0; i < tag.length; ++i) {
          if(Tags.findOne({"images.standard_resolution.url": tag[i].images.standard_resolution.url}) === null) {
            Tags.insert(tag[i]);
            New.insert(tag[i]);
          }
        };
      }).run();
    } catch (err) { throw err; }; // Error management
  });
};

/////////////////// Instagram based functions ///////////////////
/////////////////////////////////////////////////////////////////
/////////////////////// APP Functionality ///////////////////////

Meteor.startup(function () {
  Tags.remove({});
  Pagi.remove({});
  New.remove({});
});

Pagi.find().observe({
  added: function (doc) {
    if (doc.next_max_id !== null) instaARCHIVE(tag, doc.next_max_id)
    else {
      console.log("DB is currently up to date.");
      Meteor.setInterval(function () {instaUPDATE(tag,doc.next_min_id)}, 3000);
    }
  },
  changed: function (doc) {
    if (doc.next_max_id !== null) instaARCHIVE(tag, doc.next_max_id)
    else {
      console.log("DB is currently up to date.");
      Meteor.setInterval(function () {instaUPDATE(tag,doc.next_min_id)}, 3000);
    }
  }
});

var tag = "porsche"; // Tag in question

instaINFO(tag); // Collect information on tag
instaARCHIVE(tag, '0'); // Collect arcived data

/////////////////////// APP Functionality ///////////////////////
