Meteor.publish('users', function(){
  return Meteor.users.find({}, {fields: {username: 1}})
});

Accounts.createUser({username: 'Android1', password: 'password', dob:'sdjkad', type: 1});
