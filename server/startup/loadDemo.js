Meteor.startup(function(){

    if (Submission.find().count() === 0) {
        var submissions = [
            { 'grade': 100,
            'activity': 'CnTLPhbjaf7H5qgbR',
            'question':'MPBLGuESbaofio2JS',
            'student':'BcsnF5hAmRxo6d3QD',
            'subtime': new Date(),
            'data': {"type": 0, "content": 1},
            'teacher_response': -1,
            'response_detail': 'I love it'
            },
            {
            'grade': 100,
            'activity': 'CnTLPhbjaf7H5qgbR',
            'question':'iaE77om8iqqiZHJLK',
            'student':'BcsnF5hAmRxo6d3QD',
            'subtime': new Date(),
            'data': {"type": 1, "content": "Green"},
            'teacher_response': 2,
            'response_detail': 'Wrong'
            }
    ];
    for (var i = 0; i < submissions.length; i++)
    Submission.insert(submissions[i]);
}

});
