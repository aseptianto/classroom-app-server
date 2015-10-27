Submission = new Mongo.Collection("submission", {idGeneration : 'MONGO'});

Session = new Mongo.Collection("session", {idGeneration : 'MONGO'});
//Session = new Mongo.Collection("session");

Place = new Mongo.Collection("place", {idGeneration: 'MONGO'});

Question = new Mongo.Collection("question", {idGeneration: 'MONGO'});

SubMapReduce = new Mongo.Collection("SubMapReduce");

Images = new FS.Collection('images', {
  stores: [new FS.Store.GridFS("original")],
  filter: {
    maxSize: 1048576 * 4,
    allow: {
      contentTypes: ['image/*']
    }
  }
});

Images.allow({
  insert: function(userId, fileObj) {
    return true;
  },
  update: function(userId, fileObj) {
    return true;
  },
  remove: function(userId, fileObj) {
    return true;
  },
  download: function(userId, fileObj /*, shareId*/) {
    return true;
  }
});

Meteor.publish('images', function(){
  return Images.find({});
});

Place.allow({
  insert: function(userId, doc, fields, modifier){
    return true;
  },
  update: function(userId, doc, fields, modifier){
    return true;
  },
  remove: function(userId, doc, fields, modifier){
    return true;
  }});

Question.allow({
  insert: function(userId, doc, fields, modifier){
  return true;
  },
  update: function(userId, doc, fields, modifier){
    return true;
  },
  remove: function(userId, doc, fields, modifier){
    return true;
  }});

Session.allow({
  insert: function(userId, doc, fields, modifier){
  return true;
  },
  update: function(userId, doc, fields, modifier){
    return true;
  },
  remove: function(userId, doc, fields, modifier){
    return true;
  }});

Submission.allow({
  insert: function(userId, doc, fields, modifier){
    return true;
  },
  update: function(userId, doc, fields, modifier){
    return true;
  },
  remove: function(userId, doc, fields, modifier){
    return true;
  }
});

Meteor.users.allow({
  update: function(userId, doc, fields, modifier){
    return true;
  }
});
