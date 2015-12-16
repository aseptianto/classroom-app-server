Meteor.startup(function(){

    if (Submission.find().count() === 0) {
        var submissions = [
            { 'grade': 100,
            'activity': 'NftbEFKMFYjexjcNJ',
            'question':'8e8EDfZTwNEn62vbM',
            'student':'u3fsT5SWxPiDg5Hxr',
            'subtime': new Date(),
            'data': "1",
            'teacher_response': -1,
            'response_detail': 'I love it'
            },
            {
            'grade': 100,
            'activity': 'NftbEFKMFYjexjcNJ',
            'question':'ZBMy5QTKrLTi3vRkW',
            'student':'u3fsT5SWxPiDg5Hxr',
            'subtime': new Date(),
            'data': "Green",
            'teacher_response': 2,
            'response_detail': 'Wrong'
            }
    ];
    for (var i = 0; i < submissions.length; i++)
    Submission.insert(submissions[i]);
}

});
