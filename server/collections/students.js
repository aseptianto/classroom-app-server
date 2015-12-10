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
        };
        var reduce = function(key, values) {
             return Array.sum(values);
        };

        var result = Submission.mapReduce(map, reduce, {query: {}, out: "SubMapReduce", verbose: true});

        return SubMapReduce.find({},{ sort: {'subTime': -1} }).fetch();
    },

    // get available activities
    'getAvailableActivities': function(studentId){

    },

    // get questions for that activity
    'getActivityQuestions': function(activityId){

    },
    // get tips for that question
    'getQuestionTips': function(questionId){

    },


    'removeActivityQuestions': function (activityId){
        var activityQuestions = Question.find({activity: activityId}, {sort: {order: 1}}).fetch();
        for(var i = 0; i < activityQuestions.length; i++){
            Meteor.call('removeQuestion', activityQuestions[i]._id);
        }
    },

    'removeQuestion': function(questionId){
        var question = Question.findOne({_id: questionId});
        Meteor.call('removeTips', question.tips);
        Question.remove({_id: questionId});
    },

    'removeTips': function (tipsId){
        // get any question with that tips
        var relatedQuestions = Question.find({tips: tipsId}).fetch();
        // for each question, look for question of that activity with higher order
        relatedQuestions.forEach(function(question){
            var laterQuestions = Question.find({activity: question.activity, order: { $gt: question.order } }, {sort: {order: 1}}).fetch();
            //for each of these later questions, if use_previous_question is true, set to false
            for(var i = 0; i < laterQuestions.length; i++){
                if(laterQuestions[i].use_previous_tips == false) break;
                else if(laterQuestions[i].use_previous_tips == true){
                    Question.update({_id: laterQuestions[i]._id}, {$set: {use_previous_tips : false}});
                }
            }
        });
        Tips.remove({"_id" : tipsId});
    }
});
