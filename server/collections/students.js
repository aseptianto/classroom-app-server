/*
Meteor.publish('students', function () {
    return Meteor.users.find({isTeacher: 0});
});

Meteor.publish('users', function(){
    return Meteor.users.find({});
})
*/
Meteor.methods({
    'addStu': function (newStu) {
        Accounts.createUser({username: newStu.username, password: newStu.password});
        var stuId = Meteor.users.findOne({username: newStu.username})._id;
        Meteor.users.update(stuId, {$set: {name: newStu.name, dob: new Date(newStu.dob), isTeacher: 0}});
    },

    'getUserId': function (newStudentUsername) {
        if (Meteor.users.findOne({username: newStudentUsername}) == null) return -1;
        return Meteor.users.findOne({username: newStudentUsername})._id;
    },

    'addSubmissionToUserCollection': function(stuId, subId){
        Meteor.users.update(stuId, {$push: {submissions: subId}});
    },

    'getUserCurrentSession': function(studentId){

        var session = Session.findOne({students: {$in:[studentId]}});
        return session._id;

    },
    'getSubMapReduce': function(){
        var map = function() {
            emit(this.student, 1);
        }
        var reduce = function(key, values) {
             return Array.sum(values);
        };

        var result = Submission.mapReduce(map, reduce, {query: {}, out: "SubMapReduce", verbose: true});

        return SubMapReduce.find({},{ sort: {'subTime': -1} }).fetch();
    }
});
