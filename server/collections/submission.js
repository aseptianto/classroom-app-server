Meteor.publish("submissions", function(){
    return Submissions.find();
});