Submission = new Mongo.Collection("submission");

Activity = new Mongo.Collection("activity");
//Session = new Mongo.Collection("session", {idGeneration : 'MONGO'});
//Session = new Mongo.Collection("session");

Tips = new Mongo.Collection("tips");

Question = new Mongo.Collection("question");

SubMapReduce = new Mongo.Collection("SubMapReduce");

//Images = new FS.Collection('images', {
//    stores: [new FS.Store.GridFS("original")],
//    filter: {
//        maxSize: 1048576 * 4,
//        allow: {
//            contentTypes: ['image/*']
//        }
//    }
//});

Uploads = new FS.Collection("uploads", {
    stores: [new FS.Store.FileSystem("uploads", {path: "~/uploads"})]
});

Uploads.allow({
    insert: function (userId, fileObj) {
        return true;
    },
    update: function (userId, fileObj) {
        return true;
    },
    remove: function (userId, fileObj) {
        return true;
    },
    download: function (userId, fileObj /*, shareId*/) {
        return true;
    }
});

//Images.allow({
//    insert: function (userId, fileObj) {
//        return true;
//    },
//    update: function (userId, fileObj) {
//        return true;
//    },
//    remove: function (userId, fileObj) {
//        return true;
//    },
//    download: function (userId, fileObj /*, shareId*/) {
//        return true;
//    }
//});
/*
 Meteor.publish('images', function(){
 return Images.find({});
 });
 */
Tips.allow({
    insert: function (userId, doc, fields, modifier) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        return true;
    },
    remove: function (userId, doc, fields, modifier) {
        return true;
    }
});

Question.allow({
    insert: function (userId, doc, fields, modifier) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        return true;
    },
    remove: function (userId, doc, fields, modifier) {
        return true;
    }
});

Activity.allow({
    insert: function (userId, doc, fields, modifier) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        return true;
    },
    remove: function (userId, doc, fields, modifier) {
        return true;
    }
});

Submission.allow({
    insert: function (userId, doc, fields, modifier) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        return true;
    },
    remove: function (userId, doc, fields, modifier) {
        return true;
    }
});

Meteor.users.allow({
    update: function (userId, doc, fields, modifier) {
        return true;
    }
});

if (Meteor.isServer) {
    var Api = new Restivus({
        useDefaultAuth: true,
        prettyJson: true
    });

    Api.addCollection(Submission);

    Api.addCollection(Meteor.users, {
        excludedEndpoints: ['getAll', 'put'],
        routeOptions: {
            authRequired: true
        },
        endpoints: {
            post: {
                authRequired: false
            },
            delete: {
                roleRequired: 'admin'
            }
        }
    });

    Api.addRoute("get-activity-list", {}, {
        get: function () {
            return Activity.find({status: 1}).fetch();
        }
    });

    Api.addRoute("get-tips/:id", {}, {
        get: function () {
            return Tips.findOne(this.urlParams.id);
        }
    });

    Api.addRoute("get-question-list/:id", {}, {
        get: function () {
            var activityId = this.urlParams.id;
            var questions = Question.find({activity: activityId}, {sort: {order: 1}}).fetch();
            var result = [];
            console.log(questions);
            // for each questions
            // case 1 tips is null and use_previous_tips == false
            // make a batch of one question for that question and push it
            // case 2 tips is not null
            // create new batch, put that question
            // traverse to the rest of questions, while use_previous_tips == true, add question to batch
            // when get use_previous_tips == false or tips != null or index reached end, break then push to result
            // remember to decrement i by 1 before leaving this while
            for (var i = 0; i < questions.length; i++) {
                var questionBatch = [];
                if (questions[i].tips == null && questions[i].use_previous_tips == false) {
                    questionBatch.push(questions[i]);
                    //console.log("push " + questions[i].order);
                    result.push(questionBatch);
                    //console.log("done batch");
                }
                else if (questions[i].tips != null) {
                    questionBatch.push(questions[i]);
                    //console.log("push " + questions[i].order);
                    i++;
                    while (i < questions.length && questions[i].use_previous_tips == true) {
                        questionBatch.push(questions[i]);
                        //console.log("push " + questions[i].order);
                        i++;
                    }
                    result.push(questionBatch);
                    //console.log("done batch");
                    if (i == questions.length) break;
                    i--;
                }
            }
            return result;
        }
    });
}