Submissions = new Mongo.Collection("submissions");

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
