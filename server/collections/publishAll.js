Meteor.publish('places', function(){
    return Place.find();
});

Meteor.publish('sessions', function(){
  return Session.find();
});

Meteor.publish('users', function(){
    return Meteor.users.find({}, {services: 0 });
})

Meteor.publish("submissions", function(){
    return Submission.find();
});

Meteor.publish("questions", function(){
    return Question.find();
});
