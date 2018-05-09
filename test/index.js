var json = {
    "name": "Fourth type",
    "title": "Hot area",
    "elements": [
        {
            type: "picturehotzone",
            name: "question1",
            title: "Click the sun please:",
            imageLink: "https://www.w3schools.com/jsref/planets.gif",
            choices: [
                {
                    value: "Sun",
                    coords: "0,0,79,122"
                },
                {
                    value: "Venus",
                    coords: "116,49,131,66"
                }
            ],
        }
    ]
};




var survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    });

$("#surveyElement").Survey({ model: survey });
