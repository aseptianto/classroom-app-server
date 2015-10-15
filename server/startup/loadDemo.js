Meteor.startup(function(){
    
    if (Submissions.find().count() === 0) {
        var submissions = [
            { 'user': 'test',
              'session': 'test',
              'place':'test',
              'submission':'test'            
            }
        ];
        for (var i = 0; i < submissions.length; i++)
            Submissions.insert(submissions[i]);
    }
    
});