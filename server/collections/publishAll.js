Meteor.publish('tips', function (userId) {
    if (userId) {
        var activity = Activity.find({students: {$in: [userId]}}).fetch();
        var placeIds = activity[0].places; //just do it lol
        // return Place.find({_id: { $in: new Mongo.ObjectID(placeIds) }} );
        return Tips.find({_id: {$in: placeIds}});
    }
    return Tips.find();
});

Meteor.publish('activities', function (userId) {
    if (userId) {
        return Activity.find({students: {$in: [userId]}});
    }
    return Activity.find();
});

Meteor.publish('users', function () {
    return Meteor.users.find();
});

/*
Meteor.publish('users', function () {
    return Meteor.users.find({}, {services: 0});
});
*/
Meteor.publish("submissions", function (userId, activityId) {
    if (userId && activityId) {
        return Submission.find({student: userId, activity: activityId});
    }
    if (userId && !activityId) {
        return Submission.find({student: {$in: [userId]}});
    }
    return Submission.find();
});

Meteor.publish("submissionsByActivity", function (activityId) {
    if (activityId) {
        return Submission.find({activity: {$in: [activityId]}});
    }
    return Submission.find();
});

Meteor.publish("questions", function (userId) {
    if (userId) {
        var activity = Activity.find({students: {$in: [userId]}}).fetch();
        var placeIds = activity[0].places; //just do it lol
        //var places = Place.find({_id: { $in: placeIds }}, {_id:1}).fetch();
        //console.log(places);
        // console.log(Question.find({place: {$in:placeIds}}).fetch());
        return Question.find({place: {$in: placeIds}});
    }
    return Question.find();
});

Meteor.publish("questionsByActivity", function (activityId) {
    if (activityId) {
        return Question.find({activity: {$in: [activityId]}});
    }
    return Question.find();
});

var fs = Npm.require("fs"),
    os = Npm.require("os"),
    path = Npm.require("path");

Picker.route("/api/upload-file", function (params, req, res, next) {
    if (req.method === 'POST') {
        var busboy = new Busboy({headers: req.headers});
        busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
            //var theDir = "/public/images";
            var saveTo = __meteor_bootstrap__.serverDir.split(".meteor")[0] + "/public/submission/" + filename;

            //console.log("save to " + path.dirname(require.main.filename));
            //var saveTo = path.join(theDir, filename);
            var fileSizeBytes = 0;
            file.pipe(fs.createWriteStream(saveTo));

            file.on("data", function(data) {
                fileSizeBytes = fileSizeBytes + data.length;
            });

            file.on('end', function() {
                file = {
                    originalFilename: filename,
                    path: saveTo,
                    size: fileSizeBytes
                };
            });
        });
        busboy.on('finish', function () {
            res.writeHead(200, {'Connection': 'close'});
            res.end("it works beautifully.");
            // put to db
        });
        return req.pipe(busboy);
    }

    res.writeHead(404);
    res.end();
});
