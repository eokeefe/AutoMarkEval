import { Mongo } from 'meteor/mongo'

User_db = new Meteor.Collection('userDB'); // front-end storage for users requests

export { User_db };
