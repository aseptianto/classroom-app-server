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

    if (Question.find().count() === 0) {
        var qs = [
            { 'place': '',
              'prompt': 'Is it a dolphin?',
              'choices': {
                'type':0,
              	'data':['Mammal','Bird','Reptile','Dolphin']
              },
              'answer':'Mammal'
            }
        ];
        for (var i = 0; i < qs.length; i++)
            Question.insert(qs[i]);
    }

});
