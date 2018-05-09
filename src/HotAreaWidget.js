var widget = {
    //the widget name.
    name: "picturehotzone",

    //the widget title. Appears on the toolbox of the SurveyJS Editor/Builder
    title: "Picture hot zone",

    //icon in builder. empty = standard one
    iconName: "",

    //If the widgets depends on third-party library(s) then here you may check if this library(s) is loaded
    widgetIsLoaded: function () {
        return true; //we do not require anything so we just return true. 
    },

    //SurveyJS library calls this function for every question to check, if it should use this widget instead of default rendering/behavior
    isFit: function (question) {
        //we return true if the type of question is picturehotzone
        return question.getType() === 'picturehotzone';
    },

    //Use this function to create a new class or add new properties or remove unneeded properties from your widget
    //activatedBy tells how your widget has been activated by: property, type or customType
    //property - it means that it will activated if a property of the existing question type is set to particular value, for example inputType = "date" 
    //type - you are changing the behaviour of entire question type. For example render radiogroup question differently, have a fancy radio buttons

    activatedByChanged: function (activatedBy) {
        Survey.JsonObject.metaData.addClass("picturehotzone", [], null, "empty");
        Survey.JsonObject.metaData.addProperty("picturehotzone", {
            name: "imageLink", default: "https://www.google.cz/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        });
        Survey.JsonObject.metaData.addProperty("picturehotzone", {
            name: "choices",
        });
    },

    //If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
    isDefaultRender: false,
    //You should use it if your set the isDefaultRender to false
    htmlTemplate: "<div><img><map></map></div>",

    //The main function, rendering and two-way binding
    afterRender: function (question, el) {
        //el is our root element in htmlTemplate, is "div" in our case

        //get and prepare the img element
        var image = el.getElementsByTagName("img")[0];
        image.src = question.imageLink;
        image.alt = question.name;
        image.useMap = "#" + question.name + "map";

        //get and prepare the map element
        var myMap = el.getElementsByTagName("map")[0];
        myMap.name = question.name + "map";
        myMap.style.cursor = "pointer";

        // get and prepare the areas
        for (var area of question.choices) {
            var newArea = document.createElement("AREA");
            newArea.shape = "rect";
            newArea.coords = area.coords;
            newArea.alt = area.value;
            newArea.addEventListener("click", function () { question.value = this.alt });

            myMap.insertBefore(newArea, myMap.areas[0]);
        }
    },
    //Use it to destroy the widget. It is typically needed by jQuery widgets
    willUnmount: function (question, el) {
        //var $el = $(el).find("select");
        //$el.data('picker').destroy();
    }
}

//Register our widget in singleton custom widget collection
Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
