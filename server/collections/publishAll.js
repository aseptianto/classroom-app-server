Meteor.publish('places', function(userId){
    if(userId){
        var session = Session.find({students: {$in:[userId]}}).fetch();
        var placeIds = session[0].places; //just do it lol
       // return Place.find({_id: { $in: new Mongo.ObjectID(placeIds) }} );
        return Place.find({_id: { $in: placeIds }});
    }
    return Place.find();
});

Meteor.publish('sessions', function(userId){
    if(userId){
        return Session.find({students: {$in:[userId]}});
    }
    return Session.find();
});

Meteor.publish('users', function(){
    return Meteor.users.find();
});

Meteor.publish("submissions", function(userId){
    if(userId){
        return Submissions.find({student: {$in: [userId]}});
    }
    return Submissions.find();
});

Meteor.publish("questions", function(userId){
    if(userId){
        var session = Session.find({students: {$in:[userId]}}).fetch();
        var placeIds = session[0].places; //just do it lol
        //var places = Place.find({_id: { $in: placeIds }}, {_id:1}).fetch();
        //console.log(places);
       // console.log(Question.find({place: {$in:placeIds}}).fetch());
        return Question.find({place: {$in:placeIds}});
    }
    return Question.find();
});
