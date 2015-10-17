Submissions = new Mongo.Collection("submissions");

Session = new Mongo.Collection("session");

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

Submissions.allow({
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
