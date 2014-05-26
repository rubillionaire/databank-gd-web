var ResourceModel = require('./resource_model');
var ResourceView = require('./resource_view');
var AuthorModel = function () {
    var self = {};
    self.id = function () {
        return 5;
    };
    return self;
};

var body_sel = d3.select('body');

var author_model   = AuthorModel();
var resource_model = ResourceModel()
    .versions.add({
        title: 'Mapping: The Journey as Context for narrative',
        body: {
            html: '<p><strong>Maps</strong><p>'+
                  '<p>'+
                  'They are fascinating because the context, '+
                  'representation, and conventions are all '+
                  'foreign to us. Some of the most interesting '+
                  'may be the stick charts from the Marshall '+
                  'Islands. These charts are generally made '+
                  'locally grown fiber plants. The arrangement '+
                  'or wave masses caused by winds, rather that '+
                  'approximately by shells ... or coral.'+
                  '</p>'+
                  '<p><strong>Defining the Location</strong></p>'+
                  '<p>'+
                  'Locate sites within the defined area that '+
                  'represent historical, political, cultural, ' +
                  'social,or environmental events.For example, '+
                  'you may note architectural landmarks, '+
                  'monuments, factories, rivers or other '+
                  'significant landformations. Thoroughly '+
                  'research your location. Be as creative '+
                  'as possible when examining your location.'+
                  '</p>'
        },
        tags: ["Maps", "Doug Scott", "Making Meaning"]
    })
    .authors.add(author_model.id());

var resource_view = ResourceView()
    .container(body_sel)
    .model(resource_model)
    .render();
