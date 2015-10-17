Meteor.publish('session', function(){
    console.log(Session.find({}, {fields: {name: 1}}).fetch());
    return Session.find({}, {fields: {name: 1}})
});