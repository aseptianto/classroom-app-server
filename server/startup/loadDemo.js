Meteor.startup(function(){

    if (Submission.find().count() === 0) {
        var submissions = [
            { 'grade': 100,
            'activity': 'NftbEFKMFYjexjcNJ',
            'question':'NqAiyKRj7Xhsci6Ev',
            'student':'u3fsT5SWxPiDg5Hxr',
            'subtime': new Date(),
            'data': 'Elephane',
            'teacher_response': 2,
            'response_detail': 'I love it'
            },
            {
            'grade': 100,
            'activity': 'NftbEFKMFYjexjcNJ',
            'question':'ZBMy5QTKrLTi3vRkW',
            'student':'u3fsT5SWxPiDg5Hxr',
            'subtime': new Date(),
            'data': 'Elephane123',
            'teacher_response': 2,
            'response_detail': 'Wrong'
            }
    ];
    for (var i = 0; i < submissions.length; i++)
    Submission.insert(submissions[i]);
}

});
