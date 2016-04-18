import { Mongo } from 'meteor/mongo'

/* General Information */
// Tags_db = new Meteor.Collection('tags'); // Standardize Social Information
Interests = new Mongo.Collection('interests'); // Makes of interest and data summer

/* Social Media Specific */
Instagram_db = new Mongo.Collection('instagramDB'); // Instagram Database

export { Interests, Instagram_db };
