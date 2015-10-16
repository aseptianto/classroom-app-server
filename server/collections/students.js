Meteor.publish('users', function(){
  return Meteor.users.find({}, {fields: {username: 1}})
});
