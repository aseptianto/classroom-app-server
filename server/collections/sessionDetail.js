Meteor.publish('sessionDetail', function(sessionId){
    var session = Session.find({_id: sessionId});
    console.log(session.fetch());
    var teacherIds = session.teachers;
    var studentsIds = session.students;
    return session;
});