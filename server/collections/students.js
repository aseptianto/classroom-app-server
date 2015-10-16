Meteor.publish('users', function(){
  return Meteor.users.find({}, {fields: {username: 1}})
});

Meteor.methods({
  'addStu': function(newStu){
    Accounts.createUser({username: newStu.username, password: newStu.password});
    var stuId = Meteor.users.findOne({username: newStu.username})._id;
    Meteor.users.update(stuId, {$set: {name: newStu.name, dob: newStu.dob, isTeacher:0}});
  }
});
