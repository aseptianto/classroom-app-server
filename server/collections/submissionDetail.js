Meteor.publish('submissionDetail', function(stuId){
    return Meteor.users.find({_id: stuId});
});
