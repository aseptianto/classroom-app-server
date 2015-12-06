Meteor.publish('tips', function(userId){
    if(userId){
        var activity = Activity.find({students: {$in:[userId]}}).fetch();
        var placeIds = activity[0].places; //just do it lol
       // return Place.find({_id: { $in: new Mongo.ObjectID(placeIds) }} );
        return Tips.find({_id: { $in: placeIds }});
    }
    return Tips.find();
});

Meteor.publish('activities', function(userId){
    if(userId){
        return Activity.find({students: {$in:[userId]}});
    }
    return Activity.find();
});

Meteor.publish('users', function(){
    return Meteor.users.find({}, {services: 0 });
});

Meteor.publish("submissions", function(userId){
    if(userId){
        return Submission.find({student: {$in: [userId]}});
    }
    return Submission.find();
});

Meteor.publish("questions", function(userId){
    if(userId){
        var activity = Activity.find({students: {$in:[userId]}}).fetch();
        var placeIds = activity[0].places; //just do it lol
        //var places = Place.find({_id: { $in: placeIds }}, {_id:1}).fetch();
        //console.log(places);
       // console.log(Question.find({place: {$in:placeIds}}).fetch());
        return Question.find({place: {$in:placeIds}});
    }
    return Question.find();
});
