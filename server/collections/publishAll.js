Meteor.publish('places', function(){
    return Place.find();
});

Meteor.publish('sessions', function(){
  return Session.find();
});

Meteor.publish('users', function(){
    return Meteor.users.find();
})

Meteor.publish("submissions", function(){
    return Submissions.find();
});
