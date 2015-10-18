Meteor.publish('session', function(sessionId){
    if (sessionId) {
        var session = Session.find({_id: sessionId});
        console.log(session.fetch());

        var teacherIds = session.teachers;
        var studentsIds = session.students;
        return session;
    } else {
        console.log(Session.find({}).fetch());
        return Session.find({});
    }

});