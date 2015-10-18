Meteor.publish('place', function(){
    console.log(Place.find({}).fetch());
    return Place.find({});
});