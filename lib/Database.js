if (Meteor.isClient) {
  User_db = new Meteor.Collection('userDB'); // front-end storage for users requests
}

if (Meteor.isServer) {
  /* General Information */
  // Tags_db = new Meteor.Collection('tags'); // Standardize Social Information
  Interests = new Mongo.Collection('interests'); // Makes of interest and data summer

  /* Social Media Specific */
  Instagram_db = new Mongo.Collection('instagramDB'); // Instagram Database
}

/* Test Collections */
// Test_DATA = new Mongo.Collection('testDATA'); // Collection to D3 TEST ONLY
Tags_db = new Mongo.Collection('tags'); // Standardize Social Information
