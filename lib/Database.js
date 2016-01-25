if (Meteor.isClient) {
  User_db = new Meteor.Collection('userDB'); // front-end storage for users requests
}

if (Meteor.isServer) {
  /* General Information */
  Tags_db = new Meteor.Collection('tags'); // Standardize Social Information
  Interests = new Meteor.Collection('interests'); // Makes of Interest

  /* Social Media Specific */
  Instagram_db = new Meteor.Collection('instagramDB'); // Instagram Database
  Instagram_info = new Meteor.Collection('instagramINFO'); // Instagram Information
  Instagram_pag = new Meteor.Collection('instagramPAG'); // Instagram Pagination

}

/* Test Collections */
Test_DATA = new Meteor.Collection('testDATA'); // Collection to D3 TEST ONLY
