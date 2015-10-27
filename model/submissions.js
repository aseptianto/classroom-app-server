Submission = new Mongo.Collection("submission", {idGeneration : 'MONGO'});

Session = new Mongo.Collection("session", {idGeneration : 'MONGO'});
//Session = new Mongo.Collection("session");

Place = new Mongo.Collection("place", {idGeneration: 'MONGO'});

Question = new Mongo.Collection("question", {idGeneration: 'MONGO'});

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
