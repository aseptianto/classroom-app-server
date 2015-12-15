/*
Meteor.publish('students', function () {
    return Meteor.users.find({isTeacher: 0});
});

Meteor.publish('users', function(){
    return Meteor.users.find({});
})
*/

//restivus


//Meteor.method("add-submission", function (json) {
//    return Submission.insert(json);
//}, {
//    url: "add-submission",
//    getArgsFromRequest: function (request) {
//        // Let's say we want this function to accept a form-encoded request with
//        // fields named `a` and `b`.
//        var content = request.body;
//        var submission = {
//            "data": content.data,
//            "student": content.student,
//            "question": content.question
//        };
//        console.log(submission);
//        // Since form enconding doesn't distinguish numbers and strings, we need
//        // to parse it manually
//        return submission;
//    },
//    httpMethod: "post"
//});
//
//Meteor.method("get-activity-list", function(){
//    return JSON.stringify(Activity.find({status: 1}).fetch());
//},
//    {
//        url: "get-activity-list",
//        httpMethod: "get"
//    });
//
//Meteor.method("get-question-list", function(activityId){
//        var questions = Question.find({activity: activityId}, {sort: {order: 1}}).fetch();
//        var result = [];
//        console.log(questions);
//        // for each questions
//        // case 1 tips is null and use_previous_tips == false
//        // make a batch of one question for that question and push it
//        // case 2 tips is not null
//        // create new batch, put that question
//        // traverse to the rest of questions, while use_previous_tips == true, add question to batch
//        // when get use_previous_tips == false or tips != null or index reached end, break then push to result
//        // remember to decrement i by 1 before leaving this while
//        for(var i = 0; i < questions.length; i++){
//            var questionBatch = [];
//            if(questions[i].tips == null && questions[i].use_previous_tips == false){
//                questionBatch.push(questions[i]);
//                //console.log("push " + questions[i].order);
//                result.push(questionBatch);
//                //console.log("done batch");
//            }
//            else if(questions[i].tips != null){
//                questionBatch.push(questions[i]);
//                //console.log("push " + questions[i].order);
//                i++;
//                while(i < questions.length && questions[i].use_previous_tips == true){
//                    questionBatch.push(questions[i]);
//                    //console.log("push " + questions[i].order);
//                    i++;
//                }
//                result.push(questionBatch);
//                //console.log("done batch");
//                if(i == questions.length) break;
//                i--;
//            }
//        }
//        return JSON.stringify(result);
//    },
//    {
//        url: "get-question-list/:0",
//        httpMethod: "get"
//    });
//
//Meteor.method("get-tips", function(tipsId){
//        return JSON.stringify(Tips.findOne({_id: tipsId}));
//    },
//    {
//        url: "get-tips/:0",
//        httpMethod: "get"
//    });



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

    'addSubmission': function(submission){
        return Submission.insert(submission);
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
    },

    'setTeacherResponse': function(submissionId, type){
        if(type != -1){
            Submission.update({_id: submissionId}, {$set: {teacher_response: type}});
        }
        /*
        if(type == 2){
            Submission.update({_id: submissionId}, {$set: {response_detail: detail}});
        }
        */
    }
});
