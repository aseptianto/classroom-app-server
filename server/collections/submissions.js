/*
Meteor.publish("submissions", function(){
    return Submissions.find();
});
*/


var fs = Npm.require('fs');

//using internal webapp or iron:router
WebApp.connectHandlers.use('/uploadImage',function(req,res){
    //var start = Date.now()
    var file = fs.createWriteStream('../../../../../uploads/test.jpg');
    //classroom-app-server\.meteor\local\build\programs\server
    file.on('error',function(error){});
    file.on('finish',function(){
        //res.writeHead();
        res.end(); //end the response
        console.log("finish");
        //console.log('Finish uploading, time taken: ' + Date.now() - start);
    });

    req.pipe(file); //pipe the request to the file
    console.log(req);
});